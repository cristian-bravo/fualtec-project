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
                'regex:/^\d{10}(\d{3})?$/',
                function (string $attribute, mixed $value, \Closure $fail) {
                    $cedula = (string) $value;
                    if (! $this->isValidEcuadorId($cedula)) {
                        $fail('Cedula o RUC ecuatoriano invalido.');
                    }
                },
            ],
            'password' => ['required', 'string', 'min:8', 'regex:/[A-Z]/', 'regex:/[a-z]/', 'regex:/\d/', 'regex:/[^A-Za-z0-9]/'],
            'captcha_token' => ['required', 'string'],
            'captcha_answer' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'El correo ya esta registrado.',
        ];
    }

    private function isValidEcuadorId(string $cedula): bool
    {
        if (! preg_match('/^\d{10}(\d{3})?$/', $cedula)) {
            return false;
        }

        $provincia = (int) substr($cedula, 0, 2);
        if ($provincia < 1 || $provincia > 24) {
            return false;
        }

        $thirdDigit = (int) $cedula[2];
        if (strlen($cedula) === 10) {
            return $this->isValidCedula($cedula) && $thirdDigit >= 0 && $thirdDigit <= 5;
        }

        if ($thirdDigit >= 0 && $thirdDigit <= 5) {
            return $this->isValidNaturalRuc($cedula);
        }
        if ($thirdDigit === 6) {
            return $this->isValidPublicRuc($cedula);
        }
        if ($thirdDigit === 9) {
            return $this->isValidPrivateRuc($cedula);
        }

        return false;
    }

    private function isValidCedula(string $cedula): bool
    {
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

    private function computeMod11(array $digits, array $coef): int
    {
        $suma = 0;
        foreach ($coef as $index => $weight) {
            $suma += $digits[$index] * $weight;
        }

        $verificador = 11 - ($suma % 11);
        if ($verificador === 11) {
            return 0;
        }
        if ($verificador === 10) {
            return -1;
        }

        return $verificador;
    }

    private function hasValidEstablishment(string $suffix): bool
    {
        return ctype_digit($suffix) && (int) $suffix > 0;
    }

    private function isValidNaturalRuc(string $ruc): bool
    {
        $cedula = substr($ruc, 0, 10);
        $suffix = substr($ruc, 10);

        return $this->isValidCedula($cedula) && $this->hasValidEstablishment($suffix);
    }

    private function isValidPrivateRuc(string $ruc): bool
    {
        if (! $this->hasValidEstablishment(substr($ruc, 10))) {
            return false;
        }

        $digits = array_map('intval', str_split($ruc));
        $coef = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        $verificador = $this->computeMod11($digits, $coef);

        return $verificador !== -1 && $verificador === $digits[9];
    }

    private function isValidPublicRuc(string $ruc): bool
    {
        if (! $this->hasValidEstablishment(substr($ruc, 9))) {
            return false;
        }

        $digits = array_map('intval', str_split($ruc));
        $coef = [3, 2, 7, 6, 5, 4, 3, 2];
        $verificador = $this->computeMod11($digits, $coef);

        return $verificador !== -1 && $verificador === $digits[8];
    }
}
