<?php

describe('Auth endpoints', function () {
    it('exposes register route', function () {
        $response = $this->postJson('/api/v1/auth/register', [
            'nombre' => 'Test',
            'email' => 'test@example.com',
            'cedula' => 'V-12345678',
            'password' => 'Password#1',
        ]);

        expect($response->status())->toBe(201);
    })->skip('Requires application bootstrap');
});
