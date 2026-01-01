<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web'
        ]);

        $clientRole = Role::firstOrCreate([
            'name' => 'cliente',
            'guard_name' => 'web'
        ]);

        // ADMIN
        $admin = User::firstOrCreate(
            ['email' => 'gerencia-general@fualtec.com.ec'],
            [
                'nombre' => 'Katherine',
                'cedula' => '1792208394001',
                'rol' => 'admin',
                'estado' => 'aprobado',
                'password' => Hash::make('Fu@ltec2025.'),
            ]
        );

        $admin->assignRole($adminRole);


    }
}
