import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import ContactSection from '@/components/home/contact-section';
import Footer from '@/components/public/footer';
import GuestLayout from '@/layouts/guest-layout';
import ProfileHeroSection from '@/components/home/profile-hero-section';
import DistributionSection from '@/components/profile/distribution-section';
import RetailSection from '@/components/profile/retail-section';
import ManufactureSection from '@/components/profile/manufacture-section';
import ServiceIcon from '@/components/home/service-icon';
import { ArrowUpIcon } from 'lucide-react';

const navSections = [
    { id: 'distribution', labelKey: 'profile.nav.distribution', iconKey: 'distribution' },
    { id: 'retail', labelKey: 'profile.nav.retail', iconKey: 'retail' },
    { id: 'manufacture', labelKey: 'profile.nav.manufacture', iconKey: 'manufacture' },
] as const;

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

const sectionIds = navSections.map((s) => s.id);

// ─── Profile Page ────────────────────────────────────────────────────────────────
export default function Profile() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState('distribution');

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
            <Head title={t('profile.page.title')}>
                <meta
                    head-key="description"
                    name="description"
                    content={t('profile.page.description')}
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={t('profile.page.ogTitle')}
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={t('profile.page.ogDescription')}
                />
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={t('profile.page.ogTitle')}
                />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={t('profile.page.ogDescription')}
                />
            </Head>

            <div className="fixed right-0 bottom-0 left-0 z-25 mb-6 flex justify-between gap-4 bg-[#000168] py-3 px-5 backdrop-blur-md w-[calc(100%-2rem)] mx-auto rounded-xl">
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

            <ProfileHeroSection />
            <DistributionSection />
            <RetailSection />
            <ManufactureSection />
            <ContactSection />
            <div className="relative z-30 -mt-[100vh]">
                <Footer />
            </div>
        </GuestLayout>
    );
}
