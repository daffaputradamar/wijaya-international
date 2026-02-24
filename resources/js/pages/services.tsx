import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface Service {
    id: number;
    key: string;
    title: string;
    description: string;
    image: string;
}

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
    const { t } = useLanguage();

    return (
        <GuestLayout>
            <Head title="Services">
                <meta head-key="description" name="description" content="Layanan distribusi nasional, dukungan purna jual, dan kemitraan bisnis dari PT Wijaya International untuk seluruh wilayah Indonesia." />
                <meta head-key="og:title" property="og:title" content="Services | PT Wijaya International" />
                <meta head-key="og:description" property="og:description" content="Layanan distribusi nasional, dukungan purna jual, dan kemitraan bisnis dari PT Wijaya International." />
            </Head>

            {/* Page Hero */}
            <section className="pt-32 pb-20 px-6 lg:px-12 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                        {t('nav.services', 'Services')}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                        {t('services.page.title', 'Comprehensive Solutions')}
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">
                        {t('services.page.subtitle', 'End-to-end services tailored for your business growth.')}
                    </p>
                </div>
            </section>

            {/* Service list */}
            <section className="px-6 lg:px-12 pb-24 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto flex flex-col gap-0 border border-white/10 rounded-2xl overflow-hidden">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group relative flex flex-col md:flex-row items-stretch ${
                                index < services.length - 1 ? 'border-b border-white/10' : ''
                            } ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image Background for Mobile / Side for Desktop */}
                            <div className="md:w-2/5 min-h-[300px] overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="md:w-3/5 flex flex-col justify-center px-8 py-12 lg:px-16 bg-[#0f0f0f] relative z-20">
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-4">
                                    0{index + 1} — Service
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
                                    {service.title}
                                </h2>
                                <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                                    {/* Try to translate if it's a key, otherwise display text.
                                        Since t() usually returns the key if strict or translation missing,
                                        we might ideally check. But for now we assume it behaves gracefully.
                                        If description is 'services.distribution_desc', t() should translate it.
                                    */}
                                    {service.description.includes('.') ? t(service.description) : service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
