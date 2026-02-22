<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo_path',
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

    public function getLogoUrlAttribute(): string
    {
        if (str_starts_with($this->logo_path, '/')) {
            return $this->logo_path;
        }

        return Storage::url($this->logo_path);
    }
}
