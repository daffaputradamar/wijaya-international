<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNewsCategoryRequest;
use App\Http\Requests\Admin\UpdateNewsCategoryRequest;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/news-categories/index', [
            'categories' => NewsCategory::ordered()->get()->map(fn (NewsCategory $c) => [
                'id' => $c->id,
                'name_id' => $c->name_id,
                'name_en' => $c->name_en,
                'slug' => $c->slug,
                'sort_order' => $c->sort_order,
                'is_active' => $c->is_active,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/news-categories/create');
    }

    public function store(StoreNewsCategoryRequest $request): RedirectResponse
    {
        $slug = $this->uniqueSlug($request->slug ?: $request->name_en);

        NewsCategory::create([
            'name_id' => $request->name_id,
            'name_en' => $request->name_en,
            'slug' => $slug,
            'sort_order' => $request->sort_order ?? NewsCategory::max('sort_order') + 1,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.news-categories.index');
    }

    public function edit(NewsCategory $newsCategory): Response
    {
        return Inertia::render('admin/news-categories/edit', [
            'category' => [
                'id' => $newsCategory->id,
                'name_id' => $newsCategory->name_id,
                'name_en' => $newsCategory->name_en,
                'slug' => $newsCategory->slug,
                'sort_order' => $newsCategory->sort_order,
                'is_active' => $newsCategory->is_active,
            ],
        ]);
    }

    public function update(UpdateNewsCategoryRequest $request, NewsCategory $newsCategory): RedirectResponse
    {
        $slug = $newsCategory->slug;
        if ($request->has('slug') && $request->slug !== $newsCategory->slug) {
            $slug = $this->uniqueSlug($request->slug ?: $request->name_en ?? $newsCategory->name_en, $newsCategory->id);
        }

        $newsCategory->update([
            'name_id' => $request->name_id ?? $newsCategory->name_id,
            'name_en' => $request->name_en ?? $newsCategory->name_en,
            'slug' => $slug,
            'sort_order' => $request->sort_order ?? $newsCategory->sort_order,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $newsCategory->is_active,
        ]);

        return redirect()->route('admin.news-categories.index');
    }

    public function destroy(NewsCategory $newsCategory): RedirectResponse
    {
        $newsCategory->delete();

        return back();
    }

    private function uniqueSlug(string $value, ?int $exceptId = null): string
    {
        $slug = Str::slug($value);
        $original = $slug;
        $count = 2;

        while (
            NewsCategory::where('slug', $slug)
                ->when($exceptId, fn ($q) => $q->where('id', '!=', $exceptId))
                ->exists()
        ) {
            $slug = $original.'-'.$count++;
        }

        return $slug;
    }
}
