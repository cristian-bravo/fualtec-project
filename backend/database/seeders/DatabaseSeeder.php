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
            ['email' => 'admin@midominio.com'],
            [
                'nombre' => 'Katherine',
                'cedula' => '1102486006',
                'rol' => 'admin',
                'estado' => 'aprobado',
                'password' => Hash::make('Fualtec#2024'),
            ]
        );

        $admin->assignRole($adminRole);


    }
}
