import { useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { LuArrowDown, LuArrowUp, LuImage, LuPlus, LuStar, LuTrash2, LuX } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BrandOption {
    id: number;
    name: string;
}

interface KeySpec {
    value: string;
    label: string;
}

interface SpecRow {
    type: 'header' | 'row';
    label: string;
    value: string;
}

interface Color {
    name: string;
    hex: string;
}

interface ExistingImage {
    id: number;
    image_url: string;
}

export interface ProductFormValues {
    brand_id: number | null;
    name: string;
    category: string | null;
    key_specs: KeySpec[];
    specifications: SpecRow[];
    colors: Color[];
    is_highlight: boolean;
    sort_order: number;
    is_active: boolean;
    images?: ExistingImage[];
}

interface ProductFormProps {
    brands: BrandOption[];
    product?: ProductFormValues;
    submitUrl: string;
    submitLabel: string;
}

type FormData = {
    brand_id: string;
    name: string;
    category: string;
    key_specs: KeySpec[];
    specifications: SpecRow[];
    colors: Color[];
    images: File[];
    removed_image_ids: number[];
    is_highlight: boolean;
    sort_order: string;
    is_active: boolean;
    _method?: string;
};

function FormCard({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold">{title}</h2>
                    {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
                </div>
                {action}
            </header>
            <div className="p-5">{children}</div>
        </section>
    );
}

function EmptyRow({ children }: { children: ReactNode }) {
    return (
        <p className="rounded-lg border border-dashed px-4 py-6 text-center text-xs text-muted-foreground">{children}</p>
    );
}

export default function ProductForm({ brands, product, submitUrl, submitLabel }: ProductFormProps) {
    const isEdit = product !== undefined;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    const form = useForm<FormData>({
        brand_id: product?.brand_id ? String(product.brand_id) : '',
        name: product?.name ?? '',
        category: product?.category ?? '',
        key_specs: product?.key_specs ?? [],
        specifications: product?.specifications ?? [],
        colors: product?.colors ?? [],
        images: [],
        removed_image_ids: [],
        is_highlight: product?.is_highlight ?? false,
        sort_order: String(product?.sort_order ?? 0),
        is_active: product?.is_active ?? true,
        ...(isEdit ? { _method: 'PATCH' } : {}),
    });

    const existingImages = (product?.images ?? []).filter((image) => !form.data.removed_image_ids.includes(image.id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            // Empty arrays are dropped from FormData; send null so the server receives the field and clears it.
            key_specs: data.key_specs.length > 0 ? data.key_specs : null,
            specifications: data.specifications.length > 0 ? data.specifications : null,
            colors: data.colors.length > 0 ? data.colors : null,
        }));
        form.post(submitUrl, { forceFormData: true });
    };

    const addFiles = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const added = Array.from(files);
        form.setData('images', [...form.data.images, ...added]);
        setNewImagePreviews((prev) => [...prev, ...added.map((file) => URL.createObjectURL(file))]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeNewImage = (index: number) => {
        form.setData('images', form.data.images.filter((_, i) => i !== index));
        setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const updateRow = <K extends 'key_specs' | 'specifications' | 'colors'>(
        field: K,
        index: number,
        patch: Partial<FormData[K][number]>,
    ) => {
        form.setData(field, form.data[field].map((row, i) => (i === index ? { ...row, ...patch } : row)) as never);
    };

    const removeRow = (field: 'key_specs' | 'specifications' | 'colors', index: number) => {
        form.setData(field, form.data[field].filter((_, i) => i !== index) as never);
    };

    const moveSpec = (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= form.data.specifications.length) return;
        const rows = [...form.data.specifications];
        [rows[index], rows[target]] = [rows[target], rows[index]];
        form.setData('specifications', rows);
    };

    const arrayError = (prefix: string) =>
        Object.entries(form.errors as Record<string, string>)
            .filter(([key]) => key === prefix || key.startsWith(`${prefix}.`))
            .map(([, message]) => message)[0];

    const totalImages = existingImages.length + newImagePreviews.length;

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* Main column */}
            <div className="flex flex-col gap-6">
                {/* Basic information */}
                <FormCard title="Basic Information" description="Brand, product name, and category.">
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="brand_id">Brand</Label>
                                <select
                                    id="brand_id"
                                    value={form.data.brand_id}
                                    onChange={(e) => form.setData('brand_id', e.target.value)}
                                    required
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                                >
                                    <option value="">— Select Brand —</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.brand_id && <p className="text-xs text-destructive">{form.errors.brand_id}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={form.data.category}
                                    onChange={(e) => form.setData('category', e.target.value)}
                                    placeholder="e.g. DIGITAL CAMERA"
                                />
                                {form.errors.category && <p className="text-xs text-destructive">{form.errors.category}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="e.g. KODAK PIXPRO C1"
                                required
                            />
                            {form.errors.name && <p className="text-xs text-destructive">{form.errors.name}</p>}
                        </div>
                    </div>
                </FormCard>

                {/* Images */}
                <FormCard title="Images" description="The first image is used as the card thumbnail. Drag order follows upload order.">
                    <div className="flex flex-wrap gap-3">
                        {existingImages.map((image) => (
                            <div key={image.id} className="group relative">
                                <img src={image.image_url} alt="" className="h-24 w-24 rounded-lg border bg-muted object-contain p-1" />
                                <button
                                    type="button"
                                    onClick={() => form.setData('removed_image_ids', [...form.data.removed_image_ids, image.id])}
                                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                                >
                                    <LuX className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                        {newImagePreviews.map((preview, index) => (
                            <div key={preview} className="relative">
                                <img src={preview} alt="" className="h-24 w-24 rounded-lg border bg-muted object-contain p-1" />
                                <span className="absolute left-1 top-1 rounded bg-black/60 px-1 text-[9px] font-medium text-white">new</span>
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                                >
                                    <LuX className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                            <LuImage className="h-5 w-5" />
                            Add
                        </button>
                    </div>
                    {totalImages === 0 && <p className="mt-3 text-xs text-muted-foreground">No images yet — add at least one.</p>}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => addFiles(e.target.files)}
                        className="hidden"
                    />
                    {arrayError('images') && <p className="mt-2 text-xs text-destructive">{arrayError('images')}</p>}
                </FormCard>

                {/* Key specs */}
                <FormCard
                    title="Key Specs"
                    description='Highlight badges in the product overlay (max 6), e.g. "13MP / Megapixels".'
                    action={
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={form.data.key_specs.length >= 6}
                            onClick={() => form.setData('key_specs', [...form.data.key_specs, { value: '', label: '' }])}
                            className="shrink-0 gap-1"
                        >
                            <LuPlus className="h-3.5 w-3.5" /> Add
                        </Button>
                    }
                >
                    <div className="flex flex-col gap-2">
                        {form.data.key_specs.length === 0 && <EmptyRow>No key specs yet.</EmptyRow>}
                        {form.data.key_specs.map((spec, index) => (
                            <div key={index} className="flex items-center gap-2 rounded-lg border bg-background p-2">
                                <Input
                                    value={spec.value}
                                    onChange={(e) => updateRow('key_specs', index, { value: e.target.value })}
                                    placeholder="Value (13MP)"
                                    className="w-32 shrink-0"
                                    required
                                />
                                <Input
                                    value={spec.label}
                                    onChange={(e) => updateRow('key_specs', index, { label: e.target.value })}
                                    placeholder="Label (Megapixels)"
                                    className="flex-1"
                                />
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeRow('key_specs', index)} className="shrink-0 text-destructive hover:text-destructive">
                                    <LuTrash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    {arrayError('key_specs') && <p className="mt-2 text-xs text-destructive">{arrayError('key_specs')}</p>}
                </FormCard>

                {/* Specifications */}
                <FormCard
                    title="Specification Table"
                    description='Add "Section" headers (e.g. LENS) and "Spec" rows for label/value pairs. Reorder with the arrows.'
                    action={
                        <div className="flex shrink-0 gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => form.setData('specifications', [...form.data.specifications, { type: 'header', label: '', value: '' }])}
                                className="gap-1"
                            >
                                <LuPlus className="h-3.5 w-3.5" /> Section
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => form.setData('specifications', [...form.data.specifications, { type: 'row', label: '', value: '' }])}
                                className="gap-1"
                            >
                                <LuPlus className="h-3.5 w-3.5" /> Spec
                            </Button>
                        </div>
                    }
                >
                    <div className="flex flex-col gap-2">
                        {form.data.specifications.length === 0 && <EmptyRow>No specifications yet.</EmptyRow>}
                        {form.data.specifications.map((row, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 rounded-lg p-2 ${
                                    row.type === 'header'
                                        ? 'border-l-4 border-l-[#1833a0] bg-muted/50'
                                        : 'border bg-background'
                                }`}
                            >
                                <div className="flex shrink-0 flex-col">
                                    <button type="button" onClick={() => moveSpec(index, -1)} className="text-muted-foreground hover:text-foreground disabled:opacity-30" disabled={index === 0}>
                                        <LuArrowUp className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => moveSpec(index, 1)} className="text-muted-foreground hover:text-foreground disabled:opacity-30" disabled={index === form.data.specifications.length - 1}>
                                        <LuArrowDown className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                {row.type === 'header' ? (
                                    <>
                                        <span className="shrink-0 rounded bg-[#1833a0]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1833a0]">
                                            Section
                                        </span>
                                        <Input
                                            value={row.label}
                                            onChange={(e) => updateRow('specifications', index, { label: e.target.value })}
                                            placeholder="Section title (e.g. LENS)"
                                            className="flex-1 font-semibold uppercase"
                                            required
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            value={row.label}
                                            onChange={(e) => updateRow('specifications', index, { label: e.target.value })}
                                            placeholder="Label (Focal Length)"
                                            className="flex-1"
                                            required
                                        />
                                        <Input
                                            value={row.value}
                                            onChange={(e) => updateRow('specifications', index, { value: e.target.value })}
                                            placeholder="Value (3.57 mm)"
                                            className="flex-1"
                                        />
                                    </>
                                )}
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeRow('specifications', index)} className="shrink-0 text-destructive hover:text-destructive">
                                    <LuTrash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    {arrayError('specifications') && <p className="mt-2 text-xs text-destructive">{arrayError('specifications')}</p>}
                </FormCard>

                {/* Colors */}
                <FormCard
                    title="Available Colors"
                    description="Display-only chips shown on the product card and overlay."
                    action={
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => form.setData('colors', [...form.data.colors, { name: '', hex: '#1a1a1a' }])}
                            className="shrink-0 gap-1"
                        >
                            <LuPlus className="h-3.5 w-3.5" /> Add
                        </Button>
                    }
                >
                    <div className="flex flex-col gap-2">
                        {form.data.colors.length === 0 && <EmptyRow>No colors yet.</EmptyRow>}
                        {form.data.colors.map((color, index) => (
                            <div key={index} className="flex items-center gap-2 rounded-lg border bg-background p-2">
                                <input
                                    type="color"
                                    value={color.hex}
                                    onChange={(e) => updateRow('colors', index, { hex: e.target.value })}
                                    className="h-9 w-11 shrink-0 cursor-pointer rounded-md border border-input bg-background p-1"
                                />
                                <Input
                                    value={color.name}
                                    onChange={(e) => updateRow('colors', index, { name: e.target.value })}
                                    placeholder="Color name (e.g. Tan)"
                                    className="flex-1"
                                    required
                                />
                                <span className="w-16 shrink-0 font-mono text-xs uppercase text-muted-foreground">{color.hex}</span>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeRow('colors', index)} className="shrink-0 text-destructive hover:text-destructive">
                                    <LuTrash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    {arrayError('colors') && <p className="mt-2 text-xs text-destructive">{arrayError('colors')}</p>}
                </FormCard>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
                <FormCard title="Visibility & Ordering">
                    <div className="flex flex-col gap-4">
                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                className="mt-0.5 h-4 w-4"
                            />
                            <span>
                                <span className="block text-sm font-medium">Active</span>
                                <span className="block text-xs text-muted-foreground">Visible on the public site.</span>
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3">
                            <input
                                type="checkbox"
                                checked={form.data.is_highlight}
                                onChange={(e) => form.setData('is_highlight', e.target.checked)}
                                className="mt-0.5 h-4 w-4"
                            />
                            <span>
                                <span className="flex items-center gap-1 text-sm font-medium">
                                    <LuStar className="h-3.5 w-3.5 text-amber-500" /> Highlight
                                </span>
                                <span className="block text-xs text-muted-foreground">Featured in the brand section on the products page.</span>
                            </span>
                        </label>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={form.data.sort_order}
                                onChange={(e) => form.setData('sort_order', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
                            {form.errors.sort_order && <p className="text-xs text-destructive">{form.errors.sort_order}</p>}
                        </div>
                    </div>
                </FormCard>

                <Button type="submit" disabled={form.processing} className="w-full">
                    {form.processing ? 'Saving…' : submitLabel}
                </Button>
            </aside>
        </form>
    );
}
