<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::with(['brand', 'images'])->ordered()->get()->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'brand' => $product->brand ? ['id' => $product->brand->id, 'name' => $product->brand->name] : null,
                'image_url' => $product->images->first()?->image_url,
                'colors' => $product->colors ?? [],
                'is_highlight' => $product->is_highlight,
                'sort_order' => $product->sort_order,
                'is_active' => $product->is_active,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'brands' => $this->brandOptions(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $product = Product::create([
            'brand_id' => $request->brand_id,
            'name' => $request->name,
            'category' => $request->category,
            'key_specs' => $request->key_specs ?? [],
            'specifications' => $request->specifications ?? [],
            'colors' => $request->colors ?? [],
            'is_highlight' => $request->boolean('is_highlight'),
            'sort_order' => $request->sort_order ?? Product::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        $this->storeImages($product, $request->file('images', []));

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        $product->load(['brand', 'images']);

        return Inertia::render('admin/products/edit', [
            'brands' => $this->brandOptions(),
            'product' => [
                'id' => $product->id,
                'brand_id' => $product->brand_id,
                'name' => $product->name,
                'category' => $product->category,
                'key_specs' => $product->key_specs ?? [],
                'specifications' => $product->specifications ?? [],
                'colors' => $product->colors ?? [],
                'is_highlight' => $product->is_highlight,
                'sort_order' => $product->sort_order,
                'is_active' => $product->is_active,
                'images' => $product->images->map(fn (ProductImage $image) => [
                    'id' => $image->id,
                    'image_url' => $image->image_url,
                ]),
            ],
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product->update([
            'brand_id' => $request->brand_id ?? $product->brand_id,
            'name' => $request->name ?? $product->name,
            'category' => $request->has('category') ? $request->category : $product->category,
            'key_specs' => $request->has('key_specs') ? ($request->key_specs ?? []) : $product->key_specs,
            'specifications' => $request->has('specifications') ? ($request->specifications ?? []) : $product->specifications,
            'colors' => $request->has('colors') ? ($request->colors ?? []) : $product->colors,
            'is_highlight' => $request->has('is_highlight') ? $request->boolean('is_highlight') : $product->is_highlight,
            'sort_order' => $request->sort_order ?? $product->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $product->is_active,
        ]);

        foreach ($request->input('removed_image_ids', []) as $imageId) {
            $image = $product->images()->find($imageId);

            if ($image) {
                if (! str_starts_with($image->image_path, '/')) {
                    Storage::disk('public')->delete($image->image_path);
                }
                $image->delete();
            }
        }

        $this->storeImages($product, $request->file('images', []));

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        foreach ($product->images as $image) {
            if (! str_starts_with($image->image_path, '/')) {
                Storage::disk('public')->delete($image->image_path);
            }
        }

        $product->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);

        foreach ($request->items as $item) {
            Product::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }

    /** @return \Illuminate\Support\Collection<int, array{id: int, name: string}> */
    private function brandOptions(): \Illuminate\Support\Collection
    {
        return Brand::ordered()->get()->map(fn (Brand $brand) => [
            'id' => $brand->id,
            'name' => $brand->name,
        ]);
    }

    /** @param  array<int, \Illuminate\Http\UploadedFile>  $files */
    private function storeImages(Product $product, array $files): void
    {
        $nextOrder = (int) $product->images()->max('sort_order') + 1;

        foreach ($files as $file) {
            $product->images()->create([
                'image_path' => $file->store('products', 'public'),
                'sort_order' => $nextOrder++,
            ]);
        }
    }
}
