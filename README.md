# Fualtec Energía Portal - Monorepo

Este repositorio contiene los proyectos **frontend** (React 18 + Vite) y **backend** (Laravel 11) del portal corporativo y exclusivo de clientes para una empresa del sector petrolero.

## Estructura

- `/frontend`: SPA pública y portal de clientes construido con React, TypeScript y TailwindCSS.
- `/backend`: API REST Laravel 11 con Sanctum y spatie/laravel-permission.

Consulte los README individuales en cada carpeta para instrucciones detalladas de desarrollo y despliegue en cPanel.

## Requisitos generales

- Node.js 18+ y npm para el frontend.
- PHP 8.2+, Composer 2.6+ y MySQL 8+ para el backend.

## Flujo sugerido de despliegue

1. Preparar la API (`/backend`) en el subdominio `api.midominio.com` apuntando a `backend/public`.
2. Generar el build del frontend (`npm run build`) y subir el contenido de `frontend/dist` al `public_html/` del dominio principal.
3. Asegurar configuración de CORS, HTTPS y tareas programadas (`php artisan schedule:run`).

## Tests

- Frontend: `npm run test` dentro de `/frontend` (Vitest + Testing Library).
- Backend: `php artisan test` dentro de `/backend` (Pest). Algunas pruebas base se marcan como `skip` hasta conectar la aplicación real.

## Licencia

Uso interno corporativo de Fualtec Energía.
