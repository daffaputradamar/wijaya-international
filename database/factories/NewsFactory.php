<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titleEn = fake()->sentence(6);

        return [
            'news_category_id' => null,
            'title_id' => fake()->sentence(6),
            'title_en' => $titleEn,
            'body_id' => '<p>'.implode('</p><p>', fake()->paragraphs(4)).'</p>',
            'body_en' => '<p>'.implode('</p><p>', fake()->paragraphs(4)).'</p>',
            'slug' => \Illuminate\Support\Str::slug($titleEn).'-'.fake()->unique()->numberBetween(1, 9999),
            'image_path' => 'news/'.fake()->slug().'.jpg',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }

    public function draft(): static
    {
        return $this->state(['published_at' => null]);
    }
}
