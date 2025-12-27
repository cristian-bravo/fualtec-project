<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SatisfactionSubmission;
use Illuminate\Http\JsonResponse;

class SatisfactionSubmissionController extends Controller
{
    public function index(): JsonResponse
    {
        $submissions = SatisfactionSubmission::query()
            ->latest()
            ->get();

        return response()->json($submissions);
    }
}
