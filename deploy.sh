#!/bin/bash
set -e

echo "Starting deployment..."

echo "Step 1: Enabling maintenance mode..."
php artisan down

echo "Step 2: Pulling latest changes..."
git pull origin main

echo "Step 3: Installing dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

echo "Step 4: Running database migrations..."
php artisan migrate --force

echo "Step 5: Optimizing application..."
php artisan optimize

echo "Step 6: Restarting queue workers..."
php artisan queue:restart

echo "Step 7: Disabling maintenance mode..."
php artisan up

echo "Deployment completed successfully!"
