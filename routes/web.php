<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public marketing routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/products', [PublicController::class, 'products'])->name('products');
Route::get('/services', [PublicController::class, 'services'])->name('services');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::get('/legal/privacy-policy', [PublicController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/legal/terms-conditions', [PublicController::class, 'termsConditions'])->name('terms-conditions');

// Authenticated app routes
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
