<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pdfs', function (Blueprint $table) {
            $table->id();

            $table->string('title', 255);
            $table->string('grupo', 120);

            // activo / inactivo
            $table->boolean('vigente')->default(true);

            $table->string('filename');
            $table->string('storage_path');

            // quién sube el archivo
            $table->foreignId('uploaded_by')->constrained('users');

            // papelera
            $table->softDeletes();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pdfs');
    }
};
