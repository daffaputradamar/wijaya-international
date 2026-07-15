<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kodak = Brand::where('name', 'KODAK PIXPRO')->first();
        $sbox = Brand::where('name', 'SBOX')->first();

        if (! $kodak || ! $sbox) {
            return;
        }

        $products = [
            [
                'brand_id' => $sbox->id,
                'name' => 'SBOX Mini Na1',
                'colors' => [
                    ['name' => 'Silver', 'hex' => '#c0c0c0'],
                    ['name' => 'Black', 'hex' => '#1a1a1a'],
                ],
            ],
            [
                'brand_id' => $sbox->id,
                'name' => 'SBOX Sofia D11',
                'colors' => [
                    ['name' => 'Pink', 'hex' => '#f4b6c2'],
                    ['name' => 'White', 'hex' => '#f5f5f5'],
                ],
            ],
            [
                'brand_id' => $sbox->id,
                'name' => 'SBOX D12',
                'colors' => [
                    ['name' => 'Black', 'hex' => '#1a1a1a'],
                    ['name' => 'Silver', 'hex' => '#c0c0c0'],
                ],
            ],
            [
                'brand_id' => $kodak->id,
                'name' => 'KODAK PIXPRO C1',
                'colors' => [
                    ['name' => 'Tan', 'hex' => '#d2b48c'],
                    ['name' => 'Black', 'hex' => '#1a1a1a'],
                    ['name' => 'Brown', 'hex' => '#8b5a2b'],
                ],
                'key_specs' => [
                    ['value' => '13MP', 'label' => 'Megapixels'],
                    ['value' => '26mm', 'label' => 'Fixed Focus'],
                    ['value' => '2.8" LCD', 'label' => '960*720'],
                    ['value' => '1080p', 'label' => 'Full HD Video'],
                    ['value' => 'Li-Ion', 'label' => 'Battery'],
                ],
                'specifications' => [
                    ['type' => 'row', 'label' => 'Effective Image Sensor Pixels', 'value' => '13 Megapixels'],
                    ['type' => 'row', 'label' => 'Total Image Sensor Pixels', 'value' => '13.12 Megapixels [1/3" BSI CMOS]'],
                    ['type' => 'header', 'label' => 'Lens', 'value' => ''],
                    ['type' => 'row', 'label' => 'Focal Length', 'value' => '3.57 mm'],
                    ['type' => 'row', 'label' => '[35mm film equivalent]', 'value' => '26 mm'],
                    ['type' => 'row', 'label' => 'F number', 'value' => 'F2.0'],
                    ['type' => 'row', 'label' => 'Lens Construction', 'value' => '5 elements'],
                    ['type' => 'row', 'label' => 'Optical Zoom', 'value' => 'Fixed Focus'],
                    ['type' => 'row', 'label' => 'Focusing Range', 'value' => 'Normal: 60 cm ~ ∞, Macro: 8 cm ~ ∞'],
                    ['type' => 'row', 'label' => 'Autofocus System', 'value' => 'TTL Autofocus'],
                    ['type' => 'row', 'label' => 'Digital Zoom', 'value' => '4x Digital Zoom'],
                ],
            ],
            [
                'brand_id' => $kodak->id,
                'name' => 'KODAK PIXPRO FZ45',
                'colors' => [
                    ['name' => 'Red', 'hex' => '#a4262c'],
                    ['name' => 'Black', 'hex' => '#1a1a1a'],
                ],
            ],
            [
                'brand_id' => $kodak->id,
                'name' => 'KODAK PIXPRO WPZ2',
                'colors' => [
                    ['name' => 'Yellow', 'hex' => '#f2c200'],
                ],
            ],
        ];

        foreach ($products as $index => $product) {
            $created = Product::create([
                'brand_id' => $product['brand_id'],
                'name' => $product['name'],
                'category' => 'DIGITAL CAMERA',
                'key_specs' => $product['key_specs'] ?? [],
                'specifications' => $product['specifications'] ?? [],
                'colors' => $product['colors'] ?? [],
                'is_highlight' => true,
                'sort_order' => $index,
                'is_active' => true,
            ]);

            $created->images()->create([
                'image_path' => '/images/wijaya/consumer-electronics.jpg',
                'sort_order' => 0,
            ]);
        }
    }
}
