import { Head, Link, router } from '@inertiajs/react';
import { motion, type Variants } from 'framer-motion';
import { LuArrowRight, LuCalendar, LuTag } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface NewsCategory {
    name_id: string;
    name_en: string;
    slug: string;
}

interface NewsItem {
    id: number;
    title_id: string;
    title_en: string;
    slug: string;
    image_url: string;
    published_at: string | null;
    category: NewsCategory | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Paginated {
    data: NewsItem[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

interface NewsPageProps {
    news: Paginated;
    categories: NewsCategory[];
    filters: { sort: string; category: string | null };
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 90, rotate: -1.5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.1, ease: EASE } },
};

const clipReveal: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE } },
};

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({ item, lang }: { item: NewsItem; lang: 'id' | 'en' }) {
    const title = lang === 'id' ? item.title_id : item.title_en;
    const categoryName = item.category ? (lang === 'id' ? item.category.name_id : item.category.name_en) : null;
    const date = item.published_at
        ? new Date(item.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        : null;

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: EASE } }}
            className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-background shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer"
            onClick={() => router.visit(`/news/${item.slug}`)}
        >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={item.image_url}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {categoryName && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-[#000168] text-white text-xs font-semibold px-3 py-1 rounded-full">
                            <LuTag className="w-3 h-3" />
                            {categoryName}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {date && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <LuCalendar className="w-3.5 h-3.5" />
                        {date}
                    </div>
                )}
                <h3 className="text-base font-bold text-foreground leading-snug line-clamp-3 group-hover:text-[#000168] transition-colors duration-300">
                    {title}
                </h3>
                <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm font-medium text-[#000168] group-hover:gap-3 transition-all duration-300">
                    Read More
                    <LuArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </motion.article>
    );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function NewsPage({ news, categories, filters }: NewsPageProps) {
    const { t, lang } = useLanguage();

    const setFilter = (key: string, value: string | null) => {
        const params: Record<string, string> = {};
        if (filters.sort && key !== 'sort') { params.sort = filters.sort; }
        if (filters.category && key !== 'category') { params.category = filters.category; }
        if (value) { params[key] = value; }
        router.get('/news', params, { preserveState: true, replace: true });
    };

    return (
        <GuestLayout>
            <Head title={lang === 'id' ? 'Berita' : 'News'}>
                <meta head-key="description" name="description" content="Berita terbaru dari PT Wijaya International — peluncuran produk, event, dan kabar perusahaan." />
                <meta head-key="og:title" property="og:title" content="News | PT Wijaya International" />
            </Head>

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-[#000168] py-28 px-6 lg:px-12">
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 60px)',
                }} />

                <div className="relative max-w-5xl mx-auto">
                    <motion.p
                        variants={clipReveal}
                        initial="hidden"
                        animate="visible"
                        className="text-red-400 text-xs tracking-[0.4em] uppercase font-semibold mb-6"
                    >
                        {lang === 'id' ? 'Berita & Update' : 'News & Updates'}
                    </motion.p>
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter uppercase mb-6"
                    >
                        {lang === 'id' ? 'Berita' : 'Latest\nNews'}
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg max-w-xl"
                    >
                        {lang === 'id'
                            ? 'Temukan berita terbaru, peluncuran produk, dan kisah di balik PT Wijaya International.'
                            : 'Discover the latest news, product launches, and stories from PT Wijaya International.'}
                    </motion.p>
                </div>
            </section>

            {/* ── Filters ───────────────────────────────────────────────── */}
            <section className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/60 py-4 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    {/* Category filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('category', null)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${!filters.category ? 'bg-[#000168] text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                        >
                            {lang === 'id' ? 'Semua' : 'All'}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setFilter('category', cat.slug)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${filters.category === cat.slug ? 'bg-[#000168] text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                            >
                                {lang === 'id' ? cat.name_id : cat.name_en}
                            </button>
                        ))}
                    </div>

                    {/* Sort toggle */}
                    <div className="flex items-center gap-1 rounded-full border border-border/60 p-1 bg-muted/30">
                        <button
                            onClick={() => setFilter('sort', 'latest')}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${filters.sort !== 'oldest' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                        >
                            {lang === 'id' ? 'Terbaru' : 'Latest'}
                        </button>
                        <button
                            onClick={() => setFilter('sort', 'oldest')}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${filters.sort === 'oldest' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                        >
                            {lang === 'id' ? 'Terlama' : 'Oldest'}
                        </button>
                    </div>
                </div>
            </section>

            {/* ── News Grid ─────────────────────────────────────────────── */}
            <section className="bg-gray-50 py-16 px-6 lg:px-12 min-h-[50vh]">
                <div className="max-w-7xl mx-auto">
                    {news.data.length > 0 ? (
                        <motion.div
                            key={`${filters.category}-${filters.sort}-${news.current_page}`}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                        >
                            {news.data.map((item) => (
                                <NewsCard key={item.id} item={item} lang={lang as 'id' | 'en'} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-center py-24 text-muted-foreground"
                        >
                            <p className="text-xl font-medium mb-2">{lang === 'id' ? 'Belum ada berita.' : 'No news yet.'}</p>
                            <p className="text-sm">{lang === 'id' ? 'Coba kategori lain.' : 'Try a different category.'}</p>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {news.last_page > 1 && (
                        <div className="mt-16 flex justify-center gap-2 flex-wrap">
                            {news.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    disabled={!link.url}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${link.active ? 'bg-[#000168] text-white shadow-md' : link.url ? 'bg-background border border-border/60 text-foreground hover:bg-muted' : 'text-muted-foreground cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
