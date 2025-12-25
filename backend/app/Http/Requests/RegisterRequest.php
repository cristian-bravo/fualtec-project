<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->where(fn ($query) => $query->where('estado', '!=', 'rechazado')),
            ],
            'cedula' => [
                'required',
                'string',
                'size:10',
                Rule::unique('users', 'cedula')->where(fn ($query) => $query->where('estado', '!=', 'rechazado')),
                'regex:/^\d{10}$/',
                function (string $attribute, mixed $value, \Closure $fail) {
                    $cedula = (string) $value;
                    if (! $this->isValidEcuadorId($cedula)) {
                        $fail('Cedula ecuatoriana invalida.');
                    }
                },
            ],
            'password' => ['required', 'string', 'min:8', 'regex:/[A-Z]/', 'regex:/[a-z]/', 'regex:/\d/', 'regex:/[^A-Za-z0-9]/'],
            'captcha_token' => ['required', 'string'],
            'captcha_answer' => ['required', 'string'],
        ];
    }

    private function isValidEcuadorId(string $cedula): bool
    {
        if (! preg_match('/^\d{10}$/', $cedula)) {
            return false;
        }

        $provincia = (int) substr($cedula, 0, 2);
        if ($provincia < 1 || $provincia > 24) {
            return false;
        }

        $digits = array_map('intval', str_split($cedula));
        $coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        $suma = 0;
        for ($i = 0; $i < 9; $i++) {
            $prod = $digits[$i] * $coef[$i];
            if ($prod >= 10) {
                $prod -= 9;
            }
            $suma += $prod;
        }
        $verificador = (int) (ceil($suma / 10) * 10 - $suma) % 10;

        return $verificador === $digits[9];
    }
}
