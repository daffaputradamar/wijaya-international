<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceCardRequest;
use App\Http\Requests\Admin\UpdateServiceCardRequest;
use App\Models\ServiceCard;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'cards' => ServiceCard::ordered()->get()->map(fn (ServiceCard $card) => [
                'id' => $card->id,
                'key' => $card->key,
                'icon_key' => $card->icon_key,
                'title_id' => $card->title_id,
                'title_en' => $card->title_en,
                'body_id' => $card->body_id,
                'body_en' => $card->body_en,
                'sort_order' => $card->sort_order,
                'is_active' => $card->is_active,
            ]),
        ]);
    }

    public function store(StoreServiceCardRequest $request): RedirectResponse
    {
        ServiceCard::create([
            'key' => $request->key,
            'icon_key' => $request->icon_key,
            'title_id' => $request->title_id,
            'title_en' => $request->title_en,
            'body_id' => $request->body_id,
            'body_en' => $request->body_en,
            'sort_order' => $request->sort_order ?? ServiceCard::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back();
    }

    public function update(UpdateServiceCardRequest $request, ServiceCard $service): RedirectResponse
    {
        $service->update([
            'key' => $request->key ?? $service->key,
            'icon_key' => $request->icon_key ?? $service->icon_key,
            'title_id' => $request->title_id ?? $service->title_id,
            'title_en' => $request->title_en ?? $service->title_en,
            'body_id' => $request->body_id ?? $service->body_id,
            'body_en' => $request->body_en ?? $service->body_en,
            'sort_order' => $request->sort_order ?? $service->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $service->is_active,
        ]);

        return back();
    }

    public function destroy(ServiceCard $service): RedirectResponse
    {
        $service->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);

        foreach ($request->items as $item) {
            ServiceCard::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }
}
