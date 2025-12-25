<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Download;
use App\Models\Pdf;
use App\Models\PdfGroup;
use App\Models\Publication;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ZipArchive;

class DocumentController extends Controller
{
    public function __construct(private readonly PdfService $pdfService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $groupIds = $user->publications()->pluck('group_id');
        $requestedGroupId = $request->query('group_id');

        if ($requestedGroupId) {
            $groupIds = $groupIds->filter(fn ($id) => (int) $id === (int) $requestedGroupId);
        }

        $pdfs = Pdf::query()
            ->whereHas('groups', fn ($q) => $q->whereIn('pdf_groups.id', $groupIds))
            ->with(['groups' => function ($query) use ($groupIds, $user) {
                $query->whereIn('pdf_groups.id', $groupIds)
                    ->with(['publications' => fn ($pub) => $pub->where('user_id', $user->id)]);
            }])
            ->orderByDesc('updated_at')
            ->get()
            ->map(function (Pdf $pdf) {
                $group = $pdf->groups
                    ->sortByDesc(fn ($item) => optional($item->publications->first())->published_at)
                    ->first();
                $publication = $group?->publications->first();

                return [
                    'id' => $pdf->id,
                    'title' => $pdf->title,
                    'categoria' => $pdf->categoria,
                    'group' => $group ? $group->only(['id', 'name', 'periodo']) : null,
                    'publicado_en' => $publication?->published_at,
                    'vigente' => $pdf->vigente,
                ];
            });

        return response()->json($pdfs);
    }

    public function download(Request $request, Pdf $pdf)
    {
        $user = $request->user();

        $assigned = $pdf->assignedClients()->where('users.id', $user->id)->exists();
        $published = Publication::where('user_id', $user->id)
            ->whereHas('group.items', fn ($q) => $q->where('pdf_id', $pdf->id))
            ->exists();

        abort_unless($assigned || $published, 403);

        Download::create([
            'user_id' => $user->id,
            'pdf_id' => $pdf->id,
            'ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
            'downloaded_at' => now(),
        ]);

        return $this->pdfService->streamForUser($pdf, $user);
    }

    public function downloadGroup(Request $request, PdfGroup $group)
    {
        $user = $request->user();

        $allowed = Publication::where('user_id', $user->id)
            ->where('group_id', $group->id)
            ->exists();

        abort_unless($allowed, 403);

        $pdfs = Pdf::query()
            ->whereHas('groups', fn ($q) => $q->where('pdf_groups.id', $group->id))
            ->get();

        return $this->downloadZip($pdfs, 'grupo-' . Str::slug($group->name));
    }

    public function bulkDownload(Request $request)
    {
        $data = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:pdfs,id'],
        ]);

        $user = $request->user();
        $groupIds = $user->publications()->pluck('group_id');

        $pdfs = Pdf::query()
            ->whereIn('id', $data['ids'])
            ->whereHas('groups', fn ($q) => $q->whereIn('pdf_groups.id', $groupIds))
            ->get();

        abort_if($pdfs->isEmpty(), 404, 'Documentos no encontrados.');

        return $this->downloadZip($pdfs, 'documentos-seleccionados');
    }

    private function downloadZip(Collection $pdfs, string $filename)
    {
        $tmpDir = storage_path('app/tmp');
        if (! is_dir($tmpDir)) {
            mkdir($tmpDir, 0755, true);
        }

        $zipPath = $tmpDir . '/' . Str::uuid() . '.zip';
        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            abort(500, 'No se pudo generar el archivo.');
        }

        $disk = Storage::disk('private_pdfs');
        $added = 0;

        foreach ($pdfs as $pdf) {
            if (! $disk->exists($pdf->storage_path)) {
                continue;
            }

            $safeTitle = Str::slug($pdf->title ?: pathinfo($pdf->filename, PATHINFO_FILENAME));
            $entryName = ($safeTitle ?: 'documento') . '-' . $pdf->id . '.pdf';
            $zip->addFile($disk->path($pdf->storage_path), $entryName);
            $added++;
        }

        $zip->close();

        if ($added === 0) {
            @unlink($zipPath);
            abort(404, 'No se encontraron documentos.');
        }

        return response()->download($zipPath, $filename . '.zip')->deleteFileAfterSend(true);
    }
}
