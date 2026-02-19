import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { home, products, services, contact } from '@/routes';

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

    const isActive = (href: any) => {
        const path = typeof href === 'string' ? href : href.url;
        return url === path || (path !== '/' && url.startsWith(path));
    };

    // Determine styles based on state
    // Hero state is active ONLY when at top AND on Home page
    const isHeroState = isAtTop && isHome;

    // Container classes
    const containerBase = "fixed z-50 transition-all duration-500 ease-in-out left-0 right-0";
    const containerPosition = isHeroState
        ? "top-0 px-6 py-6 lg:px-12"
        : "top-4 px-4 max-w-2xl mx-auto";
    const containerTransform = isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0";

    // Inner Pill/Bar classes
    const innerStyle = isHeroState
        ? "w-full bg-transparent border-transparent flex items-center justify-between transition-all duration-300"
        : "w-full rounded-full bg-white/80 backdrop-blur-md px-6 py-3 shadow-lg border border-white/20 flex items-center justify-between transition-all duration-300";

    // Text colors
    const textColor = isHeroState ? "text-white" : "text-black";
    const subTextColor = isHeroState ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black";
    const logoSrc = isHeroState ? "/images/wijaya/logobw.avif" : "/images/wijaya/logo.avif";

    return (
        <header className={`${containerBase} ${containerPosition} ${containerTransform}`}>
            <div className={innerStyle}>
                {/* Logo */}
                <Link href={home().url} className="flex items-center gap-3">
                    <img
                        src={logoSrc}
                        alt="Wijaya International"
                        className="h-8 w-auto object-contain transition-all duration-300"
                    />
                    <span className={`${textColor} font-semibold text-sm tracking-wide hidden sm:block transition-colors duration-300`}>
                        PT Wijaya International
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={typeof link.href === 'string' ? link.href : link.href.url}
                            className={`text-sm font-medium transition-colors duration-200 ${
                                isActive(link.href)
                                    ? (isHeroState ? 'text-white' : 'text-black font-semibold')
                                    : subTextColor
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side: language toggle + mobile menu button */}
                <div className="flex items-center gap-4">
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
