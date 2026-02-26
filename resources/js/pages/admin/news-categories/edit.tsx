import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as NewsCategoryController from '@/actions/App/Http/Controllers/Admin/NewsCategoryController';

interface NewsCategory {
    id: number;
    name_id: string;
    name_en: string;
    slug: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    category: NewsCategory;
}

export default function NewsCategoryEdit({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'News Categories', href: '/admin/news-categories' },
        { title: category.name_en, href: `/admin/news-categories/${category.id}/edit` },
    ];

    const form = useForm<{
        name_id: string;
        name_en: string;
        slug: string;
        sort_order: string;
        is_active: boolean;
        _method: string;
    }>({
        name_id: category.name_id,
        name_en: category.name_en,
        slug: category.slug,
        sort_order: String(category.sort_order),
        is_active: category.is_active,
        _method: 'PATCH',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(NewsCategoryController.update(category.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit — ${category.name_en}`} />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Edit Category</h1>
                        <p className="text-sm text-muted-foreground">{category.name_en}</p>
                    </div>
                    <Link href={NewsCategoryController.index().url}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name_id">Name (Bahasa Indonesia)</Label>
                            <Input
                                id="name_id"
                                value={form.data.name_id}
                                onChange={(e) => form.setData('name_id', e.target.value)}
                                required
                            />
                            {form.errors.name_id && <p className="text-xs text-destructive">{form.errors.name_id}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name_en">Name (English)</Label>
                            <Input
                                id="name_en"
                                value={form.data.name_en}
                                onChange={(e) => form.setData('name_en', e.target.value)}
                                required
                            />
                            {form.errors.name_en && <p className="text-xs text-destructive">{form.errors.name_en}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={form.data.slug}
                            onChange={(e) => form.setData('slug', e.target.value)}
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">Used in URLs. Changing this will break existing links.</p>
                        {form.errors.slug && <p className="text-xs text-destructive">{form.errors.slug}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={form.data.sort_order}
                                onChange={(e) => form.setData('sort_order', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 justify-end">
                            <div className="flex items-center gap-2 pb-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={form.data.is_active}
                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Link href={NewsCategoryController.index().url}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Saving…' : 'Update Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
