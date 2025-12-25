<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CaptchaService
{
    private const TTL_SECONDS = 600;

    public function generate(): array
    {
        $a = random_int(2, 9);
        $b = random_int(2, 9);
        $token = Str::random(32);
        $answer = (string) ($a + $b);

        Cache::put($this->cacheKey($token), Hash::make($answer), self::TTL_SECONDS);

        return [
            'token' => $token,
            'question' => "Cuanto es {$a} + {$b}?",
        ];
    }

    public function verify(string $token, string $answer): bool
    {
        $cacheKey = $this->cacheKey($token);
        $hash = Cache::get($cacheKey);

        Cache::forget($cacheKey);

        if (! $hash) {
            return false;
        }

        return Hash::check($answer, $hash);
    }

    private function cacheKey(string $token): string
    {
        return 'captcha:' . $token;
    }
}
