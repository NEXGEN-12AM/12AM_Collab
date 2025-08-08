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
        Schema::create('product_sizes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('size'); // "XS", "S", "M", "L", "XL", "XXL", "32", "34"
            $table->string('size_type'); // "clothing", "shoes", "numeric"
            $table->integer('quantity'); // Stock for this specific size
            $table->decimal('price_adjustment', 8, 2)->default(0); // Extra cost for this size
            $table->boolean('is_available')->default(true);
            $table->timestamps();

            $table->unique(['product_id', 'size']); // Each size only once per product
            $table->index(['product_id', 'is_available']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_sizes');
    }
};
