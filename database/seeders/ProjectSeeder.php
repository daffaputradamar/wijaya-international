<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            'Nikon D850 Launch Event',
            'Sony Alpha X Experience',
            'National Imaging Summit',
            'Canon Visionary Masterclass',
        ];

        foreach ($projects as $index => $name) {
            Project::create([
                'name' => $name,
                'image_path' => '/images/wijaya/hero-bg.jpg',
                'sort_order' => $index,
                'is_active' => true,
            ]);
        }
    }
}
