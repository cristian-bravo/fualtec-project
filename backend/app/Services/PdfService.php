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
use Illuminate\Validation\ValidationException;


class PdfService
{
public function storePdf($file, $user, array $data)
{
    $filename = \Illuminate\Support\Str::uuid() . '.pdf';

    // carpeta dinámica: pdfs/AÑO/MES
    $folder = now()->format('Y/m');

    Storage::disk('private_pdfs')->putFileAs(
        $folder,
        $file,
        $filename
    );

    return Pdf::create([
        'title'        => $data['title'],
        'categoria'    => $data['categoria'] ?? 'General',
        'filename'     => $filename,
        'storage_path' => $folder . '/' . $filename,
        'uploaded_by'  => $user->id,
        'vigente'      => false,
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

        if (! $disk->exists($pdf->storage_path)) {
            abort(404, 'PDF no encontrado');
        }

        return response()->streamDownload(function () use ($disk, $pdf) {
            echo $disk->get($pdf->storage_path);
        }, $pdf->filename, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$pdf->filename.'"',
        ]);
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
            $added = 0;

            foreach ($pdfIds as $pdfId) {
                $pdf = Pdf::withCount('groups')->findOrFail($pdfId);

                // 🚨 LÍMITE DURO: máximo 3 grupos
                if ($pdf->groups_count >= 3) {
                    throw ValidationException::withMessages([
                        'pdfs' => "El PDF '{$pdf->title}' ya pertenece a 3 grupos.",
                    ]);
                }

                // evitar duplicados
                if (!$pdf->groups()->where('pdf_groups.id', $group->id)->exists()) {
                    $pdf->groups()->attach($group->id);
                    $added++;
                }
            }

            return $added;
        }

    public function detachFromGroup(PdfGroup $group, Pdf $pdf): void
    {
        $group->items()
            ->where('pdf_id', $pdf->id)
            ->delete();
    }

    public function publishGroup(PdfGroup $group, User $user, array $userIds): PdfGroup
    {
        if ($group->publicado) {
            throw ValidationException::withMessages([
                'group' => 'El grupo ya fue publicado.',
            ]);
        }

        if (count($userIds) === 0 || count($userIds) > 3) {
            throw ValidationException::withMessages([
                'user_ids' => 'Debe seleccionar entre 1 y 3 usuarios.',
            ]);
        }

        return DB::transaction(function () use ($group, $user, $userIds) {
            $group->update([
                'publicado' => true,
                'published_at' => now(),
                'published_by' => $user->id,
            ]);

            foreach ($userIds as $clientId) {
                Publication::updateOrCreate(
                    ['group_id' => $group->id, 'user_id' => $clientId],
                    ['published_at' => now()]
                );
            }

            return $group->fresh();
        });
    }

    public function unpublishGroup(PdfGroup $group, User $user): PdfGroup
    {
        if (! $group->publicado) {
            throw ValidationException::withMessages([
                'group' => 'El grupo ya esta en borrador.',
            ]);
        }

        return DB::transaction(function () use ($group) {
            $group->update([
                'publicado' => false,
                'published_at' => null,
                'published_by' => null,
            ]);

            Publication::where('group_id', $group->id)->delete();

            return $group->fresh();
        });
    }
public function deletePdf(Pdf $pdf): void
{
    $disk = Storage::disk('private_pdfs');

    if ($disk->exists($pdf->storage_path)) {
        $disk->delete($pdf->storage_path);
    }

    $pdf->delete();
}

}
