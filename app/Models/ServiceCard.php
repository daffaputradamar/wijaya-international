<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'icon_key',
        'title_id',
        'title_en',
        'body_id',
        'body_en',
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
}
