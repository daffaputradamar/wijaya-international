<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $links = [
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/wijayainternational', 'type' => 'social', 'sort_order' => 0],
            ['platform' => 'X (Twitter)', 'url' => 'https://x.com/wijayaintl', 'type' => 'social', 'sort_order' => 1],
            ['platform' => 'Tokopedia', 'url' => 'https://tokopedia.com/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 0],
            ['platform' => 'Shopee', 'url' => 'https://shopee.co.id/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 1],
            ['platform' => 'Lazada', 'url' => 'https://lazada.co.id/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 2],
        ];

        foreach ($links as $link) {
            SocialLink::firstOrCreate(
                ['platform' => $link['platform']],
                array_merge($link, ['is_active' => true])
            );
        }
    }
}
