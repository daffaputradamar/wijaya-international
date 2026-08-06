import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LuArrowRight, LuCalendar, LuTag } from 'react-icons/lu';
import { SplitIconButton } from '@/components/ui/split-icon-button';
import { useLanguage } from '@/lib/language-context';
import { news } from '@/routes';
import { clipReveal, EASE, fadeUp, stagger, staggerFast } from './motion-variants';
import type { LatestNewsData } from './types';

interface NewsSectionHomeProps {
    latestNews: LatestNewsData[];
}

export default function NewsSectionHome({ latestNews }: NewsSectionHomeProps) {
    const { lang } = useLanguage();

    if (latestNews.length === 0) {
        return null;
    }

    return (
        <section className="relative z-20 bg-background px-6 py-24 lg:px-12">
            <div className="mx-auto w-full lg:w-[calc(100%-5rem)]">
                {/* Header */}
                <motion.div
                    className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <motion.p
                            variants={clipReveal}
                            className="mb-4 text-xs font-medium tracking-[0.4em] text-red-500 uppercase"
                        >
                            {lang === 'id' ? 'Berita & Update' : lang === 'zh' ? '新闻与动态' : 'News & Updates'}
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            className="text-4xl leading-tight font-bold text-[#000168] md:text-5xl lg:text-6xl"
                        >
                            {lang === 'id' ? 'Berita Terbaru' : lang === 'zh' ? '最新动态' : 'Latest News'}
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}>
                        <SplitIconButton
                            text={lang === 'id' ? 'Lihat Semua Berita' : lang === 'zh' ? '查看所有新闻' : 'See All News'}
                            icon={<LuArrowRight className="h-5 w-5" />}
                            variant="red"
                            size="lg"
                            onClick={() => router.visit(news().url)}
                        />
                    </motion.div>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {latestNews.map((item, i) => {
                        const title = lang === 'id' ? item.title_id : item.title_en;
                        const categoryName = item.category
                            ? lang === 'id'
                                ? item.category.name_id
                                : item.category.name_en
                            : null;
                        const date = item.published_at
                            ? new Date(item.published_at).toLocaleDateString(
                                  lang === 'id' ? 'id-ID' : lang === 'zh' ? 'zh-CN' : 'en-GB',
                                  { day: '2-digit', month: 'short', year: 'numeric' },
                              )
                            : null;

                        return (
                            <motion.article
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 60, scale: 0.95 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { duration: 0.75, ease: EASE, delay: i * 0.05 },
                                    },
                                }}
                                whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE } }}
                                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm transition-shadow duration-500 hover:shadow-2xl"
                                onClick={() => router.visit(`/news/${item.slug}`)}
                            >
                                {/* Image */}
                                <div className="relative aspect-16/10 overflow-hidden">
                                    <img
                                        src={item.image_url}
                                        alt={title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                                    {categoryName && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#000168] px-2.5 py-1 text-[10px] font-bold text-white">
                                                <LuTag className="h-2.5 w-2.5" />
                                                {categoryName}
                                            </span>
                                        </div>
                                    )}
                                    {/* Arrow */}
                                    <div className="absolute right-3 bottom-3 translate-x-12 translate-y-12 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                                            <LuArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col gap-2 p-4">
                                    {date && (
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <LuCalendar className="h-3 w-3" />
                                            {date}
                                        </div>
                                    )}
                                    <h3 className="line-clamp-3 text-sm leading-snug font-bold text-foreground transition-colors duration-300 group-hover:text-[#000168]">
                                        {title}
                                    </h3>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
