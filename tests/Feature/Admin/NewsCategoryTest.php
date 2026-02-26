<?php

use App\Models\NewsCategory;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot access admin news categories index', function () {
    $this->get('/admin/news-categories')->assertRedirect('/login');
});

test('authenticated users can access admin news categories index', function () {
    $this->actingAs($this->user)
        ->get('/admin/news-categories')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news-categories/index'));
});

test('authenticated users can access news category create page', function () {
    $this->actingAs($this->user)
        ->get('/admin/news-categories/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news-categories/create'));
});

test('authenticated users can access news category edit page', function () {
    $category = NewsCategory::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/news-categories/{$category->id}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news-categories/edit')->has('category'));
});

test('authenticated users can store a news category', function () {
    $this->actingAs($this->user)
        ->post('/admin/news-categories', [
            'name_id' => 'Berita Perusahaan',
            'name_en' => 'Company News',
            'slug' => 'company-news',
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('news_categories', ['slug' => 'company-news']);
});

test('authenticated users can update a news category', function () {
    $category = NewsCategory::factory()->create(['name_en' => 'Old Name']);

    $this->actingAs($this->user)
        ->patch("/admin/news-categories/{$category->id}", ['name_en' => 'Updated Name'])
        ->assertRedirect();

    $this->assertDatabaseHas('news_categories', ['id' => $category->id, 'name_en' => 'Updated Name']);
});

test('authenticated users can delete a news category', function () {
    $category = NewsCategory::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/news-categories/{$category->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('news_categories', ['id' => $category->id]);
});

test('storing a news category requires name_id and name_en', function () {
    $this->actingAs($this->user)
        ->post('/admin/news-categories', [])
        ->assertSessionHasErrors(['name_id', 'name_en']);
});

test('slug must be unique when storing a news category', function () {
    NewsCategory::factory()->create(['slug' => 'existing-slug']);

    $this->actingAs($this->user)
        ->post('/admin/news-categories', [
            'name_id' => 'Test',
            'name_en' => 'Test',
            'slug' => 'existing-slug',
        ])
        ->assertSessionHasErrors(['slug']);
});
