# Backend - API Laravel 11 (Fualtec Energía)

API RESTful desarrollada con Laravel 11 para gestionar autenticación, usuarios, PDFs privados y publicaciones del portal de clientes del sector petrolero.

## Requisitos

- PHP 8.2+
- Composer 2.6+
- MySQL 8.x
- Extensiones PHP: `openssl`, `pdo_mysql`, `mbstring`, `json`, `fileinfo`

## Instalación local

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Configure en `.env` las credenciales de base de datos y los dominios para Sanctum:

```
APP_URL=https://api.midominio.com
SANCTUM_STATEFUL_DOMAINS=midominio.com,.midominio.com
SESSION_DOMAIN=.midominio.com
FRONTEND_URL=https://midominio.com
PRIVATE_PDF_PATH=privado/pdfs
```

## Despliegue en cPanel (subdominio `api.midominio.com`)

1. Crea un subdominio en cPanel que apunte a `/backend/public`.
2. Sube el contenido del directorio `backend/` al servidor (excluye `vendor/` si vas a ejecutar `composer install` en destino).
3. Ejecuta en el servidor:

   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --force
   php artisan db:seed --force
   php artisan storage:link
   ```

4. Configura un cron cada minuto para `php artisan schedule:run`.
5. Asegura permisos de escritura en `storage/` y `bootstrap/cache/`.
6. Verifica que la carpeta privada de PDFs `storage/app/privado/pdfs` no sea accesible públicamente.

## Endpoints principales (`/api/v1`)

### Autenticación

- `POST /auth/register` – Registro de clientes, queda en estado `pendiente`.
- `POST /auth/login` – Devuelve token Sanctum.
- `POST /auth/forgot` – Solicitud de restablecimiento.
- `POST /auth/reset` – Define nueva contraseña.
- `GET /auth/me` – Perfil autenticado.

### Administración (rol `admin`)

- `GET /admin/approvals` – Usuarios pendientes.
- `POST /admin/approvals/{id}/approve|reject` – Cambia estado.
- `POST /admin/users` – Alta manual.
- `PATCH /admin/users/{id}` – Actualiza estado/contraseña.
- `POST /admin/pdfs/upload` – Subida protegida (almacenada en `storage/app/privado/pdfs/YYYY/MM`).
- `POST /admin/pdfs/{id}/assign` – Asignación por `userIds` o `cedulas`.
- `GET /admin/pdfs` – Listado con filtros.
- `POST /admin/groups` – Crea grupo de publicación.
- `POST /admin/groups/{id}/items` – Asocia PDFs.
- `POST /admin/groups/{id}/publish` – Publica y marca fecha.
- `GET /admin/audit/downloads` – Auditoría y filtros.

### Cliente (rol `cliente`, estado `aprobado`)

- `GET /client/documents` – Documentos disponibles.
- `GET /client/documents/{id}/download` – Descarga con registro en auditoría.
- `GET /client/publications` – Historial de publicaciones.

## Seguridad y mejores prácticas

- CORS restringido al dominio principal (`CORS_ALLOWED_ORIGINS`).
- Autenticación por Sanctum, tokens por usuario.
- Registros de descargas en tabla `downloads` con IP y User-Agent.
- Rutas protegidas por roles (`spatie/laravel-permission`).
- Contraseñas encriptadas con `Hash::make`.
- Estructura lista para integrar watermark, expiración de links y colas de procesamiento.

## Tests

Se incluyen pruebas base (Pest) marcadas como `skip` para documentar escenarios críticos. Ejecutar con:

```bash
php artisan test
```

## Próximos pasos

- Implementar colas para envíos de correo y procesamiento de PDFs.
- Integrar generación dinámica de marcas de agua.
- Añadir firmas temporales a las URLs de descarga.
- Configurar storage S3/R2 para escalabilidad.
