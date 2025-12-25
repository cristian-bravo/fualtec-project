<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $publications = Publication::query()
            ->where('user_id', $user->id)
            ->with(['group' => function ($query) {
                $query->select('id', 'name', 'periodo')->withCount('items');
            }])
            ->orderByDesc('published_at')
            ->get()
            ->map(fn ($publication) => [
                'id' => $publication->id,
                'published_at' => $publication->published_at,
                'group' => $publication->group?->only(['id', 'name', 'periodo', 'items_count']),
            ]);

        return response()->json($publications);
    }
}
