<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateContactInfoRequest;
use App\Models\ContactInfo;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactInfoController extends Controller
{
    public function index(): Response
    {
        $contactInfo = ContactInfo::first();

        $socialLinks = SocialLink::ordered()->get()->map(fn (SocialLink $s) => [
            'id' => $s->id,
            'platform' => $s->platform,
            'url' => $s->url,
            'type' => $s->type,
            'sort_order' => $s->sort_order,
            'is_active' => $s->is_active,
        ]);

        return Inertia::render('admin/contact/index', [
            'contactInfo' => $contactInfo,
            'socialLinks' => $socialLinks,
        ]);
    }

    public function update(UpdateContactInfoRequest $request): RedirectResponse
    {
        ContactInfo::firstOrCreate([])->update($request->validated());

        return back()->with('success', 'Contact info updated.');
    }
}
