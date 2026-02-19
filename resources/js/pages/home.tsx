import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import GuestLayout from '@/layouts/guest-layout';
import Footer from '@/components/public/footer';
import { useLanguage } from '@/lib/language-context';
import { contact, products } from '@/routes';

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    // Fast counter
                    let start = 0;
                    const duration = 1500;
                    const step = Math.ceil(target / (duration / 16));
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, 16);
                }
            },
            { threshold: 0.4 },
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
    return (
        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video
                    src="/videos/wijaya/lake.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            </div>

            {/* Content: Fixed text layout */}
            <div className="absolute bottom-12 left-6 md:left-20 z-10 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight text-left uppercase drop-shadow-lg">
                    Empowering Imaging Innovation Across Indonesia
                </h1>
            </div>
        </section>
    );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id="about" className="bg-[#0a0a0a] py-24 px-6 lg:px-12 relative z-20">
            <div className="max-w-7xl mx-auto">
                <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-10">
                    {t('about.label')}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left: Title */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-pre-line">
                            {t('about.title')}
                        </h2>
                    </div>
                    {/* Right: Body + Stats */}
                    <div className="flex flex-col gap-8">
                        <p className="text-white/60 text-base leading-relaxed">{t('about.body')}</p>
                        <p className="text-white/60 text-base leading-relaxed">{t('about.body2')}</p>

                        {/* Stats Container with Background Image & Gradient */}
                        <div className="relative mt-8 rounded-2xl overflow-hidden shadow-2xl">
                             {/* Background Image */}
                             <div className="absolute inset-0 z-0 h-full w-full">
                                <img
                                    src="/images/wijaya/about.avif"
                                    alt="About background"
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient Overlay: #000168 to #e5000f */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000168] to-[#e5000f] opacity-80 mix-blend-multiply" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {[
                                    { value: parseInt(t('about.stat1.value')), label: t('about.stat1.label') },
                                    { value: parseInt(t('about.stat2.value')), label: t('about.stat2.label') },
                                    { value: parseInt(t('about.stat3.value')), label: t('about.stat3.label') },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                                        <p className="text-4xl md:text-5xl font-bold text-white">
                                            <AnimatedCounter target={stat.value} />
                                        </p>
                                        <p className="text-white/80 text-xs leading-snug font-medium uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
            image: '/images/wijaya/hero-bg.jpg',
        },
        {
            key: 'imaging',
            title: t('service.imaging.title'),
            body: t('service.imaging.body'),
            image: '/images/wijaya/consumer-electronics.jpg',
        },
        {
            key: 'marketing',
            title: t('service.marketing.title'),
            body: t('service.marketing.body'),
            image: '/images/wijaya/hero-bg.jpg',
        },
        {
            key: 'accessories',
            title: t('service.accessories.title'),
            body: t('service.accessories.body'),
            image: '/images/wijaya/consumer-electronics.jpg',
        },
    ];

    return (
        <section id="what-we-do" className="bg-[#0f0f0f] py-24 px-6 lg:px-12 relative z-20">
            <div className="max-w-7xl mx-auto">
                <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-4">
                    {t('whatwedo.label')}
                </p>
                <p className="text-white/50 text-sm mb-12">{t('whatwedo.subtitle')}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {t('whatwedo.headline')}
                    </h2>
                    <p className="text-white/60 text-base leading-relaxed self-end">
                        {t('whatwedo.body')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceCards.map((card) => (
                        <div
                            key={card.key}
                            className="group relative rounded-2xl overflow-hidden bg-[#161616] border border-white/5 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-white font-semibold text-sm mb-2">{card.title}</h3>
                                <p className="text-white/40 text-xs leading-relaxed line-clamp-4">{card.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
        <section className="bg-[#0a0a0a] py-24 px-6 lg:px-12 relative z-20">
            <div className="max-w-7xl mx-auto">
                <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-12">
                    {t('products.label')}
                </p>

                <div className="flex flex-col gap-0 border border-white/10 rounded-2xl overflow-hidden">
                    {productCategories.map((cat, index) => (
                        <div
                            key={cat.key}
                            className={`group relative flex flex-col md:flex-row items-stretch border-white/10 ${index < productCategories.length - 1 ? 'border-b' : ''}`}
                        >
                            <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-[#0f0f0f]">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {cat.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed">{cat.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-end">
                    <Link
                        href={products().url}
                        className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
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
        <section className="bg-[#0f0f0f] py-24 px-6 lg:px-12 border-t border-white/5 relative z-20">
            <div className="max-w-7xl mx-auto">
                <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-10">
                    {t('brands.label')}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                        {t('brands.title')}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">{t('brands.body')}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    {brandNames.map((brand) => (
                        <div
                            key={brand}
                            className="aspect-square bg-[#0a0a0a] flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                            <span className="text-white/30 text-xs font-bold tracking-wide">{brand}</span>
                        </div>
                    ))}
                </div>
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
        <div className="relative h-[200vh] bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen z-0 flex items-center justify-center border-t border-white/5 overflow-hidden">
                <section className="w-full max-w-7xl mx-auto px-6 lg:px-12">
                    <p className="text-white/30 text-xs tracking-[0.4em] uppercase font-medium mb-10">
                        {t('projects.label')}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {t('projects.title')}
                        </h2>
                        <div className="grid grid-cols-3 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col gap-1">
                                    <p className="text-3xl font-bold text-white">
                                        <AnimatedCounter target={stat.value} />
                                    </p>
                                    <p className="text-white/40 text-xs leading-snug">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {projectsData.map((project) => (
                            <div key={project.title} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white font-semibold text-lg">{project.title}</p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                                    <p className="text-white/80 font-medium text-sm">{project.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button className="text-sm font-medium text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/50 rounded-full px-8 py-3">
                            {t('projects.view_all')}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <GuestLayout hideFooter>
            <Head title="PT Wijaya International — Empowering Imaging Innovation Across Indonesia" />
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
