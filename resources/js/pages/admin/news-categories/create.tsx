import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as NewsCategoryController from '@/actions/App/Http/Controllers/Admin/NewsCategoryController';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'News Categories', href: '/admin/news-categories' },
    { title: 'New Category', href: '/admin/news-categories/create' },
];

export default function NewsCategoryCreate() {
    const form = useForm<{
        name_id: string;
        name_en: string;
        slug: string;
        sort_order: string;
        is_active: boolean;
    }>({
        name_id: '',
        name_en: '',
        slug: '',
        sort_order: '0',
        is_active: true,
    });

    const handleNameEnChange = (value: string) => {
        form.setData('name_en', value);
        if (!form.data.slug || form.data.slug === slugify(form.data.name_en)) {
            form.setData('slug', slugify(value));
        }
    };

    const slugify = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(NewsCategoryController.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New News Category" />

            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">New News Category</h1>
                        <p className="text-sm text-muted-foreground">Create a category to organise news articles.</p>
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
                                placeholder="e.g. Berita Perusahaan"
                                required
                            />
                            {form.errors.name_id && <p className="text-xs text-destructive">{form.errors.name_id}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name_en">Name (English)</Label>
                            <Input
                                id="name_en"
                                value={form.data.name_en}
                                onChange={(e) => handleNameEnChange(e.target.value)}
                                placeholder="e.g. Company News"
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
                            placeholder="auto-generated from English name"
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">Used in URLs, e.g. /news?category=company-news</p>
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
                            {form.processing ? 'Saving…' : 'Save Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
