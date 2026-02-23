<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $from = $request->input('from', now()->startOfMonth()->toDateString());
        $to = $request->input('to', now()->endOfMonth()->toDateString());

        $inquiries = ContactSubmission::latest()
            ->whereBetween('created_at', [
                Carbon::parse($from)->startOfDay(),
                Carbon::parse($to)->endOfDay(),
            ])
            ->paginate(20)
            ->withQueryString()
            ->through(fn (ContactSubmission $s) => [
                'id' => $s->id,
                'name' => $s->name,
                'email' => $s->email,
                'message' => $s->message,
                'is_read' => $s->is_read,
                'created_at' => $s->created_at->diffForHumans(),
            ]);

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'unreadCount' => ContactSubmission::unread()->count(),
            'filters' => ['from' => $from, 'to' => $to],
        ]);
    }

    public function show(ContactSubmission $inquiry): Response
    {
        if (! $inquiry->is_read) {
            $inquiry->update(['is_read' => true]);
        }

        return Inertia::render('admin/inquiries/show', [
            'inquiry' => [
                'id' => $inquiry->id,
                'name' => $inquiry->name,
                'email' => $inquiry->email,
                'message' => $inquiry->message,
                'is_read' => $inquiry->is_read,
                'created_at' => $inquiry->created_at->diffForHumans(),
            ],
        ]);
    }

    public function destroy(ContactSubmission $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry deleted.');
    }

    public function markRead(ContactSubmission $inquiry): RedirectResponse
    {
        $inquiry->update(['is_read' => true]);

        return redirect()->back()->with('success', 'Inquiry marked as read.');
    }
}
