<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductCategoryRequest;
use App\Http\Requests\Admin\UpdateProductCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'categories' => ProductCategory::ordered()->get()->map(fn (ProductCategory $category) => [
                'id' => $category->id,
                'key' => $category->key,
                'title_id' => $category->title_id,
                'title_en' => $category->title_en,
                'body_id' => $category->body_id,
                'body_en' => $category->body_en,
                'image_url' => $category->image_url,
                'video_url' => $category->video_url,
                'sort_order' => $category->sort_order,
                'is_active' => $category->is_active,
            ]),
        ]);
    }

    public function store(StoreProductCategoryRequest $request): RedirectResponse
    {
        $data = [
            'key' => $request->key,
            'title_id' => $request->title_id,
            'title_en' => $request->title_en,
            'body_id' => $request->body_id,
            'body_en' => $request->body_en,
            'sort_order' => $request->sort_order ?? ProductCategory::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ];

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('video')) {
            $data['video_path'] = $request->file('video')->store('products/videos', 'public');
        }

        ProductCategory::create($data);

        return back();
    }

    public function update(UpdateProductCategoryRequest $request, ProductCategory $product): RedirectResponse
    {
        $data = [
            'key' => $request->key ?? $product->key,
            'title_id' => $request->title_id ?? $product->title_id,
            'title_en' => $request->title_en ?? $product->title_en,
            'body_id' => $request->body_id ?? $product->body_id,
            'body_en' => $request->body_en ?? $product->body_en,
            'sort_order' => $request->sort_order ?? $product->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $product->is_active,
        ];

        if ($request->hasFile('image')) {
            if ($product->image_path && ! str_starts_with($product->image_path, '/')) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('video')) {
            if ($product->video_path && ! str_starts_with($product->video_path, '/')) {
                Storage::disk('public')->delete($product->video_path);
            }
            $data['video_path'] = $request->file('video')->store('products/videos', 'public');
        }

        $product->update($data);

        return back();
    }

    public function destroy(ProductCategory $product): RedirectResponse
    {
        if ($product->image_path && ! str_starts_with($product->image_path, '/')) {
            Storage::disk('public')->delete($product->image_path);
        }

        if ($product->video_path && ! str_starts_with($product->video_path, '/')) {
            Storage::disk('public')->delete($product->video_path);
        }

        $product->delete();

        return back();
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);

        foreach ($request->items as $item) {
            ProductCategory::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back();
    }
}
