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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('category_id');
            $table->string('name'); // Name of the product
            $table->string('slug')->unique(); // URL-friendly version of the product name
            $table->string('brand')->nullable(); // Brand name
            $table->text('description');
            $table->text('short_description')->nullable(); // Optional short description

            // pricing details
            $table->decimal('original_price', 10, 2); // Price of the product
            $table->decimal('selling_price', 10, 2); // Discount

            // ralationships
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade'); // Foreign key to categories table


            // clothing specific fields
            $table->enum('gender', ['man', 'woman', 'unisex', 'kids']);
            $table->string('material')->nullable();
            $table->string('care_instructions')->nullable(); // "Machine wash cold"
            $table->enum('season', ['spring', 'summer', 'fall', 'winter', 'all'])->default('all');

            // inventory details
            $table->boolean('track_quantity')->default(true);
            $table->integer('quantity')->default(0); // Quantity in stock
            $table->integer('min_quantity')->default(5); // reorder level

            // product status
            $table->enum('status', ['active', 'inactive', 'draft', 'out_of_stock'])->default('active');
            $table->boolean('featured')->default(false);
            $table->boolean('is_new')->default(false); // New arrival
            $table->boolean('is_sale')->default(false); // On sale


            $table->timestamps();
            $table->softDeletes(); // For soft deleting products

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
