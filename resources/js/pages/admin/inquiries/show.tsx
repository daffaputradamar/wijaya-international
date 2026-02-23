import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { BreadcrumbItem } from '@/types';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    inquiry: Inquiry;
}

export default function InquiryShow({ inquiry }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inquiries', href: '/admin/inquiries' },
        { title: inquiry.name, href: `/admin/inquiries/${inquiry.id}` },
    ];

    function handleDestroy() {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            router.delete(`/admin/inquiries/${inquiry.id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Inquiry from ${inquiry.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/inquiries">
                            <ArrowLeft className="size-4" />
                            Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Inquiry</h1>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                    <dl className="grid gap-4">
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">From</dt>
                            <dd className="mt-1 font-semibold">{inquiry.name}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email</dt>
                            <dd className="mt-1">
                                <a href={`mailto:${inquiry.email}`} className="text-blue-500 hover:underline">
                                    {inquiry.email}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Received</dt>
                            <dd className="mt-1 text-sm text-muted-foreground">{inquiry.created_at}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Message</dt>
                            <dd className="mt-2 whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                                {inquiry.message}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex justify-end">
                        <Button variant="destructive" onClick={handleDestroy}>
                            <Trash2 className="size-4" />
                            Delete Inquiry
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
