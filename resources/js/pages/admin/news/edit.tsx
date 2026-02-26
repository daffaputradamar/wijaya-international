import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/admin/image-upload';
import RichTextEditor from '@/components/admin/rich-text-editor';
import * as NewsController from '@/actions/App/Http/Controllers/Admin/NewsController';

interface NewsCategory {
    id: number;
    name_en: string;
    name_id: string;
}

interface NewsItem {
    id: number;
    news_category_id: number | null;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
    slug: string;
    image_url: string;
    published_at: string | null;
    is_active: boolean;
}

interface Props {
    news: NewsItem;
    categories: NewsCategory[];
}

export default function NewsEdit({ news, categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'News', href: '/admin/news' },
        { title: news.title_en, href: `/admin/news/${news.id}/edit` },
    ];

    const form = useForm<{
        title_id: string;
        title_en: string;
        body_id: string;
        body_en: string;
        news_category_id: string;
        image: File | null;
        published_at: string;
        is_active: boolean;
        _method: string;
    }>({
        title_id: news.title_id,
        title_en: news.title_en,
        body_id: news.body_id,
        body_en: news.body_en,
        news_category_id: news.news_category_id ? String(news.news_category_id) : '',
        image: null,
        published_at: news.published_at ?? '',
        is_active: news.is_active,
        _method: 'PATCH',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(NewsController.update(news.id).url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit — ${news.title_en}`} />

            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Edit Article</h1>
                        <p className="text-sm text-muted-foreground">{news.title_en}</p>
                    </div>
                    <Link href={NewsController.index().url}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Titles */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="title_id">Title (Bahasa Indonesia)</Label>
                            <Input
                                id="title_id"
                                value={form.data.title_id}
                                onChange={(e) => form.setData('title_id', e.target.value)}
                                required
                            />
                            {form.errors.title_id && <p className="text-xs text-destructive">{form.errors.title_id}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="title_en">Title (English)</Label>
                            <Input
                                id="title_en"
                                value={form.data.title_en}
                                onChange={(e) => form.setData('title_en', e.target.value)}
                                required
                            />
                            {form.errors.title_en && <p className="text-xs text-destructive">{form.errors.title_en}</p>}
                        </div>
                    </div>

                    {/* Body ID */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Body (Bahasa Indonesia)</Label>
                        <RichTextEditor
                            value={form.data.body_id}
                            onChange={(html) => form.setData('body_id', html)}
                            placeholder="Tulis isi artikel dalam bahasa Indonesia…"
                        />
                        {form.errors.body_id && <p className="text-xs text-destructive">{form.errors.body_id}</p>}
                    </div>

                    {/* Body EN */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Body (English)</Label>
                        <RichTextEditor
                            value={form.data.body_en}
                            onChange={(html) => form.setData('body_en', html)}
                            placeholder="Write the article body in English…"
                        />
                        {form.errors.body_en && <p className="text-xs text-destructive">{form.errors.body_en}</p>}
                    </div>

                    {/* Cover Image */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Cover Image</Label>
                        <ImageUpload currentUrl={news.image_url} onChange={(file) => form.setData('image', file)} />
                        {form.errors.image && <p className="text-xs text-destructive">{form.errors.image}</p>}
                    </div>

                    {/* Category + Published At */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="news_category_id">Category</Label>
                            <select
                                id="news_category_id"
                                value={form.data.news_category_id}
                                onChange={(e) => form.setData('news_category_id', e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                                <option value="">— No Category —</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name_en} / {cat.name_id}
                                    </option>
                                ))}
                            </select>
                            {form.errors.news_category_id && <p className="text-xs text-destructive">{form.errors.news_category_id}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="published_at">Publish Date & Time</Label>
                            <Input
                                id="published_at"
                                type="datetime-local"
                                value={form.data.published_at}
                                onChange={(e) => form.setData('published_at', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Clear to revert to draft.</p>
                            {form.errors.published_at && <p className="text-xs text-destructive">{form.errors.published_at}</p>}
                        </div>
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={form.data.is_active}
                            onChange={(e) => form.setData('is_active', e.target.checked)}
                            className="h-4 w-4"
                        />
                        <Label htmlFor="is_active">Active (visible on site when published)</Label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Link href={NewsController.index().url}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Saving…' : 'Update Article'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
