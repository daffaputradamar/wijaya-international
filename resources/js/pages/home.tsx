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
import { LuPackage, LuCamera, LuChartBar, LuSmartphone, LuArrowRight } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import Footer from '@/components/public/footer';
import { useLanguage } from '@/lib/language-context';
import { products, projects } from '@/routes';

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

interface HomeProps {
    brands: BrandData[];
    projects: ProjectData[];
    productCategories: ProductCategoryData[];
    serviceCards: ServiceCardData[];
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

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { stiffness: 40, damping: 12 });
    const [display, setDisplay] = useState('0');

    useMotionValueEvent(spring, 'change', (v) => setDisplay(String(Math.round(v))));

    useEffect(() => {
        if (isInView) motionVal.set(target);
    }, [isInView, target, motionVal]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
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
        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
            {/* Background Video — aggressive parallax layer */}
            <motion.div
                className="absolute inset-0 origin-center"
                style={{ y: yVideo, scale: scaleVideo, opacity: opacityVideo }}
            >
                <video
                    src="/videos/wijaya/lake.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
                className="absolute bottom-12 left-6 md:left-20 z-10 max-w-5xl"
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
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tighter text-left uppercase">
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
                className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
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
        <section id="about" className="bg-background py-32 px-6 lg:px-12 relative z-20 overflow-hidden">
            <div>
                {/* Top Section - Centered Header */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mb-16 max-w-5xl mx-auto"
                >
                    <motion.p variants={clipReveal} className="text-red-500 text-xs tracking-[0.4em] uppercase font-semibold mb-6">
                        {t('about.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000168] leading-tight mb-8"
                    >
                        {t('about.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-base leading-relaxed max-w-2xl mx-auto"
                    >
                        {t('about.body')}
                    </motion.p>
                </motion.div>

                {/* Main Highlight Section - Statistics Block */}
                <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: EASE } }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 cursor-default min-h-[400px]"
                >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <img
                            src="/images/wijaya/about.avif"
                            alt="About background"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay: Red to Purple/Blue */}
                        <div className="absolute inset-0 bg-linear-to-b from-red-600/70 via-red-500/60 to-[#000168]/80 mix-blend-multiply" />
                    </div>

                    {/* Statistics Grid */}
                    <div
                        className="relative z-10 p-16 lg:p-24 grid grid-cols-1 sm:grid-cols-3 gap-12 min-h-[400px]"
                    >
                        {[
                            { value: t('about.stat1.value'), label: t('about.stat1.label') },
                            { value: t('about.stat2.value'), label: t('about.stat2.label') },
                            { value: t('about.stat3.value'), label: t('about.stat3.label') },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={popIn}
                                className={`flex flex-col gap-4 items-center text-center justify-end relative ${
                                    index < 2 ? 'sm:border-r-2 border-white' : ''
                                }`}
                            >
                                <p className="text-7xl lg:text-8xl font-medium text-white tracking-tight shrink-0 whitespace-nowrap">
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
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="text-center text-base leading-relaxed max-w-3xl mx-auto"
                >
                    {t('about.body2')}
                </motion.p>
            </div>
        </section>
    );
}

// ─── Service Icon Component ───────────────────────────────────────────────────
function ServiceIcon({ iconKey }: { iconKey: string }) {
    const iconMap: Record<string, React.ReactNode> = {
        distribution: <LuPackage className="w-16 h-16" />,
        imaging: <LuCamera className="w-16 h-16" />,
        marketing: <LuChartBar className="w-16 h-16" />,
        accessories: <LuSmartphone className="w-16 h-16" />,
    };

    return (
        <div className="w-20 h-20 flex items-center justify-center text-red-500 transition-colors duration-300">
            {iconMap[iconKey]}
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
        { key: 'imaging', title: t('service.imaging.title'), body: t('service.imaging.body') },
        { key: 'marketing', title: t('service.marketing.title'), body: t('service.marketing.body') },
        { key: 'accessories', title: t('service.accessories.title'), body: t('service.accessories.body') },
    ];

    return (
        <section id="services" className="bg-secondary/20 py-32 px-6 lg:px-12 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <motion.p variants={clipReveal} className="60 text-xs tracking-[0.4em] uppercase font-medium mb-4 text-red-500">
                        {t('whatwedo.label')}
                    </motion.p>
                    <motion.p variants={fadeLeft} className="text-sm mb-12">{t('whatwedo.subtitle')}</motion.p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
                        <SplitHeading
                            text={t('whatwedo.headline')}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000168] leading-tight"
                        />
                        <motion.p variants={fadeRight} className="text-base leading-relaxed self-end">
                            {t('whatwedo.body')}
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {serviceCards.map((card, i) => (
                        <motion.div
                            key={card.key}
                            variants={{
                                hidden: { opacity: 0, y: 100, rotate: i % 2 === 0 ? -4 : 4, scale: 0.85 },
                                visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 1, ease: EASE } },
                            }}
                            whileHover={{ y: -14, scale: 1.04, rotate: 0.5, transition: { duration: 0.35, ease: EASE } }}
                            className="group relative rounded-2xl overflow-hidden bg-gray-500/5 border border-border/50 cursor-pointer flex flex-col h-full p-8"
                        >
                            <div className="flex justify-center mb-6 shrink-0">
                                <ServiceIcon iconKey={card.key} />
                            </div>
                            <h3 className="font-medium text-xl mb-3 group-hover:translate-y-0.5 transition-transform duration-300 text-[#000168]">{card.title}</h3>
                            <p className="leading-relaxed grow">{card.body}</p>
                        </motion.div>
                    ))}
                </motion.div>
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
        image: cat.image_url ?? '/images/wijaya/hero-bg.jpg',
        video_url: cat.video_url,
    })) : [
        { key: 'photography', title: t('products.photography.title'), body: t('products.photography.body'), image: '/images/wijaya/hero-bg.jpg', video_url: null },
        { key: 'electronics', title: t('products.electronics.title'), body: t('products.electronics.body'), image: '/images/wijaya/consumer-electronics.jpg', video_url: null },
        { key: 'technical', title: t('products.technical.title'), body: t('products.technical.body'), image: '/images/wijaya/road-landscape.jpg', video_url: null },
    ];

    return (
        <section id="products" className="bg-[#000168] text-white py-24 px-6 lg:px-12 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.p
                    variants={clipReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-red-400 text-xs tracking-[0.4em] uppercase font-semibold mb-12"
                >
                    {t('products.label')}
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start min-h-screen">
                    {/* Left: Sticky Text */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="lg:sticky lg:top-24"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            {t('service.services.title')}
                        </h2>
                        <p className="text-base leading-relaxed text-white/90">
                            {t('service.services.body')}
                        </p>
                    </motion.div>

                    {/* Right: Product Grid */}
                    <motion.div
                        className="grid grid-cols-1 gap-6 h-full"
                        style={{ gridAutoRows: '1fr' }}
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {productCategories.map((cat, index) => (
                            <motion.div
                                key={cat.key}
                                variants={{
                                    hidden: { opacity: 0, y: 60, scale: 0.9 },
                                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
                                }}
                                whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
                                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-100"
                            >
                                <div className="w-full h-full">
                                    {cat.video_url ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        >
                                            <source src={cat.video_url} type="video/mp4" />
                                        </video>
                                    ) : cat.key === 'photography' && !cat.video_url ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                        >
                                            <source src="/videos/wijaya/camera-lens.mp4" type="video/mp4" />
                                        </video>
                                    ) : (
                                        <motion.img
                                            src={cat.image}
                                            alt={cat.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.6, ease: EASE }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#000168]/70 via-[#000168]/40 to-[#000168]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-6"
                                    initial={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.h3
                                        className="text-white font-extrabold text-4xl md:text-5xl tracking-tight group-hover:text-red-500"
                                        initial={{ y: 0 }}
                                    >
                                        {cat.title}
                                    </motion.h3>
                                    <motion.p
                                        className="text-white/90 text-sm leading-relaxed line-clamp-3 hidden group-hover:block transition-all duration-400 mt-4"
                                    >
                                        {cat.body}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href={products().url}
                        className="text-sm font-medium text-white hover:text-red-400 transition-colors flex items-center gap-2"
                    >
                        {t('nav.products')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
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
            { name: 'SBOX', image: '/images/wijaya/brands/sbox.avif' },
            { name: 'Kodak', image: '/images/wijaya/brands/kodak.avif' },
            { name: 'Canon', image: '/images/wijaya/brands/canon.avif' },
            { name: 'Sony', image: '/images/wijaya/brands/sony.avif' },
            { name: 'DJI', image: '/images/wijaya/brands/dji.avif' },
            { name: 'Feiyutech', image: '/images/wijaya/brands/feiyutech.avif' },
            { name: '7artisan', image: '/images/wijaya/brands/7artisan.avif' },
        ];

    return (
        <section className="bg-muted/10 pt-24 px-6 lg:px-12 border-t border-border relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="text-center mb-16"
                >
                    <motion.p variants={clipReveal} className="text-red-500 text-xs tracking-[0.4em] uppercase font-medium mb-6">
                        {t('brands.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000168] leading-tight mb-6"
                    >
                        {t('brands.title')}
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-sm leading-relaxed max-w-2xl mx-auto">
                        {t('brands.body')}
                    </motion.p>
                </motion.div>

                {/* Carousel */}
                <Carousel className="w-full">
                    <CarouselContent className="gap-8">
                        {brands.map((brand) => (
                            <CarouselItem key={brand.name} className="basis-auto pl-0">
                                <motion.img
                                    src={brand.image}
                                    alt={brand.name}
                                    whileHover={{ scale: 1.15, transition: { duration: 0.3, ease: EASE } }}
                                    className="w-40 h-40 object-contain cursor-grab active:cursor-grabbing"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}

// ─── Dealer Network Section ───────────────────────────────────────────────────
function DealerNetworkSection() {
    const { t } = useLanguage();

    return (
        <section className="bg-background pb-24 px-6 lg:px-12 relative z-20">
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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000168] tracking-tight mb-4">
                            {t('dealer.title')}
                        </h2>
                        <p className="text-base mb-8 text-center">
                            {t('dealer.body')}
                        </p>
                        <SplitIconButton
                            text={t('dealer.cta')}
                            icon={<LuArrowRight className="w-5 h-5" />}
                            variant="red"
                            size="lg"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        />
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
                    <source src="/videos/wijaya/containerport.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#000168]/75" />

                {/* Content */}
                <motion.section
                    className="w-full lg:w-[calc(100%-5rem)] mx-auto py-8 px-6 rounded-2xl lg:px-12 relative z-10 bg-[#010147]/10 backdrop-blur-sm"
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
                                className="text-red-500 text-xs tracking-[0.4em] uppercase font-medium mb-6"
                            >
                                {t('contact.label')}
                            </motion.p>

                            {/* Main Heading */}
                            <motion.h2
                                variants={fadeUp}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-8 whitespace-pre-line"
                            >
                                {t('contact.title')}
                            </motion.h2>

                            {/* Supporting Text */}
                            <motion.p
                                variants={fadeUp}
                                className="text-base text-white/80 leading-relaxed max-w-xl"
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
                            <div className="mt-6 flex justify-center">
                                <SplitIconButton
                                    type="submit"
                                    text={form.processing ? '...' : t('contact.cta')}
                                    icon={<LuArrowRight className="w-6 h-6" />}
                                    variant="red"
                                    size="lg"
                                    className="w-full justify-center"
                                    disabled={form.processing}
                                />
                            </div>
                        </motion.form>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

// ─── Projects Showcase ────────────────────────────────────────────────────────
function ProjectsShowcaseSection({ projects: projectData }: { projects: ProjectData[] }) {
    const { t } = useLanguage();

    const stats = [
        { value: 127, label: t('projects.stat1.label') },
        { value: 45, label: t('projects.stat2.label') },
        { value: 88, label: t('projects.stat3.label') },
    ];

    const projectsData = projectData.length > 0
        ? projectData.map((p) => ({ id: p.id, name: p.name, image: p.image_url }))
        : [
            { id: null, name: 'Nikon D850 Launch Event', image: '/images/wijaya/hero-bg.jpg' },
            { id: null, name: 'Sony Alpha X Experience', image: '/images/wijaya/consumer-electronics.jpg' },
            { id: null, name: 'National Imaging Summit', image: '/images/wijaya/road-landscape.jpg' },
            { id: null, name: 'Canon Visionary Masterclass', image: '/images/wijaya/about.avif' },
        ];

    return (
        <section className="bg-gray-50 py-24 px-6 lg:px-12 relative z-20">
            <div className='w-full lg:w-[calc(100%-5rem)] mx-auto'>
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {/* Left Column: Content & Statistics */}
                    <motion.div
                        variants={staggerSlow}
                    >
                        {/* Section Label */}
                        <motion.p
                            variants={clipReveal}
                            className="text-red-500 text-xs tracking-[0.4em] uppercase font-medium mb-8"
                        >
                            {t('projects.label')}
                        </motion.p>

                        {/* Main Heading */}
                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000168] leading-tight mb-16"
                        >
                            {t('projects.title')}
                        </motion.h2>

                        {/* Statistics Stack */}
                        <motion.div
                            variants={staggerFast}
                            className="space-y-0"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`py-8 ${index < stats.length - 1 ? 'border-b border-gray-300' : ''}`}
                                >
                                    <p className="text-6xl lg:text-7xl font-light text-[#000168] tracking-tight mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm font-medium text-gray-600 uppercase tracking-widest">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Project Grid (2x2) */}
                    <motion.div
                        className="grid grid-cols-2 gap-6 lg:gap-8"
                        variants={staggerFast}
                    >
                        {projectsData.map((project, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9, y: 40 },
                                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    borderRadius: "48px",
                                    transition: { duration: 0.4, ease: EASE }
                                }}
                                onClick={() => project.id !== null && router.visit(`/projects/${project.id}`)}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg aspect-square"
                            >
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Subtle diagonal stripe pattern overlay */}
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)'
                                }} />
                                {/* Hover tint */}
                                <div className="absolute inset-0 bg-[#000168]/0 group-hover:bg-[#000168]/40 transition-colors duration-500" />

                                {/* Center Name */}
                                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                                    <p className="text-white text-lg md:text-xl font-bold leading-tight opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
                                        {project.name}
                                    </p>
                                </div>

                                {/* Bottom Right Arrow */}
                                <div className="absolute bottom-8 right-8 translate-x-16 translate-y-16 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 ease-out z-20">
                                    <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">
                                        <LuArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="mt-16 flex justify-center"
                >
                    <SplitIconButton
                        text={t('projects.view_all')}
                        icon={<LuArrowRight className="w-5 h-5" />}
                        variant="red"
                        size="lg"
                        onClick={() => router.visit(projects().url)}
                    />
                </motion.div>
            </div>
        </section>
    );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home({ brands, projects, productCategories, serviceCards }: HomeProps) {
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
            <ProjectsShowcaseSection projects={projects} />
            <ContactSection />
            {/* Footer is pulled up -100vh to slide over the sticky portfolio */}
            <div className="-mt-[100vh] relative z-30">
                <Footer />
            </div>
        </GuestLayout>
    );
}
