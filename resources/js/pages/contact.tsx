import { Head } from '@inertiajs/react';
import { useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface ContactInfoData {
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    address: string | null;
    maps_embed_url: string | null;
}

interface SocialLinkData {
    platform: string;
    url: string;
    type: 'social' | 'ecommerce';
}

interface Props {
    contactInfo: ContactInfoData | null;
    socialLinks: {
        social: SocialLinkData[];
        ecommerce: SocialLinkData[];
    };
}

function ContactContent({ contactInfo, socialLinks }: Props) {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
    };

    const phone = contactInfo?.phone ?? t('contact.page.phone');
    const whatsapp = contactInfo?.whatsapp ?? null;
    const emailAddr = contactInfo?.email ?? t('contact.page.email');
    const address = contactInfo?.address ?? t('contact.page.address');
    const mapsUrl = contactInfo?.maps_embed_url ?? null;

    const contactItems = [
        {
            label: t('contact.phone.label'),
            value: phone,
            href: phone ? `tel:${phone.replace(/\s/g, '')}` : null,
        },
        ...(whatsapp ? [{
            label: 'WhatsApp',
            value: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`,
        }] : []),
        {
            label: t('contact.email.label'),
            value: emailAddr,
            href: emailAddr ? `mailto:${emailAddr}` : null,
        },
        {
            label: t('contact.address.label'),
            value: address,
            href: null,
        },
    ];

    const socialItems = socialLinks.social.length > 0
        ? socialLinks.social
        : [
            { platform: 'X (Twitter)', url: 'https://x.com/' },
            { platform: 'Instagram', url: 'https://instagram.com/' },
        ];

    const ecommerceItems = socialLinks.ecommerce.length > 0
        ? socialLinks.ecommerce
        : [
            { platform: 'Tokopedia', url: '#' },
            { platform: 'Shopee', url: '#' },
            { platform: 'Lazada', url: '#' },
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
                            href={emailAddr ? `mailto:${emailAddr}` : '#'}
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
                                    key={item.label}
                                    className="flex flex-col gap-1.5 px-6 py-5 border-b border-white/5 last:border-b-0"
                                >
                                    <p className="text-white/30 text-xs uppercase tracking-widest">
                                        {item.label}
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
                            <div className="flex flex-wrap items-center gap-3">
                                {socialItems.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm border border-white/10 rounded-full px-4 py-2"
                                    >
                                        {social.platform}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* E-commerce */}
                        <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium">
                                {t('contact.ecommerce.label')}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                {ecommerceItems.map((store) => (
                                    <a
                                        key={store.platform}
                                        href={store.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/40 hover:text-white/70 text-sm border border-white/10 rounded-full px-4 py-2 transition-colors"
                                    >
                                        {store.platform}
                                    </a>
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

            {/* Maps embed */}
            {mapsUrl && (
                <section className="px-6 lg:px-12 pb-20 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-white/10 h-80">
                        <iframe
                            src={mapsUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                        />
                    </div>
                </section>
            )}
        </>
    );
}

export default function Contact({ contactInfo, socialLinks }: Props) {
    return (
        <GuestLayout>
            <Head title="Contact">
                <meta head-key="description" name="description" content="Hubungi PT Wijaya International untuk informasi produk, kemitraan distribusi, atau pertanyaan bisnis lainnya. Kami siap membantu Anda." />
                <meta head-key="og:title" property="og:title" content="Contact | PT Wijaya International" />
                <meta head-key="og:description" property="og:description" content="Hubungi PT Wijaya International untuk informasi produk dan kemitraan distribusi." />
            </Head>
            <ContactContent contactInfo={contactInfo} socialLinks={socialLinks} />
        </GuestLayout>
    );
}
