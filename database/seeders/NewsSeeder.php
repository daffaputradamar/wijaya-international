<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $categories = NewsCategory::all()->keyBy('slug');

        $articles = [
            [
                'category_slug' => 'company-news',
                'title_en' => 'PT Wijaya International Expands Distribution Network to Eastern Indonesia',
                'title_id' => 'PT Wijaya International Memperluas Jaringan Distribusi ke Indonesia Timur',
                'body_en' => '<p>PT Wijaya International is proud to announce a major expansion of its distribution network to cover more cities in Eastern Indonesia, bringing quality imaging products closer to professional photographers and enthusiasts across the archipelago.</p><p>This strategic expansion marks a significant milestone in our 20-year journey of empowering imaging in Indonesia. With new partnerships in Makassar, Manado, and Sorong, we now serve over 300 active dealers nationwide.</p>',
                'body_id' => '<p>PT Wijaya International dengan bangga mengumumkan ekspansi besar jaringan distribusi ke kota-kota di Indonesia Timur, mendekatkan produk imaging berkualitas kepada fotografer profesional dan penggemar di seluruh nusantara.</p><p>Ekspansi strategis ini menandai pencapaian penting dalam perjalanan 20 tahun kami memberdayakan imaging di Indonesia.</p>',
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'category_slug' => 'new-products',
                'title_en' => 'Sony Alpha A7 V Now Available Through Wijaya International Dealers',
                'title_id' => 'Sony Alpha A7 V Kini Tersedia Melalui Dealer Wijaya International',
                'body_en' => '<p>We are thrilled to announce the official availability of the Sony Alpha A7 V through our authorized dealer network across Indonesia. This flagship mirrorless camera sets a new benchmark for professional photography.</p><p>Pre-order now at your nearest Wijaya International authorized dealer and receive exclusive early-bird bundles including premium accessories worth up to Rp 3,000,000.</p>',
                'body_id' => '<p>Kami sangat gembira mengumumkan ketersediaan resmi Sony Alpha A7 V melalui jaringan dealer resmi kami di seluruh Indonesia. Kamera mirrorless unggulan ini menetapkan standar baru untuk fotografi profesional.</p>',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'category_slug' => 'events-activations',
                'title_en' => 'Recap: Photography Masterclass with Canon Professional Photographers',
                'title_id' => 'Rangkuman: Masterclass Fotografi bersama Fotografer Profesional Canon',
                'body_en' => '<p>Last weekend, Wijaya International hosted an exclusive photography masterclass in Jakarta, featuring renowned Canon professional photographers sharing their expertise with over 200 participants.</p><p>The event covered topics ranging from landscape photography techniques to advanced portrait lighting setups, leaving attendees inspired and equipped with new skills.</p>',
                'body_id' => '<p>Akhir pekan lalu, Wijaya International menyelenggarakan masterclass fotografi eksklusif di Jakarta, menampilkan fotografer profesional Canon terkemuka yang berbagi keahlian mereka dengan lebih dari 200 peserta.</p>',
                'published_at' => Carbon::now()->subDays(14),
            ],
            [
                'category_slug' => 'tips-tricks',
                'title_en' => '5 Essential Camera Settings Every Beginner Should Know',
                'title_id' => '5 Pengaturan Kamera Penting yang Harus Diketahui Setiap Pemula',
                'body_en' => '<p>Getting started with photography can be overwhelming, but mastering these five essential camera settings will immediately improve your photos. From understanding aperture and shutter speed to ISO control, we break down the fundamentals in simple terms.</p><p>1. Aperture controls depth of field. 2. Shutter speed freezes or blurs motion. 3. ISO adjusts sensor sensitivity. 4. White balance ensures accurate colors. 5. Metering modes help expose correctly.</p>',
                'body_id' => '<p>Memulai fotografi bisa membingungkan, tetapi menguasai lima pengaturan kamera esensial ini akan langsung meningkatkan foto Anda. Dari memahami aperture dan kecepatan rana hingga kontrol ISO, kami menguraikan dasar-dasarnya dalam bahasa yang sederhana.</p>',
                'published_at' => Carbon::now()->subDays(21),
            ],
            [
                'category_slug' => 'partnerships',
                'title_en' => 'Wijaya International Becomes Official DJI Distributor in Indonesia',
                'title_id' => 'Wijaya International Menjadi Distributor Resmi DJI di Indonesia',
                'body_en' => '<p>We are excited to announce our official partnership with DJI, the world\'s leading drone manufacturer. This partnership solidifies our commitment to bringing the best imaging technology to Indonesia\'s creative community.</p><p>DJI products will now be available through all 300+ Wijaya International authorized dealers, backed by our comprehensive after-sales support network.</p>',
                'body_id' => '<p>Kami dengan gembira mengumumkan kemitraan resmi kami dengan DJI, produsen drone terkemuka di dunia. Kemitraan ini mempertegas komitmen kami untuk membawa teknologi imaging terbaik kepada komunitas kreatif Indonesia.</p>',
                'published_at' => Carbon::now()->subDays(28),
            ],
            [
                'category_slug' => 'company-news',
                'title_en' => 'Wijaya International Celebrates 20 Years of Excellence in Distribution',
                'title_id' => 'Wijaya International Merayakan 20 Tahun Keunggulan dalam Distribusi',
                'body_en' => '<p>This year marks a momentous occasion as PT Wijaya International celebrates its 20th anniversary. Since its founding in 2004, the company has grown from a small regional distributor to one of Indonesia\'s largest imaging product distribution companies.</p>',
                'body_id' => '<p>Tahun ini menandai momen bersejarah saat PT Wijaya International merayakan ulang tahunnya yang ke-20. Sejak didirikan pada tahun 2004, perusahaan telah berkembang dari distributor regional kecil menjadi salah satu perusahaan distribusi produk imaging terbesar di Indonesia.</p>',
                'published_at' => Carbon::now()->subDays(45),
            ],
        ];

        foreach ($articles as $article) {
            $categorySlug = $article['category_slug'];
            $category = $categories->get($categorySlug);
            $titleEn = $article['title_en'];

            News::create([
                'news_category_id' => $category?->id,
                'title_id' => $article['title_id'],
                'title_en' => $titleEn,
                'body_id' => $article['body_id'],
                'body_en' => $article['body_en'],
                'slug' => Str::slug($titleEn),
                'image_path' => '/images/wijaya/hero-bg.jpg',
                'published_at' => $article['published_at'],
                'is_active' => true,
            ]);
        }
    }
}
