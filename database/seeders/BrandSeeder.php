<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'SBOX', 'logo_path' => '/images/wijaya/brands/sbox.avif'],
            ['name' => 'KODAK PIXPRO', 'logo_path' => '/images/wijaya/brands/kodak.avif'],
            ['name' => 'Canon', 'logo_path' => '/images/wijaya/brands/canon.avif'],
            ['name' => 'Sony', 'logo_path' => '/images/wijaya/brands/sony.avif'],
            ['name' => 'DJI', 'logo_path' => '/images/wijaya/brands/dji.avif'],
            ['name' => 'FeiyuTech', 'logo_path' => '/images/wijaya/brands/feiyutech.avif'],
            ['name' => '7Artisans', 'logo_path' => '/images/wijaya/brands/7artisan.avif'],
        ];

        foreach ($brands as $index => $brand) {
            Brand::create([
                'name' => $brand['name'],
                'logo_path' => $brand['logo_path'],
                'sort_order' => $index,
                'is_active' => true,
            ]);
        }
    }
}
