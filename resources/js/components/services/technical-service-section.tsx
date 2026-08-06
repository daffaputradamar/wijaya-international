import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { fadeUp, staggerSlow } from '@/components/home/motion-variants';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import { services } from '@/actions/App/Http/Controllers/PublicController';

export default function TechnicalServiceSection() {
    const { t } = useLanguage();

    return (
        <section id="technical" className="sticky top-0 z-40 h-screen px-6 py-12 lg:px-12">
            <motion.div
                className="relative mx-auto h-[calc(100vh-12rem)] w-full max-w-screen overflow-hidden rounded-4xl"
                variants={staggerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Flipped Background Image */}
                <div
                    className="absolute inset-0 scale-x-[-1]"
                    style={{
                        backgroundImage: 'url(/assets/images/technical-service.png)',
                        backgroundPosition: 'right center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(155, 25, 25, 0.2), rgba(0, 2, 60, 0.9))',
                    }}
                />

                <motion.div
                    className="absolute bottom-0 right-0 flex flex-col justify-between h-full max-w-3xl overflow-y-auto p-6 md:p-16"
                    variants={fadeUp}
                >
                    <h2 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">
                        {t('services.technical.label')}
                    </h2>
                    <div className='text-justify'>
                        <p className="mb-8 text-sm leading-relaxed text-white/90 sm:text-base">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('services.technical.p1'),
                                }}
                            ></span>{' '}
                            <br />
                            <br />{' '}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('services.technical.p2'),
                                }}
                            ></span>
                            <br />
                            <br />{' '}
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('services.technical.p3'),
                                }}
                            ></span>
                        </p>
                        <motion.a href={`${services().url}/technical-service-repair`} className="flex justify-end">
                            <SplitIconButton
                                icon={<LuArrowRight className="h-4 w-4" />}
                                text={t('services.technical.cta')}
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
