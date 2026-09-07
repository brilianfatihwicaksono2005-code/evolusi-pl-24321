<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/pesan-joki', [OrderController::class, 'create'])->name('joki.create');
Route::post('/pesan-joki', [OrderController::class, 'store'])->name('joki.store');
