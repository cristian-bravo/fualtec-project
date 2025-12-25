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
                'nombre' => 'Administrador General',
                'cedula' => '1102486006',
                'rol' => 'admin',
                'estado' => 'aprobado',
                'password' => Hash::make('Fualtec#2024'),
            ]
        );

        $admin->assignRole($adminRole);

        // CLIENTES DEMO
        $clientes = [
            ['nombre' => 'Cliente Demo 1', 'email' => 'cliente1@demo.com', 'cedula' => '2100667936'],
            ['nombre' => 'Cliente Demo 2', 'email' => 'cliente2@demo.com', 'cedula' => '1710034065'],
        ];

        foreach ($clientes as $cliente) {
            $user = User::firstOrCreate(
                ['email' => $cliente['email']],
                [
                    'nombre' => $cliente['nombre'],
                    'cedula' => $cliente['cedula'],
                    'rol' => 'cliente',
                    'estado' => 'aprobado',
                    'password' => Hash::make('Demo#2024'),
                ]
            );

            $user->assignRole($clientRole);
        }
    }
}
