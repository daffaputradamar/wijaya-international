import { Head, Link } from '@inertiajs/react';
import * as ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import ProductForm from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface BrandOption {
    id: number;
    name: string;
}

interface Props {
    brands: BrandOption[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/admin/products' },
    { title: 'New Product', href: '/admin/products/create' },
];

export default function ProductCreate({ brands }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Product" />

            <div className="mx-auto max-w-6xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">New Product</h1>
                        <p className="text-sm text-muted-foreground">Add a product to the public catalog.</p>
                    </div>
                    <Link href={ProductController.index().url}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                </div>

                <ProductForm brands={brands} submitUrl={ProductController.store().url} submitLabel="Save Product" />
            </div>
        </AppLayout>
    );
}
