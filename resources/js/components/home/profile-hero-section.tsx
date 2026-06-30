import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { EASE } from './motion-variants';

export default function ProfileHeroSection() {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 800], [0, 340]);
    const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.25]);
    const opacityVideo = useTransform(scrollY, [0, 600], [1, 0.1]);
    const yText = useTransform(scrollY, [0, 600], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.88]);

    const heroWords = [
        t('profile.hero.word1'),
        t('profile.hero.word2'),
        t('profile.hero.word3'),
        t('profile.hero.word4'),
    ];

    return (
        <section className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#000168]">
            {/* Background Video — aggressive parallax layer */}
            <motion.div
                className="absolute inset-x-8 inset-y-28 origin-center rounded-4xl"
                style={{ y: yVideo, scale: scaleVideo, opacity: opacityVideo }}
            >
                <video
                    src="/assets/videos/mixkit-lens-focus-of-a-dslr-camera-2378-hd-ready.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full rounded-4xl object-cover"
                />
                <div
                    className="absolute inset-0 rounded-4xl"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0, 2, 104, 0.9), rgba(155, 25, 25, 0.6), rgba(0, 3, 139, 0.7))',
                    }}
                />
                <div
                    className="absolute inset-0 rounded-4xl"
                    style={{
                        backgroundImage:
                            'linear-gradient(to top, rgba(4, 16, 35, 0.9), transparent)',
                    }}
                />

                {/* Content */}
                <motion.div
                    className="absolute right-8 bottom-24 left-8 z-10 max-w-7xl md:right-auto md:left-24"
                    style={{ y: yText, opacity: opacityText, scale: scaleText }}
                >
                    <motion.p
                        initial={{ opacity: 0, x: -60, letterSpacing: '0.5em' }}
                        animate={{ opacity: 1, x: 0, letterSpacing: '0.4em' }}
                        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                        className="mb-6 text-2xl font-medium tracking-[0.4em] text-white/90 uppercase"
                    >
                        {t('profile.hero.label')}
                    </motion.p>
                    <h1 className="w-full overflow-hidden text-left text-[clamp(2rem,6vw,6rem)] leading-none font-extrabold tracking-tighter text-white uppercase break-words">
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
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.8 }}
                    >
                        <p className="mb-6 text-sm text-white/90">
                            {t('profile.hero.description')}
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
