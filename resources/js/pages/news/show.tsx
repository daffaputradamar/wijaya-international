import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { LuArrowLeft, LuCalendar, LuTag } from 'react-icons/lu';
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
    body_id: string | null;
    body_en: string | null;
    slug: string;
    image_url: string;
    published_at: string | null;
    category: NewsCategory | null;
}

interface Props {
    news: NewsItem;
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60, rotate: -1 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.1, ease: EASE } },
};

const clipReveal: Variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

// ─── Word Split Heading ───────────────────────────────────────────────────────
function SplitHeading({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    return (
        <motion.h1
            className={className}
            variants={stagger}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: '110%', rotate: 4, opacity: 0 },
                            visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.85, ease: EASE } },
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.h1>
    );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function NewsShow({ news }: Props) {
    const { lang } = useLanguage();
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 700], [0, 280]);

    const title = lang === 'id' ? news.title_id : news.title_en;
    const body = lang === 'id' ? news.body_id : news.body_en;
    const categoryName = news.category ? (lang === 'id' ? news.category.name_id : news.category.name_en) : null;
    const date = news.published_at
        ? new Date(news.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        : null;

    return (
        <GuestLayout>
            <Head title={title}>
                <meta head-key="description" name="description" content={`${title} — PT Wijaya International`} />
                <meta head-key="og:title" property="og:title" content={`${title} | PT Wijaya International`} />
                <meta head-key="og:description" property="og:description" content={`${title} — PT Wijaya International`} />
                <meta head-key="og:image" property="og:image" content={news.image_url} />
                <meta head-key="twitter:image" name="twitter:image" content={news.image_url} />
            </Head>

            {/* ── Parallax Hero ─────────────────────────────────────────── */}
            <section className="relative h-[80vh] min-h-[580px] flex items-end overflow-hidden bg-background">
                <motion.div className="absolute inset-0 z-0 origin-center" style={{ y: yHero }}>
                    <img
                        src={news.image_url}
                        alt={title}
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-background" />
                </motion.div>

                {/* Hero Content – pinned bottom-left */}
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12 pb-16">
                    {/* Category + Date */}
                    <motion.div
                        variants={clipReveal}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-4 mb-6"
                    >
                        {categoryName && (
                            <span className="inline-flex items-center gap-1.5 bg-[#000168] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                                <LuTag className="w-3 h-3" />
                                {categoryName}
                            </span>
                        )}
                        {date && (
                            <span className="inline-flex items-center gap-1.5 text-white/70 text-xs font-medium">
                                <LuCalendar className="w-3.5 h-3.5" />
                                {date}
                            </span>
                        )}
                    </motion.div>

                    <SplitHeading
                        text={title}
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl"
                    />

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
                        className="h-px bg-red-600 mt-8 w-20 origin-left"
                    />
                </div>
            </section>

            {/* ── Article Body ──────────────────────────────────────────── */}
            <section className="bg-background py-24 px-6 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mb-16"
                    >
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium tracking-wide uppercase transition-colors duration-300 group"
                        >
                            <LuArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                            {lang === 'id' ? 'Kembali ke Berita' : 'Back to News'}
                        </Link>
                    </motion.div>

                    {/* Body */}
                    {body ? (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.15 }}
                        >
                            <div
                                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-blue-600 prose-blockquote:border-red-600 prose-blockquote:text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: body }}
                            />
                        </motion.div>
                    ) : (
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.15 }}
                            className="text-muted-foreground text-lg"
                        >
                            {lang === 'id' ? 'Konten tidak tersedia.' : 'Content not available.'}
                        </motion.p>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
