# Portal Web Corporativo Fualtec

Plataforma web desarrollada como proyecto de titulación para la gestión integral de documentos técnicos, clientes y servicios en una empresa del sector industrial–petrolero.

El sistema permite centralizar la información, automatizar procesos administrativos y ofrecer a los clientes un portal seguro para el acceso exclusivo a sus certificados e informes técnicos.

---

## 🎓 Contexto académico

Proyecto presentado como trabajo de titulación para la obtención del título de:

**Tecnólogo Superior Universitario en Sistemas y Gestión de Data**  
Instituto Superior Tecnológico Rumiñahui – Ecuador

Autor: Cristian Hernán Bravo Bravo  
Tutor: Ing. Danny Santiago Páez Oscullo MSc.

---

## 🏢 Problema que resuelve

Antes del sistema:

- Envío de documentos por correos personales y mensajería
- Pérdida de trazabilidad de archivos
- Duplicación de información
- Procesos manuales lentos
- Falta de portal para clientes
- Imagen corporativa limitada

Con la plataforma:

- Gestión documental centralizada
- Acceso seguro por roles
- Portal exclusivo para clientes
- Descarga de certificados en PDF
- Control administrativo interno
- Trazabilidad completa de la información

---

## 🚀 Características principales

### 🔐 Seguridad y control de acceso
- Autenticación de usuarios
- Sistema de roles y permisos
- Acceso restringido por cliente
- Protección de documentos

### 👥 Gestión de usuarios y clientes
- Administración de cuentas
- Asignación de documentos por cliente
- Historial de actividad

### 📄 Gestión documental
- Carga de certificados en PDF
- Organización centralizada
- Descarga segura
- Trazabilidad de archivos

### ⭐ Experiencia del cliente
- Portal web personalizado
- Consulta de historial de documentos
- Formulario de satisfacción

### 🏢 Módulo administrativo
- Panel interno de gestión
- Control de publicaciones
- Administración del sistema

---

## 🧱 Arquitectura del sistema

Arquitectura cliente – servidor basada en API REST.

- Frontend desacoplado
- Backend modular
- Base de datos relacional
- Despliegue en VPS Linux

---

## 🛠️ Stack tecnológico

### Frontend
- React
- TypeScript
- TailwindCSS
- Vite

### Backend
- Laravel 11
- Laravel Sanctum
- Spatie Laravel Permission

### Base de datos
- MySQL

### Infraestructura
- VPS Linux
- Nginx
- PHP-FPM
- HTTPS

---

## ⚙️ Estructura del repositorio


/frontend → SPA pública + portal de clientes
/backend → API REST + panel administrativo


---

## 🔄 Flujo de despliegue

1. Configuración del backend en subdominio API
2. Build del frontend
3. Publicación en dominio principal
4. Configuración de:
   - HTTPS
   - CORS
   - tareas programadas
   - almacenamiento seguro

---

## 🧪 Pruebas

### Frontend

npm run test


### Backend

php artisan test


---

## 📈 Resultados obtenidos

- Reducción de tiempos de entrega de documentos
- Disminución de errores manuales
- Mayor control de la información
- Mejora de la imagen corporativa
- Acceso digital 24/7 para clientes

---

## 🔒 Acceso al código

Este repositorio se publica únicamente con fines académicos.

No incluye:

- credenciales
- datos reales
- configuraciones sensibles
- llaves privadas
- información de clientes

---

## 📄 Licencia

Uso académico y demostrativo.

El sistema productivo y su configuración de infraestructura pertenecen a la empresa.
