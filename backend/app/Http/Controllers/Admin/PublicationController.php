<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PdfGroup;
use Illuminate\Http\JsonResponse;

class PublicationController extends Controller
{
    public function index(): JsonResponse
    {
        $groups = PdfGroup::query()
            ->where('publicado', true)
            ->withCount('items')
            ->with([
                'publisher:id,nombre,email',
                'creator:id,nombre,email',
            ])
            ->orderByDesc('published_at')
            ->get()
            ->map(fn (PdfGroup $group) => [
                'id' => $group->id,
                'name' => $group->name,
                'periodo' => $group->periodo,
                'published_at' => $group->published_at,
                'publisher' => $group->publisher?->only(['id', 'nombre', 'email']),
                'creator' => $group->creator?->only(['id', 'nombre', 'email']),
                'items_count' => $group->items_count,
            ]);

        return response()->json($groups);
    }

    public function show(PdfGroup $group): JsonResponse
    {
        if (! $group->publicado) {
            return response()->json([
                'message' => 'El grupo no está publicado.',
            ], 404);
        }

        $group->load([
            'publisher:id,nombre,email',
            'creator:id,nombre,email',
            'items.pdf.groups',
        ]);

        $linkedUsers = $group->publications()
            ->with('user:id,nombre,email')
            ->get()
            ->map(fn ($publication) => $publication->user?->only(['id', 'nombre', 'email']))
            ->filter()
            ->values();

        return response()->json([
            'id' => $group->id,
            'name' => $group->name,
            'periodo' => $group->periodo,
            'published_at' => $group->published_at,
            'publisher' => $group->publisher?->only(['id', 'nombre', 'email']),
            'creator' => $group->creator?->only(['id', 'nombre', 'email']),
            'linked_users' => $linkedUsers,
            'pdfs' => $group->items->map(function ($item) {
                $pdf = $item->pdf;
                $groupNames = $pdf->groups->pluck('name');

                return [
                    'id' => $pdf->id,
                    'title' => $pdf->title,
                    'filename' => $pdf->filename,
                    'storage_path' => $pdf->storage_path,
                    'grupo' => $groupNames->isNotEmpty()
                        ? $groupNames->implode(', ')
                        : null,
                    'vigente' => $groupNames->isNotEmpty(),
                ];
            }),
        ]);
    }
}
