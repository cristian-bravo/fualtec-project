<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('satisfaction_submissions', function (Blueprint $table) {
            $table->boolean('is_resolved')->default(false)->after('mensaje_final');
        });
    }

    public function down(): void
    {
        Schema::table('satisfaction_submissions', function (Blueprint $table) {
            $table->dropColumn('is_resolved');
        });
    }
};
