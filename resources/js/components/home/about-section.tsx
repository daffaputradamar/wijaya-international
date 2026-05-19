import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, fadeUp, popIn, scaleIn, staggerSlow } from './motion-variants';

export default function AboutSection() {
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
                            { value: t('about.stat1.value'), label: t('about.stat1.label') },
                            { value: t('about.stat2.value'), label: t('about.stat2.label') },
                            { value: t('about.stat3.value'), label: t('about.stat3.label') },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={popIn}
                                className={`relative flex flex-col items-center justify-center gap-4 text-center ${
                                    index < 2 ? 'border-white sm:border-r-2' : ''
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
                    <p className="text-base leading-relaxed text-white/80">{t('about.body2')}</p>
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
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                        }
                    />
                </motion.div>
            </div>
        </section>
    );
}
