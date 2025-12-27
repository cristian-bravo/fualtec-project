<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('satisfaction_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->string('servicio');
            $table->unsignedTinyInteger('p1');
            $table->unsignedTinyInteger('p2');
            $table->unsignedTinyInteger('p3');
            $table->unsignedTinyInteger('p4');
            $table->unsignedTinyInteger('p5');
            $table->decimal('promedio', 4, 2)->default(0);
            $table->text('comentarios')->nullable();
            $table->text('mensaje_final')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('satisfaction_submissions');
    }
};
