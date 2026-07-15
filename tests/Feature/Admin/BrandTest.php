<?php

use App\Models\Brand;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
});

test('guests cannot access admin brands index', function () {
    $this->get('/admin/brands')->assertRedirect('/login');
});

test('authenticated users can access admin brands index', function () {
    Brand::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get('/admin/brands')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/brands/index')->has('brands', 2));
});

test('authenticated users can store a brand', function () {
    $logo = UploadedFile::fake()->image('logo.png');

    $this->actingAs($this->user)
        ->post('/admin/brands', [
            'name' => 'KODAK PIXPRO',
            'logo' => $logo,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('brands', ['name' => 'KODAK PIXPRO']);
});

test('authenticated users can update a brand', function () {
    $brand = Brand::factory()->create(['name' => 'Old']);

    $this->actingAs($this->user)
        ->patch("/admin/brands/{$brand->id}", ['name' => 'Updated'])
        ->assertRedirect();

    $this->assertDatabaseHas('brands', ['id' => $brand->id, 'name' => 'Updated']);
});

test('authenticated users can delete a brand and its products', function () {
    $brand = Brand::factory()->create(['logo_path' => 'brands/logo.png']);
    Storage::disk('public')->put('brands/logo.png', 'content');

    $product = Product::factory()->for($brand)->create();
    $product->images()->create(['image_path' => 'products/photo.jpg', 'sort_order' => 0]);
    Storage::disk('public')->put('products/photo.jpg', 'content');

    $this->actingAs($this->user)
        ->delete("/admin/brands/{$brand->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('brands', ['id' => $brand->id]);
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
    Storage::disk('public')->assertMissing('brands/logo.png');
    Storage::disk('public')->assertMissing('products/photo.jpg');
});

test('storing a brand requires a name and logo', function () {
    $this->actingAs($this->user)
        ->post('/admin/brands', [])
        ->assertSessionHasErrors(['name', 'logo']);
});

test('authenticated users can reorder brands', function () {
    $first = Brand::factory()->create(['sort_order' => 0]);
    $second = Brand::factory()->create(['sort_order' => 1]);

    $this->actingAs($this->user)
        ->post('/admin/brands/reorder', [
            'items' => [
                ['id' => $first->id, 'sort_order' => 1],
                ['id' => $second->id, 'sort_order' => 0],
            ],
        ])
        ->assertRedirect();

    expect($first->fresh()->sort_order)->toBe(1)
        ->and($second->fresh()->sort_order)->toBe(0);
});
