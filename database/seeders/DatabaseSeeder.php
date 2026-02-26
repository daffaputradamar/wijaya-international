<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            BrandSeeder::class,
            ProjectSeeder::class,
            ProductCategorySeeder::class,
            ServiceCardSeeder::class,
            ContactInfoSeeder::class,
            SocialLinkSeeder::class,
            NewsCategorySeeder::class,
            NewsSeeder::class,
        ]);
    }
}
