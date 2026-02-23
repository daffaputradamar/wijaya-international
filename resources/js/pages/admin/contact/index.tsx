import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as ContactInfoController from '@/actions/App/Http/Controllers/Admin/ContactInfoController';
import * as SocialLinkController from '@/actions/App/Http/Controllers/Admin/SocialLinkController';
import { LuPencil, LuTrash2, LuPlus } from 'react-icons/lu';

interface ContactInfo {
    id: number | null;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    address: string | null;
    maps_embed_url: string | null;
}

interface SocialLink {
    id: number;
    platform: string;
    url: string;
    type: 'social' | 'ecommerce';
    sort_order: number;
    is_active: boolean;
}

interface Props {
    contactInfo: ContactInfo | null;
    socialLinks: SocialLink[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Info', href: '/admin/contact' },
];

type InfoFormData = { phone: string; whatsapp: string; email: string; address: string; maps_embed_url: string };
type LinkFormData = { platform: string; url: string; type: 'social' | 'ecommerce'; sort_order: string; is_active: boolean };

function LinkForm({
    data,
    setData,
    errors,
    defaultType,
}: {
    data: LinkFormData;
    setData: (key: keyof LinkFormData, value: string | boolean) => void;
    errors: Partial<Record<keyof LinkFormData, string>>;
    defaultType: 'social' | 'ecommerce';
}) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label>Platform</Label>
                <Input value={data.platform} onChange={(e) => setData('platform', e.target.value)} placeholder="e.g. Instagram" />
                {errors.platform && <p className="text-destructive text-xs mt-1">{errors.platform}</p>}
            </div>
            <div>
                <Label>URL</Label>
                <Input value={data.url} onChange={(e) => setData('url', e.target.value)} placeholder="https://..." />
                {errors.url && <p className="text-destructive text-xs mt-1">{errors.url}</p>}
            </div>
            <div>
                <Label>Type</Label>
                <select
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                    <option value="social">Social Media</option>
                    <option value="ecommerce">E-Commerce</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="link_is_active"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                />
                <Label htmlFor="link_is_active">Active</Label>
            </div>
        </div>
    );
}

