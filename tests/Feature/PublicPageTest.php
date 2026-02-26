<?php

test('home page returns 200', function () {
    $response = $this->get(route('home'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('home'));
});

test('products page returns 200', function () {
    $response = $this->get(route('products'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('products'));
});

test('projects page returns 200', function () {
    $response = $this->get(route('projects'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('projects')->has('projects'));
});

test('services page returns 200', function () {
    $response = $this->get(route('services'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('services'));
});

test('contact page returns 200', function () {
    $response = $this->get(route('contact'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('contact'));
});

test('privacy policy page returns 200', function () {
    $response = $this->get(route('privacy-policy'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('legal/privacy-policy'));
});

test('terms and conditions page returns 200', function () {
    $response = $this->get(route('terms-conditions'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('legal/terms-conditions'));
});

test('public pages are accessible without authentication', function (string $routeName) {
    $response = $this->get(route($routeName));
    $response->assertOk();
})->with(['home', 'products', 'projects', 'services', 'contact', 'privacy-policy', 'terms-conditions']);

test('project detail page returns 200 for an active project', function () {
    $project = \App\Models\Project::factory()->create(['is_active' => true]);

    $this->get(route('projects.show', $project))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('projects/show')
            ->has('project', fn ($prop) => $prop
                ->where('id', $project->id)
                ->where('name', $project->name)
                ->has('description')
                ->has('image_url')
            )
        );
});

test('project detail page returns 404 for an inactive project', function () {
    $project = \App\Models\Project::factory()->inactive()->create();

    $this->get(route('projects.show', $project))->assertNotFound();
});

test('news listing page returns 200', function () {
    $this->get(route('news'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('news')
            ->has('news')
            ->has('categories')
        );
});

test('news listing page filters by category slug', function () {
    $category = \App\Models\NewsCategory::factory()->create(['is_active' => true]);
    $published = \App\Models\News::factory()->create([
        'news_category_id' => $category->id,
        'is_active' => true,
        'published_at' => now()->subDay(),
    ]);
    $other = \App\Models\News::factory()->create([
        'news_category_id' => null,
        'is_active' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->get(route('news', ['category' => $category->slug]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('news')
            ->has('news', fn ($prop) => $prop
                ->has('data', 1)
                ->etc()
            )
        );
});

test('news detail page returns 200 for a published active article', function () {
    $news = \App\Models\News::factory()->create([
        'is_active' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->get(route('news.show', $news))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('news/show')
            ->has('news', fn ($prop) => $prop
                ->where('id', $news->id)
                ->has('title_en')
                ->has('image_url')
                ->etc()
            )
        );
});

test('news detail page returns 404 for an inactive article', function () {
    $news = \App\Models\News::factory()->create([
        'is_active' => false,
        'published_at' => now()->subDay(),
    ]);

    $this->get(route('news.show', $news))->assertNotFound();
});

test('news detail page returns 404 for an unpublished article', function () {
    $news = \App\Models\News::factory()->create([
        'is_active' => true,
        'published_at' => null,
    ]);

    $this->get(route('news.show', $news))->assertNotFound();
});
