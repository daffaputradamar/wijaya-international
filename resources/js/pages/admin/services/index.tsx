import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as ServiceCardController from '@/actions/App/Http/Controllers/Admin/ServiceCardController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface ServiceCard {
    id: number;
    key: string;
    icon_key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    cards: ServiceCard[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Service Cards', href: '/admin/services' },
];

const ICON_OPTIONS = ['LuPackage', 'LuCamera', 'LuChartBar', 'LuSmartphone', 'LuTruck', 'LuSettings', 'LuStar', 'LuLayers', 'LuZap', 'LuGlobe'];

type FormData = { key: string; icon_key: string; title_id: string; title_en: string; body_id: string; body_en: string; sort_order: string; is_active: boolean };
type EditData = FormData & { _method: string };

export default function ServicesIndex({ cards }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editCard, setEditCard] = useState<ServiceCard | null>(null);

    const createForm = useForm<FormData>({
        key: '', icon_key: 'LuPackage', title_id: '', title_en: '', body_id: '', body_en: '',
        sort_order: String(cards.length), is_active: true,
    });

    const editForm = useForm<EditData>({
        key: '', icon_key: 'LuPackage', title_id: '', title_en: '', body_id: '', body_en: '',
        sort_order: '0', is_active: true, _method: 'PATCH',
    });

    const deleteForm = useForm({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(ServiceCardController.store().url, {
            onSuccess: () => { setShowCreate(false); createForm.reset(); },
        });
    };

    const openEdit = (card: ServiceCard) => {
        setEditCard(card);
        editForm.setData({ key: card.key, icon_key: card.icon_key, title_id: card.title_id, title_en: card.title_en, body_id: card.body_id, body_en: card.body_en, sort_order: String(card.sort_order), is_active: card.is_active, _method: 'PATCH' });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editCard) { return; }
        editForm.post(ServiceCardController.update(editCard.id).url, {
            onSuccess: () => { setEditCard(null); editForm.reset(); },
        });
    };

    const handleDelete = (card: ServiceCard) => {
        if (!confirm(`Delete service card "${card.title_en}"?`)) { return; }
        deleteForm.delete(ServiceCardController.destroy(card.id).url);
    };

    const CardForm = ({ form, onSubmit, onCancel, isEdit }: { form: typeof createForm | typeof editForm; onSubmit: (e: React.FormEvent) => void; onCancel: () => void; isEdit?: boolean }) => (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label>Key</Label>
                    <Input value={form.data.key} onChange={(e) => form.setData('key', e.target.value)} placeholder="distribution" disabled={isEdit} required />
                    {form.errors.key && <p className="text-xs text-destructive">{form.errors.key}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label>Icon</Label>
                    <select value={form.data.icon_key} onChange={(e) => form.setData('icon_key', e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
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
            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1.5 flex-1">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                </div>
                <div className="flex items-center gap-2 pt-5">
                    <input type="checkbox" id="form-active" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} className="h-4 w-4" />
                    <Label htmlFor="form-active">Active</Label>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit" disabled={form.processing}>Save</Button>
            </div>
        </form>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service Cards" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Service Cards</h1>
                        <p className="text-sm text-muted-foreground">Manage the service cards displayed in the What We Do section.</p>
                    </div>
                    <Button onClick={() => setShowCreate(true)} className="gap-2">
                        <LuPlus className="h-4 w-4" />
                        Add Card
                    </Button>
                </div>

                <div className="rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Key</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Icon</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title (EN)</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {cards.map((card) => (
                                <tr key={card.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3 font-mono text-xs">{card.key}</td>
                                    <td className="px-4 py-3 text-muted-foreground text-xs">{card.icon_key}</td>
                                    <td className="px-4 py-3 font-medium">{card.title_en}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{card.sort_order}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={card.is_active ? 'default' : 'secondary'}>{card.is_active ? 'Active' : 'Inactive'}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => openEdit(card)}><LuPencil className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(card)} className="text-destructive hover:text-destructive"><LuTrash2 className="h-4 w-4" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cards.length === 0 && (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No service cards yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog open={showCreate} onOpenChange={setShowCreate}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Add Service Card</DialogTitle></DialogHeader>
                    <CardForm form={createForm} onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
                </DialogContent>
            </Dialog>

            <Dialog open={editCard !== null} onOpenChange={(open) => { if (!open) { setEditCard(null); } }}>
                <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Edit Service Card — {editCard?.title_en}</DialogTitle></DialogHeader>
                    <CardForm form={editForm} onSubmit={handleEdit} onCancel={() => setEditCard(null)} isEdit />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
