<?php

// return [
// 'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user'],
// 'supports_credentials' => true,
// 'allowed_origins' => [
//     'http://localhost:5173',
//     'http://127.0.0.1:5173',
// ],
// 'allowed_methods' => ['*'],
// 'allowed_headers' => ['*'],
// ];



return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'supports_credentials' => true,

    'allowed_origins' => [
        'https://fualtec.com.ec',
        'https://www.fualtec.com.ec',
    ],

    'allowed_methods' => ['*'],

    'allowed_headers' => ['*'],

];