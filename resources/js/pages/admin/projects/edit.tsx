import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/admin/image-upload';
import RichTextEditor from '@/components/admin/rich-text-editor';
import * as ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';

interface Project {
    id: number;
    name: string;
    description: string | null;
    image_url: string;
    sort_order: number;
    is_active: boolean;
}

interface EditProps {
    project: Project;
}

export default function ProjectEdit({ project }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/admin/projects' },
        { title: project.name, href: `/admin/projects/${project.id}/edit` },
    ];

    const form = useForm<{
        name: string;
        description: string;
        image: File | null;
        sort_order: string;
        is_active: boolean;
        _method: string;
    }>({
        name: project.name,
        description: project.description ?? '',
        image: null,
        sort_order: String(project.sort_order),
        is_active: project.is_active,
        _method: 'PATCH',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(ProjectController.update(project.id).url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit — ${project.name}`} />

            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Edit Project</h1>
                        <p className="text-sm text-muted-foreground">{project.name}</p>
                    </div>
                    <Link href={ProjectController.index().url}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            required
                        />
                        {form.errors.name && <p className="text-xs text-destructive">{form.errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Description</Label>
                        <RichTextEditor
                            value={form.data.description}
                            onChange={(html) => form.setData('description', html)}
                            placeholder="Write an article description for this project..."
                        />
                        {form.errors.description && <p className="text-xs text-destructive">{form.errors.description}</p>}
                    </div>

                    {/* Cover Image */}
                    <div className="flex flex-col gap-1.5">
                        <Label>Cover Image</Label>
                        <ImageUpload currentUrl={project.image_url} onChange={(file) => form.setData('image', file)} />
                        {form.errors.image && <p className="text-xs text-destructive">{form.errors.image}</p>}
                    </div>

                    {/* Sort Order + Active */}
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
                                <Label htmlFor="is_active">Active (visible on site)</Label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Link href={ProjectController.index().url}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Saving…' : 'Update Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
