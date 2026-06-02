<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDealerRequest;
use App\Http\Requests\Admin\UpdateDealerRequest;
use App\Models\Dealer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DealerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dealers/index', [
            'dealers' => Dealer::ordered()->get()->map(fn (Dealer $dealer) => [
                'id' => $dealer->id,
                'name' => $dealer->name,
                'category' => $dealer->category,
                'lat' => $dealer->lat,
                'lng' => $dealer->lng,
                'address' => $dealer->address,
                'features' => $dealer->features ?? [],
                'is_open' => $dealer->is_open,
                'sort_order' => $dealer->sort_order,
            ]),
        ]);
    }

    public function store(StoreDealerRequest $request): RedirectResponse
    {
        Dealer::create([
            'name' => $request->name,
            'category' => $request->category ?? 'retail',
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'features' => $this->parseFeatures($request->input('features')),
            'is_open' => $request->boolean('is_open', true),
            'sort_order' => $request->sort_order ?? (Dealer::max('sort_order') + 1),
        ]);

        return back();
    }

    public function update(UpdateDealerRequest $request, Dealer $dealer): RedirectResponse
    {
        $dealer->update([
            'name' => $request->name,
            'category' => $request->category ?? 'retail',
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'features' => $this->parseFeatures($request->input('features')),
            'is_open' => $request->boolean('is_open'),
            'sort_order' => $request->sort_order ?? $dealer->sort_order,
        ]);

        return back();
    }

    public function destroy(Dealer $dealer): RedirectResponse
    {
        $dealer->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'integer'],
            'items.*.sort_order' => ['required', 'integer'],
        ]);

        foreach ($request->items as $item) {
            Dealer::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }

    /**
     * @return array<int, string>
     */
    private function parseFeatures(mixed $features): array
    {
        if (is_array($features)) {
            return collect($features)
                ->map(fn ($feature) => trim((string) $feature))
                ->filter()
                ->values()
                ->all();
        }

        if (! is_string($features)) {
            return [];
        }

        return collect(preg_split('/[\r\n,]+/', $features) ?: [])
            ->map(fn (string $feature) => trim($feature))
            ->filter()
            ->values()
            ->all();
    }
}
