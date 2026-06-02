<?php

namespace Database\Seeders;

use App\Models\Dealer;
use Illuminate\Database\Seeder;

class DealerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dealers = [
            [
                'name' => 'Wijaya Camera Sidoarjo',
                'category' => 'retail',
                'lat' => -7.4478,
                'lng' => 112.7183,
                'address' => 'Jl. Jenggolo No. 12, Sidoarjo, Jawa Timur',
                'features' => ['Free Wifi', 'Parking', 'Tripod Rentals'],
                'is_open' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Jakarta Central Imaging',
                'category' => 'service',
                'lat' => -6.1754,
                'lng' => 106.8272,
                'address' => 'Mall Mangga Dua Fl. 3 No. 45, Jakarta Pusat',
                'features' => ['Sensor Cleaning', 'Express Support', 'Free Wifi'],
                'is_open' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Surabaya Raya Camera',
                'category' => 'retail',
                'lat' => -7.2575,
                'lng' => 112.7521,
                'address' => 'Jl. Raya Darmo No. 88, Surabaya, Jawa Timur',
                'features' => ['Free Wifi', 'Parking', 'Demo Units'],
                'is_open' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Bandung Photo & Video Support',
                'category' => 'health',
                'lat' => -6.9175,
                'lng' => 107.6191,
                'address' => 'Jl. Asia Afrika No. 101, Bandung, Jawa Barat',
                'features' => ['Workshop Space', 'Coffee Bar', 'Calibration'],
                'is_open' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Medan Optical Center',
                'category' => 'other',
                'lat' => 3.5952,
                'lng' => 98.6722,
                'address' => 'Jl. Gajah Mada No. 15, Medan, Sumatera Utara',
                'features' => ['Free Wifi', 'Wine Pairing', 'Private Viewing'],
                'is_open' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Makassar Pro Support',
                'category' => 'service',
                'lat' => -5.1477,
                'lng' => 119.4327,
                'address' => 'Jl. Pettarani No. 34, Makassar, Sulawesi Selatan',
                'features' => ['Priority Support', 'Free Wifi', 'Members Lounge'],
                'is_open' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($dealers as $dealer) {
            Dealer::create($dealer);
        }
    }
}