export default function ContactIndex({ contactInfo, socialLinks }: Props) {
    const [showAddLink, setShowAddLink] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

    const infoForm = useForm<InfoFormData>({
        phone: contactInfo?.phone ?? '',
        whatsapp: contactInfo?.whatsapp ?? '',
        email: contactInfo?.email ?? '',
        address: contactInfo?.address ?? '',
        maps_embed_url: contactInfo?.maps_embed_url ?? '',
    });

    const addForm = useForm<LinkFormData>({
        platform: '',
        url: '',
        type: 'social',
        sort_order: '0',
        is_active: true,
    });

    const editForm = useForm<LinkFormData & { _method: string }>({
        platform: '',
        url: '',
        type: 'social',
        sort_order: '0',
        is_active: true,
        _method: 'PUT',
    });

    const deleteForm = useForm({});

    const submitInfo = () => {
        infoForm.submit(ContactInfoController.update());
    };

    const openEdit = (link: SocialLink) => {
        editForm.setData({
            platform: link.platform,
            url: link.url,
            type: link.type,
            sort_order: String(link.sort_order),
            is_active: link.is_active,
            _method: 'PUT',
        });
        setEditingLink(link);
    };

    const submitAdd = () => {
        addForm.submit(SocialLinkController.store(), {
            onSuccess: () => {
                setShowAddLink(false);
                addForm.reset();
            },
        });
    };

    const submitEdit = () => {
        if (!editingLink) return;
        editForm.submit(SocialLinkController.update(editingLink.id), {
            onSuccess: () => setEditingLink(null),
        });
    };

    const deleteLink = (link: SocialLink) => {
        if (!confirm(`Delete "${link.platform}"?`)) return;
        deleteForm.submit(SocialLinkController.destroy(link.id));
    };

    const socialMedia = socialLinks.filter((l) => l.type === 'social');
    const ecommerce = socialLinks.filter((l) => l.type === 'ecommerce');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Info" />

            <div className="flex flex-col gap-8 p-6">
                {/* Contact Info Form */}
                <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold mb-6">Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label>Phone</Label>
                            <Input
                                value={infoForm.data.phone}
                                onChange={(e) => infoForm.setData('phone', e.target.value)}
                                placeholder="+62 21 1234 5678"
                            />
                            {infoForm.errors.phone && <p className="text-destructive text-xs mt-1">{infoForm.errors.phone}</p>}
                        </div>
                        <div>
                            <Label>WhatsApp</Label>
                            <Input
                                value={infoForm.data.whatsapp}
                                onChange={(e) => infoForm.setData('whatsapp', e.target.value)}
                                placeholder="+62 812 3456 7890"
                            />
                            {infoForm.errors.whatsapp && <p className="text-destructive text-xs mt-1">{infoForm.errors.whatsapp}</p>}
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                value={infoForm.data.email}
                                onChange={(e) => infoForm.setData('email', e.target.value)}
                                placeholder="info@company.co.id"
                            />
                            {infoForm.errors.email && <p className="text-destructive text-xs mt-1">{infoForm.errors.email}</p>}
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Input
                                value={infoForm.data.address}
                                onChange={(e) => infoForm.setData('address', e.target.value)}
                                placeholder="Jl. ..."
                            />
                            {infoForm.errors.address && <p className="text-destructive text-xs mt-1">{infoForm.errors.address}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <Label>Google Maps Embed URL</Label>
                            <Input
                                value={infoForm.data.maps_embed_url}
                                onChange={(e) => infoForm.setData('maps_embed_url', e.target.value)}
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            {infoForm.errors.maps_embed_url && (
                                <p className="text-destructive text-xs mt-1">{infoForm.errors.maps_embed_url}</p>
                            )}
                        </div>
                    </div>
                    <Button onClick={submitInfo} disabled={infoForm.processing}>
                        Save Contact Info
                    </Button>
                </div>

                {/* Social Links */}
                {[
                    { label: 'Social Media', type: 'social' as const, items: socialMedia },
                    { label: 'E-Commerce', type: 'ecommerce' as const, items: ecommerce },
                ].map((group) => (
                    <div key={group.type} className="rounded-xl border border-border bg-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">{group.label}</h2>
                            <Button
                                size="sm"
                                onClick={() => {
                                    addForm.setData('type', group.type);
                                    setShowAddLink(true);
                                }}
                            >
                                <LuPlus className="mr-1 size-4" /> Add
                            </Button>
                        </div>

                        {group.items.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No {group.label.toLowerCase()} links yet.</p>
                        ) : (
                            <div className="divide-y divide-border">
                                {group.items.map((link) => (
                                    <div key={link.id} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-sm">{link.platform}</span>
                                            <span className="text-muted-foreground text-xs truncate max-w-xs">{link.url}</span>
                                            {!link.is_active && <Badge variant="secondary">Inactive</Badge>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(link)}>
                                                <LuPencil className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => deleteLink(link)}>
                                                <LuTrash2 className="size-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Dialog */}
            <Dialog open={showAddLink} onOpenChange={setShowAddLink}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Link</DialogTitle>
                    </DialogHeader>
                    <LinkForm data={addForm.data} setData={addForm.setData} errors={addForm.errors} defaultType="social" />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setShowAddLink(false)}>
                            Cancel
                        </Button>
                        <Button onClick={submitAdd} disabled={addForm.processing}>
                            Add
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingLink} onOpenChange={(open) => !open && setEditingLink(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
                    </DialogHeader>
                    <LinkForm data={editForm.data} setData={editForm.setData} errors={editForm.errors} defaultType="social" />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setEditingLink(null)}>
                            Cancel
                        </Button>
                        <Button onClick={submitEdit} disabled={editForm.processing}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
