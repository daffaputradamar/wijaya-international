<?php

namespace Database\Seeders;

use App\Models\ServiceCard;
use Illuminate\Database\Seeder;

class ServiceCardSeeder extends Seeder
{
    public function run(): void
    {
        $cards = [
            [
                'key' => 'distribution',
                'icon_key' => 'LuPackage',
                'title_id' => 'Distribution',
                'title_en' => 'Distribution',
                'body_id' => 'Dengan pengelolaan yang efisien dan jangkauan nasional, kami memastikan ketersediaan produk yang merata dan tepat waktu bagi 300+ dealer mitra kami di seluruh Indonesia.',
                'body_en' => 'With efficient management and national coverage, we ensure even and timely product availability for our 300+ dealer partners across Indonesia.',
            ],
            [
                'key' => 'imaging',
                'icon_key' => 'LuCamera',
                'title_id' => 'Imaging Solution',
                'title_en' => 'Imaging Solution',
                'body_id' => 'Menghadirkan jajaran produk kamera dan perangkat optik lainnya yang inovatif dari brand global terpercaya. Kami menjawab kebutuhan pasar akan kualitas produk terbaik, mulai dari segmen hobi hingga profesional.',
                'body_en' => 'Delivering innovative camera products and optical devices from trusted global brands. We address the market\'s need for top product quality, from hobby to professional segments.',
            ],
            [
                'key' => 'marketing',
                'icon_key' => 'LuChartBar',
                'title_id' => 'Digital Marketing Support',
                'title_en' => 'Digital Marketing Support',
                'body_id' => 'Tidak hanya mendistribusikan produk, tetapi juga membangun brand. Kami membantu mitra dealer dengan strategi digital, aset kreatif pendukung, dan marketing media sosial untuk mendorong penjualan dan brand awareness.',
                'body_en' => 'Not just distributing products, but also building brands. We help dealer partners with digital strategies, creative assets, and social media marketing to drive sales and brand awareness.',
            ],
            [
                'key' => 'accessories',
                'icon_key' => 'LuSmartphone',
                'title_id' => 'Camera Accessories',
                'title_en' => 'Camera Accessories',
                'body_id' => 'Lengkapi kebutuhan foto dan video konsumen dengan aksesori berkualitas tinggi mulai dari penyimpanan, daya, hingga perangkat pendukung lainnya, untuk performa dan pengalaman yang optimal.',
                'body_en' => 'Complete your customers\' photo and video needs with high-quality accessories ranging from storage, power, to other supporting devices, for optimal performance and experience.',
            ],
        ];

        foreach ($cards as $index => $card) {
            ServiceCard::create(array_merge($card, [
                'sort_order' => $index,
                'is_active' => true,
            ]));
        }
    }
}
