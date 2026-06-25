import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { clipReveal, fadeLeft, fadeRight, fadeUp, staggerSlow } from '@/components/home/motion-variants';
import ServiceIcon from '../home/service-icon';

interface ContentRowProps {
    image: string;
    imageAlt: string;
    paragraphs: string[];
    variant: 'imageLeft' | 'imageRight';
}

function ContentRow({ image, imageAlt, paragraphs, variant }: ContentRowProps) {
    const isImageLeft = variant === 'imageLeft';
    const imageContent = (
        <motion.div
            variants={isImageLeft ? fadeLeft : fadeRight}
            className="overflow-hidden rounded-2xl"
        >
            <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover"
            />
        </motion.div>
    );
    const textContent = (
        <motion.div
            variants={isImageLeft ? fadeRight : fadeLeft}
            className="flex flex-col justify-center gap-5"
        >
            {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-white/80 text-justify" dangerouslySetInnerHTML={{ __html: p }}>
                </p>
            ))}
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

export default function RetailSection() {
    const { t } = useLanguage();

    const rows = [
        {
            image: '/assets/images/img9.png',
            imageAlt: t('profile.retail.row0.imageAlt'),
            paragraphs: [
                t('profile.retail.row0.p1'),
                t('profile.retail.row0.p2'),
            ],
            variant: 'imageLeft' as const,
        },
        {
            image: '/assets/images/img10.png',
            imageAlt: t('profile.retail.row1.imageAlt'),
            paragraphs: [
                t('profile.retail.row1.p1'),
                t('profile.retail.row1.p2'),
            ],
            variant: 'imageRight' as const,
        },
        {
            image: '/assets/images/img11.png',
            imageAlt: t('profile.retail.row2.imageAlt'),
            paragraphs: [
                t('profile.retail.row2.p1'),
                t('profile.retail.row2.p2'),
            ],
            variant: 'imageLeft' as const,
        },
    ];

    return (
        <section id="retail" className="bg-[#1833A0] px-6 py-24 lg:px-12">
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
                        className="mb-4 flex items-center gap-4 text-xl font-bold text-red-400 uppercase"
                    >
                        <ServiceIcon iconKey="retail" className="size-8" />
                        {t('profile.retail.label')}
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 max-w-6xl text-4xl leading-tight font-bold text-white md:text-5xl"
                    >
                        {t('profile.retail.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="max-w-7xl text-base leading-relaxed text-white/80 text-justify"
                    >
                        {t('profile.retail.description')}
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
            </div>
        </section>
    );
}
