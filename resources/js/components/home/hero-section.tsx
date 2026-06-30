import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE } from './motion-variants';

export default function HeroSection() {
    const { scrollY } = useScroll();
    const yVideo = useTransform(scrollY, [0, 800], [0, 340]);
    const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.25]);
    const opacityVideo = useTransform(scrollY, [0, 600], [1, 0.1]);
    const yText = useTransform(scrollY, [0, 600], [0, 200]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 400], [1, 0.88]);

    const heroWords = ['Empowering', 'Imaging', 'Innovation', 'Across', 'Indonesia'];

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
                    <h1 className="w-full overflow-hidden text-left text-[clamp(2rem,6vw,6rem)] leading-none font-extrabold tracking-tighter text-white uppercase break-words">
                        {heroWords.map((word, i) => (
                            <span key={word} className="mr-[0.2em] inline-block overflow-hidden">
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
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="h-12 w-px bg-linear-to-b from-white/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}
