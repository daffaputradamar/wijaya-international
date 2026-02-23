<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    /** @use HasFactory<\Database\Factories\ContactSubmissionFactory> */
    use HasFactory;

    /** @var list<string> */
    protected $fillable = ['name', 'email', 'message', 'is_read'];

    /** @return array<string, string> */
    public function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }

    /** @param \Illuminate\Database\Eloquent\Builder<ContactSubmission> $query */
    public function scopeUnread($query): void
    {
        $query->where('is_read', false);
    }
}
