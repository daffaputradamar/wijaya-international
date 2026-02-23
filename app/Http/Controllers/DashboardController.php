<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\ContactSubmission;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\ServiceCard;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'brands' => Brand::count(),
            'projects' => Project::count(),
            'productCategories' => ProductCategory::count(),
            'serviceCards' => ServiceCard::count(),
            'inquiries' => ContactSubmission::count(),
            'unreadInquiries' => ContactSubmission::unread()->count(),
        ];

        $recentInquiries = ContactSubmission::latest()
            ->take(10)
            ->get()
            ->map(fn (ContactSubmission $s) => [
                'id' => $s->id,
                'name' => $s->name,
                'email' => $s->email,
                'message' => $s->message,
                'is_read' => $s->is_read,
                'created_at' => $s->created_at->diffForHumans(),
            ]);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentInquiries' => $recentInquiries,
        ]);
    }
}
