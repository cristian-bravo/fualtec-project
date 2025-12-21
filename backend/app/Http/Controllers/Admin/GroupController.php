<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Models\PdfGroup;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class GroupController extends Controller
{
    public function __construct(private readonly PdfService $pdfService)
    {
    }

    public function index(): JsonResponse
    {
        $groups = PdfGroup::query()
            ->withCount('items')
            ->with([
                'creator:id,nombre,email',
                'publisher:id,nombre,email',
            ])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (PdfGroup $group) => [
                'id' => $group->id,
                'name' => $group->name,
                'periodo' => $group->periodo,
                'publicado' => $group->publicado,
                'published_at' => $group->published_at,
                'items_count' => $group->items_count,
                'creator' => $group->creator?->only(['id', 'nombre', 'email']),
                'publisher' => $group->publisher?->only(['id', 'nombre', 'email']),
            ]);

        return response()->json($groups);
    }

    public function show(PdfGroup $group): JsonResponse
    {
        $group->load([
            'creator:id,nombre,email',
            'publisher:id,nombre,email',
            'items.pdf.groups',
        ]);

        $itemPdfs = $group->items->map(function ($item) {
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
        });

        return response()->json([
            'id' => $group->id,
            'name' => $group->name,
            'periodo' => $group->periodo,
            'publicado' => $group->publicado,
            'published_at' => $group->published_at,
            'items_count' => $group->items()->count(),
            'creator' => $group->creator?->only(['id', 'nombre', 'email']),
            'publisher' => $group->publisher?->only(['id', 'nombre', 'email']),
            'pdfs' => $itemPdfs->values(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'periodo' => ['nullable', 'string', 'max:50'],
        ]);

        $group = $this->pdfService->createGroup($data, $request->user());

        return response()->json(['id' => $group->id], 201);
    }

    public function addItems(Request $request, PdfGroup $group): JsonResponse
    {
        $data = $request->validate([
            'pdfIds' => ['required', 'array'],
            'pdfIds.*' => ['integer', 'exists:pdfs,id'],
        ]);

        $added = $this->pdfService->attachPdfs($group, $data['pdfIds']);

        return response()->json(['added' => $added]);
    }

    public function availablePdfs(Request $request, PdfGroup $group): JsonResponse
    {
        $search = $request->query('search');

        $query = Pdf::with('groups')
            ->whereDoesntHave('groups', fn ($q) => $q->where('pdf_groups.id', $group->id))
            ->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('filename', 'like', "%{$search}%");
            });
        }

        $pdfs = $query
            ->limit(50)
            ->get()
            ->map(function (Pdf $pdf) {
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
            });

        return response()->json($pdfs);
    }

    public function removeItem(PdfGroup $group, Pdf $pdf): JsonResponse
    {
        $exists = $group->items()
            ->where('pdf_id', $pdf->id)
            ->exists();

        if (! $exists) {
            return response()->json([
                'message' => 'El PDF no pertenece a este grupo.',
            ], 404);
        }

        $this->pdfService->detachFromGroup($group, $pdf);

        return response()->json([
            'message' => 'PDF removido del grupo.',
        ]);
    }

    public function publish(Request $request, PdfGroup $group): JsonResponse
    {
        $data = $request->validate([
            'user_ids' => ['required', 'array', 'min:1', 'max:3'],
            'user_ids.*' => [
                'integer',
                Rule::exists('users', 'id')->where('rol', 'cliente'),
            ],
        ], [
            'user_ids.required' => 'Debe seleccionar al menos un usuario.',
            'user_ids.min' => 'Debe seleccionar al menos un usuario.',
            'user_ids.max' => 'Solo puede enlazar hasta 3 usuarios por grupo.',
            'user_ids.*.exists' => 'Uno de los usuarios seleccionados no es valido.',
        ]);

        $userIds = array_values(array_unique($data['user_ids']));
        $existingCount = $group->publications()->count();
        if ($existingCount + count($userIds) > 3) {
            return response()->json([
                'message' => 'Solo puede enlazar hasta 3 usuarios por grupo.',
                'errors' => [
                    'user_ids' => ['Solo puede enlazar hasta 3 usuarios por grupo.'],
                ],
            ], 422);
        }

        try {
            $group = $this->pdfService->publishGroup($group, $request->user(), $userIds);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json(['published_at' => $group->published_at]);
    }

    public function unpublish(PdfGroup $group): JsonResponse
    {
        try {
            $group = $this->pdfService->unpublishGroup($group, request()->user());
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'message' => 'Grupo despublicado correctamente.',
        ]);
    }
}
