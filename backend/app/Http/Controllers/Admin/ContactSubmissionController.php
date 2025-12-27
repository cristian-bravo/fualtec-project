<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;

class ContactSubmissionController extends Controller
{
    public function index(): JsonResponse
    {
        $submissions = ContactSubmission::query()
            ->latest()
            ->get();

        return response()->json($submissions);
    }
}
