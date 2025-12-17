<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pdf_group_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('group_id')
                ->constrained('pdf_groups')
                ->cascadeOnDelete();

            $table->foreignId('pdf_id')
                ->constrained('pdfs')
                ->cascadeOnDelete();

            $table->timestamps();

            // evita duplicados
            $table->unique(['group_id', 'pdf_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pdf_group_items');
    }
};

