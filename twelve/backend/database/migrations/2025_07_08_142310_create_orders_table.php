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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 20)->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // order status
            $table->enum('status', [
                'pending','confirmed','processing','shipped','delivered','cancelled','refunded'
            ])->default('pending');

            // Pricing
            $table->decimal('subtotal', 10, 2); // Item total
            $table->decimal('shipping_cost', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('total', 10, 2); // Final total 
            $table->string('currency', 3)->default('USD'); // Currency code

            // Addresses (stored as JSON for history)
            $table->json('shipping_address');
            $table->json('billing_address');

            // Additional info
            $table->string('coupon_code')->nullable();
            $table->text('notes')->nullable(); 
            $table->string('payment_method')->nullable(); // e.g., 'credit_card', 'paypal'
            $table->string('payment_status')->default('pending');

            // Status timestamps
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();

            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['order_number']);
            $table->index(['status','created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
