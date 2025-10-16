<?php

use Illuminate\Support\Str;

if (! function_exists('maskCedula')) {
    function maskCedula(?string $cedula): ?string
    {
        if (! $cedula) {
            return null;
        }

        return Str::mask($cedula, '*', 3, max(strlen($cedula) - 5, 0));
    }
}
