<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaint_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('empresa');
            $table->string('nombre');
            $table->string('cargo');
            $table->string('telefono', 60);
            $table->string('email');
            $table->string('direccion');
            $table->date('fecha_presentacion');
            $table->string('tipo_queja', 50);
            $table->string('tipo_inconformidad', 50);
            $table->boolean('anexa_documento')->default(false);
            $table->text('relato');
            $table->string('documento_path')->nullable();
            $table->string('documento_nombre')->nullable();
            $table->string('documento_mime')->nullable();
            $table->unsignedBigInteger('documento_size')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaint_submissions');
    }
};
