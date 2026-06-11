import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as DealerController from '@/actions/App/Http/Controllers/Admin/DealerController';
import { LuPencil, LuTrash2, LuPlus, LuMapPin, LuInfo } from 'react-icons/lu';

interface Dealer {
    id: number;
    name: string;
    lat: number;
    lng: number;
    address: string | null;
    contact_number: string | null;
    is_open: boolean;
    sort_order: number;
}

interface Props {
    dealers: Dealer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Dealers', href: '/admin/dealers' },
];

export default function DealersIndex({ dealers }: Props) {
    const [showCreate, setShowCreate] = useState(false);
    const [editDealer, setEditDealer] = useState<Dealer | null>(null);

    const createForm = useForm({
        name: '',
        address: '',
        lat: '',
        lng: '',
        contact_number: '',
        is_open: true,
        sort_order: String(dealers.length + 1),
    });

    const editForm = useForm({
        name: '',
        address: '',
        lat: '',
        lng: '',
        contact_number: '',
        is_open: true,
        sort_order: '0',
        _method: 'PATCH',
    });

    const deleteForm = useForm({});

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(DealerController.store().url, {
            onSuccess: () => {
                setShowCreate(false);
                createForm.reset();
            },
        });
    };

    const openEdit = (dealer: Dealer) => {
        setEditDealer(dealer);
        editForm.setData({
            name: dealer.name,
            address: dealer.address || '',
            lat: String(dealer.lat),
            lng: String(dealer.lng),
            contact_number: dealer.contact_number || '',
            is_open: dealer.is_open,
            sort_order: String(dealer.sort_order),
            _method: 'PATCH',
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editDealer) return;
        editForm.post(DealerController.update(editDealer.id).url, {
            onSuccess: () => {
                setEditDealer(null);
                editForm.reset();
            },
        });
    };

    const handleDelete = (dealer: Dealer) => {
        if (!confirm(`Delete dealer "${dealer.name}"?`)) return;
        deleteForm.delete(DealerController.destroy(dealer.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dealers" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Dealer Locator Settings</h1>
                        <p className="text-sm text-muted-foreground">Manage your national dealer network locations and details.</p>
                    </div>
                    <Button onClick={() => setShowCreate(true)} className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0">
                        <LuPlus className="h-4 w-4" />
                        Add Dealer
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Address</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Coordinates</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Contact</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                            {dealers.map((dealer) => (
                                <tr key={dealer.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{dealer.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground font-medium max-w-[240px] truncate" title={dealer.address || ''}>
                                        {dealer.address || '-'}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                                        {dealer.lat.toFixed(5)}, {dealer.lng.toFixed(5)}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {dealer.contact_number || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={dealer.is_open ? 'default' : 'destructive'}>
                                            {dealer.is_open ? 'Open' : 'Closed'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => openEdit(dealer)}>
                                                <LuPencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(dealer)} className="text-destructive hover:text-destructive">
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {dealers.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No dealers found.</td>
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
                    <DialogContent className="max-w-2xl sm:rounded-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Add Dealer Location</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <Label htmlFor="c-name">Dealer Name *</Label>
                                <Input
                                    id="c-name"
                                    value={createForm.data.name}
                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                    required
                                />
                                {createForm.errors.name && <span className="text-xs text-red-600">{createForm.errors.name}</span>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="c-sort">Sort Order</Label>
                                <Input
                                    id="c-sort"
                                    type="number"
                                    value={createForm.data.sort_order}
                                    onChange={(e) => createForm.setData('sort_order', e.target.value)}
                                />
                                {createForm.errors.sort_order && <span className="text-xs text-red-600">{createForm.errors.sort_order}</span>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="c-address">Address</Label>
                                <Input
                                    id="c-address"
                                    value={createForm.data.address}
                                    onChange={(e) => createForm.setData('address', e.target.value)}
                                    placeholder="Street, City, State, ZIP"
                                />
                                {createForm.errors.address && <span className="text-xs text-red-600">{createForm.errors.address}</span>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="c-contact">Contact Number</Label>
                                <Input
                                    id="c-contact"
                                    value={createForm.data.contact_number}
                                    onChange={(e) => createForm.setData('contact_number', e.target.value)}
                                    placeholder="+62 812 3456 7890"
                                />
                                {createForm.errors.contact_number && <span className="text-xs text-red-600">{createForm.errors.contact_number}</span>}
                            </div>

                            <GeocodingAndMap
                                lat={createForm.data.lat}
                                lng={createForm.data.lng}
                                address={createForm.data.address}
                                onChange={(lat, lng) => {
                                    createForm.setData('lat', lat);
                                    createForm.setData('lng', lng);
                                }}
                                errorLat={createForm.errors.lat}
                                errorLng={createForm.errors.lng}
                            />

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    id="c-open"
                                    type="checkbox"
                                    checked={createForm.data.is_open}
                                    onChange={(e) => createForm.setData('is_open', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <Label htmlFor="c-open" className="cursor-pointer font-medium">Dealer is open and active now</Label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createForm.processing} className="bg-red-600 hover:bg-red-700 text-white border-0">
                                    {createForm.processing ? 'Creating...' : 'Save Location'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Dialog Form for EDIT */}
                <Dialog open={!!editDealer} onOpenChange={(open) => {
                    if (!open) {
                        setEditDealer(null);
                        editForm.reset();
                    }
                }}>
                    <DialogContent className="max-w-2xl sm:rounded-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>Edit Dealer Location</DialogTitle>
                        </DialogHeader>
                        {editDealer && (
                            <form onSubmit={handleEdit} className="space-y-4 pt-2">
                                <div className="space-y-1">
                                    <Label htmlFor="e-name">Dealer Name *</Label>
                                    <Input
                                        id="e-name"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        required
                                    />
                                    {editForm.errors.name && <span className="text-xs text-red-600">{editForm.errors.name}</span>}
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="e-sort">Sort Order</Label>
                                    <Input
                                        id="e-sort"
                                        type="number"
                                        value={editForm.data.sort_order}
                                        onChange={(e) => editForm.setData('sort_order', e.target.value)}
                                    />
                                    {editForm.errors.sort_order && <span className="text-xs text-red-600">{editForm.errors.sort_order}</span>}
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="e-address">Address</Label>
                                    <Input
                                        id="e-address"
                                        value={editForm.data.address}
                                        onChange={(e) => editForm.setData('address', e.target.value)}
                                    />
                                    {editForm.errors.address && <span className="text-xs text-red-600">{editForm.errors.address}</span>}
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="e-contact">Contact Number</Label>
                                    <Input
                                        id="e-contact"
                                        value={editForm.data.contact_number}
                                        onChange={(e) => editForm.setData('contact_number', e.target.value)}
                                        placeholder="+62 812 3456 7890"
                                    />
                                    {editForm.errors.contact_number && <span className="text-xs text-red-600">{editForm.errors.contact_number}</span>}
                                </div>

                                <GeocodingAndMap
                                    lat={editForm.data.lat}
                                    lng={editForm.data.lng}
                                    address={editForm.data.address}
                                    onChange={(lat, lng) => {
                                        editForm.setData('lat', lat);
                                        editForm.setData('lng', lng);
                                    }}
                                    errorLat={editForm.errors.lat}
                                    errorLng={editForm.errors.lng}
                                />

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        id="e-open"
                                        type="checkbox"
                                        checked={editForm.data.is_open}
                                        onChange={(e) => editForm.setData('is_open', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <Label htmlFor="e-open" className="cursor-pointer font-medium">Dealer is open and active now</Label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setEditDealer(null)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={editForm.processing} className="bg-red-600 hover:bg-red-700 text-white border-0">
                                        {editForm.processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

// ─── GEOLOCATION MAP SELECTOR SUB-COMPONENT ───────────────────────────────────
interface GeocodingAndMapProps {
    lat: string;
    lng: string;
    address: string;
    onChange: (lat: string, lng: string) => void;
    errorLat?: string;
    errorLng?: string;
}

function GeocodingAndMap({ lat, lng, address, onChange, errorLat, errorLng }: GeocodingAndMapProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const LRef = useRef<any>(null);

    // Dynamic Leaflet loader in client
    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return;

        let mapInstance: any;

        import('leaflet').then((LModule) => {
            const Leaflet = LModule.default || LModule;
            LRef.current = Leaflet;

            // Initial center
            const initialLat = parseFloat(lat) || -7.4478;
            const initialLng = parseFloat(lng) || 112.7183;

            mapInstance = Leaflet.map(mapRef.current, {
                zoomControl: true,
                scrollWheelZoom: true,
            }).setView([initialLat, initialLng], 12);

            Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
            }).addTo(mapInstance);

            leafletMapRef.current = mapInstance;

            // Create initial marker if valid numbers are loaded
            if (!isNaN(initialLat) && !isNaN(initialLng) && lat && lng) {
                markerRef.current = Leaflet.marker([initialLat, initialLng]).addTo(mapInstance);
            }

            // Click-to-pin listener
            mapInstance.on('click', (e: any) => {
                const { lat: clickLat, lng: clickLng } = e.latlng;
                const formattedLat = clickLat.toFixed(6);
                const formattedLng = clickLng.toFixed(6);

                onChange(formattedLat, formattedLng);

                if (markerRef.current) {
                    markerRef.current.setLatLng([clickLat, clickLng]);
                } else {
                    markerRef.current = Leaflet.marker([clickLat, clickLng]).addTo(mapInstance);
                }
            });

            // Recalculate dimensions for absolute alignment
            setTimeout(() => {
                mapInstance.invalidateSize();
            }, 300);
        });

        return () => {
            if (mapInstance) {
                mapInstance.remove();
                leafletMapRef.current = null;
                markerRef.current = null;
            }
        };
    }, []);

    // Sync input updates back into map view coordinates
    useEffect(() => {
        const Leaflet = LRef.current;
        const map = leafletMapRef.current;
        if (!Leaflet || !map) return;

        const numLat = parseFloat(lat);
        const numLng = parseFloat(lng);

        if (!isNaN(numLat) && !isNaN(numLng)) {
            const currentLatLng = markerRef.current?.getLatLng();
            if (!currentLatLng || currentLatLng.lat !== numLat || currentLatLng.lng !== numLng) {
                if (markerRef.current) {
                    markerRef.current.setLatLng([numLat, numLng]);
                } else {
                    markerRef.current = Leaflet.marker([numLat, numLng]).addTo(map);
                }
                map.setView([numLat, numLng], 14);
            }
        } else {
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
                markerRef.current = null;
            }
        }
    }, [lat, lng]);

    // Query Nominatim API for geocoding coordinates of the address
    const handleGeocode = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!address.trim()) {
            setStatus('Enter an address first.');
            return;
        }

        setLoading(true);
        setStatus('Looking up coordinates...');

        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
            const header = { 'Accept-Language': 'en' };
            const res = await fetch(url, { headers: header });
            const data = await res.json();

            if (data && data.length > 0) {
                const foundLat = parseFloat(data[0].lat).toFixed(6);
                const foundLng = parseFloat(data[0].lon).toFixed(6);
                onChange(foundLat, foundLng);
                setStatus('Coordinates found!');
            } else {
                setStatus('Address not found. Please click on the map to pin manually.');
            }
        } catch (err) {
            setStatus('Could not complete address search.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 items-start justify-between min-[450px]:flex-row min-[450px]:items-center">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGeocode}
                    disabled={loading}
                    className="flex items-center gap-1.5 font-medium border-dashed border-red-500 hover:border-red-600 text-red-600"
                >
                    🔍 Auto-detect coordinates from address
                </Button>
                {status && (
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <LuInfo className="h-3 w-3 text-red-600 shrink-0" />
                        {status}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="e-lat">Latitude *</Label>
                    <Input
                        id="e-lat"
                        type="number"
                        placeholder="e.g. -7.4478"
                        step="any"
                        value={lat}
                        onChange={(e) => onChange(e.target.value, lng)}
                        required
                    />
                    {errorLat && <span className="text-xs text-red-600">{errorLat}</span>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="e-lng">Longitude *</Label>
                    <Input
                        id="e-lng"
                        type="number"
                        placeholder="e.g. 112.7183"
                        step="any"
                        value={lng}
                        onChange={(e) => onChange(lat, e.target.value)}
                        required
                    />
                    {errorLng && <span className="text-xs text-red-600">{errorLng}</span>}
                </div>
            </div>

            <div className="space-y-1">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <LuMapPin className="h-3 w-3 text-red-600 shrink-0" />
                    <span>Click anywhere on the map to drop a pin on your dealer location</span>
                </Label>
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-inner bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <div ref={mapRef} className="h-[200px] w-full z-10" />
                </div>
            </div>
        </div>
    );
}
