import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import {
    clipReveal,
    EASE,
    fadeUp,
    staggerFast,
    staggerSlow,
} from './motion-variants';
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
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        ease: EASE,
                    },
                },
            }}
            className="group relative min-h-80 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#000168] bg-white p-10 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-[#1833A0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Icon */}
            <div className="absolute top-1/2 left-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-full items-center justify-center transition-all duration-500 ease-out group-hover:top-10 group-hover:left-10 group-hover:h-14 group-hover:w-14 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rounded-full group-hover:bg-white group-hover:p-3">
                <ServiceIcon iconKey={card.key!} className="h-full w-full" />
            </div>

            {/* Title */}
            <h3 className="absolute top-[calc(50%+3rem)] left-1/2 z-10 w-65 -translate-x-1/2 scale-[1.25] text-center text-3xl font-extrabold text-[#1833A0] transition-all duration-500 ease-out group-hover:top-12 group-hover:left-28 group-hover:w-45 group-hover:translate-x-0 group-hover:scale-100 group-hover:text-left group-hover:text-white">
                {card.title}
            </h3>

            {/* Body */}
            <p className="absolute right-10 bottom-16 left-10 z-10 text-left text-base leading-relaxed text-white/90 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                {card.body}
            </p>

            {/* Learn More */}
            <div className="absolute right-10 bottom-5 z-10 flex justify-end opacity-0 transition-opacity delay-150 duration-300 group-hover:opacity-100">
                <a
                    href="#"
                    className="inline-flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-400"
                >
                    {lang === 'id' ? 'Pelajari Selengkapnya' : 'Learn More'}

                    <LuArrowRight className="h-5 w-5" />
                </a>
            </div>
        </motion.div>
    );
}

export default function WhatWeDoSection({
    serviceCards: cards,
}: WhatWeDoSectionProps) {
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
