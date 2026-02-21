import { Link } from '@inertiajs/react';
import { useLanguage } from '@/lib/language-context';
import { home, privacyPolicy, termsConditions } from '@/routes';
import { LuPhone, LuMail, LuMapPin, LuInstagram, LuTwitter, LuYoutube } from 'react-icons/lu';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="min-h-screen relative z-30 bg-[#000d47] text-white flex flex-col justify-between">
            {/* Top Area: Company Intro */}
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Logo & Description */}
                    <div className="flex flex-col gap-6">
                        <Link href={home().url} className="flex items-center gap-3 w-fit">
                            <img src="/images/wijaya/logo.avif" alt="Logo" className="h-10 w-auto object-contain" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-lg tracking-wide">PT. WIJAYA</span>
                                <span className="font-bold text-lg tracking-wide">INTERNATIONAL</span>
                            </div>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Right: Empty space for balance */}
                    <div />
                </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-white/20" />

            {/* Middle Area: Two Columns */}
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Contact (Narahubung) */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">
                            Narahubung
                        </h3>

                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#001a5f] border-2 border-red-500">
                                    <LuPhone className="w-5 h-5 text-red-500" />
                                </div>
                                <a
                                    href="tel:+6221628-3588"
                                    className="bg-gray-900/50 text-gray-200 px-4 py-2 rounded-full text-sm hover:text-white transition-colors"
                                >
                                    +62-21628-3588
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#001a5f] border-2 border-red-500">
                                    <LuMail className="w-5 h-5 text-red-500" />
                                </div>
                                <a
                                    href="mailto:contact@wijayainternational.com"
                                    className="bg-gray-900/50 text-gray-200 px-4 py-2 rounded-full text-sm hover:text-white transition-colors"
                                >
                                    contact@wijayainternational.com
                                </a>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#001a5f] border-2 border-red-500">
                                    <LuMapPin className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="bg-gray-900/50 text-gray-200 px-4 py-2 rounded-full text-sm">
                                    Head-Office
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Social & E-Commerce */}
                    <div className="space-y-12">
                        {/* Social Media Section */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">
                                {t('contact.social.label')}
                            </h3>
                            <div className="flex gap-6">
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuInstagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuTwitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuYoutube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* E-Commerce Section */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">
                                {t('contact.ecommerce.label')}
                            </h3>
                            <div className="flex gap-6">
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuInstagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuTwitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <LuYoutube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-white/20" />

            {/* Bottom Area: Legal & Copyright */}
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-gray-400 text-xs">
                        {t('footer.copyright')}
                    </p>

                    {/* Legal Links */}
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                            {t('footer.cookie')}
                        </a>
                        <a href={privacyPolicy().url} className="text-gray-400 hover:text-white text-xs transition-colors">
                            {t('footer.privacy')}
                        </a>
                        <a href={termsConditions().url} className="text-gray-400 hover:text-white text-xs transition-colors">
                            {t('footer.terms')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
