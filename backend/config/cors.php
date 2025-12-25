<?php

return [
'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user'],
'supports_credentials' => true,
'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
];
