import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface Product {
    id: number;
    key: string;
    title: string;
    description: string;
    image: string;
}

interface ProductsProps {
    products: Product[];
}

export default function Products({ products }: ProductsProps) {
    const { t } = useLanguage();

    return (
        <GuestLayout>
            <Head title="Products — PT Wijaya International" />

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                        {t('products.label', 'Our Products')}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        {t('products.page.title', 'World-Class Distribution')}
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">
                        {t('products.page.subtitle', 'Delivering excellence in consumer electronics and more.')}
                    </p>
                </div>
            </section>

            {/* Product categories */}
            {products.map((product, index) => (
                <section
                    key={product.id}
                    className={`relative min-h-[50vh] flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-[#0a0a0a] border-b border-white/5`}
                >
                    {/* Image half */}
                    <div className="md:w-1/2 overflow-hidden relative group">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Text half */}
                    <div className="md:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 bg-[#0f0f0f]">
                        <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                            0{index + 1} — Product Line
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            {product.title}
                        </h2>
                        <p className="text-white/60 text-base leading-relaxed max-w-md mb-8">
                            {product.description.includes('.') ? t(product.description) : product.description}
                        </p>

                        <div>
                            <a
                                href="#"
                                className="inline-flex items-center text-white text-sm font-medium tracking-wide uppercase border-b border-white/30 pb-1 hover:border-white transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>
            ))}
        </GuestLayout>
    );
}
