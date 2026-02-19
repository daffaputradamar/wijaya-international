import { Link } from '@inertiajs/react';
import { useLanguage } from '@/lib/language-context';
import { home, products, services, contact, privacyPolicy, termsConditions } from '@/routes';

export default function Footer() {
    const { t } = useLanguage();

    const links = [
        { label: t('nav.home'), href: home() },
        { label: t('nav.products'), href: products() },
        { label: t('nav.services'), href: services() },
        { label: t('nav.contact'), href: contact() },
    ];

    return (
        <footer className="relative z-30 min-h-screen bg-black flex flex-col justify-between py-24 px-6 lg:px-12 border-t border-white/10">
            {/* Get In Touch Integrated into Footer Top */}
            <div className="max-w-7xl mx-auto w-full mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                            {t('contact.label')}
                        </p>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                            {t('contact.title')}
                        </h2>
                        <Link
                            href={contact().url}
                            className="inline-flex items-center gap-3 bg-white text-black font-bold text-sm px-10 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
                        >
                            {t('contact.cta')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        {[
                            { label: t('contact.phone.label'), value: '+62 21 1234 5678', href: 'tel:+622112345678' },
                            { label: t('contact.email.label'), value: 'info@wijayainternational.co.id', href: 'mailto:info@wijayainternational.co.id' },
                            { label: t('contact.address.label'), value: 'Gading Serpong, Tangerang,\nBanten, Indonesia', href: null },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} className="text-white/70 hover:text-white text-sm transition-colors font-medium">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-white/70 text-sm whitespace-pre-line font-medium leading-relaxed">{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Existing Footer Links Section */}
            <div className="flex-1 flex flex-col justify-end pb-12">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href={home().url} className="flex items-center gap-2">
                             <img src="/images/wijaya/logobw.avif" alt="Logo" className="h-8 w-auto object-contain opacity-70" />
                             <span className="text-white font-bold text-xl tracking-wide">PT Wijaya International</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                            {t('footer.about')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('footer.nav_title')}</h4>
                        <nav className="flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={typeof link.href === 'string' ? link.href : link.href.url}
                                    className="text-white/60 hover:text-white transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Social Media</h4>
                        <div className="flex gap-4">
                            {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                                <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all hover:bg-white/5">
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/20 text-xs">
                    &copy; {new Date().getFullYear()} PT Wijaya International. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link href={privacyPolicy().url} className="text-white/30 hover:text-white text-xs transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href={termsConditions().url} className="text-white/30 hover:text-white text-xs transition-colors">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
