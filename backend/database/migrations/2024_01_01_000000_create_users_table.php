<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Datos personales
            $table->string('nombre');
            $table->string('email')->unique();
            $table->string('cedula')->unique();

            // Rol y estado
            $table->enum('rol', ['admin', 'cliente'])->default('cliente');
            // Alternativa más flexible:
            // $table->string('rol')->default('cliente');
            
            $table->enum('estado', ['pendiente', 'aprobado', 'rechazado', 'inactivo'])
                  ->default('pendiente');

            // Seguridad y control
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamp('last_login_at')->nullable();

            // Gestión y auditoría
            $table->softDeletes();  // borrado lógico (deleted_at)
            $table->timestamps();   // created_at y updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
