const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
    size: 'A4',
    margin: 50
});

const stream = fs.createWriteStream('CI-CD_Assignment_Documentation.pdf');
doc.pipe(stream);

doc.fontSize(24).font('Helvetica-Bold').text('CI/CD Assignment Documentation', { align: 'center' });
doc.fontSize(12).font('Helvetica').text('Laravel GitHub Actions Pipeline', { align: 'center' });
doc.text('Date: September 19, 2026', { align: 'center' });
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Project Overview', { underline: true });
doc.fontSize(11).font('Helvetica').text('This project implements a complete CI/CD pipeline for a Laravel application using GitHub Actions. The pipeline includes automated testing, staging deployment, and production deployment stages.');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Phase 1: Task CRUD Implementation', { underline: true });
doc.fontSize(12).font('Helvetica-Bold').text('1.1 Database Migration');
doc.fontSize(10).font('Helvetica').text('File: database/migrations/2026_09_19_024220_create_tasks_table.php', { color: '#666' });
doc.text('Schema includes: id, title, description (nullable), status (default: pending), timestamps');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('1.2 Task Model');
doc.fontSize(10).font('Helvetica').text('File: app/Models/Task.php');
doc.text('Fillable fields: title, description, status');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('1.3 Task Controller');
doc.fontSize(10).font('Helvetica').text('File: app/Http/Controllers/TaskController.php');
doc.text('Methods: index, create, store, show, edit, update, destroy');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('1.4 Routes');
doc.fontSize(10).font('Helvetica').text('Route::resource(\'tasks\', TaskController::class);');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('1.5 Blade Views');
doc.fontSize(10).font('Helvetica').text('• resources/views/tasks/index.blade.php (Task list)');
doc.text('• resources/views/tasks/create.blade.php (Create form)');
doc.text('• resources/views/tasks/edit.blade.php (Edit form)');
doc.text('• resources/views/tasks/show.blade.php (Task details)');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('1.6 Feature Tests');
doc.fontSize(10).font('Helvetica').text('File: tests/Feature/TaskTest.php');
doc.text('Tests included:');
doc.text('• test_can_list_tasks()');
doc.text('• test_can_create_task()');
doc.text('• test_can_update_task()');
doc.text('• test_can_delete_task()');
doc.text('Testing: SQLite in-memory database (phpunit.xml)');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Phase 2: Deployment Script', { underline: true });
doc.fontSize(12).font('Helvetica-Bold').text('2.1 deploy.sh');
doc.fontSize(10).font('Helvetica').text('File: deploy.sh (7 sequential steps)');
doc.text('Step 1: Turn on maintenance mode (php artisan down)');
doc.text('Step 2: Pull latest changes (git pull origin main)');
doc.text('Step 3: Install dependencies (composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev)');
doc.text('Step 4: Run database migrations (php artisan migrate --force)');
doc.text('Step 5: Clear and cache routes/config (php artisan optimize)');
doc.text('Step 6: Restart queues (php artisan queue:restart)');
doc.text('Step 7: Turn off maintenance mode (php artisan up)');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Phase 3: GitHub Actions Pipeline', { underline: true });
doc.fontSize(12).font('Helvetica-Bold').text('3.1 Workflow Configuration');
doc.fontSize(10).font('Helvetica').text('File: .github/workflows/deploy.yml');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('3.2 Pipeline Stages');
doc.fontSize(11).font('Helvetica-Bold').text('Stage 1: Build');
doc.fontSize(10).font('Helvetica').text('• Checkout code');
doc.text('• Setup PHP 8.3');
doc.text('• Install Composer dependencies');
doc.text('• Upload vendor directory as artifact');
doc.moveDown(0.3);

doc.fontSize(11).font('Helvetica-Bold').text('Stage 2: Test (needs: build)');
doc.fontSize(10).font('Helvetica').text('• Download vendor artifact');
doc.text('• Setup PHP environment');
doc.text('• Copy .env.example to .env');
doc.text('• Generate application key');
doc.text('• Create SQLite database');
doc.text('• Run PHPUnit tests');
doc.moveDown(0.3);

doc.fontSize(11).font('Helvetica-Bold').text('Stage 3: Staging (needs: test)');
doc.fontSize(10).font('Helvetica').text('• Runs after successful tests');
doc.text('• Simulates staging deployment');
doc.moveDown(0.3);

doc.fontSize(11).font('Helvetica-Bold').text('Stage 4: Production (needs: staging)');
doc.fontSize(10).font('Helvetica').text('• Conditional: only on main branch');
doc.text('• Uses production environment');
doc.text('• Echoes 7-step deployment process');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Phase 4: Testing & Simulation', { underline: true });
doc.fontSize(12).font('Helvetica-Bold').text('4.1 Red Pipeline (Failure)');
doc.fontSize(10).font('Helvetica').text('Steps to create failing test:');
doc.text('1. Open tests/Feature/TaskTest.php');
doc.text('2. Go to line 21 in test_can_list_tasks()');
doc.text('3. Change: $response->assertStatus(200);');
doc.text('4. To: $response->assertStatus(404);');
doc.text('5. Commit & push to GitHub');
doc.text('6. Observe pipeline failure');
doc.text('7. Take screenshot of red pipeline');
doc.moveDown(0.5);

doc.fontSize(12).font('Helvetica-Bold').text('4.2 Green Pipeline (Success)');
doc.fontSize(10).font('Helvetica').text('Steps to fix and pass tests:');
doc.text('1. Revert change in tests/Feature/TaskTest.php');
doc.text('2. Change back: $response->assertStatus(200);');
doc.text('3. Commit & push to GitHub');
doc.text('4. Observe successful pipeline');
doc.text('5. Take screenshot of green pipeline');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Key Features & Highlights', { underline: true });
doc.fontSize(10).font('Helvetica').text('✓ Complete CRUD implementation for Task entity');
doc.text('✓ Comprehensive test coverage with 4 feature tests');
doc.text('✓ SQLite in-memory testing configuration');
doc.text('✓ Four-stage sequential CI/CD pipeline');
doc.text('✓ Artifact caching for vendor dependencies');
doc.text('✓ Conditional production deployment (main branch only)');
doc.text('✓ Environment-specific deployment strategies');
doc.text('✓ Automated testing before deployment');
doc.moveDown(1);

doc.fontSize(16).font('Helvetica-Bold').text('Conclusion', { underline: true });
doc.fontSize(11).font('Helvetica').text('This implementation demonstrates a production-ready CI/CD pipeline for Laravel applications. The pipeline ensures code quality through automated testing, provides staging environment validation, and implements safe production deployment practices with conditional execution and environment protection.');

doc.end();

stream.on('finish', () => {
    console.log('PDF created successfully: CI-CD_Assignment_Documentation.pdf');
});
