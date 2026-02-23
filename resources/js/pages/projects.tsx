import { Head, router } from '@inertiajs/react';
import {
    motion,
    useScroll,
    useTransform,
    type Variants,
} from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import GuestLayout from '@/layouts/guest-layout';
import { useLanguage } from '@/lib/language-context';

interface Project {
    id: number;
    name: string;
    description: string | null;
    image_url: string;
}

interface ProjectsProps {
    projects: Project[];
}

// ─── Shared Variants (from home.tsx) ──────────────────────────────────────────
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
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const staggerFast: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── Word Split Heading (from home.tsx) ───────────────────────────────────────
function SplitHeading({ text, className }: { text: string; className?: string }) {
    const words = text.split(' ');
    return (
        <motion.h2
            className={className}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
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
        </motion.h2>
    );
}

const fallbackProjects: Project[] = [
    { id: 1, name: 'Nikon D850 Launch Event', description: null, image_url: '/images/wijaya/hero-bg.jpg' },
    { id: 2, name: 'Sony Alpha X Experience', description: null, image_url: '/images/wijaya/consumer-electronics.jpg' },
    { id: 3, name: 'National Imaging Summit', description: null, image_url: '/images/wijaya/road-landscape.jpg' },
    { id: 4, name: 'Canon Visionary Masterclass', description: null, image_url: '/images/wijaya/about.avif' },
    { id: 5, name: 'Fujifilm Creator Series', description: null, image_url: '/images/wijaya/wijayalocations.avif' },
    { id: 6, name: 'Panasonic Pro Workshop', description: null, image_url: '/images/wijaya/logobw.avif' },
];

export default function Projects({ projects }: ProjectsProps) {
    const { t } = useLanguage();
    const displayProjects = projects.length > 0 ? projects : fallbackProjects;

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 600], [0, 300]);

    return (
        <GuestLayout>
            <Head title="Projects — PT Wijaya International" />

            {/* Dynamic Hero Section with Parallax */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
                <motion.div
                    className="absolute inset-0 z-0 origin-center"
                    style={{ y: yHero }}
                >
                    <img
                        src="/images/wijaya/hero-bg.jpg"
                        alt="Hero background"
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
                </motion.div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.p
                        variants={clipReveal}
                        initial="hidden"
                        animate="visible"
                        className="text-red-500 text-xs tracking-[0.5em] uppercase font-bold mb-8"
                    >
                        {t('projects.label')}
                    </motion.p>

                    <SplitHeading
                        text={t('projects.title')}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tighter uppercase mb-8"
                    />

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                            {t('projects.page.subtitle')}
                        </p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
                            className="h-px bg-red-600 mt-12 mx-auto w-24 origin-center"
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
                >
                    <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase">explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="w-[2px] h-10 bg-gradient-to-b from-red-600 to-transparent"
                    />
                </motion.div>
            </section>

            {/* Statistics Overlay Section */}
            <section className="bg-background relative z-20 overflow-hidden -mt-16 pb-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-card border border-border rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-xl"
                    >
                        {[
                            { value: '127+', label: t('projects.stat1.label') },
                            { value: '45+', label: t('projects.stat2.label') },
                            { value: '88+', label: t('projects.stat3.label') },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`p-12 text-center group ${
                                    i < 2 ? 'md:border-r border-border' : ''
                                }`}
                            >
                                <motion.p
                                    whileHover={{ scale: 1.1, color: '#f87171' }}
                                    className="text-5xl lg:text-6xl font-black text-foreground tracking-tighter mb-4 transition-colors duration-500"
                                >
                                    {stat.value}
                                </motion.p>
                                <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Main Project Grid with Home Theme */}
                    <motion.div
                        variants={staggerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 mt-32"
                    >
                        {displayProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9, y: 50 },
                                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: EASE } },
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    borderRadius: "48px",
                                    transition: { duration: 0.4, ease: EASE }
                                }}
                                onClick={() => router.visit(`/projects/${project.id}`)}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl aspect-[4/3] sm:aspect-square lg:aspect-video bg-card"
                            >
                                <img
                                    src={project.image_url}
                                    alt={project.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out scale-105 group-hover:scale-115 opacity-60 group-hover:opacity-100"
                                />

                                {/* Texture Overlay (Diagonal Stripes from Home.tsx) */}
                                <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)'
                                }} />

                                {/* Decorative Gradient Overlays */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-[#000168]/0 group-hover:bg-[#0010c2]/30 transition-colors duration-700" />

                                {/* Information Container */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 font-mono text-xs">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-white text-3xl md:text-4xl font-black tracking-tighter leading-tight drop-shadow-2xl">
                                            {project.name}
                                        </h3>
                                        <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            <div className="h-0.5 w-8 bg-red-600" />
                                            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">View Case Study</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Right Arrow Indicator (from home.tsx) */}
                                <div className="absolute bottom-10 right-10 translate-x-20 translate-y-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-spring z-20">
                                    <div className="bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <LuArrowRight className="w-6 h-6" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </GuestLayout>
    );
}

