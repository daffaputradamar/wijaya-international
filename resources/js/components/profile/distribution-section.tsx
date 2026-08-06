import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, EASE, fadeLeft, fadeRight, fadeUp, staggerSlow } from '@/components/home/motion-variants';
import ServiceIcon from '../home/service-icon';
import { SplitIconButton } from '../ui/split-icon-button';
import { home } from '@/routes';

interface ContentRowProps {
    image: string;
    imageAlt: string;
    paragraphs: string[];
    cta?: string;
    variant: 'imageLeft' | 'imageRight';
}

function ContentRow({ image, imageAlt, paragraphs, cta, variant }: ContentRowProps) {
    const isImageLeft = variant === 'imageLeft';
    const homeHref = home().url;
    const imageContent = (
        <motion.div
            variants={isImageLeft ? fadeLeft : fadeRight}
            className="overflow-hidden rounded-2xl"
        >
            <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover aspect-3/2"
            />
        </motion.div>
    );
    const textContent = (
        <motion.div
            variants={isImageLeft ? fadeRight : fadeLeft}
            className="flex flex-col justify-center gap-5"
        >
            {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: p }}>
                </p>
            ))}
            {cta && (
                <motion.a
                    href={`${homeHref}#dealer`}
                >
                    <SplitIconButton icon={<LuArrowRight className="h-4 w-4" />} text={cta} variant="red" />
                </motion.a>
            )}
        </motion.div>
    );

    return (
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            {isImageLeft ? (
                <>
                    {imageContent}
                    {textContent}
                </>
            ) : (
                <>
                    {textContent}
                    {imageContent}
                </>
            )}
        </div>
    );
}

export default function DistributionSection() {
    const { t } = useLanguage();

    const rows = [
        {
            image: '/assets/images/img6.png',
            imageAlt: t('profile.distribution.row0.imageAlt'),
            paragraphs: [
                t('profile.distribution.row0.p1'),
                t('profile.distribution.row0.p2'),
            ],
            cta: t('profile.distribution.cta'),
            variant: 'imageLeft' as const,
        },
        {
            image: '/assets/images/img7.png',
            imageAlt: t('profile.distribution.row1.imageAlt'),
            paragraphs: [
                t('profile.distribution.row1.p1'),
                t('profile.distribution.row1.p2'),
            ],
            variant: 'imageRight' as const,
        },
        {
            image: '/assets/images/img8.png',
            imageAlt: t('profile.distribution.row2.imageAlt'),
            paragraphs: [
                t('profile.distribution.row2.p1'),
                t('profile.distribution.row2.p2'),
            ],
            variant: 'imageLeft' as const,
        },
    ];

    return (
        <section id="distribution" className="bg-white px-6 py-24 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-16"
                >
                    <motion.p
                        variants={clipReveal}
                        className="mb-4 flex items-center gap-4 text-xl font-bold text-red-500 uppercase"
                    >
                        <ServiceIcon iconKey="distribution" className="size-8" />
                        {t('profile.distribution.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 max-w-6xl text-4xl leading-tight font-bold text-[#1833A0] md:text-5xl"
                    >
                        {t('profile.distribution.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="max-w-7xl text-base leading-relaxed text-gray-600 text-justify"
                    >
                        {t('profile.distribution.description')}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="flex flex-col gap-20"
                >
                    {rows.map((row, i) => (
                        <ContentRow key={i} {...row} />
                    ))}
                </motion.div>

                <div className="mx-auto mt-20 w-full border-t border-dotted border-[#1833A0]/30" />
            </div>
        </section>
    );
}
