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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained()->onDelete('set null');

            // Review content
            $table->integer('rating'); // 1-5 stars
            $table->string('title')->nullable();
            $table->text('comment');

            // Clothing specific ratings
            $table->integer('fit_rating')->nullable(); // How does it fit? 1-5
            $table->integer('quality_rating')->nullable(); // Material quality 1-5
            $table->string('purchased_size')->nullable(); // Size they bought
            $table->enum('fit_feedback', ['runs_small', 'true_to_size', 'runs_large'])->nullable();

            // Review management
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->boolean('verified_purchase')->default(false);
            $table->integer('helpful_votes')->default(0);

            $table->timestamps();

            $table->unique(['product_id', 'user_id']); // One review per product per user
            $table->index(['product_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
