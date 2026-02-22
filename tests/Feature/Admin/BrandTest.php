<?php

use App\Models\Brand;
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
    $this->actingAs($this->user)
        ->get('/admin/brands')
        ->assertOk();
});

test('authenticated users can store a brand', function () {
    $logo = UploadedFile::fake()->image('logo.png');

    $this->actingAs($this->user)
        ->post('/admin/brands', [
            'name' => 'Test Brand',
            'logo' => $logo,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('brands', ['name' => 'Test Brand']);

    $brand = Brand::where('name', 'Test Brand')->first();
    Storage::disk('public')->assertExists($brand->logo_path);
});

test('authenticated users can update a brand name', function () {
    $brand = Brand::factory()->create(['name' => 'Old Name']);

    $this->actingAs($this->user)
        ->patch("/admin/brands/{$brand->id}", ['name' => 'New Name'])
        ->assertRedirect();

    $this->assertDatabaseHas('brands', ['id' => $brand->id, 'name' => 'New Name']);
});

test('authenticated users can delete a brand', function () {
    $brand = Brand::factory()->create(['logo_path' => 'brands/test.png']);
    Storage::disk('public')->put('brands/test.png', 'content');

    $this->actingAs($this->user)
        ->delete("/admin/brands/{$brand->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('brands', ['id' => $brand->id]);
    Storage::disk('public')->assertMissing('brands/test.png');
});

test('storing a brand requires a name and logo', function () {
    $this->actingAs($this->user)
        ->post('/admin/brands', [])
        ->assertSessionHasErrors(['name', 'logo']);
});
