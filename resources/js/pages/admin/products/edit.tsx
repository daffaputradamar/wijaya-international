import { Head, Link } from '@inertiajs/react';
import * as ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import ProductForm from '@/components/admin/product-form';
import type { ProductFormValues } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface BrandOption {
    id: number;
    name: string;
}

interface Props {
    brands: BrandOption[];
    product: ProductFormValues & { id: number };
}

export default function ProductEdit({ brands, product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: product.name, href: `/admin/products/${product.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />

            <div className="mx-auto max-w-6xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Edit Product</h1>
                        <p className="text-sm text-muted-foreground">{product.name}</p>
                    </div>
                    <Link href={ProductController.index().url}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <ProductForm
                    brands={brands}
                    product={product}
                    submitUrl={ProductController.update(product.id).url}
                    submitLabel="Save Changes"
                />
            </div>
        </AppLayout>
    );
}
