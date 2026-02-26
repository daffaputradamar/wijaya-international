<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('news_category_id')->nullable();
            $table->string('title_id');
            $table->string('title_en');
            $table->longText('body_id')->nullable();
            $table->longText('body_en')->nullable();
            $table->string('slug')->unique();
            $table->string('image_path');
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
