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
import {
    LuPackage,
    LuCamera,
    LuChartBar,
    LuSmartphone,
    LuArrowRight,
    LuCalendar,
    LuTag,
} from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import Footer from '@/components/public/footer';
import { useLanguage } from '@/lib/language-context';
import { products, news } from '@/routes';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';

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
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: { duration: 1.1, ease: EASE },
    },
};

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -80, skewX: -4 },
    visible: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 80, skewX: 4 },
    visible: {
        opacity: 1,
        x: 0,
        skewX: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -3, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        transition: { ...SPRING, duration: 1 },
    },
};

const popIn: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
    },
};

const clipReveal: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        transition: { duration: 0.9, ease: EASE },
    },
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

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 800], [0, 340]);
    const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.25]);
    const opacityVideo = useTransform(scrollY, [0, 600], [1, 0.1]);
    const yText = useTransform(scrollY, [0, 600], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.88]);

    const heroWords = [
        'Empowering',
        'Imaging',
        'Innovation',
        'Across',
        'Indonesia',
    ];

    return (
        <section className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#041023]">
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
                    className="h-full w-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0, 2, 104, 0.9), rgba(155, 25, 25, 0.6), rgba(0, 3, 139, 0.7))',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to top, rgba(4, 16, 35, 0.9), transparent)',
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className="absolute right-6 bottom-12 left-6 z-10 max-w-5xl md:right-auto md:left-20"
                style={{ y: yText, opacity: opacityText, scale: scaleText }}
            >
                <motion.p
                    initial={{ opacity: 0, x: -60, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, x: 0, letterSpacing: '0.4em' }}
                    transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                    className="mb-6 text-xs font-medium tracking-[0.4em] text-white/50 uppercase"
                >
                    Welcome to Wijaya International
                </motion.p>
                <h1 className="overflow-hidden text-left text-5xl leading-none font-extrabold tracking-tighter text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl">
                    {heroWords.map((word, i) => (
                        <span
                            key={word}
                            className="mr-[0.2em] inline-block overflow-hidden"
                        >
                            <motion.span
                                className="inline-block"
                                initial={{ y: '110%', rotate: 6, opacity: 0 }}
                                animate={{ y: 0, rotate: 0, opacity: 1 }}
                                transition={{
                                    duration: 1.1,
                                    ease: EASE,
                                    delay: 0.25 + i * 0.1,
                                }}
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
                    className="mt-8 h-0.5 max-w-sm bg-white/30"
                />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
                className="absolute right-6 bottom-8 z-10 flex flex-col items-center gap-2 md:right-8"
            >
                <span className="mb-4 origin-center rotate-90 text-[10px] tracking-[0.3em] text-white/40 uppercase">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: 'easeInOut',
                    }}
                    className="h-12 w-px bg-linear-to-b from-white/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
    const { t } = useLanguage();

    return (
        <section
            id="about"
            className="relative z-20 overflow-hidden bg-[#041023] py-20 md:py-32"
        >
            <div className="mx-auto px-6 md:px-12">
                {/* Top Section - Left Aligned */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mx-auto mb-20 max-w-7xl"
                >
                    <motion.p
                        variants={clipReveal}
                        className="mb-4 text-sm font-semibold tracking-[0.3em] text-red-500 uppercase"
                    >
                        {t('about.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl lg:text-5xl"
                    >
                        {t('about.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-base leading-relaxed text-white/80"
                    >
                        {t('about.body')}
                    </motion.p>
                </motion.div>

                {/* Statistics Block with Gradient Background */}
                <motion.div
                    variants={scaleIn}
                    className="relative mb-16 overflow-hidden rounded-lg border border-[#1833a0]/30"
                >
                    {/* Gradient Background: Blue to Red */}
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <img
                            src="/assets/images/img1.png"
                            alt="About background"
                            className="h-full w-full object-cover"
                        />
                        {/* Gradient Overlay: Red to Purple/Blue */}
                        <div className="absolute inset-0 bg-linear-to-b from-red-600/70 via-red-500/60 to-[#000168]/80 mix-blend-multiply" />
                    </div>

                    {/* Statistics Grid */}
                    <div className="relative z-10 grid min-h-125 grid-cols-1 gap-12 p-16 sm:grid-cols-3 lg:p-24">
                        {[
                            {
                                value: t('about.stat1.value'),
                                label: t('about.stat1.label'),
                            },
                            {
                                value: t('about.stat2.value'),
                                label: t('about.stat2.label'),
                            },
                            {
                                value: t('about.stat3.value'),
                                label: t('about.stat3.label'),
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={popIn}
                                className={`relative flex flex-col items-center justify-center gap-4 text-center ${
                                    index < 2
                                        ? 'border-white sm:border-r-2'
                                        : ''
                                }`}
                            >
                                <p className="shrink-0 font-sans text-8xl font-light tracking-tight whitespace-nowrap text-white lg:text-9xl">
                                    {stat.value}
                                </p>
                                <p className="shrink-0 text-base leading-snug font-bold tracking-widest text-white/90 uppercase lg:text-base">
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
                    className="mx-auto mb-8 max-w-7xl"
                >
                    <p className="text-base leading-relaxed text-white/80">
                        {t('about.body2')}
                    </p>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="mx-auto max-w-7xl"
                >
                    <SplitIconButton
                        text={t('about.cta')}
                        icon={<LuArrowRight className="h-5 w-5" />}
                        variant="red"
                        size="lg"
                        onClick={() =>
                            document
                                .getElementById('contact')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                    />
                </motion.div>
            </div>
        </section>
    );
}

// ─── Service Icon Component ───────────────────────────────────────────────────
function ServiceIcon({
    iconKey,
    className = 'w-16 h-16',
}: {
    iconKey: string;
    className?: string;
}) {
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
function WhatWeDoSection({
    serviceCards: cards,
}: {
    serviceCards: ServiceCardData[];
}) {
    const { t, lang } = useLanguage();

    const serviceCards =
        cards.length > 0
            ? cards.map((card) => ({
                  key: card.key,
                  title: lang === 'id' ? card.title_id : card.title_en,
                  body: lang === 'id' ? card.body_id : card.body_en,
              }))
            : [
                  {
                      key: 'distribution',
                      title: t('service.distribution.title'),
                      body: t('service.distribution.body'),
                  },
                  {
                      key: 'retail',
                      title: t('service.retail.title'),
                      body: t('service.retail.body'),
                  },
                  {
                      key: 'manufacture',
                      title: t('service.manufacture.title'),
                      body: t('service.manufacture.body'),
                  },
              ];

    return (
        <section
            id="services"
            className="relative z-20 overflow-hidden bg-background px-6 py-32 lg:px-12"
        >
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16"
                >
                    <motion.p
                        variants={clipReveal}
                        className="mb-2 text-xl font-bold text-red-500"
                    >
                        {t('whatwedo.label')}
                    </motion.p>
                    <motion.p variants={fadeUp} className="mb-4">
                        {t('whatwedo.subtitle')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="my-4 max-w-4xl text-4xl leading-tight font-bold text-[#1833A0] md:text-5xl lg:text-6xl"
                    >
                        {t('whatwedo.headline')}
                    </motion.h2>
                </motion.div>

                {/* Service Cards Grid - 3 columns */}
                <motion.div
                    className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
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
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { duration: 0.8, ease: EASE },
                                },
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3, ease: EASE },
                            }}
                            className="group relative min-h-64 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#000168] bg-white p-10 text-center transition-shadow duration-300 hover:shadow-xl"
                        >
                            {/* Default State - Light Card */}
                            <div className="relative z-10 flex min-h-64 flex-col items-center justify-between transition-opacity duration-300 group-hover:opacity-0">
                                <div className="flex flex-1 items-center justify-center py-6">
                                    <ServiceIcon
                                        iconKey={card.key}
                                        className="h-24 w-24"
                                    />
                                </div>
                                <h3 className="text-4xl font-extrabold text-[#1833A0]">
                                    {card.title}
                                </h3>
                            </div>

                            {/* Hover State - Dark Card with Description */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-between rounded-2xl bg-[#1833A0] p-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {/* Top: Icon and Title */}
                                <div className="flex items-center gap-6">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
                                        <ServiceIcon
                                            iconKey={card.key}
                                            className="h-8 w-8"
                                        />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Middle: Description */}
                                <p className="text-left text-base leading-relaxed text-white/90">
                                    {card.body}
                                </p>

                                {/* Bottom: Learn More Link */}
                                <div className="flex justify-end">
                                    <a href="#" className="inline-flex items-center gap-2 text-red-500 font-semibold hover:text-red-400 transition-colors">
                                        {lang === 'id' ? 'Pelajari Selengkapnya' : 'Learn More'}
                                        <LuArrowRight className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Body text below cards */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="max-w-lg text-base leading-relaxed text-[#1833A0]"
                >
                    {t('whatwedo.body')}
                </motion.p>
            </div>
        </section>
    );
}

// ─── Products Teaser ──────────────────────────────────────────────────────────
function ProductsTeaserSection({
    productCategories: categories,
}: {
    productCategories: ProductCategoryData[];
}) {
    const { t, lang } = useLanguage();

    const productCategories =
        categories.length > 0
            ? categories.map((cat) => ({
                  key: cat.key,
                  title: lang === 'id' ? cat.title_id : cat.title_en,
                  body: lang === 'id' ? cat.body_id : cat.body_en,
                  image: cat.image_url ?? '/assets/images/brand-management.png',
                  video_url: cat.video_url,
              }))
            : [
                  {
                      key: 'brand',
                      title: t('service.brand.title'),
                      body: t('service.brand.body'),
                      image: '/assets/images/brand-management.png',
                      video_url: null,
                  },
                  {
                      key: 'imaging',
                      title: t('service.imaging.title'),
                      body: t('service.imaging.body'),
                      image: '/assets/images/imaging-solution.png',
                      video_url: null,
                  },
                  {
                      key: 'camera',
                      title: t('service.camera.title'),
                      body: t('service.camera.body'),
                      image: '/assets/images/camera-support.png',
                      video_url: null,
                  },
                  {
                      key: 'technical',
                      title: t('products.technical.title'),
                      body: t('products.technical.body'),
                      image: '/assets/images/technical-service.png',
                      video_url: null,
                  },
              ];

    return (
        <section
            id="products"
            className="relative z-20 overflow-x-hidden bg-[#1833a0] px-6 py-24 text-white lg:px-12"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-start gap-12 lg:gap-20">
                    {/* Left: Header */}
                    <motion.div
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="flex flex-col gap-6"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl leading-tight font-extrabold md:text-5xl"
                        >
                            {t('service.services.title')}
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            className="max-w-4xl text-base leading-relaxed text-white/80"
                        >
                            {t('service.services.body')}
                        </motion.p>
                    </motion.div>

                    {/* Right: 2x2 Card Grid */}
                    <motion.div
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
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
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            duration: 0.8,
                                            ease: EASE,
                                        },
                                    },
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: EASE },
                                }}
                                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
                                onClick={() => router.visit(products().url)}
                            >
                                {/* Background */}
                                {cat.video_url ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 h-full w-full object-cover"
                                    >
                                        <source
                                            src={cat.video_url}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : (
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(to right, rgba(0, 2, 104, 0.65), rgba(155, 25, 25, 0.45), rgba(0, 3, 139, 0.55))',
                                    }}
                                />

                                {/* Content */}
                                <div className="absolute right-0 bottom-0 left-0 p-5">
                                    <h3 className="mb-2 text-2xl leading-tight font-extrabold text-white transition-[font-size] duration-300 group-hover:text-lg sm:text-3xl sm:group-hover:text-2xl lg:text-5xl">
                                        {cat.title}
                                    </h3>
                                    <p className="mb-3 line-clamp-2 max-h-0 overflow-hidden text-xs leading-relaxed text-white/70 transition-all duration-500 ease-in-out group-hover:max-h-20">
                                        {cat.body}
                                    </p>
                                    <span className="flex translate-y-2 items-center gap-1 text-xs font-semibold text-red-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        {t('about.cta')}
                                        <LuArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <SplitIconButton
                            text={t('about.cta')}
                            icon={<LuArrowRight className="h-5 w-5" />}
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
    const row1Brands =
        brandData.length > 0
            ? brandData
                  .slice(0, Math.ceil(brandData.length / 2))
                  .map((b) => ({ name: b.name, image: b.logo_url }))
            : [
                  { name: 'SBOX', image: '/assets/brands/SBOX.png' },
                  {
                      name: 'Kodak PixPro',
                      image: '/assets/brands/kodakpixpro.png',
                  },
                  {
                      name: 'Kodak Charmera',
                      image: '/assets/brands/kodak charmera.png',
                  },
                  { name: 'Canon', image: '/assets/brands/Canon.png' },
                  { name: 'Sony', image: '/assets/brands/Sony.png' },
                  { name: 'DJI', image: '/assets/brands/DJI.png' },
                  { name: 'FeiYuTech', image: '/assets/brands/Feiyutech.png' },
                  { name: '7Artisans', image: '/assets/brands/7artisan.png' },
              ];

    const row2Brands =
        brandData.length > 0
            ? brandData
                  .slice(Math.ceil(brandData.length / 2))
                  .map((b) => ({ name: b.name, image: b.logo_url }))
            : [
                  { name: 'Fujifilm', image: '/assets/brands/fujifilm.png' },
                  { name: 'Nikon', image: '/assets/brands/nikon.png' },
                  { name: 'Panasonic', image: '/assets/brands/panasonic.png' },
                  { name: 'Instax', image: '/assets/brands/instax.png' },
                  { name: 'Hollyland', image: '/assets/brands/hollyland.png' },
                  { name: 'Godox', image: '/assets/brands/godox.png' },
                  { name: 'SanDisk', image: '/assets/brands/sandisk.png' },
              ];

    const edgeFade = {
        WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    };

    return (
        <section className="relative z-20 overflow-hidden border-t border-border bg-muted/10 pt-24">
            <motion.div
                variants={staggerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-12 px-6 text-center lg:px-12"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-4xl leading-tight font-bold text-[#1833a0] md:text-6xl"
                >
                    Brand Partners
                </motion.h2>
            </motion.div>

            {/* Row 1 — slides left (default LTR) */}
            <div className="mb-8" style={edgeFade}>
               <Carousel className="w-full"
               opts={{ loop: true,  direction: 'rtl' }}
               plugins={[
                    Autoplay({
                        delay:2000
                    })
                ]}>
                    <CarouselContent className="gap-8">
                        {row1Brands.map((brand) => (
                            <CarouselItem key={brand.name} className="basis-1/6 pl-0">
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

            <div className="mb-8" style={edgeFade}>
               <Carousel className="w-full"
               opts={{ loop: true }}
               plugins={[
                    Autoplay({
                        delay:2000
                    })
                ]}>
                    <CarouselContent className="gap-8">
                        {row2Brands.map((brand) => (
                            <CarouselItem key={brand.name} className="basis-1/6 pl-0">
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
        <section className="relative z-20 overflow-x-hidden bg-background px-6 pb-24 lg:px-12">
            <motion.div
                variants={staggerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-12 text-center"
            >
                <motion.h2
                    variants={fadeUp}
                    className="mb-6 text-4xl leading-tight font-bold text-[#1833a0] md:text-6xl"
                >
                    {t('brands.title')}
                </motion.h2>
                <motion.p
                    variants={fadeUp}
                    className="mx-auto max-w-2xl text-base leading-relaxed text-[#000168]"
                >
                    {t('brands.body')}
                </motion.p>
            </motion.div>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-12 lg:gap-16">
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="min-h-75 object-cover"
                    >
                        <img
                            src="/images/wijaya/wijayalocations.avif"
                            alt="Dealer Network"
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="mx-auto flex max-w-3xl flex-col items-center"
                    >
                        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[#000168] md:text-4xl lg:text-5xl">
                            {t('dealer.title')}
                        </h2>
                        <p className="mb-8 max-w-2xl text-center text-base md:text-base">
                            {t('dealer.body')}
                        </p>
                        <div className="flex w-full justify-center px-4">
                            <SplitIconButton
                                text={t('dealer.cta')}
                                icon={<LuArrowRight className="h-5 w-5" />}
                                variant="red"
                                size="lg"
                                className="max-w-full"
                                onClick={() =>
                                    document
                                        .getElementById('contact')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
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
            <div className="sticky top-0 z-0 flex h-screen items-center justify-center overflow-hidden">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source
                        src="/assets/videos/mixkit-close-up-of-a-handshake-between-two-colleagues-46755-hd-ready.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Dark Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0, 2, 104, 0.7), rgba(155, 25, 25, 0.7), rgba(0, 3, 139, 0.7))',
                    }}
                />

                {/* Content */}
                <motion.section
                    className="relative z-10 mx-auto w-full rounded-2xl px-6 py-8 lg:px-12"
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Left Column: Content */}
                        <motion.div
                            variants={staggerSlow}
                            className="flex flex-col justify-center"
                        >
                            {/* Section Label */}
                            <motion.p
                                variants={clipReveal}
                                className="mb-6 text-lg font-semibold tracking-[0.4em] text-red-500 uppercase"
                            >
                                {t('contact.label')}
                            </motion.p>

                            {/* Main Heading */}
                            <motion.h2
                                variants={fadeUp}
                                className="mb-8 text-5xl font-bold tracking-tighter whitespace-pre-line text-white md:text-6xl lg:text-7xl"
                            >
                                {t('contact.title')}
                            </motion.h2>

                            {/* Supporting Text */}
                            <motion.p
                                variants={fadeUp}
                                className="max-w-xl text-lg leading-relaxed text-white/80"
                            >
                                {t('contact.body')}
                            </motion.p>

                            {/* Success Message */}
                            {form.wasSuccessful && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 font-medium text-green-400"
                                >
                                    ✓{' '}
                                    {t('contact.success') ??
                                        'Your inquiry has been submitted!'}
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
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                className="w-full rounded-full bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.name && (
                                <p className="-mt-4 text-sm text-red-400">
                                    {form.errors.name}
                                </p>
                            )}

                            {/* Email Input */}
                            <input
                                type="email"
                                name="email"
                                placeholder={t('contact.form.email')}
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                className="w-full rounded-full bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.email && (
                                <p className="-mt-4 text-sm text-red-400">
                                    {form.errors.email}
                                </p>
                            )}

                            {/* Message Textarea */}
                            <textarea
                                name="message"
                                placeholder={t('contact.form.needs')}
                                value={form.data.message}
                                onChange={(e) =>
                                    form.setData('message', e.target.value)
                                }
                                rows={5}
                                className="w-full resize-none rounded-3xl bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-600 backdrop-blur-sm transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                            {form.errors.message && (
                                <p className="-mt-4 text-sm text-red-400">
                                    {form.errors.message}
                                </p>
                            )}

                            {/* CTA Button */}
                            <div className="mt-4 flex justify-center">
                                <Button
                                    type="submit"
                                    variant="destructive"
                                    size="lg"
                                    className="w-full rounded-2xl py-8 text-xl font-light"
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
        { key: 'jaringan', icon: 'jaringan_dealer_nasional' },
        { key: 'garansi', icon: 'garansi_resmi' },
        { key: 'layanan', icon: 'layanan_service' },
        { key: 'pengiriman', icon: 'pengiriman_cepat' },
        { key: 'legalitas', icon: 'legalitas' },
        { key: 'marketing', icon: 'marketing' },
    ];

    return (
        <section className="relative z-20 bg-background px-6 py-24 lg:px-12">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Left: Header */}
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="lg:sticky lg:top-32"
                >
                    <motion.p
                        variants={clipReveal}
                        className="mb-4 text-xs font-bold tracking-[0.4em] text-red-500 uppercase"
                    >
                        {t('why.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 text-4xl leading-tight font-bold text-[#000168] md:text-5xl"
                    >
                        {t('why.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-base leading-relaxed text-gray-600"
                    >
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
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.5,
                                            ease: EASE,
                                        },
                                    },
                                }}
                                onClick={() => setActiveKey(feature.key)}
                                className={`cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-300 ${
                                    isOpen
                                        ? 'border-[#1833a0] bg-[#1833a0]'
                                        : 'border-gray-200 bg-white hover:border-[#1833a0]/40'
                                }`}
                            >
                                <div className="flex items-center gap-4 px-6 py-5">
                                    {/* Icon */}
                                    <div
                                        className="h-8 w-8 shrink-0"
                                        style={{
                                            backgroundColor: isOpen
                                                ? '#ef4444'
                                                : '#1833a0',
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
                                    <h3
                                        className={`text-lg leading-snug font-bold ${isOpen ? 'text-white' : 'text-[#000168]'}`}
                                    >
                                        {t(`why.${feature.key}.title`)}
                                    </h3>
                                </div>

                                {/* Expandable body */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                                >
                                    <p className="px-6 pb-6 text-base leading-relaxed text-white/90">
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

    if (latestNews.length === 0) {
        return null;
    }

    return (
        <section className="relative z-20 bg-background px-6 py-24 lg:px-12">
            <div className="mx-auto w-full lg:w-[calc(100%-5rem)]">
                {/* Header */}
                <motion.div
                    className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <motion.p
                            variants={clipReveal}
                            className="mb-4 text-xs font-medium tracking-[0.4em] text-red-500 uppercase"
                        >
                            {lang === 'id'
                                ? 'Berita & Update'
                                : 'News & Updates'}
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl leading-tight font-bold text-[#000168] md:text-5xl lg:text-6xl"
                        >
                            {lang === 'id' ? 'Berita Terbaru' : 'Latest News'}
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}>
                        <SplitIconButton
                            text={
                                lang === 'id'
                                    ? 'Lihat Semua Berita'
                                    : 'See All News'
                            }
                            icon={<LuArrowRight className="h-5 w-5" />}
                            variant="red"
                            size="lg"
                            onClick={() => router.visit(news().url)}
                        />
                    </motion.div>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {latestNews.map((item, i) => {
                        const title =
                            lang === 'id' ? item.title_id : item.title_en;
                        const categoryName = item.category
                            ? lang === 'id'
                                ? item.category.name_id
                                : item.category.name_en
                            : null;
                        const date = item.published_at
                            ? new Date(item.published_at).toLocaleDateString(
                                  lang === 'id' ? 'id-ID' : 'en-GB',
                                  {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                  },
                              )
                            : null;

                        return (
                            <motion.article
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60, scale: 0.95 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            duration: 0.75,
                                            ease: EASE,
                                            delay: i * 0.05,
                                        },
                                    },
                                }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3, ease: EASE },
                                }}
                                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-shadow duration-500 hover:shadow-2xl"
                                onClick={() =>
                                    router.visit(`/news/${item.slug}`)
                                }
                            >
                                {/* Image */}
                                <div className="relative aspect-16/10 overflow-hidden">
                                    <img
                                        src={item.image_url}
                                        alt={title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                                    {categoryName && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#000168] px-2.5 py-1 text-[10px] font-bold text-white">
                                                <LuTag className="h-2.5 w-2.5" />
                                                {categoryName}
                                            </span>
                                        </div>
                                    )}
                                    {/* Arrow */}
                                    <div className="absolute right-3 bottom-3 translate-x-12 translate-y-12 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                            <LuArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col gap-2 p-4">
                                    {date && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <LuCalendar className="h-3 w-3" />
                                            {date}
                                        </div>
                                    )}
                                    <h3 className="line-clamp-3 text-sm leading-snug font-bold text-foreground transition-colors duration-300 group-hover:text-[#000168]">
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
export default function Home({
    brands,
    productCategories,
    serviceCards,
    latestNews,
}: HomeProps) {
    return (
        <GuestLayout hideFooter>
            <Head title="Perusahaan Distribusi Nasional">
                <meta
                    head-key="description"
                    name="description"
                    content="PT Wijaya International adalah distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia. Merek ternama: Sony, Canon, DJI, Feiyutech, Kodak, dan lainnya."
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content="PT Wijaya International | Distribusi Elektronik & Kamera"
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia."
                />
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content="PT Wijaya International | Distribusi Elektronik & Kamera"
                />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia."
                />
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
            <div className="relative z-30 -mt-[100vh]">
                <Footer />
            </div>
        </GuestLayout>
    );
}
