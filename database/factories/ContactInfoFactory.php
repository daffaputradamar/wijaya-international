<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactInfo>
 */
class ContactInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'phone' => '+62 21 1234 5678',
            'whatsapp' => '+62 812 3456 7890',
            'email' => 'info@wijayainternational.co.id',
            'address' => 'Jl. Raya Example No. 123, Jakarta Pusat, DKI Jakarta 10110',
            'maps_embed_url' => null,
        ];
    }
}
