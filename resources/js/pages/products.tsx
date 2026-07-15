import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import ProductCard from '@/components/products/product-card';
import ProductDetailOverlay from '@/components/products/product-detail-overlay';
import type { PublicBrand, PublicProduct } from '@/components/products/types';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';
import { products as productsRoute } from '@/routes';

interface ProductsProps {
    brands: PublicBrand[];
    products: PublicProduct[];
    filters: { brand: number | null };
}

const HIGHLIGHT_LIMIT = 3;

export default function Products({ brands, products, filters }: ProductsProps) {
    const { t } = useLanguage();
    const activeBrandId: number | 'all' = filters.brand ?? 'all';
    const [selectedProduct, setSelectedProduct] = useState<PublicProduct | null>(null);

    const productsByBrand = useMemo(() => {
        const map = new Map<number, PublicProduct[]>();
        for (const product of products) {
            const list = map.get(product.brand_id) ?? [];
            list.push(product);
            map.set(product.brand_id, list);
        }
        return map;
    }, [products]);

    const visibleSections = useMemo(() => {
        if (activeBrandId === 'all') {
            return brands
                .map((brand) => {
                    const brandProducts = productsByBrand.get(brand.id) ?? [];
                    const highlights = brandProducts.filter((p) => p.is_highlight);
                    return {
                        brand,
                        products: (highlights.length > 0 ? highlights : brandProducts).slice(0, HIGHLIGHT_LIMIT),
                        showMore: true,
                    };
                })
                .filter((section) => section.products.length > 0);
        }

        const brand = brands.find((b) => b.id === activeBrandId);
        if (!brand) return [];

        return [{ brand, products: productsByBrand.get(brand.id) ?? [], showMore: false }];
    }, [activeBrandId, brands, productsByBrand]);

    const selectedBrand = selectedProduct
        ? (brands.find((b) => b.id === selectedProduct.brand_id) ?? null)
        : null;

    const selectBrand = (id: number | 'all') => {
        router.get(
            productsRoute().url,
            id === 'all' ? {} : { brand: id },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                },
            },
        );
    };

    return (
        <GuestLayout>
            <Head title="Products">
                <meta head-key="description" name="description" content="Temukan berbagai produk kamera, aksesoris, dan teknologi terkemuka yang didistribusikan oleh PT Wijaya International di seluruh Indonesia." />
                <meta head-key="og:title" property="og:title" content="Products | PT Wijaya International" />
                <meta head-key="og:description" property="og:description" content="Produk kamera, aksesoris, dan teknologi terkemuka dari merek-merek ternama dunia." />
            </Head>

            <div className="bg-[#f7f7f9] dark:bg-[#0a0c12]">
                {/* Hero */}
                <section className="px-6 pt-32 pb-16 lg:px-12">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h1 className="mb-8 text-6xl font-extrabold tracking-tight text-red-600 md:text-7xl">
                                {t('products.hero.title')}
                            </h1>
                            <div className="max-w-xl space-y-4 text-sm leading-relaxed text-gray-600 dark:text-white/70">
                                <p>{t('products.hero.p1')}</p>
                                <p>{t('products.hero.p2')}</p>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-3xl bg-[#f2f2f4] dark:bg-white/10">
                            <img
                                src="/images/wijaya/consumer-electronics.jpg"
                                alt="Product collection"
                                className="h-72 w-full object-cover md:h-96"
                            />
                        </div>
                    </div>
                </section>

                {/* Brands filter */}
                <section id="brands" className="scroll-mt-28 px-6 pb-12 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="mb-6 text-3xl font-extrabold text-[#1833a0] dark:text-white">
                            {t('products.brands')}
                        </h2>
                        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => selectBrand('all')}
                                    className={`flex h-14 items-center justify-center rounded-xl border-2 px-6 text-sm font-bold transition-colors ${
                                        activeBrandId === 'all'
                                            ? 'border-[#1833a0] text-[#1833a0] dark:border-white dark:text-white'
                                            : 'border-gray-200 text-gray-500 hover:border-gray-300 dark:border-white/15 dark:text-white/60'
                                    }`}
                                >
                                    {t('products.all')}
                                </button>
                                {brands.map((brand) => (
                                    <button
                                        key={brand.id}
                                        type="button"
                                        onClick={() => selectBrand(brand.id)}
                                        title={brand.name}
                                        className={`flex h-14 items-center justify-center rounded-xl border-2 bg-white px-6 transition-colors ${
                                            activeBrandId === brand.id
                                                ? 'border-[#1833a0]'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img src={brand.logo_url} alt={brand.name} className="w-20 max-h-10 object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product sections */}
                <section className="px-6 pb-24 lg:px-12">
                    <div className="mx-auto flex max-w-7xl flex-col gap-16">
                        {visibleSections.map(({ brand, products: sectionProducts, showMore }) => (
                            <div key={brand.id} className="border-t border-gray-200 pt-10 first:border-t-0 first:pt-0 dark:border-white/10">
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img src={brand.logo_url} alt={brand.name} className="max-h-14 w-28 object-contain" />
                                        <h3 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                                            {showMore ? `${t('products.highlight')} ${brand.name}` : brand.name}
                                        </h3>
                                    </div>
                                    {showMore && (
                                        <SplitIconButton
                                            text={t('products.more')}
                                            icon={<LuArrowRight className="h-4 w-4" />}
                                            variant="blue"
                                            size="md"
                                            onClick={() => selectBrand(brand.id)}
                                        />
                                    )}
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {sectionProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onClick={() => setSelectedProduct(product)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {visibleSections.length === 0 && (
                            <p className="py-16 text-center text-gray-500 dark:text-white/60">{t('products.empty')}</p>
                        )}
                    </div>
                </section>
            </div>

            <ProductDetailOverlay
                product={selectedProduct}
                brand={selectedBrand}
                onClose={() => setSelectedProduct(null)}
            />
        </GuestLayout>
    );
}
