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
import { useState, useEffect } from 'react';

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
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
            className={`group relative min-h-80 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#000168] bg-white p-10 text-center transition-all duration-300 ${
                active
                    ? '-translate-y-2 shadow-xl'
                    : 'hover:-translate-y-2 hover:shadow-xl'
            }`}
            onClick={() => {
                if (isMobile) {
                    setIsActive((prev) => !prev);
                }
            }}
        >
            {/* Background Overlay */}
            <div
                className={`absolute inset-0 rounded-2xl bg-[#1833A0] transition-opacity duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                } ${!active ? 'group-hover:opacity-100' : ''}`}
            />

            {/* Icon */}
            <div
                className={`absolute z-10 flex items-center justify-center transition-all duration-500 ease-out ${
                    active
                        ? 'top-10 left-10 h-14 w-14 translate-x-0 translate-y-0 rounded-full bg-white p-3'
                        : 'top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-full'
                } ${!active ? 'group-hover:top-10 group-hover:left-10 group-hover:h-14 group-hover:w-14 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rounded-full group-hover:bg-white group-hover:p-3' : ''}`}
            >
                <ServiceIcon
                    iconKey={card.key!}
                    className="h-full w-full"
                />
            </div>

            {/* Title */}
            <h3
                className={`absolute z-10 text-3xl font-extrabold transition-all duration-500 ease-out ${
                    active
                        ? 'top-12 left-28 w-45 translate-x-0 scale-100 text-left text-white'
                        : 'top-[calc(50%+3rem)] left-1/2 w-65 -translate-x-1/2 scale-[1.25] text-center text-[#1833A0]'
                } ${!active ? 'group-hover:top-12 group-hover:left-28 group-hover:w-45 group-hover:translate-x-0 group-hover:scale-100 group-hover:text-left group-hover:text-white' : ''}`}
            >
                {card.title}
            </h3>

            {/* Body */}
            <p
                className={`absolute right-10 bottom-16 left-10 z-10 text-left text-base leading-relaxed text-white/90 transition-opacity delay-100 duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                } ${!active ? 'group-hover:opacity-100' : ''}`}
            >
                {card.body}
            </p>

            {/* Learn More */}
            <div
                className={`absolute right-10 bottom-5 z-10 flex justify-end transition-opacity delay-150 duration-300 ${
                    active ? 'opacity-100' : 'opacity-0'
                } ${!active ? 'group-hover:opacity-100' : ''}`}
            >
                <a
                    href="#"
                    className="inline-flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-400"
                    onClick={(e) => e.stopPropagation()}
                >
                    {lang === 'id'
                        ? 'Pelajari Selengkapnya'
                        : 'Learn More'}

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
