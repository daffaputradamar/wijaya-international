import { Head, Link } from '@inertiajs/react';
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
import { LuPackage, LuCamera, LuChartBar, LuSmartphone } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import Footer from '@/components/public/footer';
import { useLanguage } from '@/lib/language-context';
import { products } from '@/routes';

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
function WhatWeDoSection() {
    const { t } = useLanguage();

    const serviceCards = [
        {
            key: 'distribution',
            title: t('service.distribution.title'),
            body: t('service.distribution.body'),
        },
        {
            key: 'imaging',
            title: t('service.imaging.title'),
            body: t('service.imaging.body'),
        },
        {
            key: 'marketing',
            title: t('service.marketing.title'),
            body: t('service.marketing.body'),
        },
        {
            key: 'accessories',
            title: t('service.accessories.title'),
            body: t('service.accessories.body'),
        },
    ];

    return (
        <section id="what-we-do" className="bg-secondary/20 py-32 px-6 lg:px-12 relative z-20 overflow-hidden">
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
function ProductsTeaserSection() {
    const { t } = useLanguage();

    const productCategories = [
        {
            key: 'photography',
            title: t('products.photography.title'),
            body: t('products.photography.body'),
            image: '/images/wijaya/hero-bg.jpg',
        },
        {
            key: 'electronics',
            title: t('products.electronics.title'),
            body: t('products.electronics.body'),
            image: '/images/wijaya/consumer-electronics.jpg',
        },
        {
            key: 'technical',
            title: t('products.technical.title'),
            body: t('products.technical.body'),
            image: '/images/wijaya/road-landscape.jpg',
        },
    ];

    return (
        <section className="bg-[#000168] text-white py-24 px-6 lg:px-12 relative z-20">
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
                                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-video"
                            >
                                <div className="w-full h-full">
                                    <motion.img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000168]/70 via-[#000168]/40 to-[#000168]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-6"
                                    initial={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.h3
                                        className="text-white font-bold text-4xl md:text-5xl leading-tight group-hover:text-red-500"
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
function BrandsSection() {
    const { t } = useLanguage();
    const brandNames = ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'Panasonic', 'Olympus', 'Sigma', 'Tamron'];

    return (
        <section className="bg-muted/10 py-24 px-6 lg:px-12 border-t border-border relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <motion.p variants={clipReveal} className="60 text-xs tracking-[0.4em] uppercase font-medium mb-10">
                        {t('brands.label')}
                    </motion.p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <SplitHeading
                            text={t('brands.title')}
                            className="text-3xl md:text-4xl font-bold text-[#000168] leading-tight"
                        />
                        <motion.p variants={fadeRight} className="text-sm leading-relaxed">
                            {t('brands.body')}
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-border rounded-xl overflow-hidden border border-border"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                >
                    {brandNames.map((brand) => (
                        <motion.div
                            variants={popIn}
                            key={brand}
                            whileHover={{ scale: 1.15, backgroundColor: 'hsl(var(--secondary))', zIndex: 10, transition: { duration: 0.25 } }}
                            whileTap={{ scale: 0.92 }}
                            className="aspect-square bg-background flex items-center justify-center cursor-pointer relative"
                        >
                            <motion.span
                                className="60 text-xs font-bold tracking-wide"
                                whileHover={{ color: 'hsl(var(--foreground))', letterSpacing: '0.12em' }}
                                transition={{ duration: 0.2 }}
                            >
                                {brand}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ─── Projects Showcase ────────────────────────────────────────────────────────
function ProjectsShowcaseSection() {
    const { t } = useLanguage();

    const stats = [
        { value: parseInt(t('projects.stat1.value')), label: t('projects.stat1.label') },
        { value: parseInt(t('projects.stat2.value')), label: t('projects.stat2.label') },
        { value: parseInt(t('projects.stat3.value')), label: t('projects.stat3.label') },
    ];

    const projectsData = [
        { title: t('projects.1.title'), image: '/images/wijaya/hero-bg.jpg' },
        { title: t('projects.2.title'), image: '/images/wijaya/consumer-electronics.jpg' },
        { title: t('projects.3.title'), image: '/images/wijaya/road-landscape.jpg' },
    ];

    return (
        <div className="relative h-[200vh] bg-background">
            <div className="sticky top-0 h-screen z-0 flex items-center justify-center border-t border-border overflow-hidden">
                <motion.section
                    className="w-full max-w-7xl mx-auto px-6 lg:px-12"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <motion.p variants={clipReveal} className="60 text-xs tracking-[0.4em] uppercase font-medium mb-10">
                        {t('projects.label')}
                    </motion.p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
                        <SplitHeading
                            text={t('projects.title')}
                            className="text-3xl md:text-4xl font-bold text-[#000168] leading-tight"
                        />
                        <motion.div variants={staggerFast} className="grid grid-cols-3 gap-6">
                            {stats.map((stat) => (
                                <motion.div
                                    variants={fadeUp}
                                    key={stat.label}
                                    className="flex flex-col gap-1"
                                >
                                    <p className="text-3xl font-bold text-foreground">
                                        <AnimatedCounter target={stat.value} />
                                    </p>
                                    <p className="80 text-xs leading-snug">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        variants={staggerFast}
                    >
                        {projectsData.map((project, i) => (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 80, scale: 0.7, rotate: i % 2 === 0 ? -5 : 5 },
                                    visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { ...SPRING, delay: i * 0.15 } },
                                }}
                                whileHover={{ y: -16, scale: 1.04, rotate: 0, transition: { duration: 0.4, ease: EASE } }}
                                whileTap={{ scale: 0.97 }}
                                key={project.title}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                            >
                                <div className="aspect-4/5 overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.7, ease: EASE }}
                                    />
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex items-end p-6"
                                    initial={{ opacity: 0.4 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.p
                                        className="text-white font-semibold text-lg"
                                        initial={{ y: 10, opacity: 0.7 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {project.title}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-10 flex justify-center">
                        <button className="text-sm font-medium hover:text-foreground transition-colors border border-border hover:border-foreground/50 rounded-full px-8 py-3">
                            {t('projects.view_all')}
                        </button>
                    </motion.div>
                </motion.section>
            </div>
        </div>
    );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <GuestLayout hideFooter>
            <Head title="Wijaya International — Perusahaan Distribusi Nasional" />
            <HeroSection />
            <AboutSection />
            <WhatWeDoSection />
            <ProductsTeaserSection />
            <BrandsSection />
            <ProjectsShowcaseSection />
            {/* Footer is pulled up -100vh to slide over the sticky portfolio */}
            <div className="-mt-[100vh] relative z-30">
                <Footer />
            </div>
        </GuestLayout>
    );
}
