import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import { useLanguage } from '@/lib/language-context';
import { fadeLeft, fadeRight, fadeUp, staggerSlow } from './motion-variants';

export default function DealerNetworkSection() {
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
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
