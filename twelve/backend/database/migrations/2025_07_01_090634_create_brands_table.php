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
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Unique name for the brand "sadidas" , "Nike"
            $table->string('slug')->unique(); // Used in URLs, e.g., "sadidas-shoes"
            $table->text('description')->nullable(); // Optional description 
            $table->string('logo')->nullable(); // Path to the brand logo image
            $table->string('website')->nullable(); // Optional website URL for the brand
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
