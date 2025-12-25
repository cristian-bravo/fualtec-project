<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\ApprovalController;
use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\PdfController as AdminPdfController;
use App\Http\Controllers\Admin\PublicationController as AdminPublicationController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Client\DocumentController;
use App\Http\Controllers\Client\PublicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Estructura:
| - /auth/...        → rutas de autenticación (login, logout, etc.)
| - /admin/...       → rutas solo para administradores
| - /client/...      → rutas solo para clientes aprobados
|--------------------------------------------------------------------------
*/

# =====================================
# 🔐 AUTENTICACIÓN (AuthController)
# =====================================
Route::prefix('auth')->group(function () {
    Route::get('captcha', [AuthController::class, 'captcha']);
    Route::post('register', [AuthController::class, 'register'])
        ->middleware('throttle:auth-emails');
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot', [AuthController::class, 'forgot'])
        ->middleware('throttle:auth-emails');
    Route::post('reset', [AuthController::class, 'reset']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

# =====================================
# 🛠️ RUTAS DE ADMINISTRADOR
# =====================================
Route::middleware(['auth:sanctum', 'role:admin'])
    ->prefix('admin')
    ->group(function () {

        // 📌 rutas SIN parámetros primero
        Route::get('pdfs', [AdminPdfController::class, 'index']);
        Route::post('pdfs/upload', [AdminPdfController::class, 'upload'])
            ->middleware('throttle:upload-pdfs');
        Route::delete('pdfs/bulk', [AdminPdfController::class, 'bulkDestroy']);

        // luego rutas con parámetro
        Route::get('pdfs/{pdf}/download', [AdminPdfController::class, 'download']);
        Route::get('pdfs/{pdf}/view', [AdminPdfController::class, 'view']);
        Route::post('pdfs/{pdf}/assign', [AdminPdfController::class, 'assign']);
        Route::delete('pdfs/{pdf}', [AdminPdfController::class, 'destroy']);

        // dashboard
        Route::get('dashboard', [DashboardController::class, 'index']);

        // usuarios
        Route::get('usuarios', [UserController::class, 'index']);
        Route::get('usuarios/{user}', [UserController::class, 'show']);
        Route::post('usuarios', [UserController::class, 'store']);
        Route::patch('usuarios/{user}', [UserController::class, 'update']);

        // aprobaciones
        Route::get('approvals', [ApprovalController::class, 'index']);
        Route::post('approvals/{user}/approve', [ApprovalController::class, 'approve']);
        Route::post('approvals/{user}/reject', [ApprovalController::class, 'reject']);

        // grupos
        Route::get('groups', [GroupController::class, 'index']);
        Route::post('groups', [GroupController::class, 'store']);
        Route::get('groups/{group}', [GroupController::class, 'show']);
        Route::get('groups/{group}/available-pdfs', [GroupController::class, 'availablePdfs']);
        Route::post('groups/{group}/items', [GroupController::class, 'addItems']);
        Route::delete('groups/{group}/items/{pdf}', [GroupController::class, 'removeItem']);
        Route::post('groups/{group}/publish', [GroupController::class, 'publish']);
        Route::post('groups/{group}/unpublish', [GroupController::class, 'unpublish']);

        // publicaciones admin
        Route::get('publications', [AdminPublicationController::class, 'index']);
        Route::get('publications/{group}', [AdminPublicationController::class, 'show']);

        // auditoría
        Route::get('audit/downloads', [AuditController::class, 'index']);
    });



# =====================================
# 📄 RUTAS DE CLIENTE (solo aprobados)
# =====================================
Route::middleware(['auth:sanctum', 'role:cliente', 'can:estado-aprobado'])
    ->prefix('client')
    ->group(function () {

        // Documentos y descargas
        Route::get('documents', [DocumentController::class, 'index']);
        Route::get('documents/groups/{group}/download', [DocumentController::class, 'downloadGroup']);
        Route::post('documents/bulk-download', [DocumentController::class, 'bulkDownload']);
        Route::get('documents/{pdf}/download', [DocumentController::class, 'download']);

        // Publicaciones
        Route::get('publications', [PublicationController::class, 'index']);
    });

