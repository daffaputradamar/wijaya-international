import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, EASE, fadeUp, staggerFast, staggerSlow } from './motion-variants';

const features = [
    { key: 'distributor', icon: 'distribution' },
    { key: 'jaringan', icon: 'jaringan_dealer_nasional' },
    { key: 'garansi', icon: 'garansi_resmi' },
    { key: 'layanan', icon: 'layanan_service' },
    { key: 'pengiriman', icon: 'pengiriman_cepat' },
    { key: 'legalitas', icon: 'legalitas' },
    { key: 'marketing', icon: 'marketing' },
];

export default function WhyChooseUsSection() {
    const { t } = useLanguage();
    const [activeKey, setActiveKey] = useState<string>('distributor');

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
                    <motion.p variants={fadeUp} className="text-base leading-relaxed text-gray-600">
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
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
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
                                            backgroundColor: isOpen ? '#ef4444' : '#1833a0',
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
                                        className={`text-lg leading-snug font-bold ${
                                            isOpen ? 'text-white' : 'text-[#000168]'
                                        }`}
                                    >
                                        {t(`why.${feature.key}.title`)}
                                    </h3>
                                </div>

                                {/* Expandable body */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        isOpen ? 'max-h-40' : 'max-h-0'
                                    }`}
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
