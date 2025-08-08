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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique(); // "SUMMER20", "NEWUSER"
            $table->string('name'); // "Summer Sale 20% Off"
            $table->text('description')->nullable();

            // Discount details
            $table->enum('type', ['fixed', 'percentage']); // $10 off or 20% off
            $table->decimal('value', 10, 2); // 10.00 or 20.00
            $table->decimal('minimum_amount', 10, 2)->nullable(); // Min order amount
            $table->decimal('maximum_discount', 10, 2)->nullable(); // Max discount for percentage

            // Usage limits
            $table->integer('usage_limit')->nullable(); // Total uses allowed
            $table->integer('used_count')->default(0); // Times used
            $table->integer('usage_limit_per_user')->nullable(); // Per user limit

            // Validity
            $table->boolean('is_active')->default(true);
            $table->datetime('starts_at')->nullable();
            $table->datetime('expires_at')->nullable();

            // Category/brand restrictions
            $table->json('applicable_categories')->nullable(); // Which categories
            $table->json('applicable_brands')->nullable(); // Which brands
            $table->enum('gender_restriction', ['all', 'men', 'women', 'kids'])->default('all');

            $table->timestamps();

            $table->index(['code', 'is_active']);
            $table->index(['is_active', 'starts_at', 'expires_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
