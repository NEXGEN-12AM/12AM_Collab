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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['shipping', 'billing', 'both'])->default('both');
            // Personal information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('company')->nullable();
            $table->string('phone'); // More important in Cambodia

            // Cambodia-specific address format
            $table->string('house_number')->nullable(); // House/Building number (#123)
            $table->string('street'); // Street name (Street 271, Monivong Blvd)
            $table->string('sangkat'); // Sangkat/Ward (Toul Tom Poung 1)
            $table->string('khan'); // Khan/District (Chamkar Mon)
            $table->string('province'); // Province (Phnom Penh, Siem Reap)
            $table->string('postal_code', 10)->nullable(); // Cambodia postal codes
            $table->string('country')->default('Cambodia');

            // Additional details
            $table->string('landmark')->nullable(); // Near landmark (Near Russian Market)
            $table->text('delivery_instructions')->nullable(); // Special delivery notes

            $table->boolean('is_default')->default(false);
            $table->timestamps();

            // Indexes
            $table->index(['user_id', 'type']);
            $table->index(['province', 'khan']);
            $table->index('postal_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
