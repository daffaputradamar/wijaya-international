<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactInfo::firstOrCreate([], [
            'phone' => '+62 21 1234 5678',
            'whatsapp' => '+62 812 3456 7890',
            'email' => 'info@wijayainternational.co.id',
            'address' => 'Jl. Raya Example No. 123, Jakarta Pusat, DKI Jakarta 10110',
            'maps_embed_url' => null,
        ]);
    }
}
