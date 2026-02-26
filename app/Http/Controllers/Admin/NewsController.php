<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNewsRequest;
use App\Http\Requests\Admin\UpdateNewsRequest;
use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/news/index', [
            'news' => News::with('category')->latest('published_at')->latest('id')->get()->map(fn (News $n) => [
                'id' => $n->id,
                'title_en' => $n->title_en,
                'title_id' => $n->title_id,
                'slug' => $n->slug,
                'image_url' => $n->image_url,
                'category' => $n->category ? ['id' => $n->category->id, 'name_en' => $n->category->name_en] : null,
                'published_at' => $n->published_at?->toDateTimeString(),
                'is_active' => $n->is_active,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/news/create', [
            'categories' => NewsCategory::active()->ordered()->get()->map(fn (NewsCategory $c) => [
                'id' => $c->id,
                'name_en' => $c->name_en,
                'name_id' => $c->name_id,
            ]),
        ]);
    }

    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $imagePath = $request->file('image')->store('news', 'public');
        $slug = $this->uniqueSlug($request->title_en);

        News::create([
            'news_category_id' => $request->news_category_id,
            'title_id' => $request->title_id,
            'title_en' => $request->title_en,
            'body_id' => $request->body_id,
            'body_en' => $request->body_en,
            'slug' => $slug,
            'image_path' => $imagePath,
            'published_at' => $request->published_at,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.news.index');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('admin/news/edit', [
            'news' => [
                'id' => $news->id,
                'news_category_id' => $news->news_category_id,
                'title_id' => $news->title_id,
                'title_en' => $news->title_en,
                'body_id' => $news->body_id ?? '',
                'body_en' => $news->body_en ?? '',
                'slug' => $news->slug,
                'image_url' => $news->image_url,
                'published_at' => $news->published_at?->format('Y-m-d\TH:i'),
                'is_active' => $news->is_active,
            ],
            'categories' => NewsCategory::active()->ordered()->get()->map(fn (NewsCategory $c) => [
                'id' => $c->id,
                'name_en' => $c->name_en,
                'name_id' => $c->name_id,
            ]),
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        $data = [
            'news_category_id' => $request->has('news_category_id') ? $request->news_category_id : $news->news_category_id,
            'title_id' => $request->title_id ?? $news->title_id,
            'title_en' => $request->title_en ?? $news->title_en,
            'body_id' => $request->has('body_id') ? $request->body_id : $news->body_id,
            'body_en' => $request->has('body_en') ? $request->body_en : $news->body_en,
            'published_at' => $request->has('published_at') ? $request->published_at : $news->published_at,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $news->is_active,
        ];

        if ($request->hasFile('image')) {
            if (! str_starts_with($news->image_path, '/')) {
                Storage::disk('public')->delete($news->image_path);
            }
            $data['image_path'] = $request->file('image')->store('news', 'public');
        }

        $news->update($data);

        return redirect()->route('admin.news.index');
    }

    public function destroy(News $news): RedirectResponse
    {
        if (! str_starts_with($news->image_path, '/')) {
            Storage::disk('public')->delete($news->image_path);
        }

        $news->delete();

        return back();
    }

    private function uniqueSlug(string $value, ?int $exceptId = null): string
    {
        $slug = Str::slug($value);
        $original = $slug;
        $count = 2;

        while (
            News::where('slug', $slug)
                ->when($exceptId, fn ($q) => $q->where('id', '!=', $exceptId))
                ->exists()
        ) {
            $slug = $original.'-'.$count++;
        }

        return $slug;
    }
}
