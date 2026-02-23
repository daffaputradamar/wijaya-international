<?php

use App\Models\SocialLink;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot store social links', function () {
    $this->post('/admin/social-links', [])->assertRedirect('/login');
});

test('authenticated users can store a social link', function () {
    $this->actingAs($this->user)
        ->post('/admin/social-links', [
            'platform' => 'Instagram',
            'url' => 'https://instagram.com/test',
            'type' => 'social',
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('social_links', ['platform' => 'Instagram']);
});

test('authenticated users can update a social link', function () {
    $link = SocialLink::factory()->create(['platform' => 'Old Platform']);

    $this->actingAs($this->user)
        ->put("/admin/social-links/{$link->id}", ['platform' => 'New Platform', 'url' => 'https://example.com', 'type' => 'social'])
        ->assertRedirect();

    $this->assertDatabaseHas('social_links', ['id' => $link->id, 'platform' => 'New Platform']);
});

test('authenticated users can delete a social link', function () {
    $link = SocialLink::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/social-links/{$link->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('social_links', ['id' => $link->id]);
});

test('storing a social link requires platform and url', function () {
    $this->actingAs($this->user)
        ->post('/admin/social-links', [])
        ->assertSessionHasErrors(['platform', 'url', 'type']);
});

test('type must be social or ecommerce', function () {
    $this->actingAs($this->user)
        ->post('/admin/social-links', [
            'platform' => 'Test',
            'url' => 'https://example.com',
            'type' => 'invalid',
        ])
        ->assertSessionHasErrors(['type']);
});
