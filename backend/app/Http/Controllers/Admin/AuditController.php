<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $downloads = Download::query()
            ->with(['user:id,nombre,email', 'pdf:id,title'])
            ->when($request->get('from'), fn ($q, $from) => $q->whereDate('downloaded_at', '>=', $from))
            ->when($request->get('to'), fn ($q, $to) => $q->whereDate('downloaded_at', '<=', $to))
            ->when($request->get('userId'), fn ($q, $id) => $q->where('user_id', $id))
            ->when($request->get('pdfId'), fn ($q, $id) => $q->where('pdf_id', $id))
            ->orderByDesc('downloaded_at')
            ->paginate(50);

        return response()->json($downloads);
    }
}
