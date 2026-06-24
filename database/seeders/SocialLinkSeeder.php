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
        SocialLink::truncate();

        $links = [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/wijayainternational', 'type' => 'social', 'sort_order' => 0],
            ['platform' => 'twitter', 'url' => 'https://x.com/wijayaintl', 'type' => 'social', 'sort_order' => 1],
            ['platform' => 'facebook', 'url' => 'https://facebook.com/wijayainternational', 'type' => 'social', 'sort_order' => 2],
            ['platform' => 'youtube', 'url' => 'https://youtube.com/@wijayainternational', 'type' => 'social', 'sort_order' => 3],
            ['platform' => 'tokopedia', 'url' => 'https://tokopedia.com/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 0],
            ['platform' => 'shopee', 'url' => 'https://shopee.co.id/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 1],
            ['platform' => 'lazada', 'url' => 'https://lazada.co.id/wijayainternational', 'type' => 'ecommerce', 'sort_order' => 2],
        ];

        foreach ($links as $link) {
            SocialLink::create(array_merge($link, ['is_active' => true]));
        }
    }
}
