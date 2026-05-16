import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { LuPhone } from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { home, products, services, contact, news } from '@/routes';

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
        : "top-4 px-4 lg:px-8 w-full max-w-full";
    const containerTransform = isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0";

    // Inner Pill/Bar classes - Conditional based on hero state
    const innerStyle = isHeroState
        ? "w-full bg-transparent border-transparent flex items-center justify-between transition-all duration-300"
        : "w-full rounded-3xl bg-white/95 backdrop-blur-md px-6 py-3 shadow-md border border-gray-200/60 flex items-center justify-between transition-all duration-300";

    const subTextColor = isHeroState ? "text-white/60 hover:text-white" : "text-[#1833a0] hover:text-gray-900";
    const logoSrc = isHeroState ? "/images/wijaya/logo/wijaya_white.png" : "/images/wijaya/logo/wijaya_blue.png";

    return (
        <header className={`${containerBase} ${containerPosition} ${containerTransform}`}>
            <div className={innerStyle}>
                {/* Logo */}
                <Link href={home().url} className="flex items-center gap-2 group shrink-0">
                    <img
                        src={logoSrc}
                        alt="Wijaya International"
                        className="w-48 h-12 object-cover"
                    />
                </Link>

                {/* Desktop nav - pushed to the right */}
                <nav className="hidden md:flex items-center gap-10 ml-auto mr-10">
                    {navLinks.map((link) => {
                        const hrefStr = getHrefStr(link.href);
                        return (
                            <a
                                key={link.label}
                                href={hrefStr}
                                onClick={(e) => handleNavClick(e, hrefStr, link.sectionId)}
                                className={`text-base font-medium transition-colors duration-200 ${
                                    isActive(link.href)
                                        ? isHeroState ? 'text-white font-semibold underline' : 'text-[#1833a0] underline font-semibold'
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
                        className={`hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                            isHeroState
                                ? 'bg-white text-[#1833a0] hover:bg-white/90 shadow-md'
                                : 'bg-[#1833a0] text-white hover:bg-blue-700 shadow-sm'
                        }`}
                    >
                        {t('nav.getInTouch')} <LuPhone className="ml-2 size-4" />
                    </a>

                    {/* Language toggle */}
                    <button
                        onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                        className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium transition-colors border rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 ${
                            isHeroState
                                ? 'text-white/70 hover:text-white border-white/30'
                                : 'text-gray-600 hover:text-gray-900 border-gray-300'
                        }`}
                    >
                        <span className={isHeroState ? (lang === 'id' ? 'text-white font-semibold' : 'opacity-50') : (lang === 'id' ? 'text-gray-900 font-semibold' : 'opacity-50')}>ID</span>
                        <span className="opacity-30">/</span>
                        <span className={isHeroState ? (lang === 'en' ? 'text-white font-semibold' : 'opacity-50') : (lang === 'en' ? 'text-gray-900 font-semibold' : 'opacity-50')}>EN</span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden p-1.5 rounded-full transition-colors ${
                            isHeroState ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
                        }`}
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
                <div className="absolute top-full left-4 right-4 mt-3 rounded-2xl bg-white border border-gray-200 py-6 px-6 flex flex-col gap-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => {
                        const hrefStr = getHrefStr(link.href);
                        return (
                            <a
                                key={link.label}
                                href={hrefStr}
                                onClick={(e) => handleNavClick(e, hrefStr, link.sectionId)}
                                className={`text-base font-medium transition-colors py-2 border-b border-gray-100 last:border-0 ${
                                    isActive(link.href) ? 'text-[#1833a0] font-semibold' : 'text-gray-700 hover:text-gray-900'
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
                        className="mt-2 flex items-center justify-center gap-2 bg-[#1833a0] text-white px-6 py-3 rounded-full font-bold transition-all active:scale-95"
                    >
                        {t('nav.getInTouch')} <LuPhone className="size-5" />
                    </a>
                </div>
            )}
        </header>
    );
}
