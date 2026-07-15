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

test('guests cannot access admin products index', function () {
    $this->get('/admin/products')->assertRedirect('/login');
});

test('authenticated users can access admin products index', function () {
    Product::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get('/admin/products')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/products/index')->has('products', 2));
});

test('authenticated users can access product create page', function () {
    $this->actingAs($this->user)
        ->get('/admin/products/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/products/create')->has('brands'));
});

test('authenticated users can access product edit page', function () {
    $product = Product::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/products/{$product->id}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/products/edit')->has('product')->has('brands'));
});

test('authenticated users can store a product with images and specs', function () {
    $brand = Brand::factory()->create();

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'brand_id' => $brand->id,
            'name' => 'KODAK PIXPRO C1',
            'category' => 'DIGITAL CAMERA',
            'images' => [UploadedFile::fake()->image('front.jpg'), UploadedFile::fake()->image('back.jpg')],
            'key_specs' => [
                ['value' => '13MP', 'label' => 'Megapixels'],
            ],
            'specifications' => [
                ['type' => 'header', 'label' => 'LENS', 'value' => ''],
                ['type' => 'row', 'label' => 'Focal Length', 'value' => '3.57 mm'],
            ],
            'colors' => [
                ['name' => 'Tan', 'hex' => '#d2b48c'],
            ],
            'is_highlight' => true,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $product = Product::where('name', 'KODAK PIXPRO C1')->first();

    expect($product)->not->toBeNull()
        ->and($product->images)->toHaveCount(2)
        ->and($product->key_specs)->toHaveCount(1)
        ->and($product->specifications)->toHaveCount(2)
        ->and($product->colors[0]['name'])->toBe('Tan')
        ->and($product->is_highlight)->toBeTrue();
});

test('authenticated users can update a product and remove images', function () {
    $product = Product::factory()->create(['name' => 'Old']);
    $image = $product->images()->create(['image_path' => 'products/old.jpg', 'sort_order' => 0]);
    Storage::disk('public')->put('products/old.jpg', 'content');

    $this->actingAs($this->user)
        ->patch("/admin/products/{$product->id}", [
            'name' => 'Updated',
            'removed_image_ids' => [$image->id],
            'images' => [UploadedFile::fake()->image('new.jpg')],
        ])
        ->assertRedirect();

    $product->refresh();

    expect($product->name)->toBe('Updated')
        ->and($product->images)->toHaveCount(1);
    $this->assertDatabaseMissing('product_images', ['id' => $image->id]);
    Storage::disk('public')->assertMissing('products/old.jpg');
});

test('updating a product with null arrays clears them', function () {
    $product = Product::factory()->create();

    $this->actingAs($this->user)
        ->patch("/admin/products/{$product->id}", [
            'key_specs' => null,
            'specifications' => null,
            'colors' => null,
        ])
        ->assertRedirect();

    $product->refresh();

    expect($product->key_specs)->toBe([])
        ->and($product->specifications)->toBe([])
        ->and($product->colors)->toBe([]);
});

test('authenticated users can delete a product', function () {
    $product = Product::factory()->create();
    $product->images()->create(['image_path' => 'products/photo.jpg', 'sort_order' => 0]);
    Storage::disk('public')->put('products/photo.jpg', 'content');

    $this->actingAs($this->user)
        ->delete("/admin/products/{$product->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
    Storage::disk('public')->assertMissing('products/photo.jpg');
});

test('storing a product requires a brand, name and images', function () {
    $this->actingAs($this->user)
        ->post('/admin/products', [])
        ->assertSessionHasErrors(['brand_id', 'name', 'images']);
});

test('authenticated users can reorder products', function () {
    $first = Product::factory()->create(['sort_order' => 0]);
    $second = Product::factory()->create(['sort_order' => 1]);

    $this->actingAs($this->user)
        ->post('/admin/products/reorder', [
            'items' => [
                ['id' => $first->id, 'sort_order' => 1],
                ['id' => $second->id, 'sort_order' => 0],
            ],
        ])
        ->assertRedirect();

    expect($first->fresh()->sort_order)->toBe(1)
        ->and($second->fresh()->sort_order)->toBe(0);
});
