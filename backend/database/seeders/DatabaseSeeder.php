<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $clientRole = Role::firstOrCreate(['name' => 'cliente', 'guard_name' => 'web']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@midominio.com'],
            [
                'nombre' => 'Administrador General',
                'cedula' => 'V-10000000',
                'rol' => 'admin',
                'estado' => 'aprobado',
                'password' => Hash::make('Fualtec#2024'),
            ]
        );
        $admin->assignRole($adminRole);

        $clientes = [
            ['nombre' => 'Cliente Demo 1', 'email' => 'cliente1@demo.com', 'cedula' => 'J-12345678'],
            ['nombre' => 'Cliente Demo 2', 'email' => 'cliente2@demo.com', 'cedula' => 'J-87654321'],
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
