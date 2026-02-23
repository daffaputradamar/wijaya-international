import { Head, Link } from '@inertiajs/react';
import { Images, Layers, MessageCircle, Package, Star } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Stats {
    brands: number;
    projects: number;
    productCategories: number;
    serviceCards: number;
    inquiries: number;
    unreadInquiries: number;
}

interface Inquiry {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentInquiries: Inquiry[];
}

const statCards = [
    { key: 'brands' as const, label: 'Brands', icon: Star, href: '/admin/brands', color: 'text-yellow-500' },
    { key: 'projects' as const, label: 'Projects', icon: Images, href: '/admin/projects', color: 'text-blue-500' },
    { key: 'productCategories' as const, label: 'Product Categories', icon: Package, href: '/admin/products', color: 'text-green-500' },
    { key: 'serviceCards' as const, label: 'Service Cards', icon: Layers, href: '/admin/services', color: 'text-purple-500' },
    { key: 'inquiries' as const, label: 'Inquiries', icon: MessageCircle, href: '/admin/inquiries', color: 'text-red-500' },
];

export default function Dashboard({ stats, recentInquiries }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {statCards.map(({ key, label, icon: Icon, href, color }) => (
                        <Link
                            key={key}
                            href={href}
                            className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-sm transition-shadow hover:shadow-md dark:border-sidebar-border"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                                <Icon className={`size-5 ${color}`} />
                            </div>
                            <span className="text-3xl font-bold tabular-nums">
                                {stats[key]}
                            </span>
                            {key === 'inquiries' && stats.unreadInquiries > 0 && (
                                <span className="text-xs font-medium text-red-500">
                                    {stats.unreadInquiries} unread
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Recent Inquiries */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card shadow-sm dark:border-sidebar-border">
                    <div className="flex items-center justify-between border-b border-sidebar-border/70 px-6 py-4 dark:border-sidebar-border">
                        <h2 className="font-semibold">Recent Inquiries</h2>
                        <Link
                            href="/admin/inquiries"
                            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    {recentInquiries.length === 0 ? (
                        <p className="px-6 py-10 text-center text-sm text-muted-foreground">No inquiries yet.</p>
                    ) : (
                        <div className="divide-y divide-sidebar-border/50 dark:divide-sidebar-border">
                            {recentInquiries.map((inquiry) => (
                                <Link
                                    key={inquiry.id}
                                    href={`/admin/inquiries/${inquiry.id}`}
                                    className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                                >
                                    <div className="mt-1 flex size-2 shrink-0 items-center justify-center">
                                        {!inquiry.is_read && (
                                            <span className="size-2 rounded-full bg-red-500" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-medium ${!inquiry.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {inquiry.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{inquiry.email}</span>
                                        </div>
                                        <p className="mt-0.5 truncate text-sm text-muted-foreground">{inquiry.message}</p>
                                    </div>
                                    <span className="shrink-0 text-xs text-muted-foreground">{inquiry.created_at}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
