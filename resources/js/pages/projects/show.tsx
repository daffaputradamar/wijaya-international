import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { LuArrowLeft } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface Project {
    id: number;
    name: string;
    description: string | null;
    image_url: string;
}

interface ShowProps {
    project: Project;
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
export default function ProjectShow({ project }: ShowProps) {
    const { t } = useLanguage();
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 700], [0, 280]);

    return (
        <GuestLayout>
            <Head title={`${project.name} — PT Wijaya International`} />

            {/* ── Parallax Hero ─────────────────────────────────────────── */}
            <section className="relative h-[80vh] min-h-[580px] flex items-end overflow-hidden bg-background">
                <motion.div className="absolute inset-0 z-0 origin-center" style={{ y: yHero }}>
                    <img
                        src={project.image_url}
                        alt={project.name}
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
                </motion.div>

                {/* Hero Content – pinned bottom-left */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16">
                    <motion.p
                        variants={clipReveal}
                        initial="hidden"
                        animate="visible"
                        className="text-red-500 text-xs tracking-[0.5em] uppercase font-bold mb-6"
                    >
                        {t('projects.label')}
                    </motion.p>

                    <SplitHeading
                        text={project.name}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter uppercase max-w-4xl"
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
                            href="/projects"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium tracking-wide uppercase transition-colors duration-300 group"
                        >
                            <LuArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                            {t('projects.back')}
                        </Link>
                    </motion.div>

                    {/* Description */}
                    {project.description ? (
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.15 }}
                        >
                            <div
                                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-blue-600 prose-blockquote:border-red-600 prose-blockquote:text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: project.description }}
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
                            {t('projects.noDescription')}
                        </motion.p>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
