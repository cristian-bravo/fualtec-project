<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('pdf_id')->constrained('pdfs')->cascadeOnDelete();
            $table->string('ip', 45);
            $table->string('user_agent');
            $table->timestamp('downloaded_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('downloads');
    }
};
