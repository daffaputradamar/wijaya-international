<?php

use App\Models\ServiceCard;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot access admin services index', function () {
    $this->get('/admin/services')->assertRedirect('/login');
});

test('authenticated users can access admin services index', function () {
    $this->actingAs($this->user)
        ->get('/admin/services')
        ->assertOk();
});

test('authenticated users can store a service card', function () {
    $this->actingAs($this->user)
        ->post('/admin/services', [
            'key' => 'test-service',
            'icon_key' => 'LuPackage',
            'title_id' => 'Layanan Test',
            'title_en' => 'Test Service',
            'body_id' => 'Deskripsi.',
            'body_en' => 'Description.',
            'sort_order' => 0,
            'is_active' => true,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('service_cards', ['key' => 'test-service']);
});

test('authenticated users can update a service card', function () {
    $card = ServiceCard::factory()->create(['title_en' => 'Old']);

    $this->actingAs($this->user)
        ->patch("/admin/services/{$card->id}", ['title_en' => 'Updated'])
        ->assertRedirect();

    $this->assertDatabaseHas('service_cards', ['id' => $card->id, 'title_en' => 'Updated']);
});

test('authenticated users can delete a service card', function () {
    $card = ServiceCard::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/services/{$card->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('service_cards', ['id' => $card->id]);
});

test('key must be unique when storing service cards', function () {
    ServiceCard::factory()->create(['key' => 'existing']);

    $this->actingAs($this->user)
        ->post('/admin/services', [
            'key' => 'existing',
            'icon_key' => 'LuPackage',
            'title_id' => 'A',
            'title_en' => 'A',
            'body_id' => 'B',
            'body_en' => 'B',
        ])
        ->assertSessionHasErrors(['key']);
});
