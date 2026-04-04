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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name');
            $table->string('email')->index();
            $table->string('phone')->nullable()->index();
            $table->string('company')->nullable();
            $table->string('device_model')->nullable();
            $table->text('message');
            $table->string('preferred_contact_method')->default('email');
            $table->string('status')->default('new')->index();
            $table->string('source')->default('website')->index();
            $table->json('metadata')->nullable();
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
