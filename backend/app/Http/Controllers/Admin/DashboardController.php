<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Models\PdfGroup;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    private const STORAGE_LIMIT_BYTES = 50_000_000_000; // 50 GB

    public function index(): JsonResponse
    {
        $totalUsers = User::count();
        $approvedUsers = User::where('estado', 'aprobado')->count();
        $pendingUsers = User::where('estado', 'pendiente')->count();

        $pdfCount = Pdf::count();
        $groupCount = PdfGroup::count();

        $storageUsedBytes = (int) Pdf::sum('size_bytes');

        return response()->json([
            'total_users' => $totalUsers,
            'approved_users' => $approvedUsers,
            'pending_users' => $pendingUsers,
            'pdf_count' => $pdfCount,
            'group_count' => $groupCount,
            'storage_used_bytes' => $storageUsedBytes,
            'storage_limit_bytes' => self::STORAGE_LIMIT_BYTES,
        ]);
    }
}
