import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { CalendarDays, Check, Eye, RotateCcw, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Inquiries', href: '/admin/inquiries' },
];

function currentMonthRange() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
    return { from: `${y}-${m}-01`, to: `${y}-${m}-${lastDay}` };
}

interface Inquiry {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface PaginatedInquiries {
    data: Inquiry[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props {
    inquiries: PaginatedInquiries;
    unreadCount: number;
    filters: { from: string; to: string };
}

export default function InquiriesIndex({ inquiries, unreadCount, filters }: Props) {
    const [from, setFrom] = useState(filters.from);
    const [to, setTo] = useState(filters.to);

    const applyFilters = useCallback((newFrom: string, newTo: string) => {
        router.get('/admin/inquiries', { from: newFrom, to: newTo }, { preserveState: true, replace: true });
    }, []);

    function handleFromChange(value: string) {
        setFrom(value);
        if (value && to) applyFilters(value, to);
    }

    function handleToChange(value: string) {
        setTo(value);
        if (from && value) applyFilters(from, value);
    }

    function handleReset() {
        const range = currentMonthRange();
        setFrom(range.from);
        setTo(range.to);
        applyFilters(range.from, range.to);
    }

    function handleDestroy(id: number) {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(`/admin/inquiries/${id}`, { preserveScroll: true });
        }
    }

    function handleMarkRead(id: number) {
        router.post(`/admin/inquiries/${id}/mark-read`, {}, { preserveScroll: true });
    }

    const isDefaultRange = from === currentMonthRange().from && to === currentMonthRange().to;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inquiries" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Inquiries</h1>
                        {unreadCount > 0 && (
                            <p className="text-sm text-muted-foreground">{unreadCount} unread total</p>
                        )}
                    </div>

                    {/* Date Filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <CalendarDays className="size-4 text-muted-foreground" />
                        <div className="flex items-center gap-1.5">
                            <label className="text-sm text-muted-foreground">From</label>
                            <input
                                type="date"
                                value={from}
                                onChange={e => handleFromChange(e.target.value)}
                                max={to}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <label className="text-sm text-muted-foreground">To</label>
                            <input
                                type="date"
                                value={to}
                                onChange={e => handleToChange(e.target.value)}
                                min={from}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        {!isDefaultRange && (
                            <Button variant="ghost" size="sm" onClick={handleReset} title="Reset to current month">
                                <RotateCcw className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Result Summary */}
                <p className="-mt-4 text-sm text-muted-foreground">
                    {inquiries.total === 0
                        ? 'No inquiries in this period.'
                        : `${inquiries.total} ${inquiries.total === 1 ? 'inquiry' : 'inquiries'} from ${from} to ${to}`}
                </p>

                <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-sm dark:border-sidebar-border">
                    {inquiries.data.length === 0 ? (
                        <p className="px-6 py-10 text-center text-sm text-muted-foreground">No inquiries in this period.</p>
                    ) : (
                        <div className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            {inquiries.data.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className={`flex items-start gap-4 px-6 py-4 ${!inquiry.is_read ? 'bg-muted/30' : ''}`}
                                >
                                    <div className="mt-2 flex size-2 shrink-0 items-center justify-center">
                                        {!inquiry.is_read && <span className="size-2 rounded-full bg-red-500" />}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`font-medium ${!inquiry.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {inquiry.name}
                                            </span>
                                            <a
                                                href={`mailto:${inquiry.email}`}
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                {inquiry.email}
                                            </a>
                                            <span className="text-xs text-muted-foreground">{inquiry.created_at}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/inquiries/${inquiry.id}`}>
                                                <Eye className="size-4" />
                                            </Link>
                                        </Button>

                                        {!inquiry.is_read && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleMarkRead(inquiry.id)}
                                                title="Mark as read"
                                            >
                                                <Check className="size-4" />
                                            </Button>
                                        )}

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDestroy(inquiry.id)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {inquiries.last_page > 1 && (
                    <div className="flex items-center justify-center gap-3">
                        <Button variant="outline" size="sm" asChild disabled={!inquiries.prev_page_url}>
                            {inquiries.prev_page_url ? (
                                <Link href={inquiries.prev_page_url}>← Previous</Link>
                            ) : (
                                <span>← Previous</span>
                            )}
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {inquiries.current_page} of {inquiries.last_page}
                        </span>
                        <Button variant="outline" size="sm" asChild disabled={!inquiries.next_page_url}>
                            {inquiries.next_page_url ? (
                                <Link href={inquiries.next_page_url}>Next →</Link>
                            ) : (
                                <span>Next →</span>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
