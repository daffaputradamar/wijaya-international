<?php

namespace Database\Factories;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'brand_id' => Brand::factory(),
            'name' => $this->faker->words(3, true),
            'category' => 'DIGITAL CAMERA',
            'key_specs' => [
                ['value' => '13MP', 'label' => 'Megapixels'],
                ['value' => '26mm', 'label' => 'Fixed Focus'],
            ],
            'specifications' => [
                ['type' => 'header', 'label' => 'LENS', 'value' => ''],
                ['type' => 'row', 'label' => 'Focal Length', 'value' => '3.57 mm'],
                ['type' => 'row', 'label' => 'F number', 'value' => 'F2.0'],
            ],
            'colors' => [
                ['name' => 'Black', 'hex' => '#1a1a1a'],
                ['name' => 'Tan', 'hex' => '#d2b48c'],
            ],
            'is_highlight' => false,
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }

    public function highlight(): static
    {
        return $this->state(['is_highlight' => true]);
    }
}
