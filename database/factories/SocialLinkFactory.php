<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialLink>
 */
class SocialLinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'platform' => $this->faker->randomElement(['Instagram', 'X (Twitter)', 'Tokopedia', 'Shopee', 'Lazada']),
            'url' => $this->faker->url(),
            'type' => $this->faker->randomElement(['social', 'ecommerce']),
            'sort_order' => 0,
            'is_active' => true,
        ];
    }

    public function social(): static
    {
        return $this->state(['type' => 'social']);
    }

    public function ecommerce(): static
    {
        return $this->state(['type' => 'ecommerce']);
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }
}
