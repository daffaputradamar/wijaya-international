<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductCategory>
 */
class ProductCategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'key' => $this->faker->unique()->slug(2),
            'title_id' => $this->faker->sentence(3),
            'title_en' => $this->faker->sentence(3),
            'body_id' => $this->faker->paragraph(),
            'body_en' => $this->faker->paragraph(),
            'image_path' => null,
            'video_path' => null,
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }
}
