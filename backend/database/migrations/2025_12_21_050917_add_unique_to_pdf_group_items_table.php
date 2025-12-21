<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::table('pdf_group_items', function (Blueprint $table) {
        $table->unique(['group_id', 'pdf_id']);
    });
}

public function down(): void
{
    Schema::table('pdf_group_items', function (Blueprint $table) {
        $table->dropUnique(['pdf_group_items_group_id_pdf_id_unique']);
    });
}

};
