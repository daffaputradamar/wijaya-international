import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { home, products, services, contact, news } from '@/routes';
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
        { label: t('nav.home'), href: home(), sectionId: null as string | null },
        { label: t('nav.products'), href: products(), sectionId: 'products' },
        { label: t('nav.services'), href: services(), sectionId: 'services' },
        { label: t('nav.news'), href: news(), sectionId: null as string | null },
        { label: t('nav.contact'), href: contact(), sectionId: 'contact' },
    ];

    const getHrefStr = (href: unknown) =>
        typeof href === 'string' ? href : (href as { url: string }).url;

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hrefStr: string, sectionId: string | null) => {
        e.preventDefault();
        if (isHome) {
            if (sectionId === null) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.visit(hrefStr);
        }
        setMenuOpen(false);
};

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
                        className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                    />
                    <div className={`${textColor} font-bold tracking-wide ${isHeroState ? 'opacity-0 translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0' : 'opacity-100 translate-y-0'} hidden sm:flex flex-col leading-tight transition-all duration-300`}>
                        <span className="text-[10px] md:text-xs">PT. WIJAYA</span>
                        <span className="text-[10px] md:text-xs">INTERNATIONAL</span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-16">
                    {navLinks.map((link) => {
                        const hrefStr = getHrefStr(link.href);
                        return (
                            <a
                                key={link.label}
                                href={hrefStr}
                                onClick={(e) => handleNavClick(e, hrefStr, link.sectionId)}
                                className={`text-base font-medium transition-colors duration-200 hover:opacity-75 ${
                                    isActive(link.href)
                                        ? isHeroState ? 'text-white' : 'text-primary font-semibold'
                                        : subTextColor
                                }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </nav>

                {/* Right side: CTA + language toggle + mobile menu button */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Get In Touch Button */}
                    <a
                        href={getHrefStr(contact())}
                        onClick={(e) => handleNavClick(e, getHrefStr(contact()), 'contact')}
                        className={`hidden lg:inline-flex items-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                            isHeroState
                                ? 'bg-white text-black hover:bg-white/90 shadow-lg'
                                : 'bg-red-500 text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-white/90'
                        }`}
                    >
                        {t('nav.getInTouch')} <LuPhone className="ml-2 size-4" />
                    </a>

                    {/* Language toggle */}
                    <button
                        onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                        className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium transition-colors border rounded-full px-2 sm:px-3 py-1 sm:py-1.5 ${
                            isHeroState
                                ? "text-white/60 hover:text-white border-white/20"
                                : "text-black/60 hover:text-black border-black/10"
                        }`}
                    >
                        <span className={lang === 'id' ? (isHeroState ? 'text-white' : 'text-black font-semibold') : 'opacity-40'}>ID</span>
                        <span className="opacity-20">/</span>
                        <span className={lang === 'en' ? (isHeroState ? 'text-white' : 'text-black font-semibold') : 'opacity-40'}>EN</span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${textColor}`}
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
                <div className="absolute top-full left-4 right-4 mt-3 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/40 py-6 px-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => {
                        const hrefStr = getHrefStr(link.href);
                        return (
                            <a
                                key={link.label}
                                href={hrefStr}
                                onClick={(e) => handleNavClick(e, hrefStr, link.sectionId)}
                                className={`text-lg font-medium transition-colors py-2 border-b border-border/10 last:border-0 ${
                                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                                }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    {/* Mobile CTA */}
                    <a
                        href={getHrefStr(contact())}
                        onClick={(e) => handleNavClick(e, getHrefStr(contact()), 'contact')}
                        className="mt-2 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
                    >
                        {t('nav.getInTouch')} <LuPhone className="size-5" />
                    </a>
                </div>
            )}
        </header>
    );
}
