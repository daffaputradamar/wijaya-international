import { Head, Link, useForm } from '@inertiajs/react';
import { LuPencil, LuPlus, LuTrash2 } from 'react-icons/lu';
import * as ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface ProductColor {
    name: string;
    hex: string;
}

interface Product {
    id: number;
    name: string;
    category: string | null;
    brand: { id: number; name: string } | null;
    image_url: string | null;
    colors: ProductColor[];
    is_highlight: boolean;
    sort_order: number;
    is_active: boolean;
}

interface Props {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/admin/products' },
];

export default function ProductsIndex({ products }: Props) {
    const deleteForm = useForm({});

    const handleDelete = (product: Product) => {
        if (!confirm(`Delete product "${product.name}"?`)) return;
        deleteForm.delete(ProductController.destroy(product.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Products</h1>
                        <p className="text-sm text-muted-foreground">Manage the products shown on the public products page.</p>
                    </div>
                    <Link href={ProductController.create().url}>
                        <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white border-0">
                            <LuPlus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/40">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Image</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Brand</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Colors</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Highlight</th>
                                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 dark:divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-muted/20">
                                    <td className="px-4 py-3">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="h-10 w-14 rounded bg-muted object-contain p-0.5" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.name}</p>
                                        {product.category && <p className="text-xs text-muted-foreground">{product.category}</p>}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{product.brand?.name ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {product.colors.map((color) => (
                                                <span
                                                    key={color.name}
                                                    title={color.name}
                                                    className="h-4 w-4 rounded-full border border-black/15 dark:border-white/20"
                                                    style={{ backgroundColor: color.hex }}
                                                />
                                            ))}
                                            {product.colors.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.is_highlight ? <Badge>Highlight</Badge> : <span className="text-xs text-muted-foreground">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge variant={product.is_active ? 'default' : 'destructive'}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={ProductController.edit(product.id).url}>
                                                <Button variant="ghost" size="sm">
                                                    <LuPencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(product)} className="text-destructive hover:text-destructive">
                                                <LuTrash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
