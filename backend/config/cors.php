<?php

return [
'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user'],
'supports_credentials' => true,
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
];
