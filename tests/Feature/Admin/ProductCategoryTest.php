<?php

use App\Models\ProductCategory;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot access admin products index', function () {
    $this->get('/admin/products')->assertRedirect('/login');
});

test('authenticated users can access admin products index', function () {
    $this->actingAs($this->user)
        ->get('/admin/products')
        ->assertOk();
});

test('authenticated users can store a product category', function () {
    $this->actingAs($this->user)
        ->post('/admin/products', [
            'key' => 'test-category',
            'title_id' => 'Kategori Test',
            'title_en' => 'Test Category',
            'body_id' => 'Deskripsi singkat.',
            'body_en' => 'Short description.',
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('product_categories', ['key' => 'test-category']);
});

test('authenticated users can update a product category', function () {
    $category = ProductCategory::factory()->create(['title_en' => 'Old Title']);

    $this->actingAs($this->user)
        ->patch("/admin/products/{$category->id}", ['title_en' => 'New Title'])
        ->assertRedirect();

    $this->assertDatabaseHas('product_categories', ['id' => $category->id, 'title_en' => 'New Title']);
});

test('authenticated users can delete a product category', function () {
    $category = ProductCategory::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/products/{$category->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('product_categories', ['id' => $category->id]);
});

test('key must be unique when storing', function () {
    ProductCategory::factory()->create(['key' => 'existing-key']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'key' => 'existing-key',
            'title_id' => 'A',
            'title_en' => 'A',
            'body_id' => 'B',
            'body_en' => 'B',
        ])
        ->assertSessionHasErrors(['key']);
});
