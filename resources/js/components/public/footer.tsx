import { Link } from '@inertiajs/react';
import {
    LuPhone,
    LuMail,
    LuMapPin,
    LuInstagram,
    LuTwitter,
    LuYoutube,
} from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { home, privacyPolicy, termsConditions } from '@/routes';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative z-30 flex min-h-screen flex-col justify-center gap-32 bg-[#1833A0] text-white">
            {/* Top Area: Company Intro */}
            <div className="mx-auto w-full max-w-7xl px-6 pt-16 lg:px-12 flex flex-col gap-16">
                <div className="flex gap-6">
                    <Link href={home().url} className="flex items-center gap-3">
                        <img
                            src="/images/wijaya/logo/wijaya_white.png"
                            alt="Logo"
                            className="h-12 w-64 object-cover"
                        />
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-300">
                        {t('footer.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                    {/* Left Column: Contact (Narahubung) */}
                    <div>
                        <h3 className="mb-8 text-lg font-bold tracking-widest text-white uppercase">
                            Narahubung
                        </h3>

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-[#001a5f]">
                                    <LuPhone className="h-5 w-5 text-red-500" />
                                </div>
                                <a
                                    href="tel:+6221628-3588"
                                    className="rounded-full bg-gray-900/50 px-4 py-2 text-sm text-gray-200 transition-colors hover:text-white"
                                >
                                    +62-21628-3588
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-[#001a5f]">
                                    <LuMail className="h-5 w-5 text-red-500" />
                                </div>
                                <a
                                    href="mailto:contact@wijayainternational.com"
                                    className="rounded-full bg-gray-900/50 px-4 py-2 text-sm text-gray-200 transition-colors hover:text-white"
                                >
                                    contact@wijayainternational.com
                                </a>
                            </div>
                        </div>
                    </div>
<div>
                        <h3 className="mb-8 text-lg font-bold tracking-widest text-white uppercase invisible">
                            Narahubung
                        </h3>

                        <div className="space-y-6">

                             {/* Location */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-[#001a5f]">
                                    <LuMapPin className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="rounded-full bg-gray-900/50 px-4 py-2 text-sm text-gray-200">
                                    Head-Office
                                </div>
                            </div>

                            {/* Instagram */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-[#001a5f]">
                                    <LuInstagram className="h-5 w-5 text-red-500" />
                                </div>
                                <a
                                    href="tel:+6221628-3588"
                                    className="rounded-full bg-gray-900/50 px-4 py-2 text-sm text-gray-200 transition-colors hover:text-white"
                                >
                                    Instagram
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-white/20" />

            {/* Bottom Area: Legal & Copyright */}
            <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* Copyright */}
                    <p className="text-xs text-gray-400">
                        {t('footer.copyright')}
                    </p>

                    {/* Legal Links */}
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="text-xs text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.cookie')}
                        </a>
                        <a
                            href={privacyPolicy().url}
                            className="text-xs text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.privacy')}
                        </a>
                        <a
                            href={termsConditions().url}
                            className="text-xs text-gray-400 transition-colors hover:text-white"
                        >
                            {t('footer.terms')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
