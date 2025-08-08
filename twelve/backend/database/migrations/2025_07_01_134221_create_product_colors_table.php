<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_colors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('color_name'); // "Navy Blue", "Forest Green"
            $table->string('color_code')->nullable(); // "#1a237e" (hex color)
            $table->string('image')->nullable(); // Color swatch image
            $table->integer('quantity'); // Stock for this specific color
            $table->decimal('price_adjustment', 8, 2)->default(0); // Extra cost for this color
            $table->boolean('is_available')->default(true);
            $table->timestamps();

            $table->unique(['product_id', 'color_name']);
            $table->index(['product_id', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_colors');
    }
};
