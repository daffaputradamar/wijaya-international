<?php

namespace Database\Seeders;

use App\Models\NewsCategory;
use Illuminate\Database\Seeder;

class NewsCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name_id' => 'Berita Perusahaan', 'name_en' => 'Company News', 'slug' => 'company-news', 'sort_order' => 1],
            ['name_id' => 'Produk Baru', 'name_en' => 'New Products', 'slug' => 'new-products', 'sort_order' => 2],
            ['name_id' => 'Event & Aktivasi', 'name_en' => 'Events & Activations', 'slug' => 'events-activations', 'sort_order' => 3],
            ['name_id' => 'Tips & Trik', 'name_en' => 'Tips & Tricks', 'slug' => 'tips-tricks', 'sort_order' => 4],
            ['name_id' => 'Kemitraan', 'name_en' => 'Partnerships', 'slug' => 'partnerships', 'sort_order' => 5],
        ];

        foreach ($categories as $category) {
            NewsCategory::create(array_merge($category, ['is_active' => true]));
        }
    }
}
