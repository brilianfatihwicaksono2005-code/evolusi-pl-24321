# =============================================================================
# Stage 1: Base — system dependencies & PHP extensions
# =============================================================================
FROM php:8.3-cli

# Install system dependencies and PHP extensions in ONE layer to minimise size.
# This layer is cached as long as the base image or this RUN command doesn't change.
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# =============================================================================
# Stage 2: Composer binary — copied from the official Composer image
# =============================================================================
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# =============================================================================
# Stage 3: Dependency installation (CACHE OPTIMISED LAYER)
# =============================================================================
WORKDIR /var/www/html

# CRITICAL CACHE OPTIMISATION:
# Copy ONLY the dependency manifest files first.
# Docker will re-use this cached layer on subsequent builds as long as
# composer.json and composer.lock have NOT changed — even if application
# source code changes. This is the key to fast incremental builds.
COPY composer.json composer.lock ./

# Install PHP dependencies (scripts & autoloader deferred intentionally).
# This layer is cached independently of all application source code.
RUN composer install --no-scripts --no-autoloader

# =============================================================================
# Stage 4: Application code (CHANGES FREQUENTLY — placed after deps)
# =============================================================================
# Only after dependencies are cached do we copy the full application.
# Changing any source file invalidates only THIS layer and later ones.
COPY . .

# =============================================================================
# Stage 5: Application bootstrap
# =============================================================================
RUN cp .env.example .env \
    && php artisan key:generate \
    && composer dump-autoload --optimize \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# =============================================================================
# Runtime
# =============================================================================
EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
