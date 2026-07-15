import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { LuPencil, LuPlus, LuTrash2 } from 'react-icons/lu';
import * as BrandController from '@/actions/App/Http/Controllers/Admin/BrandController';
import ImageUpload from '@/components/admin/image-upload';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Brand {
    id: number;
    name: string;
    logo_url: string;
    sort_order: number;
    is_active: boolean;
    products_count: number;
}

interface Props {
    brands: Brand[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/admin/brands' },
];

export default function BrandsIndex({ brands }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editBrand, setEditBrand] = useState<Brand | null>(null);

    const createForm = useForm<{
        name: string;
        logo: File | null;
        sort_order: string;
        is_active: boolean;
    }>({
        name: '',
        logo: null,
        sort_order: String(brands.length + 1),
        is_active: true,
    });

    const editForm = useForm<{
        name: string;
        logo: File | null;
        sort_order: string;
        is_active: boolean;
        _method: string;
    }>({
        name: '',
        logo: null,
        sort_order: '0',
        is_active: true,
        _method: 'PATCH',
    });

    const deleteForm = useForm({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(BrandController.store().url, {
            forceFormData: true,
            onSuccess: () => {
                setShowCreate(false);
                createForm.reset();
            },
        });
    };

    const openEdit = (brand: Brand) => {
        setEditBrand(brand);
        editForm.setData({
            name: brand.name,
            logo: null,
            sort_order: String(brand.sort_order),
            is_active: brand.is_active,
            _method: 'PATCH',
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editBrand) return;
        editForm.post(BrandController.update(editBrand.id).url, {
            forceFormData: true,
            onSuccess: () => {
                setEditBrand(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (brand: Brand) => {
        if (!confirm(`Delete brand "${brand.name}"? This also deletes its ${brand.products_count} product(s).`)) return;
        deleteForm.delete(BrandController.destroy(brand.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Brands</h1>
                        <p className="text-sm text-muted-foreground">Manage the brands shown on the public products page.</p>
                    </div>
                    <Button onClick={() => setShowCreate(true)} className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0">
                        <LuPlus className="h-4 w-4" />
                        Add Brand
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Logo</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Products</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                            {brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <img src={brand.logo_url} alt={brand.name} className="h-8 w-auto max-w-[100px] rounded bg-white object-contain p-1" />
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{brand.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{brand.products_count}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{brand.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={brand.is_active ? 'default' : 'destructive'}>
                                            {brand.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => openEdit(brand)}>
                                                <LuPencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(brand)} className="text-destructive hover:text-destructive">
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {brands.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No brands found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Dialog Form for ADD */}
                <Dialog open={showCreate} onOpenChange={(open) => {
                    if (!open) {
                        setShowCreate(false);
                        createForm.reset();
                    }
                }}>
                    <DialogContent className="max-w-lg sm:rounded-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Add Brand</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <Label htmlFor="create-name">Name</Label>
                                <Input
                                    id="create-name"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    placeholder="e.g. KODAK PIXPRO"
                                    required
                                />
                                {createForm.errors.name && <p className="text-xs text-destructive">{createForm.errors.name}</p>}
                            </div>
                            <div className="space-y-1">
                                <ImageUpload label="Logo" onChange={(file) => createForm.setData('logo', file)} />
                                {createForm.errors.logo && <p className="text-xs text-destructive">{createForm.errors.logo}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="create-sort">Sort Order</Label>
                                <Input
                                    id="create-sort"
                                    type="number"
                                    value={createForm.data.sort_order}
                                    onChange={(e) => createForm.setData('sort_order', e.target.value)}
                                />
                                {createForm.errors.sort_order && <p className="text-xs text-destructive">{createForm.errors.sort_order}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="create-active"
                                    checked={createForm.data.is_active}
                                    onChange={(e) => createForm.setData('is_active', e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <Label htmlFor="create-active">Active (visible on site)</Label>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                                <Button type="submit" disabled={createForm.processing}>
                                    {createForm.processing ? 'Saving…' : 'Save Brand'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Dialog Form for EDIT */}
                <Dialog open={editBrand !== null} onOpenChange={(open) => {
                    if (!open) {
                        setEditBrand(null);
                        editForm.reset();
                    }
                }}>
                    <DialogContent className="max-w-lg sm:rounded-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Edit Brand</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEdit} className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    required
                                />
                                {editForm.errors.name && <p className="text-xs text-destructive">{editForm.errors.name}</p>}
                            </div>
                            <div className="space-y-1">
                                <ImageUpload
                                    key={editBrand?.id}
                                    label="Logo"
                                    currentUrl={editBrand?.logo_url}
                                    onChange={(file) => editForm.setData('logo', file)}
                                />
                                {editForm.errors.logo && <p className="text-xs text-destructive">{editForm.errors.logo}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="edit-sort">Sort Order</Label>
                                <Input
                                    id="edit-sort"
                                    type="number"
                                    value={editForm.data.sort_order}
                                    onChange={(e) => editForm.setData('sort_order', e.target.value)}
                                />
                                {editForm.errors.sort_order && <p className="text-xs text-destructive">{editForm.errors.sort_order}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="edit-active"
                                    checked={editForm.data.is_active}
                                    onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <Label htmlFor="edit-active">Active (visible on site)</Label>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={() => setEditBrand(null)}>Cancel</Button>
                                <Button type="submit" disabled={editForm.processing}>
                                    {editForm.processing ? 'Saving…' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
