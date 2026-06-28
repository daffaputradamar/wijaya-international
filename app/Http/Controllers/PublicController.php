<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Models\ContactSubmission;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\Project;
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
            'projects' => Project::active()->ordered()->get()->map(fn (Project $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'image_url' => $p->image_url,
            ]),
            'dealers' => \App\Models\Dealer::active()->ordered()->get()->map(fn (\App\Models\Dealer $d) => [
                'id' => $d->id,
                'name' => $d->name,
                'category' => $d->category,
                'lat' => $d->lat,
                'lng' => $d->lng,
                'address' => $d->address,
                'contact_number' => $d->contact_number,
                'is_open' => $d->is_open,
            ]),
            'latestNews' => News::active()->published()->with('category')
                ->latest('published_at')->limit(4)->get()->map(fn (News $n) => [
                    'id' => $n->id,
                    'title_id' => $n->title_id,
                    'title_en' => $n->title_en,
                    'slug' => $n->slug,
                    'image_url' => $n->image_url,
                    'published_at' => $n->published_at?->toDateString(),
                    'category' => $n->category ? ['name_id' => $n->category->name_id, 'name_en' => $n->category->name_en, 'slug' => $n->category->slug] : null,
                ]),
        ]);
    }

    public function profile(): Response
    {
        return Inertia::render('profile');
    }

    public function products(): Response
    {
        return Inertia::render('products', [
            'products' => $this->getProducts(),
        ]);
    }

    public function projects(): Response
    {
        $projects = Project::active()->ordered()->get()->map(fn (Project $p) => [
            'id' => $p->id,
            'name' => $p->name,
            'description' => $p->description,
            'image_url' => $p->image_url,
        ])->all();

        return Inertia::render('projects', [
            'projects' => $projects,
        ]);
    }

    public function showProject(Project $project): Response
    {
        abort_unless($project->is_active, 404);

        return Inertia::render('projects/show', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'image_url' => $project->image_url,
            ],
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('services', [
            'services' => $this->getServices(),
        ]);
    }

    public function brandManagement(): Response
    {
        return Inertia::render('services/brand-management');
    }

    public function imagingSolution(): Response
    {
        return Inertia::render('services/imaging-solution');
    }

    public function cameraSupport(): Response
    {
        return Inertia::render('services/camera-support');
    }

    public function technicalServiceRepair(): Response
    {
        return Inertia::render('services/technical-service-repair');
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
                'key' => 'brand',
                'title' => 'services.brand.label',
                'description' => 'services.brand.p1',
                'image' => '/images/wijaya/brand-management.png',
            ],
            [
                'id' => 2,
                'key' => 'imaging',
                'title' => 'services.imaging.label',
                'description' => 'services.imaging.p1',
                'image' => '/images/wijaya/imaging-solution.png',
            ],
            [
                'id' => 3,
                'key' => 'camera',
                'title' => 'services.camera.label',
                'description' => 'services.camera.p1',
                'image' => '/images/wijaya/camera-support.png',
            ],
            [
                'id' => 4,
                'key' => 'technical',
                'title' => 'services.technical.label',
                'description' => 'services.technical.p1',
                'image' => '/images/wijaya/technical-service.png',
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

    public function news(Request $request): Response
    {
        $sort = $request->query('sort', 'latest');
        $categorySlug = $request->query('category');

        $query = News::active()->published()->with('category');

        if ($categorySlug) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
        }

        if ($sort === 'oldest') {
            $query->oldest('published_at');
        } else {
            $query->latest('published_at');
        }

        $newsPaginated = $query->paginate(12)->through(fn (News $n) => [
            'id' => $n->id,
            'title_id' => $n->title_id,
            'title_en' => $n->title_en,
            'slug' => $n->slug,
            'image_url' => $n->image_url,
            'published_at' => $n->published_at?->toDateString(),
            'category' => $n->category ? ['name_id' => $n->category->name_id, 'name_en' => $n->category->name_en, 'slug' => $n->category->slug] : null,
        ]);

        return Inertia::render('news', [
            'news' => $newsPaginated,
            'categories' => NewsCategory::active()->ordered()->get()->map(fn (NewsCategory $c) => [
                'name_id' => $c->name_id,
                'name_en' => $c->name_en,
                'slug' => $c->slug,
            ]),
            'filters' => ['sort' => $sort, 'category' => $categorySlug],
        ]);
    }

    public function showNews(News $news): Response
    {
        abort_unless($news->is_active && $news->published_at?->lte(now()), 404);

        $news->load('category');

        return Inertia::render('news/show', [
            'news' => [
                'id' => $news->id,
                'title_id' => $news->title_id,
                'title_en' => $news->title_en,
                'body_id' => $news->body_id,
                'body_en' => $news->body_en,
                'slug' => $news->slug,
                'image_url' => $news->image_url,
                'published_at' => $news->published_at?->toDateString(),
                'category' => $news->category ? ['name_id' => $news->category->name_id, 'name_en' => $news->category->name_en, 'slug' => $news->category->slug] : null,
            ],
        ]);
    }
}
