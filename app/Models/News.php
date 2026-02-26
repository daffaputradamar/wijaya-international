<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'news_category_id',
        'title_id',
        'title_en',
        'body_id',
        'body_en',
        'slug',
        'image_path',
        'published_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function scopeActive($query): void
    {
        $query->where('is_active', true);
    }

    public function scopePublished($query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }

    public function getImageUrlAttribute(): string
    {
        if (str_starts_with($this->image_path, '/')) {
            return $this->image_path;
        }

        return Storage::url($this->image_path);
    }
}
