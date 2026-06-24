import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import { useLanguage } from '@/lib/language-context';
import { products } from '@/routes';
import { EASE, fadeUp, staggerFast, staggerSlow } from './motion-variants';
import type { ProductCategoryData } from './types';
import { useState, useEffect } from 'react';

interface ProductsTeaserSectionProps {
    productCategories: ProductCategoryData[];
}

function ProductCard({ cat, lang }: { cat: { key: string; title: string; body: string; image: string; video_url: string | null }; lang: string }) {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { t } = useLanguage();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);

            if (!e.matches) {
                setIsActive(false);
            }
        };

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () =>
            mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const active = isMobile && isActive;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: EASE },
                },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: EASE } }}
            className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => {
                if (isMobile) {
                    setIsActive((prev) => !prev);
                } else {
                    router.visit(products().url);
                }
            }}
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
                    <source src={cat.video_url} type="video/mp4" />
                </video>
            ) : (
                <img
                    src={cat.image}
                    alt={cat.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                        active ? 'scale-110' : ''
                    } ${!active ? 'group-hover:scale-110' : ''}`}
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
                <h3 className={`mb-2 leading-tight font-extrabold text-white transition-[font-size] duration-300 ${
                    active
                        ? 'text-lg sm:text-2xl'
                        : 'text-2xl sm:text-3xl lg:text-5xl'
                } ${!active ? 'group-hover:text-lg sm:group-hover:text-2xl' : ''}`}>
                    {cat.title}
                </h3>
                <p className={`mb-3 line-clamp-2 overflow-hidden text-xs leading-relaxed text-white/70 transition-all duration-500 ease-in-out ${
                    active ? 'max-h-20' : 'max-h-0'
                } ${!active ? 'group-hover:max-h-20' : ''}`}>
                    {cat.body}
                </p>
                <span
                    className={`flex items-center gap-1 text-xs font-semibold text-red-400 transition-all duration-300 ${
                        active
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-2 opacity-0'
                    } ${!active ? 'group-hover:translate-y-0 group-hover:opacity-100' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        router.visit(products().url);
                    }}
                >
                    {t('about.cta')}
                    <LuArrowRight className="h-3 w-3" />
                </span>
            </div>
        </motion.div>
    );
}

export default function ProductsTeaserSection({ productCategories: categories }: ProductsTeaserSectionProps) {
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
                  { key: 'brand', title: t('service.brand.title'), body: t('service.brand.body'), image: '/assets/images/brand-management.png', video_url: null },
                  { key: 'imaging', title: t('service.imaging.title'), body: t('service.imaging.body'), image: '/assets/images/imaging-solution.png', video_url: null },
                  { key: 'camera', title: t('service.camera.title'), body: t('service.camera.body'), image: '/assets/images/camera-support.png', video_url: null },
                  { key: 'technical', title: t('products.technical.title'), body: t('products.technical.body'), image: '/assets/images/technical-service.png', video_url: null },
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
                        {productCategories.slice(0, 4).map((cat) => (
                            <ProductCard key={cat.key} cat={cat} lang={lang} />
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
