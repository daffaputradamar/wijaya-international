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
import * as BrandController from '@/actions/App/Http/Controllers/Admin/BrandController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface Brand {
    id: number;
    name: string;
    logo_url: string;
    sort_order: number;
    is_active: boolean;
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

    const createForm = useForm<{ name: string; logo: File | null; sort_order: string; is_active: boolean }>({
        name: '',
        logo: null,
        sort_order: String(brands.length),
        is_active: true,
    });

    const editForm = useForm<{ name: string; logo: File | null; sort_order: string; is_active: boolean; _method: string }>({
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
        if (!editBrand) { return; }
        editForm.post(BrandController.update(editBrand.id).url, {
            forceFormData: true,
            onSuccess: () => {
                setEditBrand(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (brand: Brand) => {
        if (!confirm(`Delete brand "${brand.name}"?`)) { return; }
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
                        <p className="text-sm text-muted-foreground">Manage brand logos shown on the homepage carousel.</p>
                    </div>
                    <Button onClick={() => setShowCreate(true)} className="gap-2">
                        <LuPlus className="h-4 w-4" />
                        Add Brand
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Logo</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        <img src={brand.logo_url} alt={brand.name} className="h-10 w-auto object-contain" />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{brand.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{brand.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={brand.is_active ? 'default' : 'secondary'}>
                                            {brand.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
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
                                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No brands yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={showCreate} onOpenChange={setShowCreate}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Add Brand</DialogTitle></DialogHeader>
                    <form onSubmit={handleCreate} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="create-name">Name</Label>
                            <Input id="create-name" value={createForm.data.name} onChange={(e) => createForm.setData('name', e.target.value)} required />
                            {createForm.errors.name && <p className="text-xs text-destructive">{createForm.errors.name}</p>}
                        </div>
                        <ImageUpload label="Logo" onChange={(file) => createForm.setData('logo', file)} />
                        {createForm.errors.logo && <p className="text-xs text-destructive">{createForm.errors.logo}</p>}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="create-order">Sort Order</Label>
                            <Input id="create-order" type="number" value={createForm.data.sort_order} onChange={(e) => createForm.setData('sort_order', e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="create-active" checked={createForm.data.is_active} onChange={(e) => createForm.setData('is_active', e.target.checked)} className="h-4 w-4" />
                            <Label htmlFor="create-active">Active</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                            <Button type="submit" disabled={createForm.processing}>Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editBrand !== null} onOpenChange={(open) => { if (!open) { setEditBrand(null); } }}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Edit Brand — {editBrand?.name}</DialogTitle></DialogHeader>
                    <form onSubmit={handleEdit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input id="edit-name" value={editForm.data.name} onChange={(e) => editForm.setData('name', e.target.value)} required />
                            {editForm.errors.name && <p className="text-xs text-destructive">{editForm.errors.name}</p>}
                        </div>
                        <ImageUpload label="Logo" currentUrl={editBrand?.logo_url} onChange={(file) => editForm.setData('logo', file)} />
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="edit-order">Sort Order</Label>
                            <Input id="edit-order" type="number" value={editForm.data.sort_order} onChange={(e) => editForm.setData('sort_order', e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="edit-active" checked={editForm.data.is_active} onChange={(e) => editForm.setData('is_active', e.target.checked)} className="h-4 w-4" />
                            <Label htmlFor="edit-active">Active</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setEditBrand(null)}>Cancel</Button>
                            <Button type="submit" disabled={editForm.processing}>Update</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
