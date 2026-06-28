import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import ContactSection from '@/components/home/contact-section';
import Footer from '@/components/public/footer';
import GuestLayout from '@/layouts/guest-layout';
import ServicesHeroSection from '@/components/services/services-hero-section';
import BrandManagementSection from '@/components/services/brand-management-section';
import ImagingSolutionSection from '@/components/services/imaging-solution-section';
import CameraSupportSection from '@/components/services/camera-support-section';
import TechnicalServiceSection from '@/components/services/technical-service-section';
import ServiceIcon from '@/components/home/service-icon';
import { ArrowUpIcon } from 'lucide-react';
import QuoteServiceSection from '@/components/services/quote-service-section';

const navSections = [
    { id: 'brand', labelKey: 'services.nav.brand', iconKey: 'brand' },
    { id: 'imaging', labelKey: 'services.nav.imaging', iconKey: 'imaging' },
    { id: 'camera', labelKey: 'services.nav.camera', iconKey: 'camera' },
    { id: 'technical', labelKey: 'services.nav.technical', iconKey: 'technical' },
] as const;

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

const sectionIds = navSections.map((s) => s.id);

export default function Services() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState('brand');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { threshold: 0.3 },
        );

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <GuestLayout hideFooter>
            <Head title={t('services.page.title')}>
                <meta
                    head-key="description"
                    name="description"
                    content={t('services.page.description')}
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={t('services.page.title')}
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={t('services.page.subtitle')}
                />
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={t('services.page.title')}
                />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={t('services.page.subtitle')}
                />
            </Head>

            <div className="fixed right-0 bottom-0 left-0 z-50 mb-6 hidden md:flex justify-between gap-4 bg-[#000168] py-3 px-5 backdrop-blur-md w-[calc(100%-2rem)] mx-auto rounded-xl">
                {navSections.map(({ id, labelKey, iconKey }) => (
                    <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`flex flex-1 items-center rounded-full px-8 py-3 text-white ${
                            activeSection === id ? 'border' : ''
                        }`}
                    >
                        <ServiceIcon iconKey={iconKey} className="mr-2 size-8" />
                        <span className='font-medium text-lg'>{t(labelKey)}</span>
                    </button>
                ))}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center justify-center rounded-full bg-white/20 text-white aspect-square size-[52px] shrink-0"
                >
                    <ArrowUpIcon className="size-6 text-white" />
                </button>
            </div>

            <ServicesHeroSection />
            <QuoteServiceSection/>
            <div className="relative z-0">
                <BrandManagementSection />
                <ImagingSolutionSection />
                <CameraSupportSection />
                <TechnicalServiceSection />
            </div>
            <div className="relative z-0">
                <ContactSection />
            </div>
            <div className="relative z-50 -mt-[100vh]">
                <Footer />
            </div>
        </GuestLayout>
    );
}
