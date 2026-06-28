<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

// Public marketing routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/profile', [PublicController::class, 'profile'])->name('profile');
Route::get('/products', [PublicController::class, 'products'])->name('products');
Route::get('/projects', [PublicController::class, 'projects'])->name('projects');
Route::get('/projects/{project}', [PublicController::class, 'showProject'])->name('projects.show');
Route::get('/services', [PublicController::class, 'services'])->name('services');
Route::get('/services/brand-management', [PublicController::class, 'brandManagement'])->name('services.brand-management');
Route::get('/services/imaging-solution', [PublicController::class, 'imagingSolution'])->name('services.imaging-solution');
Route::get('/services/camera-support', [PublicController::class, 'cameraSupport'])->name('services.camera-support');
Route::get('/services/technical-service-repair', [PublicController::class, 'technicalServiceRepair'])->name('services.technical-service-repair');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::get('/legal/privacy-policy', [PublicController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/legal/terms-conditions', [PublicController::class, 'termsConditions'])->name('terms-conditions');

Route::get('/news', [PublicController::class, 'news'])->name('news');
Route::get('/news/{news:slug}', [PublicController::class, 'showNews'])->name('news.show');

Route::post('/contact/submit', [PublicController::class, 'submitContact'])->name('contact.submit');

// Authenticated app routes
Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
