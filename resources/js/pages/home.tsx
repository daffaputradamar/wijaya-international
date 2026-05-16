import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    useMotionValue,
    useSpring,
    useMotionValueEvent,
    type Variants,
} from 'framer-motion';
import { LuPackage, LuCamera, LuChartBar, LuSmartphone, LuArrowRight, LuCalendar, LuTag } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import Footer from '@/components/public/footer';
import { useLanguage } from '@/lib/language-context';
import { products, news } from '@/routes';
import { Button } from '@/components/ui/button';


// ─── Types ────────────────────────────────────────────────────────────────────
interface BrandData {
    id: number;
    name: string;
    logo_url: string;
}

interface ProjectData {
    id: number;
    name: string;
    image_url: string;
}

interface ProductCategoryData {
    id: number;
    key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
    image_url: string | null;
    video_url: string | null;
}

interface ServiceCardData {
    id: number;
    key: string;
    icon_key: string;
    title_id: string;
    title_en: string;
    body_id: string;
    body_en: string;
}

interface LatestNewsData {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    image_url: string;
    published_at: string | null;
    category: { name_id: string; name_en: string; slug: string } | null;
}

interface HomeProps {
    brands: BrandData[];
    projects: ProjectData[];
    productCategories: ProductCategoryData[];
    serviceCards: ServiceCardData[];
    latestNews: LatestNewsData[];
}

// ─── Shared Variants ──────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: 'spring', stiffness: 120, damping: 14 } as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 90, rotate: -1.5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.1, ease: EASE } },
};

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -80, skewX: -4 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.9, ease: EASE } },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 80, skewX: 4 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.9, ease: EASE } },
};


const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -3, y: 40 },
    visible: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { ...SPRING, duration: 1 } },
};

const popIn: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -8 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};

const clipReveal: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const staggerFast: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const staggerSlow: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
};

