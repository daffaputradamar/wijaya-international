import { Link, usePage } from '@inertiajs/react';
import {
    LuPhone,
    LuMail,
    LuMapPin,
} from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { home, privacyPolicy, termsConditions } from '@/routes';
import { getSocialPlatform } from '@/lib/social-platforms';

interface ContactInfoData {
    phone: string | null;
    email: string | null;
    address: string | null;
    maps_embed_url: string | null;
}

interface SocialLinkItem {
    platform: string;
    url: string;
}

export default function Footer() {
    const { t } = useLanguage();
    const { contactInfo, socialLinks } = usePage().props as {
        contactInfo: ContactInfoData | null;
        socialLinks: { social: SocialLinkItem[] } | null;
    };

    const phone = contactInfo?.phone ?? '+62-21628-3588';
    const email = contactInfo?.email ?? 'contact@wijayainternational.com';
    const address = contactInfo?.address ?? 'Alamat Kantor';

    const socialItems = socialLinks?.social?.length
        ? socialLinks.social
        : [
              { platform: 'instagram', url: 'https://instagram.com/' },
              { platform: 'facebook', url: 'https://facebook.com/' },
              { platform: 'youtube', url: 'https://youtube.com/' },
          ];

    const serviceLinks = [
        { label: 'Brand Management', href: `${home().url}#about` },
        { label: 'Imaging Solution', href: `${home().url}#services` },
        { label: 'Camera Support', href: `${home().url}#services` },
        { label: 'Technical Services & Repairs', href: `${home().url}#services` },
    ];

    const companyLinks = [
        { label: t('nav.aboutUs'), href: `${home().url}#about` },
        { label: t('nav.mainBusiness'), href: `${home().url}#services` },
        { label: t('nav.ownerProfile'), href: `${home().url}#about` },
    ];

    return (
        <footer className="relative z-30 h-screen overflow-hidden bg-[#050a1e] text-white">
            {/* Rich Background Gradients & Sweeps */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-[#030614] via-[#081042] to-[#0d1a6e] pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_120%,rgba(13,26,110,0.45),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(13,26,110,0.35),transparent_40%)] pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,16,66,0.3),transparent_60%)] pointer-events-none" />

            {/* Giant Background Logo Watermark */}
            <div className="absolute z-0 w-[160%] max-w-550 md:max-w-400: aspect-[1.74] opacity-[0.06] pointer-events-none select-none">
                <svg
                    className="w-full h-full"
                    viewBox="251.7865 245.6094 89.09 51.154"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="watermarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#0a1a70" />
                            <stop offset="100%" stop-color="#4a8aff" />
                        </linearGradient>
                    </defs>
                    <g transform="matrix(1, 0, 0, 1, 187.7255401611328, 56.680416107177734)">
                        <path
                            d="M 150.981 188.933 L 129.351 188.933 L 134.281 196.572 L 153.151 196.572 L 153.151 191.102 C 153.151 189.907 152.181 188.933 150.981 188.933 Z"
                            fill="url(#watermarkGrad)"
                        />
                        <path
                            d="M 151.701 203.879 L 134.881 203.879 L 134.881 219.618 L 118.851 190.758 C 118.231 189.633 117.041 188.933 115.751 188.933 L 96.961 188.933 L 100.241 194.837 C 101.391 196.903 101.991 199.243 101.991 201.604 L 101.991 219.647 L 85.951 190.754 C 85.321 189.629 84.141 188.929 82.851 188.929 L 64.061 188.929 L 92.461 240.079 L 110.331 240.079 C 112.511 240.079 114.281 238.307 114.281 236.126 L 114.281 220.125 L 125.361 240.083 L 148.891 240.083 C 151.231 240.083 153.141 238.176 153.141 235.828 L 153.141 205.323 C 153.141 204.525 152.491 203.879 151.701 203.879 Z"
                            fill="url(#watermarkGrad)"
                        />
                    </g>
                </svg>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 pb-10 lg:px-12">
                {/* Top: Logo + Description */}
                <div className="flex flex-col items-start gap-1 border-b border-white/20 pb-16 md:flex-row md:items-center md:gap-2d">
                    <Link
                        href={home().url}
                        className="flex shrink-0 items-center gap-3"
                    >
                        <img
                            src="/images/wijaya/logo/wijaya_icon.png"
                            alt="Logo"
                            className="h-auto w-54"
                        />
                    </Link>
                    <p className="max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
                        {t('footer.description')}
                    </p>
                </div>

                {/* Three Columns */}
                <div className="grid grid-cols-1 gap-12 pt-12 md:grid-cols-3 md:gap-16">
                    {/* Layanan */}
                    <div>
                        <h3 className="mb-6 text-lg text-red-500">
                            Layanan
                        </h3>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-200 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="mt-10 mb-6 text-lg text-red-500">
                            {t('contact.social.label')}
                        </h3>
                        <div className="flex items-center gap-4">
                            {socialItems.map((link, idx) => {
                                const platform = getSocialPlatform(link.platform);
                                const Icon = platform?.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={platform?.label ?? link.platform}
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1c39bb]/40 transition-colors hover:bg-red-500 hover:text-white"
                                    >
                                        {Icon && <Icon className="h-5 w-5" />}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Perusahaan */}
                    <div>
                        <h3 className="mb-6 text-lg text-red-500">
                            Perusahaan
                        </h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-200 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Narahubung */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-red-500">
                            Narahubung
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1c39bb]/40 border border-white/10">
                                    <LuPhone className="h-5 w-5 text-red-500" />
                                </div>
                                <a
                                    href={`tel:${phone.replace(/\s/g, '')}`}
                                    className="rounded-full bg-[#1c39bb]/40 border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-[#1833A0] hover:text-white"
                                >
                                    {phone}
                                </a>
                            </div>

                            <div className="flex items-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1c39bb]/40 border border-white/10">
                                    <LuMail className="h-5 w-5 text-red-500" />
                                </div>
                                <a
                                    href={`mailto:${email}`}
                                    className="rounded-full bg-[#1c39bb]/40 border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-[#1833A0] hover:text-white"
                                >
                                    {email}
                                </a>
                            </div>

                            <div className="flex items-center">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1c39bb]/40 border border-white/10">
                                    <LuMapPin className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="rounded-full bg-[#1c39bb]/40 border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-200">
                                    {address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="mt-12 border-t border-white/20" />

                {/* Bottom: Copyright + Legal Links */}
                <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
                    <p className="text-sm text-gray-400">
                        {t('footer.copyright')}
                    </p>

                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.cookie')}
                        </a>
                        <Link
                            href={privacyPolicy().url}
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.privacy')}
                        </Link>
                        <Link
                            href={termsConditions().url}
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.terms')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
