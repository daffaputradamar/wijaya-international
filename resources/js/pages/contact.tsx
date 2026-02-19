import { Head } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

function ContactContent() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
    };

    const contactItems = [
        {
            labelKey: 'contact.phone.label',
            value: t('contact.page.phone'),
            href: 'tel:+622112345678',
        },
        {
            labelKey: 'contact.email.label',
            value: t('contact.page.email'),
            href: 'mailto:info@wijayainternational.co.id',
        },
        {
            labelKey: 'contact.address.label',
            value: t('contact.page.address'),
            href: null,
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/5">
                <div className="max-w-7xl mx-auto">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                        {t('contact.label')}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight whitespace-pre-line mb-6">
                        {t('contact.title')}
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">{t('contact.body')}</p>
                </div>
            </section>

            {/* Contact details + social */}
            <section className="py-20 px-6 lg:px-12 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: CTA + contact items */}
                    <div className="flex flex-col gap-10">
                        <a
                            href="mailto:info@wijayainternational.co.id"
                            className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors w-fit"
                        >
                            {t('contact.cta')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </a>

                        <div className="flex flex-col gap-0 border border-white/10 rounded-2xl overflow-hidden">
                            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium px-6 pt-6 pb-4 border-b border-white/5">
                                {t('contact.label')}
                            </p>
                            {contactItems.map((item) => (
                                <div
                                    key={item.labelKey}
                                    className="flex flex-col gap-1.5 px-6 py-5 border-b border-white/5 last:border-b-0"
                                >
                                    <p className="text-white/30 text-xs uppercase tracking-widest">
                                        {t(item.labelKey)}
                                    </p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-white/70 hover:text-white text-sm transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-white/70 text-sm">{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Social + E-commerce + Newsletter */}
                    <div className="flex flex-col gap-10">
                        {/* Social media */}
                        <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium">
                                {t('contact.social.label')}
                            </p>
                            <div className="flex items-center gap-4">
                                {[
                                    { label: 'X (Twitter)', href: 'https://x.com/', icon: (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.677l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    )},
                                    { label: 'Instagram', href: 'https://instagram.com/', icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <circle cx="12" cy="12" r="4.5" />
                                            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                                        </svg>
                                    )},
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm border border-white/10 rounded-full px-4 py-2"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                        <span>{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* E-commerce */}
                        <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium">
                                {t('contact.ecommerce.label')}
                            </p>
                            <div className="flex items-center gap-4">
                                {['Tokopedia', 'Shopee', 'Lazada'].map((store) => (
                                    <span
                                        key={store}
                                        className="text-white/40 text-sm border border-white/10 rounded-full px-4 py-2"
                                    >
                                        {store}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-white font-semibold text-base">{t('newsletter.title')}</p>
                            <p className="text-white/50 text-sm leading-relaxed">{t('newsletter.subtitle')}</p>
                            {submitted ? (
                                <p className="text-green-400 text-sm">✓ Berhasil didaftarkan</p>
                            ) : (
                                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t('newsletter.placeholder')}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-white text-black font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors flex-shrink-0"
                                    >
                                        {t('newsletter.submit')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact — PT Wijaya International" />
            <ContactContent />
        </GuestLayout>
    );
}
