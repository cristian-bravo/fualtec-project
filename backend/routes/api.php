<?php

use App\Http\Controllers\Admin\ApprovalController;
use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\PdfController as AdminPdfController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Client\DocumentController;
use App\Http\Controllers\Client\PublicationController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot', [AuthController::class, 'forgot']);
    Route::post('reset', [AuthController::class, 'reset']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('approvals', [ApprovalController::class, 'index']);
    Route::post('approvals/{user}/approve', [ApprovalController::class, 'approve']);
    Route::post('approvals/{user}/reject', [ApprovalController::class, 'reject']);

    Route::get('usuarios', [UserController::class, 'index']);
    Route::post('usuarios', [UserController::class, 'store']);
    Route::patch('usuarios/{user}', [UserController::class, 'update']);

    Route::get('pdfs', [AdminPdfController::class, 'index']);
    Route::post('pdfs/upload', [AdminPdfController::class, 'upload']);
    Route::post('pdfs/{pdf}/assign', [AdminPdfController::class, 'assign']);

    Route::post('groups', [GroupController::class, 'store']);
    Route::post('groups/{group}/items', [GroupController::class, 'addItems']);
    Route::post('groups/{group}/publish', [GroupController::class, 'publish']);

    Route::get('audit/downloads', [AuditController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'role:cliente', 'can:estado-aprobado'])->prefix('client')->group(function () {
    Route::get('documents', [DocumentController::class, 'index']);
    Route::get('documents/{pdf}/download', [DocumentController::class, 'download']);
    Route::get('publications', [PublicationController::class, 'index']);
});
