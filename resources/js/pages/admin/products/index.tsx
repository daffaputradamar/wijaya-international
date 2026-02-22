import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/image-upload';
import * as ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface ProductCategory {
    id: number;
    key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
    image_url: string | null;
    video_url: string | null;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    categories: ProductCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Product Categories', href: '/admin/products' },
];

type CreateData = { key: string; title_id: string; title_en: string; body_id: string; body_en: string; image: File | null; sort_order: string; is_active: boolean };
type EditData = CreateData & { _method: string };

export default function ProductsIndex({ categories }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editCategory, setEditCategory] = useState<ProductCategory | null>(null);

    const createForm = useForm<CreateData>({
        key: '', title_id: '', title_en: '', body_id: '', body_en: '',
        image: null, sort_order: String(categories.length), is_active: true,
    });

    const editForm = useForm<EditData>({
        key: '', title_id: '', title_en: '', body_id: '', body_en: '',
        image: null, sort_order: '0', is_active: true, _method: 'PATCH',
    });

    const deleteForm = useForm({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(ProductCategoryController.store().url, {
            forceFormData: true,
            onSuccess: () => { setShowCreate(false); createForm.reset(); },
        });
    };

    const openEdit = (cat: ProductCategory) => {
        setEditCategory(cat);
        editForm.setData({ key: cat.key, title_id: cat.title_id, title_en: cat.title_en, body_id: cat.body_id, body_en: cat.body_en, image: null, sort_order: String(cat.sort_order), is_active: cat.is_active, _method: 'PATCH' });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editCategory) { return; }
        editForm.post(ProductCategoryController.update(editCategory.id).url, {
            forceFormData: true,
            onSuccess: () => { setEditCategory(null); editForm.reset(); },
        });
    };

    const handleDelete = (cat: ProductCategory) => {
        if (!confirm(`Delete category "${cat.title_en}"?`)) { return; }
        deleteForm.delete(ProductCategoryController.destroy(cat.id).url);
    };

    const CategoryForm = ({ form, onSubmit, onCancel, isEdit, currentImageUrl }: { form: typeof createForm | typeof editForm; onSubmit: (e: React.FormEvent) => void; onCancel: () => void; isEdit?: boolean; currentImageUrl?: string | null }) => (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label>Key</Label>
                    <Input value={form.data.key} onChange={(e) => form.setData('key', e.target.value)} placeholder="photography" disabled={isEdit} required />
                    {form.errors.key && <p className="text-xs text-destructive">{form.errors.key}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label>Title (ID)</Label>
                    <Input value={form.data.title_id} onChange={(e) => form.setData('title_id', e.target.value)} required />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Title (EN)</Label>
                    <Input value={form.data.title_en} onChange={(e) => form.setData('title_en', e.target.value)} required />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <Label>Body (ID)</Label>
                <textarea value={form.data.body_id} onChange={(e) => form.setData('body_id', e.target.value)} rows={3} className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label>Body (EN)</Label>
                <textarea value={form.data.body_en} onChange={(e) => form.setData('body_en', e.target.value)} rows={3} className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required />
            </div>
            <ImageUpload label="Image (optional)" currentUrl={currentImageUrl} onChange={(file) => form.setData('image', file)} />
            <div className="flex items-center gap-2">
                <input type="checkbox" id="form-active" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4" />
                <Label htmlFor="form-active">Active</Label>
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={form.processing}>Save</Button>
            </div>
        </form>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Product Categories</h1>
                        <p className="text-sm text-muted-foreground">Manage product categories shown in the homepage products section.</p>
                    </div>
                    <Button onClick={() => setShowCreate(true)} className="gap-2">
                        <LuPlus className="h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Key</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title (EN)</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3 font-mono text-xs">{cat.key}</td>
                                    <td className="px-4 py-3 font-medium">{cat.title_en}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{cat.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={cat.is_active ? 'default' : 'secondary'}>{cat.is_active ? 'Active' : 'Inactive'}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}><LuPencil className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(cat)} className="text-destructive hover:text-destructive"><LuTrash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No categories yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={showCreate} onOpenChange={setShowCreate}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Add Product Category</DialogTitle></DialogHeader>
                    <CategoryForm form={createForm} onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={editCategory !== null} onOpenChange={(open) => { if (!open) { setEditCategory(null); } }}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Edit Category — {editCategory?.title_en}</DialogTitle></DialogHeader>
                    <CategoryForm form={editForm} onSubmit={handleEdit} onCancel={() => setEditCategory(null)} isEdit currentImageUrl={editCategory?.image_url} />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
