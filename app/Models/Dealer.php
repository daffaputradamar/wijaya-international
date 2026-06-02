<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dealer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'lat',
        'lng',
        'address',
        'features',
        'is_open',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_open' => 'boolean',
            'sort_order' => 'integer',
            'lat' => 'double',
            'lng' => 'double',
            'features' => 'array',
        ];
    }

    public function scopeActive($query): void
    {
        $query->where('is_open', true);
    }

    public function scopeOrdered($query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
