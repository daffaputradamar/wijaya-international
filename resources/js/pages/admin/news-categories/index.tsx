import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as NewsCategoryController from '@/actions/App/Http/Controllers/Admin/NewsCategoryController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface NewsCategory {
    id: number;
    name_id: string;
    name_en: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    categories: NewsCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'News Categories', href: '/admin/news-categories' },
];

export default function NewsCategoriesIndex({ categories }: Props) {
    const deleteForm = useForm({});

    const handleDelete = (category: NewsCategory) => {
        if (!confirm(`Delete category "${category.name_en}"?`)) { return; }
        deleteForm.delete(NewsCategoryController.destroy(category.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News Categories" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">News Categories</h1>
                        <p className="text-sm text-muted-foreground">Manage categories for news articles.</p>
                    </div>
                    <Link href={NewsCategoryController.create().url}>
                        <Button className="gap-2">
                            <LuPlus className="h-4 w-4" />
                            Add Category
                        </Button>
                    </Link>
                </div>

                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name (ID)</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name (EN)</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">{category.name_id}</td>
                                    <td className="px-4 py-3 font-medium">{category.name_en}</td>
                                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{category.slug}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{category.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={category.is_active ? 'default' : 'secondary'}>
                                            {category.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Link href={NewsCategoryController.edit(category.id).url}>
                                                <Button variant="ghost" size="sm">
                                                    <LuPencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(category)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No categories yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