// ─── Word Split Heading ───────────────────────────────────────────────────────
function SplitHeading({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    return (
        <motion.h2
            className={className}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '110%', rotate: 4, opacity: 0 },
                            visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.h2>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 800], [0, 340]);
    const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.25]);
    const opacityVideo = useTransform(scrollY, [0, 600], [1, 0.1]);
    const yText = useTransform(scrollY, [0, 600], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.88]);

    const heroWords = ['Empowering', 'Imaging', 'Innovation', 'Across', 'Indonesia'];

    return (
        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center bg-[#041023] overflow-hidden">
            {/* Background Video — aggressive parallax layer */}
            <motion.div
                className="absolute inset-0 origin-center"
                style={{ y: yVideo, scale: scaleVideo, opacity: opacityVideo }}
            >
                <video
                    src="/assets/videos/mixkit-dsrl-camera-shutter-opening-and-closing-2374-hd-ready.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 2, 104, 0.9), rgba(155, 25, 25, 0.6), rgba(0, 3, 139, 0.7))' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to top, rgba(4, 16, 35, 0.9), transparent)' }} />
            </motion.div>

            {/* Content */}
            <motion.div
                className="absolute bottom-12 left-6 right-6 md:left-20 md:right-auto z-10 max-w-5xl"
                style={{ y: yText, opacity: opacityText, scale: scaleText }}
            >
                <motion.p
                    initial={{ opacity: 0, x: -60, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, x: 0, letterSpacing: '0.4em' }}
                    transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                    className="text-white/50 text-xs tracking-[0.4em] uppercase font-medium mb-6"
                >
                    Welcome to Wijaya International
                </motion.p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tighter text-left uppercase overflow-hidden">
                    {heroWords.map((word, i) => (
                        <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
                            <motion.span
                                className="inline-block"
                                initial={{ y: '110%', rotate: 6, opacity: 0 }}
                                animate={{ y: 0, rotate: 0, opacity: 1 }}
                                transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.1 }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h1>
                <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
                    className="h-0.5 bg-white/30 mt-8 max-w-sm"
                />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
                className="absolute bottom-8 right-6 md:right-8 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">Scroll</span>
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="w-px h-12 bg-linear-to-b from-white/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id="about" className="bg-[#041023] py-20 md:py-32 relative z-20 overflow-hidden">
            <div className="mx-auto px-6 md:px-12">
                {/* Top Section - Left Aligned */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-20 max-w-5xl"
                >
                    <motion.p variants={clipReveal} className="text-red-500 text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                        {t('about.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-5xl md:text-6xl lg:text-5xl font-bold text-white leading-tight mb-6"
                    >
                        {t('about.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-base text-white/80 leading-relaxed"
                    >
                        {t('about.body')}
                    </motion.p>
                </motion.div>

                {/* Statistics Block with Gradient Background */}
                <motion.div
                    variants={scaleIn}
                    className="relative overflow-hidden mb-16 rounded-lg border border-[#1833a0]/30"
                >
                    {/* Gradient Background: Blue to Red */}
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <img
                            src="/assets/images/img1.png"
                            alt="About background"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay: Red to Purple/Blue */}
                        <div className="absolute inset-0 bg-linear-to-b from-red-600/70 via-red-500/60 to-[#000168]/80 mix-blend-multiply" />
                    </div>

                    {/* Statistics Grid */}
                    <div
                        className="relative z-10 p-16 lg:p-24 grid grid-cols-1 sm:grid-cols-3 gap-12 min-h-125"
                    >
                        {[
                            { value: t('about.stat1.value'), label: t('about.stat1.label') },
                            { value: t('about.stat2.value'), label: t('about.stat2.label') },
                            { value: t('about.stat3.value'), label: t('about.stat3.label') },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={popIn}
                                className={`flex flex-col gap-4 items-center text-center justify-center relative ${
                                    index < 2 ? 'sm:border-r-2 border-white' : ''
                                }`}
                            >
                                <p className="text-8xl lg:text-9xl font-light font-sans text-white tracking-tight shrink-0 whitespace-nowrap">
                                    {stat.value}
                                </p>
                                <p className="text-white/90 text-sm lg:text-base leading-snug font-bold uppercase tracking-widest shrink-0">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Paragraph */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="mb-8 max-w-3xl"
                >
                    <p className="text-white/80 text-base leading-relaxed">
                        {t('about.body2')}
                    </p>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                >
                    <SplitIconButton
                        text={t('about.cta')}
                        icon={<LuArrowRight className="w-5 h-5" />}
                        variant="red"
                        size="lg"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    />
                </motion.div>
            </div>
        </section>
    );
}

// ─── Service Icon Component ───────────────────────────────────────────────────
function ServiceIcon({ iconKey, className = 'w-16 h-16' }: { iconKey: string; className?: string }) {
    const svgKeys = ['distribution', 'retail', 'manufacture'];

    if (svgKeys.includes(iconKey)) {
        return (
            <div
                className={className}
                style={{
                    backgroundColor: '#ef4444',
                    WebkitMaskImage: `url(/assets/icons/${iconKey}.svg)`,
                    maskImage: `url(/assets/icons/${iconKey}.svg)`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                }}
            />
        );
    }

    const iconMap: Record<string, React.ReactNode> = {
        imaging: <LuCamera className={className} />,
        marketing: <LuChartBar className={className} />,
        accessories: <LuSmartphone className={className} />,
    };

    return (
        <div className="flex items-center justify-center text-red-500 transition-colors duration-300">
            {iconMap[iconKey] ?? <LuPackage className={className} />}
        </div>
    );
}

// ─── What We Do Section ───────────────────────────────────────────────────────
function WhatWeDoSection({ serviceCards: cards }: { serviceCards: ServiceCardData[] }) {
    const { t, lang } = useLanguage();

    const serviceCards = cards.length > 0 ? cards.map((card) => ({
        key: card.key,
        title: lang === 'id' ? card.title_id : card.title_en,
        body: lang === 'id' ? card.body_id : card.body_en,
    })) : [
        { key: 'distribution', title: t('service.distribution.title'), body: t('service.distribution.body') },
        { key: 'retail', title: t('service.retail.title'), body: t('service.retail.body') },
        { key: 'manufacture', title: t('service.manufacture.title'), body: t('service.manufacture.body') },
    ];

    return (
        <section id="services" className="bg-background py-32 px-6 lg:px-12 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16"
                >
                    <motion.p variants={clipReveal} className="text-red-500 text-xl font-bold mb-2">
                        {t('whatwedo.label')}
                    </motion.p>
                    <motion.p variants={fadeUp} className="mb-4">
                        {t('whatwedo.subtitle')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1833A0] leading-tight max-w-4xl my-4"
                    >
                        {t('whatwedo.headline')}
                    </motion.h2>
                </motion.div>

                {/* Service Cards Grid - 3 columns */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {serviceCards.slice(0, 3).map((card) => (
                        <motion.div
                            key={card.key}
                            variants={{
                                hidden: { opacity: 0, y: 60, scale: 0.9 },
                                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
                            className="rounded-2xl border-2 border-[#000168] p-10 bg-white flex flex-col items-center justify-between text-center cursor-pointer hover:shadow-xl transition-shadow duration-300 min-h-64"
                        >
                            <div className="flex-1 flex items-center justify-center py-6">
                                <ServiceIcon iconKey={card.key} className="w-24 h-24" />
                            </div>
                            <h3 className="font-extrabold text-4xl text-[#1833A0]">
                                {card.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Body text below cards */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="text-base leading-relaxed max-w-lg text-[#1833A0]"
                >
                    {t('whatwedo.body')}
                </motion.p>
            </div>
        </section>
    );
}

// ─── Products Teaser ──────────────────────────────────────────────────────────
function ProductsTeaserSection({ productCategories: categories }: { productCategories: ProductCategoryData[] }) {
    const { t, lang } = useLanguage();

    const productCategories = categories.length > 0 ? categories.map((cat) => ({
        key: cat.key,
        title: lang === 'id' ? cat.title_id : cat.title_en,
        body: lang === 'id' ? cat.body_id : cat.body_en,
        image: cat.image_url ?? '/assets/images/brand-management.png',
        video_url: cat.video_url,
    })) : [
        { key: 'brand', title: t('service.brand.title'), body: t('service.brand.body'), image: '/assets/images/brand-management.png', video_url: null },
        { key: 'imaging', title: t('service.imaging.title'), body: t('service.imaging.body'), image: '/assets/images/imaging-solution.png', video_url: null },
        { key: 'camera', title: t('service.camera.title'), body: t('service.camera.body'), image: '/assets/images/camera-support.png', video_url: null },
        { key: 'technical', title: t('products.technical.title'), body: t('products.technical.body'), image: '/assets/images/technical-service.png', video_url: null },
    ];

    return (
        <section id="products" className="bg-[#1833a0] text-white py-24 px-6 lg:px-12 relative z-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:gap-20 items-start">
                    {/* Left: Header */}
                    <motion.div
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="flex flex-col gap-6"
                    >
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {t('service.services.title')}
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-base leading-relaxed text-white/80 max-w-4xl">
                            {t('service.services.body')}
                        </motion.p>
                    </motion.div>

                    {/* Right: 2x2 Card Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {productCategories.slice(0, 4).map((cat, i) => (
                            <motion.div
                                key={cat.key}
                                variants={{
                                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
                                }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: EASE } }}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
                                onClick={() => router.visit(products().url)}
                            >
                                {/* Background */}
                                {cat.video_url ? (
                                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                                        <source src={cat.video_url} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 2, 104, 0.65), rgba(155, 25, 25, 0.45), rgba(0, 3, 139, 0.55))' }} />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-extrabold text-2xl sm:text-3xl lg:text-5xl group-hover:text-lg sm:group-hover:text-2xl leading-tight mb-2 transition-[font-size] duration-300">
                                        {cat.title}
                                    </h3>
                                    <p className="text-white/70 text-xs leading-relaxed mb-3 line-clamp-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
                                        {cat.body}
                                    </p>
                                    <span className="text-red-400 text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        {t('about.cta')}
                                        <LuArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                            <SplitIconButton
                                text={t('about.cta')}
                                icon={<LuArrowRight className="w-5 h-5" />}
                                variant="red"
                                size="lg"
                                onClick={() => router.visit(products().url)}
                            />
                        </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Brands Section ───────────────────────────────────────────────────────────
function BrandsSection({ brands: brandData }: { brands: BrandData[] }) {
    const { t } = useLanguage();

    const brands = brandData.length > 0
        ? brandData.map((b) => ({ name: b.name, image: b.logo_url }))
        : [
            // Row 1
            { name: 'SBOX', image: '/assets/brands/SBOX.png' },
            { name: 'Kodak PixPro', image: '/assets/brands/kodakpixpro.png' },
            { name: 'Kodak Charmera', image: '/assets/brands/kodak charmera.png' },
            { name: 'Canon', image: '/assets/brands/Canon.png' },
            { name: 'Sony', image: '/assets/brands/Sony.png' },
            { name: 'DJI', image: '/assets/brands/DJI.png' },
            { name: 'FeiYuTech', image: '/assets/brands/Feiyutech.png' },
            { name: '7Artisans', image: '/assets/brands/7artisan.png' },
            // Row 2
            { name: 'Fujifilm', image: '/assets/brands/fujifilm.png' },
            { name: 'Nikon', image: '/assets/brands/nikon.png' },
            { name: 'Panasonic', image: '/assets/brands/panasonic.png' },
            { name: 'Instax', image: '/assets/brands/instax.png' },
            { name: 'Hollyland', image: '/assets/brands/hollyland.png' },
            { name: 'Godox', image: '/assets/brands/godox.png' },
            { name: 'SanDisk', image: '/assets/brands/sandisk.png' },
        ];

    return (
        <section className="bg-muted/10 pt-24 px-6 lg:px-12 border-t border-border relative z-20">
            <div className="">

 <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mb-6"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-bold text-[#1833a0] leading-tight"
                    >
                        Brand Partners
                    </motion.h2>
                </motion.div>

                {/* Brand Grid - Centered 2 Rows */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {brands.map((brand) => (
                        <motion.div
                            key={brand.name}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8, y: 20 },
                                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                            }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: EASE } }}
                            className="flex items-center justify-center aspect-square"
                        >
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="w-full h-full object-contain object-center"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ─── Dealer Network Section ───────────────────────────────────────────────────
function DealerNetworkSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-background pb-24 px-6 lg:px-12 relative z-20 overflow-x-hidden">
             <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mt-12"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-bold text-[#1833a0] leading-tight mb-6"
                    >
                        {t('brands.title')}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-base text-[#000168] leading-relaxed max-w-2xl mx-auto">
                        {t('brands.body')}
                    </motion.p>
                </motion.div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center">
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="object-cover min-h-75"
                    >
                        <img
                            src="/images/wijaya/wijayalocations.avif"
                            alt="Dealer Network"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className='flex flex-col items-center max-w-3xl mx-auto'
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000168] tracking-tight mb-4 text-center">
                            {t('dealer.title')}
                        </h2>
                        <p className="text-sm md:text-base mb-8 text-center max-w-2xl">
                            {t('dealer.body')}
                        </p>
                        <div className="w-full flex justify-center px-4">
                            <SplitIconButton
                                text={t('dealer.cta')}
                                icon={<LuArrowRight className="w-5 h-5" />}
                                variant="red"
                                size="lg"
                                className="max-w-full"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ─── Projects Showcase ────────────────────────────────────────────────────────
// ─── Contact Section ─────────────────────────────────────────────────────────
function ContactSection() {
    const { t } = useLanguage();
    const form = useForm({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/contact/submit', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <div id="contact" className="relative h-[200vh] bg-background">
            <div className="sticky top-0 h-screen z-0 flex items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/assets/videos/mixkit-close-up-of-a-handshake-between-two-colleagues-46755-hd-ready.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(0, 2, 104, 0.7), rgba(155, 25, 25, 0.7), rgba(0, 3, 139, 0.7))' }} />

                {/* Content */}
                <motion.section
                    className="w-full mx-auto py-8 px-6 rounded-2xl lg:px-12 relative z-10"
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left Column: Content */}
                        <motion.div
                            variants={staggerSlow}
                            className="flex flex-col justify-center"
                        >
                            {/* Section Label */}
                            <motion.p
                                variants={clipReveal}
                                className="text-red-500 text-lg font-semibold tracking-[0.4em] uppercase mb-6"
                            >
                                {t('contact.label')}
                            </motion.p>

                            {/* Main Heading */}
                            <motion.h2
                                variants={fadeUp}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-8 whitespace-pre-line"
                            >
                                {t('contact.title')}
                            </motion.h2>

                            {/* Supporting Text */}
                            <motion.p
                                variants={fadeUp}
                                className="text-lg text-white/80 leading-relaxed max-w-xl"
                            >
                                {t('contact.body')}
                            </motion.p>

                            {/* Success Message */}
                            {form.wasSuccessful && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 text-green-400 font-medium"
                                >
                                    ✓ {t('contact.success') ?? 'Your inquiry has been submitted!'}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Right Column: Contact Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="flex flex-col justify-center gap-6"
                        >
                            {/* Name Input */}
                            <input
                                type="text"
                                name="name"
                                placeholder={t('contact.form.name')}
                                value={form.data.name}
                                onChange={e => form.setData('name', e.target.value)}
                                className="w-full px-6 py-4 rounded-full bg-gray-100 backdrop-blur-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                            />
                            {form.errors.name && <p className="-mt-4 text-sm text-red-400">{form.errors.name}</p>}

                            {/* Email Input */}
                            <input
                                type="email"
                                name="email"
                                placeholder={t('contact.form.email')}
                                value={form.data.email}
                                onChange={e => form.setData('email', e.target.value)}
                                className="w-full px-6 py-4 rounded-full bg-gray-100 backdrop-blur-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                            />
                            {form.errors.email && <p className="-mt-4 text-sm text-red-400">{form.errors.email}</p>}

                            {/* Message Textarea */}
                            <textarea
                                name="message"
                                placeholder={t('contact.form.needs')}
                                value={form.data.message}
                                onChange={e => form.setData('message', e.target.value)}
                                rows={5}
                                className="w-full px-6 py-4 rounded-3xl bg-gray-100 backdrop-blur-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                            />
                            {form.errors.message && <p className="-mt-4 text-sm text-red-400">{form.errors.message}</p>}

                            {/* CTA Button */}
                            <div className="mt-4 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    size="lg"
                                    className="w-full py-8 text-xl font-light rounded-2xl"
                                    disabled={form.processing}
                                >
                                    {form.processing ? '...' : t('contact.cta')}
                                </Button>
                            </div>
                        </motion.form>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

// ─── Why Choose Us Section ────────────────────────────────────────────────────
function WhyChooseUsSection() {
    const { t } = useLanguage();
    const [activeKey, setActiveKey] = useState<string>('distributor');

    const features = [
        { key: 'distributor', icon: 'distribution' },
        { key: 'jaringan',    icon: 'jaringan_dealer_nasional' },
        { key: 'garansi',     icon: 'garansi_resmi' },
        { key: 'layanan',     icon: 'layanan_service' },
        { key: 'pengiriman',  icon: 'pengiriman_cepat' },
        { key: 'legalitas',   icon: 'legalitas' },
        { key: 'marketing',   icon: 'marketing' },
    ];

    return (
        <section className="bg-background py-24 px-6 lg:px-12 relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left: Header */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="lg:sticky lg:top-32"
                >
                    <motion.p variants={clipReveal} className="text-red-500 text-xs tracking-[0.4em] uppercase font-bold mb-4">
                        {t('why.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold text-[#000168] leading-tight mb-6"
                    >
                        {t('why.title')}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-base text-gray-600 leading-relaxed">
                        {t('why.body')}
                    </motion.p>
                </motion.div>

                {/* Right: Accordion */}
                <motion.div
                    className="flex flex-col gap-3"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {features.map((feature) => {
                        const isOpen = activeKey === feature.key;
                        return (
                            <motion.div
                                key={feature.key}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                                }}
                                onClick={() => setActiveKey(feature.key)}
                                className={`rounded-2xl border cursor-pointer transition-colors duration-300 overflow-hidden ${
                                    isOpen
                                        ? 'bg-[#1833a0] border-[#1833a0]'
                                        : 'bg-white border-gray-200 hover:border-[#1833a0]/40'
                                }`}
                            >
                                <div className="flex items-center gap-4 px-6 py-5">
                                    {/* Icon */}
                                    <div
                                        className="w-8 h-8 shrink-0"
                                        style={{
                                            backgroundColor: isOpen ? '#ef4444' : '#1833a0',
                                            WebkitMaskImage: `url(/assets/icons/${feature.icon}.svg)`,
                                            maskImage: `url(/assets/icons/${feature.icon}.svg)`,
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center',
                                            maskPosition: 'center',
                                            WebkitMaskSize: 'contain',
                                            maskSize: 'contain',
                                        }}
                                    />
                                    <h3 className={`font-bold text-lg leading-snug ${isOpen ? 'text-white' : 'text-[#000168]'}`}>
                                        {t(`why.${feature.key}.title`)}
                                    </h3>
                                </div>

                                {/* Expandable body */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                                    <p className="px-6 pb-6 text-white/70 text-sm leading-relaxed">
                                        {t(`why.${feature.key}.body`)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

// ─── News Section ─────────────────────────────────────────────────────────────
function NewsSectionHome({ latestNews }: { latestNews: LatestNewsData[] }) {
    const { t, lang } = useLanguage();

    if (latestNews.length === 0) { return null; }

    return (
        <section className="bg-background py-24 px-6 lg:px-12 relative z-20">
            <div className="w-full lg:w-[calc(100%-5rem)] mx-auto">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <motion.p variants={clipReveal} className="text-red-500 text-xs tracking-[0.4em] uppercase font-medium mb-4">
                            {lang === 'id' ? 'Berita & Update' : 'News & Updates'}
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000168] leading-tight">
                            {lang === 'id' ? 'Berita Terbaru' : 'Latest News'}
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}>
                        <SplitIconButton
                            text={lang === 'id' ? 'Lihat Semua Berita' : 'See All News'}
                            icon={<LuArrowRight className="w-5 h-5" />}
                            variant="red"
                            size="lg"
                            onClick={() => router.visit(news().url)}
                        />
                    </motion.div>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {latestNews.map((item, i) => {
                        const title = lang === 'id' ? item.title_id : item.title_en;
                        const categoryName = item.category ? (lang === 'id' ? item.category.name_id : item.category.name_en) : null;
                        const date = item.published_at
                            ? new Date(item.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                            : null;

                        return (
                            <motion.article
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60, scale: 0.95 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE, delay: i * 0.05 } },
                                }}
                                whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
                                className="group flex flex-col rounded-2xl overflow-hidden border border-border/50 bg-background shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                                onClick={() => router.visit(`/news/${item.slug}`)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={item.image_url}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    {categoryName && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 bg-[#000168] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                <LuTag className="w-2.5 h-2.5" />
                                                {categoryName}
                                            </span>
                                        </div>
                                    )}
                                    {/* Arrow */}
                                    <div className="absolute bottom-3 right-3 translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
                                        <div className="bg-red-500 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg">
                                            <LuArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4 gap-2">
                                    {date && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <LuCalendar className="w-3 h-3" />
                                            {date}
                                        </div>
                                    )}
                                    <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-3 group-hover:text-[#000168] transition-colors duration-300">
                                        {title}
                                    </h3>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home({ brands, productCategories, serviceCards, latestNews }: HomeProps) {
    return (
        <GuestLayout hideFooter>
            <Head title="Perusahaan Distribusi Nasional">
                <meta head-key="description" name="description" content="PT Wijaya International adalah distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia. Merek ternama: Sony, Canon, DJI, Feiyutech, Kodak, dan lainnya." />
                <meta head-key="og:title" property="og:title" content="PT Wijaya International | Distribusi Elektronik & Kamera" />
                <meta head-key="og:description" property="og:description" content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia." />
                <meta head-key="twitter:title" name="twitter:title" content="PT Wijaya International | Distribusi Elektronik & Kamera" />
                <meta head-key="twitter:description" name="twitter:description" content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia." />
            </Head>
            <HeroSection />
            <AboutSection />
            <WhatWeDoSection serviceCards={serviceCards} />
            <ProductsTeaserSection productCategories={productCategories} />
            <BrandsSection brands={brands} />
            <DealerNetworkSection />
            <WhyChooseUsSection />
            {/* <NewsSectionHome latestNews={latestNews} /> */}
            <ContactSection />
            {/* Footer is pulled up -100vh to slide over the sticky portfolio */}
            <div className="-mt-[100vh] relative z-30">
                <Footer />
            </div>
        </GuestLayout>
    );
}
