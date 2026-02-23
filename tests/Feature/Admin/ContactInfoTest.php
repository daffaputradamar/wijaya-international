<?php

use App\Models\ContactInfo;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot access admin contact index', function () {
    $this->get('/admin/contact')->assertRedirect('/login');
});

test('authenticated users can access admin contact index', function () {
    $this->actingAs($this->user)
        ->get('/admin/contact')
        ->assertOk();
});

test('authenticated users can update contact info', function () {
    $this->actingAs($this->user)
        ->put('/admin/contact', [
            'phone' => '+62 21 9999 8888',
            'whatsapp' => '+62 812 9999 8888',
            'email' => 'hello@example.com',
            'address' => 'Jakarta Selatan',
            'maps_embed_url' => null,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('contact_info', ['phone' => '+62 21 9999 8888']);
});

test('updating contact info creates row if none exists', function () {
    ContactInfo::truncate();

    $this->actingAs($this->user)
        ->put('/admin/contact', ['email' => 'new@example.com'])
        ->assertRedirect();

    $this->assertDatabaseHas('contact_info', ['email' => 'new@example.com']);
    expect(ContactInfo::count())->toBe(1);
});

test('email must be valid when provided', function () {
    $this->actingAs($this->user)
        ->put('/admin/contact', ['email' => 'not-an-email'])
        ->assertSessionHasErrors(['email']);
});
