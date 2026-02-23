<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\ContactInfo;
use App\Models\ContactSubmission;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\ServiceCard;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('home', [
            'brands' => Brand::active()->ordered()->get()->map(fn (Brand $b) => [
                'id' => $b->id,
                'name' => $b->name,
                'logo_url' => $b->logo_url,
            ]),
            'projects' => Project::active()->ordered()->get()->map(fn (Project $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'image_url' => $p->image_url,
            ]),
            'productCategories' => ProductCategory::active()->ordered()->get()->map(fn (ProductCategory $c) => [
                'id' => $c->id,
                'key' => $c->key,
                'title_id' => $c->title_id,
                'title_en' => $c->title_en,
                'body_id' => $c->body_id,
                'body_en' => $c->body_en,
                'image_url' => $c->image_url,
                'video_url' => $c->video_url,
            ]),
            'serviceCards' => ServiceCard::active()->ordered()->get()->map(fn (ServiceCard $s) => [
                'id' => $s->id,
                'key' => $s->key,
                'icon_key' => $s->icon_key,
                'title_id' => $s->title_id,
                'title_en' => $s->title_en,
                'body_id' => $s->body_id,
                'body_en' => $s->body_en,
            ]),
        ]);
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
        $contactInfo = ContactInfo::first();

        $socialLinks = SocialLink::active()->ordered()->get()->map(fn (SocialLink $s) => [
            'platform' => $s->platform,
            'url' => $s->url,
            'type' => $s->type,
        ])->groupBy('type');

        return Inertia::render('contact', [
            'contactInfo' => $contactInfo,
            'socialLinks' => [
                'social' => $socialLinks->get('social', collect())->values(),
                'ecommerce' => $socialLinks->get('ecommerce', collect())->values(),
            ],
        ]);
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactSubmission::create($validated);

        return redirect()->back()->with('success', 'Your inquiry has been submitted. We will get back to you soon.');
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
