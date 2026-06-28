import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import {
    clipReveal,
    fadeLeft,
    fadeRight,
    fadeUp,
    staggerSlow,
} from '@/components/home/motion-variants';

interface ContentRowProps {
    paragraphs: string[];
}

function ContentRow({
    paragraphs
}: ContentRowProps) {

    return (
        <div className="grid grid-cols-1 items-center gap-10 md:gap-16">
            <motion.div
                variants={fadeUp}
                className="flex flex-col justify-center gap-5"
            >
                {paragraphs.map((p, i) => (
                    <p
                        key={i}
                        className="text-center leading-relaxed text-[#000168] text-xl md:text-2xl"
                        dangerouslySetInnerHTML={{ __html: p }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default function QuoteServiceSection() {
    const { t } = useLanguage();

    const rows = [
        {
            paragraphs: [t('services.brand.p1'), t('services.brand.p2')]
        },
    ];

    return (
        <section id="brand" className="bg-white px-6 py-24 lg:px-12">
            <div className="mx-auto h-screen flex flex-col justify-center items-center max-w-5xl">

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
