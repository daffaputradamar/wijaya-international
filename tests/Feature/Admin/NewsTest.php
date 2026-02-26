<?php

use App\Models\News;
use App\Models\NewsCategory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
});

test('guests cannot access admin news index', function () {
    $this->get('/admin/news')->assertRedirect('/login');
});

test('authenticated users can access admin news index', function () {
    $this->actingAs($this->user)
        ->get('/admin/news')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news/index'));
});

test('authenticated users can access news create page', function () {
    $this->actingAs($this->user)
        ->get('/admin/news/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news/create')->has('categories'));
});

test('authenticated users can access news edit page', function () {
    $news = News::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/news/{$news->id}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/news/edit')->has('news')->has('categories'));
});

test('authenticated users can store a news article', function () {
    $category = NewsCategory::factory()->create();
    $image = UploadedFile::fake()->image('article.jpg');

    $this->actingAs($this->user)
        ->post('/admin/news', [
            'title_id' => 'Artikel Berita',
            'title_en' => 'News Article',
            'body_id' => '<p>Isi konten.</p>',
            'body_en' => '<p>Article body.</p>',
            'slug' => 'news-article',
            'image' => $image,
            'news_category_id' => $category->id,
            'published_at' => now()->format('Y-m-d\TH:i'),
            'is_active' => true,
            'sort_order' => 0,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('news', ['slug' => 'news-article', 'title_en' => 'News Article']);
});

test('image is stored when creating news', function () {
    $image = UploadedFile::fake()->image('article.jpg');

    $this->actingAs($this->user)
        ->post('/admin/news', [
            'title_id' => 'Artikel',
            'title_en' => 'Article',
            'slug' => 'article',
            'image' => $image,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $news = News::where('slug', 'article')->first();
    expect($news)->not->toBeNull();
    Storage::disk('public')->assertExists($news->image_path);
});

test('authenticated users can update a news article', function () {
    $news = News::factory()->create(['title_en' => 'Old Title']);

    $this->actingAs($this->user)
        ->patch("/admin/news/{$news->id}", ['title_en' => 'Updated Title'])
        ->assertRedirect();

    $this->assertDatabaseHas('news', ['id' => $news->id, 'title_en' => 'Updated Title']);
});

test('authenticated users can delete a news article', function () {
    $news = News::factory()->create(['image_path' => 'news/test.jpg']);
    Storage::disk('public')->put('news/test.jpg', 'content');

    $this->actingAs($this->user)
        ->delete("/admin/news/{$news->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('news', ['id' => $news->id]);
    Storage::disk('public')->assertMissing('news/test.jpg');
});

test('storing news requires title_id, title_en, and image', function () {
    $this->actingAs($this->user)
        ->post('/admin/news', [])
        ->assertSessionHasErrors(['title_id', 'title_en', 'image']);
});

test('news article can be assigned to a category', function () {
    $category = NewsCategory::factory()->create();
    $image = UploadedFile::fake()->image('article.jpg');

    $this->actingAs($this->user)
        ->post('/admin/news', [
            'title_id' => 'Artikel Berkatagori',
            'title_en' => 'Categorized Article',
            'slug' => 'categorized-article',
            'image' => $image,
            'news_category_id' => $category->id,
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('news', ['slug' => 'categorized-article', 'news_category_id' => $category->id]);
});
