# Frontend - Portal de Clientes Fualtec Energía

Aplicación React (Vite + TypeScript + TailwindCSS) que cubre la landing pública y el portal privado de clientes y administradores para la gestión de documentos estratégicos del sector petrolero.

## Requisitos

- Node.js 18+
- npm o pnpm

## Configuración

```bash
cp .env.example .env
```

Ajuste los valores necesarios:

```bash
VITE_API_BASE_URL=https://api.midominio.com/api/v1
VITE_BRAND_PRIMARY=#0D6EFD
VITE_BRAND_ACCENT=#7A001F
```

## Scripts disponibles

```bash
npm install       # instala dependencias
npm run dev       # entorno de desarrollo
npm run build     # genera build de producción en dist/
npm run preview   # sirve build generado
npm run lint      # ejecuta ESLint
npm run test      # ejecuta pruebas unitarias con Vitest
```

## Estructura destacada

- `src/app`: router, proveedores de contexto y store.
- `src/features/public`: landing y secciones públicas.
- `src/features/auth`: flujos de autenticación (login, registro, recuperación).
- `src/features/client`: vistas del cliente (dashboard, documentos, perfil).
- `src/features/admin`: vistas administrativas.
- `src/lib`: cliente Axios, utilidades y helpers.
- `src/components`: librería de UI minimalista reutilizable.

## Despliegue en cPanel (dominio principal)

1. Ejecutar `npm install` y `npm run build`.
2. Subir el contenido de `frontend/dist` a la carpeta `public_html/` del dominio.
3. Asegurar `.env` con `VITE_API_BASE_URL` apuntando al subdominio de la API.
4. Incluir el siguiente `.htaccess` en `public_html/` para manejar rutas del SPA:

```apacheconf
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

## Mejores prácticas implementadas

- Paleta corporativa (azul eléctrico, blanco y rojo oscuro) en todo el layout.
- Componentes accesibles con foco visible y contraste AA.
- Interceptor Axios para manejar expiración de sesión.
- Hooks personalizados (`useAuth`) para almacenar token y perfil.
- Formularios con validación `Formik + Yup` y `React Hook Form` en secciones específicas.
- Pruebas unitarias básicas para rutas críticas.

## Próximos pasos sugeridos

- Conectar endpoints reales de Laravel (Sanctum) y manejar estados de carga.
- Implementar subida real de PDFs y vistas dinámicas con datos de la API.
- Añadir seguimiento de eventos y componentes de tablas paginadas.
