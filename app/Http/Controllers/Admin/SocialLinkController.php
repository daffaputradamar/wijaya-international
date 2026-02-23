<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSocialLinkRequest;
use App\Http\Requests\Admin\UpdateSocialLinkRequest;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    public function store(StoreSocialLinkRequest $request): RedirectResponse
    {
        SocialLink::create(array_merge($request->validated(), [
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $request->integer('sort_order', 0),
        ]));

        return back()->with('success', 'Link added.');
    }

    public function update(UpdateSocialLinkRequest $request, SocialLink $socialLink): RedirectResponse
    {
        $socialLink->update(array_merge($request->validated(), [
            'is_active' => $request->boolean('is_active', $socialLink->is_active),
        ]));

        return back()->with('success', 'Link updated.');
    }

    public function destroy(SocialLink $socialLink): RedirectResponse
    {
        $socialLink->delete();

        return back()->with('success', 'Link deleted.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['order' => ['required', 'array']]);

        foreach ($request->order as $index => $id) {
            SocialLink::where('id', $id)->update(['sort_order' => $index]);
        }

        return back()->with('success', 'Reordered.');
    }
}
