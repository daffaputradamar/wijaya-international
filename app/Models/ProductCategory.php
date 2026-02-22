<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'title_id',
        'title_en',
        'body_id',
        'body_en',
        'image_path',
        'video_path',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function scopeActive($query): void
    {
        $query->where('is_active', true);
    }

    public function scopeOrdered($query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image_path) {
            return null;
        }

        if (str_starts_with($this->image_path, '/')) {
            return $this->image_path;
        }

        return Storage::url($this->image_path);
    }

    public function getVideoUrlAttribute(): ?string
    {
        if (! $this->video_path) {
            return null;
        }

        if (str_starts_with($this->video_path, '/')) {
            return $this->video_path;
        }

        return Storage::url($this->video_path);
    }
}
