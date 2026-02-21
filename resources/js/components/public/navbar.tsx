import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { home, products, services, contact } from '@/routes';
import { LuPhone } from 'react-icons/lu';

export default function Navbar() {
    const { t, lang, setLang } = useLanguage();
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);

    // Scroll States
    const [isAtTop, setIsAtTop] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Check if we are on the home page (or strict root)
    const isHome = url === '/' || url === '/home' || url === '';

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = 10;
            const atTopNow = currentScrollY < threshold;
            const scrollingUp = currentScrollY < lastScrollY;

            // Visibility Logic:
            // - Always visible at top
            // - Hidden when scrolling down && not at top
            // - Visible when scrolling up
            if (atTopNow) {
                setIsVisible(true);
            } else if (!scrollingUp && currentScrollY > 100) {
                 setIsVisible(false);
            } else {
                 setIsVisible(true);
            }

            setIsAtTop(atTopNow);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { label: t('nav.home'), href: home() },
        { label: t('nav.products'), href: products() },
        { label: t('nav.services'), href: services() },
        { label: t('nav.contact'), href: contact() },
    ];

    const isActive = (href: unknown) => {
        const path = typeof href === 'string' ? href : (href as { url: string }).url;
        return url === path || (path !== '/' && url.startsWith(path));
    };

    // Determine styles based on state
    // Hero state is active ONLY when at top AND on Home page
    const isHeroState = isAtTop && isHome;

    // Container classes
    const containerBase = "fixed z-50 transition-all duration-500 ease-in-out left-0 right-0";
    const containerPosition = isHeroState
        ? "top-0 px-6 py-6 lg:px-12"
        : "top-4 px-4 lg:px-8 w-full";
    const containerTransform = isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0";

    // Inner Pill/Bar classes
    const innerStyle = isHeroState
        ? "w-full bg-transparent border-transparent flex items-center justify-between transition-all duration-300"
        : "w-full rounded-full bg-background/90 backdrop-blur-md px-6 py-2.5 shadow-lg border border-border/40 flex items-center justify-between transition-all duration-300";

    // Text colors
    const textColor = isHeroState ? "text-white" : "text-foreground";
    const subTextColor = isHeroState ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground";
    const logoSrc = isHeroState ? "/images/wijaya/logobw.avif" : "/images/wijaya/logo.avif";

    return (
        <header className={`${containerBase} ${containerPosition} ${containerTransform}`}>
            <div className={innerStyle}>
                {/* Logo */}
                <Link href={home().url} className="flex items-center gap-3 group">
                    <img
                        src={logoSrc}
                        alt="Wijaya International"
                        className="h-12 w-auto object-contain transition-all duration-300"
                    />
                    <div className={`${textColor} font-bold tracking-wide ${isHeroState ? 'opacity-0 translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0' : 'opacity-100 translate-y-0'} flex flex-col leading-tight transition-all duration-300`}>
                        <span className="text-xs">PT. WIJAYA</span>
                        <span className="text-xs">INTERNATIONAL</span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-16">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={typeof link.href === 'string' ? link.href : link.href.url}
                            className={`text-base font-medium transition-colors duration-200 ${
                                isActive(link.href)
                                    ? (isHeroState ? 'text-white' : 'text-black font-semibold')
                                    : subTextColor
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side: CTA + language toggle + mobile menu button */}
                <div className="flex items-center gap-4">
                    {/* Get In Touch Button */}
                    <Link
                        href={typeof contact() === 'string' ? contact() : contact().url}
                        className={`hidden sm:inline-flex items-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                            isHeroState
                                ? 'bg-white text-black hover:bg-white/90 shadow-lg'
                                : 'bg-red-500 text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-white/90'
                        }`}
                    >
                        {t('nav.getInTouch')} <LuPhone className="ml-2 size-4" />
                    </Link>

                    {/* Language toggle */}
                    <button
                        onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors border rounded-full px-3 py-1.5 ${
                            isHeroState
                                ? "text-white/60 hover:text-white border-white/20"
                                : "text-black/60 hover:text-black border-black/10"
                        }`}
                    >
                        <span className={lang === 'id' ? (isHeroState ? 'text-white' : 'text-black') : 'opacity-40'}>ID</span>
                        <span className="opacity-20">/</span>
                        <span className={lang === 'en' ? (isHeroState ? 'text-white' : 'text-black') : 'opacity-40'}>EN</span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-1 ${textColor}`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl bg-black/95 backdrop-blur-md border border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={typeof link.href === 'string' ? link.href : link.href.url}
                            onClick={() => setMenuOpen(false)}
                            className={`text-sm font-medium transition-colors ${
                                isActive(link.href)
                                    ? 'text-white'
                                    : 'text-white/60'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
