import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface NewsCategory {
    id: number;
    name_en: string;
}

interface NewsItem {
    id: number;
    title_en: string;
    title_id: string;
    slug: string;
    image_url: string;
    category: NewsCategory | null;
    published_at: string | null;
    is_active: boolean;
}

interface Props {
    news: NewsItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'News', href: '/admin/news' },
];

export default function NewsIndex({ news }: Props) {
    const deleteForm = useForm({});

    const handleDelete = (item: NewsItem) => {
        if (!confirm(`Delete "${item.title_en}"?`)) { return; }
        deleteForm.delete(NewsController.destroy(item.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">News</h1>
                        <p className="text-sm text-muted-foreground">Manage news articles shown on the website.</p>
                    </div>
                    <Link href={NewsController.create().url}>
                        <Button className="gap-2">
                            <LuPlus className="h-4 w-4" />
                            Add Article
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Image</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Published</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <img src={item.image_url} alt={item.title_en} className="h-14 w-24 rounded-lg object-cover" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-medium line-clamp-1">{item.title_en}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{item.title_id}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.category ? (
                                            <Badge variant="outline">{item.category.name_en}</Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs">
                                        {item.published_at ? new Date(item.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : <span className="italic">Draft</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={item.is_active ? 'default' : 'secondary'}>
                                            {item.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link href={NewsController.edit(item.id).url}>
                                                <Button variant="ghost" size="sm">
                                                    <LuPencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(item)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {news.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No news articles yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
