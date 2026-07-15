<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBrandRequest;
use App\Http\Requests\Admin\UpdateBrandRequest;
use App\Models\Brand;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/brands/index', [
            'brands' => Brand::ordered()->withCount('products')->get()->map(fn (Brand $brand) => [
                'id' => $brand->id,
                'name' => $brand->name,
                'logo_url' => $brand->logo_url,
                'sort_order' => $brand->sort_order,
                'is_active' => $brand->is_active,
                'products_count' => $brand->products_count,
            ]),
        ]);
    }

    public function store(StoreBrandRequest $request): RedirectResponse
    {
        $logoPath = $request->file('logo')->store('brands', 'public');

        Brand::create([
            'name' => $request->name,
            'logo_path' => $logoPath,
            'sort_order' => $request->sort_order ?? Brand::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.brands.index');
    }

    public function update(UpdateBrandRequest $request, Brand $brand): RedirectResponse
    {
        $data = [
            'name' => $request->name ?? $brand->name,
            'sort_order' => $request->sort_order ?? $brand->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $brand->is_active,
        ];

        if ($request->hasFile('logo')) {
            if (! str_starts_with($brand->logo_path, '/')) {
                Storage::disk('public')->delete($brand->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('brands', 'public');
        }

        $brand->update($data);

        return redirect()->route('admin.brands.index');
    }

    public function destroy(Brand $brand): RedirectResponse
    {
        foreach ($brand->products()->with('images')->get() as $product) {
            foreach ($product->images as $image) {
                if (! str_starts_with($image->image_path, '/')) {
                    Storage::disk('public')->delete($image->image_path);
                }
            }
        }

        if (! str_starts_with($brand->logo_path, '/')) {
            Storage::disk('public')->delete($brand->logo_path);
        }

        $brand->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);

        foreach ($request->items as $item) {
            Brand::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }
}
