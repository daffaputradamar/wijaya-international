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
})->with(['home', 'products', 'services', 'contact', 'privacy-policy', 'terms-conditions']);
