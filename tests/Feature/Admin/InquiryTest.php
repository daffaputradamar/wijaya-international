<?php

use App\Models\ContactSubmission;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot view inquiries', function () {
    $this->get('/admin/inquiries')->assertRedirect('/login');
});

test('authenticated users can view inquiries index', function () {
    ContactSubmission::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get('/admin/inquiries')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/inquiries/index')
            ->has('inquiries.data', 3)
            ->has('unreadCount')
            ->has('filters.from')
            ->has('filters.to')
        );
});

test('date filter excludes out-of-range inquiries', function () {
    ContactSubmission::factory()->create(['created_at' => now()]);
    ContactSubmission::factory()->create(['created_at' => now()->subYear()]);

    $from = now()->startOfMonth()->toDateString();
    $to = now()->endOfMonth()->toDateString();

    $this->actingAs($this->user)
        ->get("/admin/inquiries?from={$from}&to={$to}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/inquiries/index')
            ->has('inquiries.data', 1)
        );
});

test('date filter can be applied via query parameters', function () {
    $pastDate = now()->subYear()->toDateString();
    ContactSubmission::factory()->create(['created_at' => now()->subYear()]);

    $this->actingAs($this->user)
        ->get("/admin/inquiries?from={$pastDate}&to={$pastDate}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/inquiries/index')
            ->has('inquiries.data', 1)
        );
});

test('authenticated users can view a single inquiry', function () {
    $inquiry = ContactSubmission::factory()->create(['is_read' => false]);

    $this->actingAs($this->user)
        ->get("/admin/inquiries/{$inquiry->id}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/inquiries/show'));

    $this->assertDatabaseHas('contact_submissions', ['id' => $inquiry->id, 'is_read' => true]);
});

test('viewing an inquiry marks it as read', function () {
    $inquiry = ContactSubmission::factory()->create(['is_read' => false]);

    $this->actingAs($this->user)->get("/admin/inquiries/{$inquiry->id}");

    expect($inquiry->fresh()->is_read)->toBeTrue();
});

test('authenticated users can delete an inquiry', function () {
    $inquiry = ContactSubmission::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/inquiries/{$inquiry->id}")
        ->assertRedirect('/admin/inquiries');

    $this->assertDatabaseMissing('contact_submissions', ['id' => $inquiry->id]);
});

test('authenticated users can mark an inquiry as read', function () {
    $inquiry = ContactSubmission::factory()->create(['is_read' => false]);

    $this->actingAs($this->user)
        ->post("/admin/inquiries/{$inquiry->id}/mark-read")
        ->assertRedirect();

    $this->assertDatabaseHas('contact_submissions', ['id' => $inquiry->id, 'is_read' => true]);
});

test('guests cannot submit contact form', function () {
    $this->post('/contact/submit', [
        'name' => 'Test',
        'email' => 'test@example.com',
        'message' => 'Hello',
    ])->assertStatus(302);
});

test('anyone can submit contact form', function () {
    $this->post('/contact/submit', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'I need help with a product.',
    ])->assertRedirect();

    $this->assertDatabaseHas('contact_submissions', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);
});

test('contact form requires all fields', function () {
    $this->post('/contact/submit', [])
        ->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact form validates email format', function () {
    $this->post('/contact/submit', [
        'name' => 'Test',
        'email' => 'not-an-email',
        'message' => 'Hello',
    ])->assertSessionHasErrors(['email']);
});
