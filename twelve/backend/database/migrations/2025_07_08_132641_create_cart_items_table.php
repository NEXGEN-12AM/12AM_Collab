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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2); // Price at the time of adding to cart

            // clothibg specific selection
            $table->string('selected_size')->nullable(); // e.g. "M", "L"
            $table->string('selected_color')->nullable(); // e.g. "Navy Blue", "Red"
            
            $table->timestamps();

            // allow same product with different sizes/colors
            $table->unique(
                ['cart_id', 'product_id', 'selected_size', 'selected_color'],'cartitem_unique');
            $table->index('cart_id');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
