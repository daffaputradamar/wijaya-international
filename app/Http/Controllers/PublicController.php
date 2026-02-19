<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('home');
    }

    public function products(): Response
    {
        return Inertia::render('products', [
            'products' => $this->getProducts(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('services', [
            'services' => $this->getServices(),
        ]);
    }

    private function getProducts(): array
    {
        return [
            [
                'id' => 1,
                'key' => 'consumer_electronics',
                'title' => 'Consumer Electronics',
                'description' => 'products.consumer_electronics_desc',
                'image' => '/images/wijaya/consumer-electronics.jpg',
            ],
            [
                'id' => 2,
                'key' => 'accessories',
                'title' => 'Accessories',
                'description' => 'products.accessories_desc',
                'image' => '/images/wijaya/about.avif',
            ],
            [
                'id' => 3,
                'key' => 'home_appliances',
                'title' => 'Home Appliances',
                'description' => 'products.home_appliances_desc',
                'image' => '/images/wijaya/hero-bg.jpg',
            ],
        ];
    }

    private function getServices(): array
    {
        return [
            [
                'id' => 1,
                'key' => 'distribution',
                'title' => 'Distribution Network',
                'description' => 'services.distribution_desc',
                'image' => '/images/wijaya/road-landscape.jpg',
            ],
            [
                'id' => 2,
                'key' => 'logistics',
                'title' => 'Logistics Solutions',
                'description' => 'services.logistics_desc',
                'image' => '/images/wijaya/wijayalocations.avif',
            ],
            [
                'id' => 3,
                'key' => 'after_sales',
                'title' => 'After Sales Support',
                'description' => 'services.after_sales_desc',
                'image' => '/images/wijaya/logobw.avif',
            ],
        ];
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('legal/privacy-policy');
    }

    public function termsConditions(): Response
    {
        return Inertia::render('legal/terms-conditions');
    }
}
