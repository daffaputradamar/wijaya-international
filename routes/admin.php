<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ContactInfoController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceCardController;
use App\Http\Controllers\Admin\SocialLinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('brands', BrandController::class)->except(['show', 'create', 'edit']);
    Route::post('brands/reorder', [BrandController::class, 'reorder'])->name('brands.reorder');

    Route::resource('projects', ProjectController::class)->except(['show', 'create', 'edit']);
    Route::post('projects/reorder', [ProjectController::class, 'reorder'])->name('projects.reorder');

    Route::resource('products', ProductCategoryController::class)->except(['show', 'create', 'edit']);
    Route::post('products/reorder', [ProductCategoryController::class, 'reorder'])->name('products.reorder');

    Route::resource('services', ServiceCardController::class)->except(['show', 'create', 'edit']);
    Route::post('services/reorder', [ServiceCardController::class, 'reorder'])->name('services.reorder');

    Route::get('contact', [ContactInfoController::class, 'index'])->name('contact.index');
    Route::put('contact', [ContactInfoController::class, 'update'])->name('contact.update');

    Route::resource('social-links', SocialLinkController::class)->only(['store', 'update', 'destroy']);
    Route::post('social-links/reorder', [SocialLinkController::class, 'reorder'])->name('social-links.reorder');

    Route::resource('inquiries', InquiryController::class)->only(['index', 'show', 'destroy']);
    Route::post('inquiries/{inquiry}/mark-read', [InquiryController::class, 'markRead'])->name('inquiries.mark-read');
});
