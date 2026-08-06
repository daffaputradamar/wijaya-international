import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { fadeUp, staggerSlow } from '@/components/home/motion-variants';
import { SplitIconButton } from '../ui/split-icon-button';
import { services } from '@/routes';

export default function BrandManagementSection() {
    const { t } = useLanguage();

    return (
        <section id="brand" className="sticky top-0 z-10 h-screen px-6 py-12 lg:px-12">
            <motion.div
                className="relative mx-auto h-[calc(100vh-12rem)] w-full max-w-screen overflow-hidden rounded-4xl object-cover bg-no-repeat"
                style={{
                    backgroundImage: 'url(/assets/images/brand-management.png)',
                    backgroundPosition: 'left center',
                    backgroundSize: 'cover',
                }}
                variants={staggerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to left, rgba(155, 25, 25, 0.2), rgba(0, 2, 60, 0.9))',
                    }}
                />

                <motion.div
                    className="absolute bottom-0 left-0 flex flex-col justify-between h-full max-w-3xl overflow-y-auto p-6 md:p-16"
                    variants={fadeUp}
                >
                    <div />
                    <div className='text-justify'>
                        <p className="mb-8 text-sm leading-relaxed text-white/90 sm:text-base">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('services.brand.p1'),
                                }}
                            ></span>{' '}
                            <br />
                            <br />{' '}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('services.brand.p2'),
                                }}
                            ></span>
                        </p>
                        <motion.a href={`${services().url}/brand-management`}>
                            <SplitIconButton
                                icon={<LuArrowRight className="h-4 w-4" />}
                                text={t('services.brand.cta')}
                                variant="red"
                                size="lg"
                            />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
