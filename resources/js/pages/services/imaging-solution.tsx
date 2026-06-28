import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuArrowRight, LuArrowUp } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { EASE, fadeUp, staggerSlow } from '@/components/home/motion-variants';
import ContactSection from '@/components/home/contact-section';
import Footer from '@/components/public/footer';
import GuestLayout from '@/layouts/guest-layout';

const serviceNav = [
    {
        labelKey: 'services.nav.brand',
        href: '/services/brand-management',
        active: false,
    },
    {
        labelKey: 'services.nav.imaging',
        href: '/services/imaging-solution',
        active: true,
    },
    { labelKey: 'services.nav.camera', href: '/services/camera-support', active: false },
    { labelKey: 'services.nav.technical', href: '/services/technical-service-repair', active: false },
] as const;

function HeroSection() {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 800], [0, 340]);
    const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.25]);
    const opacityVideo = useTransform(scrollY, [0, 600], [1, 0.1]);
    const yText = useTransform(scrollY, [0, 600], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.88]);

    return (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#000168]">
            <motion.div
                className="absolute inset-x-8 inset-y-28 origin-center rounded-4xl"
                style={{ y: yVideo, scale: scaleVideo, opacity: opacityVideo }}
            >
                <img
                    src="/assets/images/imaging-solution.png"
                    className="h-full w-full rounded-4xl object-cover"
                />
                <div
                    className="absolute inset-0 rounded-4xl"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0, 2, 104, 0.9), rgba(155, 25, 25, 0.4), rgba(0, 3, 139, 0.7))',
                    }}
                />
                <div
                    className="absolute inset-0 rounded-4xl"
                    style={{
                        backgroundImage:
                            'linear-gradient(to top, rgba(4, 16, 35, 0.9), transparent)',
                    }}
                />
            </motion.div>

            <motion.div
                className="absolute right-6 bottom-40 left-6 z-10 max-w-7xl md:right-auto md:left-20"
                style={{ y: yText, opacity: opacityText, scale: scaleText }}
            >
                <motion.p
                    initial={{ opacity: 0, x: -60, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, x: 0, letterSpacing: '0.4em' }}
                    transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                    className="mb-6 text-2xl font-medium tracking-[0.4em] text-white/90 uppercase"
                >
                    {t('services.hero.label')} / {t('services.nav.imaging')}
                </motion.p>
                <h1 className="overflow-hidden text-left text-4xl leading-none font-extrabold tracking-tighter text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="mr-[0.2em] inline-block overflow-hidden">
                        <motion.span
                            className="inline-block"
                            initial={{ y: '110%', rotate: 6, opacity: 0 }}
                            animate={{ y: 0, rotate: 0, opacity: 1 }}
                            transition={{
                                duration: 1.1,
                                ease: EASE,
                                delay: 0.25,
                            }}
                        >
                            {t('services.imaging.heroTitle')}
                        </motion.span>
                    </span>
                </h1>
            </motion.div>
        </section>
    );
}

export default function ImagingSolution() {
    const { t } = useLanguage();

    return (
        <GuestLayout hideFooter>
            <Head title={t('services.imaging.pageTitle')}>
                <meta
                    head-key="description"
                    name="description"
                    content={t('services.imaging.pageDescription')}
                />
            </Head>

            {/* Fixed Navigation */}
            <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto mb-6 hidden w-[calc(100%-2rem)] justify-between gap-4 rounded-xl bg-[#000168] px-5 py-3 backdrop-blur-md md:flex">
                <div className="flex items-center gap-6">
                    <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                        <LuArrowRight className="size-5 rotate-180" />
                    </button>
                    <nav className="flex items-center gap-6">
                        {serviceNav.map((item) => (
                            <a
                                key={item.labelKey}
                                href={item.href}
                                className={`py-3 text-base font-medium transition-colors ${
                                    item.active
                                        ? 'text-red-500'
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                {t(item.labelKey)}
                            </a>
                        ))}
                    </nav>
                </div>
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white"
                >
                    <LuArrowUp className="size-5" />
                </button>
            </div>

            <HeroSection />

            {/* Sticky Sections Wrapper */}
            <div className="relative z-0">
                {/* Section 2: Centered Introduction */}
                <section className="sticky top-0 z-10 h-screen px-6 py-12 lg:px-12">
                    <motion.div
                        className="relative mx-auto flex h-screen w-full max-w-screen items-center justify-center overflow-hidden rounded-4xl bg-white px-6 py-24 lg:px-12"
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="mx-auto h-screen flex flex-col justify-center items-center max-w-5xl text-center text-[#000168] text-base md:text-2xl">
                            <motion.p
                                variants={fadeUp}
                                className="mb-6 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: t('services.imaging.introP1'),
                                }}
                            />
                            <motion.p
                                variants={fadeUp}
                                className="leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: t('services.imaging.introP2'),
                                }}
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Section 3: Professional & Business Scale */}
                <section className="sticky top-0 z-20 h-screen">
                    <motion.div
                        className="relative mx-auto flex h-screen w-full max-w-screen items-center overflow-hidden rounded-t-4xl bg-[#1833A0] px-8 md:px-16"
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
                                <img
                                    src="/assets/images/img17.png"
                                    alt="Portfolio Diversity"
                                    className="w-full object-cover rounded-3xl aspect-[4/3] object-[20%_20%]"
                                />
                            <div className="flex flex-col gap-6">
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-white/80 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section1P1',
                                        ),
                                    }}
                                />
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-white/80 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section1P2',
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 4: Portfolio Diversity */}
                <section className="sticky top-0 z-30 h-screen">
                    <motion.div
                        className="relative mx-auto flex h-screen w-full max-w-screen items-center overflow-hidden rounded-t-4xl bg-gray-100 px-8 md:px-16"
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
                            <div className="flex flex-col gap-6">
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-gray-700 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section2P1',
                                        ),
                                    }}
                                />
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-gray-700 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section2P2',
                                        ),
                                    }}
                                />
                            </div>
                            <div className="">
                                <img
                                    src="/assets/images/img18.png"
                                    alt="Portfolio Diversity"
                                    className="w-full aspect-[4/3] rounded-3xl object-cover object-center"
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 5: Consultative Approach */}
                <section className="sticky top-0 z-40 h-screen">
                    <motion.div
                        className="relative mx-auto flex h-screen w-full max-w-screen items-start overflow-y-auto rounded-t-4xl bg-white px-6 py-8 md:items-center md:px-16 md:py-0"
                        variants={staggerSlow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-16">
                            <div className="">
                                <img
                                    src="/assets/images/img19.png"
                                    alt="Portfolio Diversity"
                                    className="w-full object-cover object-center rounded-3xl aspect-[5/3]"
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-gray-700 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section3P1',
                                        ),
                                    }}
                                />
                                <motion.p
                                    variants={fadeUp}
                                    className="text-sm leading-relaxed text-gray-700 md:text-xl"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'services.imaging.section3P2',
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>

            <div className="relative z-0">
                <ContactSection />
            </div>
            <div className="relative z-50 -mt-[100vh]">
                <Footer />
            </div>
        </GuestLayout>
    );
}
