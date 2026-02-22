<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'key' => 'photography',
                'title_id' => 'Photography & Optics',
                'title_en' => 'Photography & Optics',
                'body_id' => 'Kamera, lensa, dan perangkat optik dari brand global terkemuka untuk kebutuhan hobi hingga profesional.',
                'body_en' => 'Cameras, lenses, and optical devices from leading global brands for hobbyist to professional needs.',
                'image_path' => null,
                'video_path' => null,
            ],
            [
                'key' => 'electronics',
                'title_id' => 'Consumer Electronics',
                'title_en' => 'Consumer Electronics',
                'body_id' => 'Produk elektronik konsumen berkualitas tinggi dengan teknologi terkini untuk kehidupan sehari-hari.',
                'body_en' => 'High-quality consumer electronics with the latest technology for everyday life.',
                'image_path' => '/images/wijaya/consumer-electronics.jpg',
                'video_path' => null,
            ],
            [
                'key' => 'technical',
                'title_id' => 'Technical Services & Repairs',
                'title_en' => 'Technical Services & Repairs',
                'body_id' => 'Layanan teknis dan perbaikan perangkat imaging dengan tenaga ahli berpengalaman dan suku cadang resmi.',
                'body_en' => 'Technical services and repair of imaging devices by experienced professionals with official spare parts.',
                'image_path' => null,
                'video_path' => null,
            ],
        ];

        foreach ($categories as $index => $category) {
            ProductCategory::create(array_merge($category, [
                'sort_order' => $index,
                'is_active' => true,
            ]));
        }
    }
}
