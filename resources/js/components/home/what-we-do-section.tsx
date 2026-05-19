import { motion } from 'framer-motion';
import { useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, EASE, fadeUp, staggerFast, staggerSlow } from './motion-variants';
import ServiceIcon from './service-icon';
import type { ServiceCardData } from './types';

interface WhatWeDoSectionProps {
    serviceCards: ServiceCardData[];
}

function ServiceCard({
    card,
    lang,
}: {
    card: Partial<ServiceCardData> & { title: string; body: string };
    lang: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: EASE },
                },
            }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative min-h-80 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#000168] bg-white p-10 text-center transition-shadow duration-300 hover:shadow-xl"
        >
            {/* Background - fades to dark on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-[#1833A0]"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
            />

            {/* SINGLE icon + title — animate from centered to top-left */}
            <motion.div
                className="absolute flex items-center"
                animate={
                    isHovered
                        ? { top: 40, left: 40, right: 40 }
                        : {
                              top: '50%',
                              left: 40,
                              right: 40,
                              y: '-50%',          // vertically center when not hovered
                          }
                }
                transition={{ duration: 0.8, ease: EASE }}
                style={{ gap: isHovered ? 24 : 0, flexDirection: isHovered ? 'row' : 'column', justifyContent: isHovered ? 'flex-start' : 'center' }}
            >
                {/* Icon — shrinks into a circle on hover */}
                <motion.div
                    animate={
                        isHovered
                            ? {
                                  width: 56,
                                  height: 56,
                                  borderRadius: '50%',
                                  backgroundColor: '#ffffff',
                                  padding: 12,
                              }
                            : {
                                  width: 96,
                                  height: 96,
                                  borderRadius: 0,
                                  backgroundColor: 'transparent',
                                  padding: 0,
                              }
                    }
                    transition={{ duration: 0.4, ease: EASE }}
                    className="relative shrink-0 flex items-center justify-center"
                >
                    <ServiceIcon
                        iconKey={card.key!}
                        className="w-full h-full"
                    />
                </motion.div>

                {/* Title — color shifts white on hover */}
                <motion.h3
                    animate={{
                        color: isHovered ? '#ffffff' : '#1833A0',
                        marginTop: isHovered ? 0 : 24,
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={isHovered ? 'text-3xl font-extrabold' : 'text-4xl font-extrabold'}
                >
                    {card.title}
                </motion.h3>
            </motion.div>

            {/* Body text — fades in on hover */}
            <motion.p
                className="absolute left-10 right-10 text-left text-base leading-relaxed text-white/90"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    bottom: isHovered ? 60 : 60,
                }}
                transition={{ duration: 0.3, ease: EASE, delay: isHovered ? 0.1 : 0 }}
            >
                {card.body}
            </motion.p>

            {/* Learn More link — fades in at bottom on hover */}
            <motion.div
                className="absolute bottom-5 right-10 flex justify-end"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: isHovered ? 0.15 : 0 }}
            >
                <a
                    href="#"
                    className="inline-flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-400"
                >
                    {lang === 'id' ? 'Pelajari Selengkapnya' : 'Learn More'}
                    <LuArrowRight className="h-5 w-5" />
                </a>
            </motion.div>
        </motion.div>
    );
}

export default function WhatWeDoSection({ serviceCards: cards }: WhatWeDoSectionProps) {
    const { t, lang } = useLanguage();

    const serviceCards =
        cards.length > 0
            ? cards.map((card) => ({
                  ...card,
                  key: card.key,
                  title: lang === 'id' ? card.title_id : card.title_en,
                  body: lang === 'id' ? card.body_id : card.body_en,
              }))
            : [
                  {
                      key: 'distribution',
                      icon_key: 'distribution',
                      title_id: '',
                      title_en: '',
                      body_id: '',
                      body_en: '',
                      title: t('service.distribution.title'),
                      body: t('service.distribution.body'),
                  },
                  {
                      key: 'retail',
                      icon_key: 'retail',
                      title_id: '',
                      title_en: '',
                      body_id: '',
                      body_en: '',
                      title: t('service.retail.title'),
                      body: t('service.retail.body'),
                  },
                  {
                      key: 'manufacture',
                      icon_key: 'manufacture',
                      title_id: '',
                      title_en: '',
                      body_id: '',
                      body_en: '',
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
                        <ServiceCard key={card.key} card={card} lang={lang} />
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
