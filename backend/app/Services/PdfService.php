<?php

namespace App\Services;

use App\Models\Pdf;
use App\Models\PdfGroup;
use App\Models\PdfGroupItem;
use App\Models\Publication;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PdfService
{
    public function storePdf(UploadedFile $file, User $uploader, array $data = []): Pdf
    {
        $path = Storage::disk('private_pdfs')->putFile(date('Y/m'), $file);
        $checksum = hash_file('sha256', $file->getRealPath());

        return Pdf::create([
            'title' => $data['title'] ?? $file->getClientOriginalName(),
            'filename' => $file->getClientOriginalName(),
            'storage_path' => $path,
            'categoria' => $data['categoria'] ?? 'general',
            'tags' => $data['tags'] ?? [],
            'version' => $data['version'] ?? 'v1.0',
            'vigente' => $data['vigente'] ?? true,
            'checksum' => $checksum,
            'size_bytes' => $file->getSize(),
            'uploaded_by' => $uploader->id,
        ]);
    }

    public function assignToUsers(Pdf $pdf, array $users): int
    {
        $ids = User::whereIn('id', $users)->pluck('id')->all();
        $pdf->assignedClients()->syncWithoutDetaching($ids);

        return count($ids);
    }

    public function assignByCedulas(Pdf $pdf, array $cedulas): int
    {
        $normalized = array_map(fn ($cedula) => strtoupper($cedula), $cedulas);
        $users = User::whereIn('cedula', $normalized)->pluck('id')->all();
        $pdf->assignedClients()->syncWithoutDetaching($users);

        return count($users);
    }

    public function streamForUser(Pdf $pdf, User $user): StreamedResponse
    {
        $disk = Storage::disk('private_pdfs');

        return $disk->download($pdf->storage_path, $pdf->filename);
    }

    public function createGroup(array $data, User $user): PdfGroup
    {
        return PdfGroup::create([
            'name' => $data['name'],
            'periodo' => $data['periodo'] ?? null,
            'created_by' => $user->id,
        ]);
    }

    public function attachPdfs(PdfGroup $group, array $pdfIds): int
    {
        $count = 0;
        foreach ($pdfIds as $pdfId) {
            PdfGroupItem::firstOrCreate([
                'group_id' => $group->id,
                'pdf_id' => $pdfId,
            ]);
            $count++;
        }

        return $count;
    }

    public function publishGroup(PdfGroup $group): PdfGroup
    {
        return DB::transaction(function () use ($group) {
            $group->update([
                'publicado' => true,
                'published_at' => now(),
            ]);

            $clientIds = $group->items()
                ->with('pdf.assignedClients:id')
                ->get()
                ->flatMap(fn ($item) => $item->pdf->assignedClients->pluck('id'))
                ->unique()
                ->all();

            foreach ($clientIds as $clientId) {
                Publication::updateOrCreate(
                    ['group_id' => $group->id, 'user_id' => $clientId],
                    ['published_at' => now()]
                );
            }

            return $group->fresh();
        });
    }
}
