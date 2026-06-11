<?php

use App\Models\Dealer;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('guests cannot access admin dealers index', function () {
    $this->get('/admin/dealers')->assertRedirect('/login');
});

test('authenticated users can access admin dealers index', function () {
    $this->actingAs($this->user)
        ->get('/admin/dealers')
        ->assertOk();
});

test('authenticated users can store a dealer', function () {
    $this->actingAs($this->user)
        ->post('/admin/dealers', [
            'name' => 'Adhi Dealer',
            'category' => 'retail',
            'address' => 'Jl. Kebon Jeruk No 15, Jakarta',
            'contact_number' => '+62 812 3456 7890',
            'lat' => -6.1754,
            'lng' => 106.8272,
            'is_open' => true,
            'sort_order' => 1,
        ])
        ->assertRedirect();

    $dealer = Dealer::where('name', 'Adhi Dealer')->firstOrFail();

    expect($dealer->contact_number)->toBe('+62 812 3456 7890');
});

test('authenticated users can update a dealer', function () {
    $dealer = Dealer::create([
        'name' => 'Old Name',
        'category' => 'retail',
        'address' => 'Old Address',
        'contact_number' => '+62 812 3456 7890',
        'lat' => 1.23,
        'lng' => 4.56,
        'is_open' => true,
        'sort_order' => 1,
    ]);

    $this->actingAs($this->user)
        ->patch("/admin/dealers/{$dealer->id}", [
            'name' => 'New Name',
            'category' => 'service',
            'address' => 'New Address',
            'contact_number' => '+62 812 0000 1111',
            'lat' => -7.4478,
            'lng' => 112.7183,
            'is_open' => false,
            'sort_order' => 2,
        ])
        ->assertRedirect();

    $dealer->refresh();

    expect($dealer->name)->toBe('New Name')
        ->and($dealer->category)->toBe('service')
        ->and($dealer->address)->toBe('New Address')
        ->and($dealer->contact_number)->toBe('+62 812 0000 1111')
        ->and($dealer->lat)->toBe(-7.4478)
        ->and($dealer->lng)->toBe(112.7183)
        ->and($dealer->is_open)->toBeFalse()
        ->and($dealer->sort_order)->toBe(2);
});

test('authenticated users can delete a dealer', function () {
    $dealer = Dealer::create([
        'name' => 'To Delete',
        'category' => 'retail',
        'address' => 'Old Address',
        'contact_number' => '+62 812 3456 7890',
        'lat' => 1.23,
        'lng' => 4.56,
        'is_open' => true,
        'sort_order' => 1,
    ]);

    $this->actingAs($this->user)
        ->delete("/admin/dealers/{$dealer->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('dealers', ['id' => $dealer->id]);
});

test('storing a dealer requires a name, lat, and lng', function () {
    $this->actingAs($this->user)
        ->post('/admin/dealers', [])
        ->assertSessionHasErrors(['name', 'lat', 'lng']);
});
