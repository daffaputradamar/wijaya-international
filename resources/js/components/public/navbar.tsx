import { Link, router, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState, type MouseEvent } from 'react';
import { LuArrowRight, LuChevronDown, LuPhone } from 'react-icons/lu';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useLanguage } from '@/lib/language-context';
import { home, products, services } from '@/routes';

type NavChildItem = {
    label: string;
    href: string;
    sectionId?: string | null;
    highlight?: boolean;
};

type NavItem = NavChildItem & {
    kind?: 'links' | 'brands';
    children?: NavChildItem[];
};

type BrandMenuItem = {
    name: string;
    image: string;
};

type NavbarPageProps = {
    brands?: Array<{
        name: string;
        logo_url: string;
    }>;
};

export default function Navbar() {
    const { t, lang, setLang } = useLanguage();
    const { url, props } = usePage<NavbarPageProps>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

    const [isAtTop, setIsAtTop] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isHome = url === '/' || url === '/home' || url === '';
    const homeHref = home().url;
    const servicesHref = services().url;
    const productsHref = products().url;
    const currentHash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';

    const fallbackBrands: BrandMenuItem[] = [
        { name: 'SBOX', image: '/assets/brands/SBOX.png' },
        { name: 'Kodak PixPro', image: '/assets/brands/kodakpixpro.png' },
        { name: 'Kodak Charmera', image: '/assets/brands/kodak charmera.png' },
        { name: 'Canon', image: '/assets/brands/Canon.png' },
        { name: 'Sony', image: '/assets/brands/Sony.png' },
        { name: 'DJI', image: '/assets/brands/DJI.png' },
        { name: 'FeiYuTech', image: '/assets/brands/Feiyutech.png' },
        { name: '7Artisans', image: '/assets/brands/7artisan.png' },
        { name: 'Fujifilm', image: '/assets/brands/fujifilm.png' },
        { name: 'Nikon', image: '/assets/brands/nikon.png' },
        { name: 'Panasonic', image: '/assets/brands/panasonic.png' },
        { name: 'Instax', image: '/assets/brands/instax.png' },
        { name: 'Hollyland', image: '/assets/brands/hollyland.png' },
        { name: 'Godox', image: '/assets/brands/godox.png' },
        { name: 'SanDisk', image: '/assets/brands/sandisk.png' },
    ];

    const availableBrands = props.brands?.length
        ? props.brands.map((brand) => ({ name: brand.name, image: brand.logo_url }))
        : fallbackBrands;
    const brandRowMidpoint = Math.ceil(availableBrands.length / 2);
    const productBrandRows = [availableBrands.slice(0, brandRowMidpoint), availableBrands.slice(brandRowMidpoint)];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const threshold = 10;
            const atTopNow = currentScrollY < threshold;
            const scrollingUp = currentScrollY < lastScrollY;

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

    const navItems: NavItem[] = [
        { label: t('nav.home'), href: homeHref },
        {
            label: t('nav.profile'),
            href: `${homeHref}#about`,
            sectionId: 'about',
            kind: 'links',
            children: [
                { label: t('nav.aboutUs'), href: `${homeHref}#about`, sectionId: 'about' },
                { label: t('nav.mainBusiness'), href: `${homeHref}#services`, sectionId: 'services' },
                { label: t('nav.ownerProfile'), href: '#' },
                { label: t('nav.fullProfile'), href: '#', highlight: true },
            ],
        },
        {
            label: t('nav.services'),
            href: servicesHref,
            kind: 'links',
            children: [
                { label: t('service.brand.title'), href: servicesHref },
                { label: t('service.imaging.title'), href: servicesHref },
                { label: t('service.camera.title'), href: servicesHref },
                { label: t('products.technical.title'), href: servicesHref },
                { label: t('nav.moreServices'), href: servicesHref, highlight: true },
            ],
        },
        {
            label: t('nav.products'),
            href: productsHref,
            kind: 'brands',
            children: [{ label: t('nav.moreProducts'), href: productsHref, highlight: true }],
        },
        { label: t('nav.dealer'), href: `${homeHref}#dealer`, sectionId: 'dealer' },
        { label: t('nav.contact'), href: `${homeHref}#contact`, sectionId: 'contact' },
    ];

    const navigateToItem = (href: string, sectionId?: string | null) => {
        if (href === '#') {
            return;
        }

        if (sectionId) {
            if (isHome) {
                if (sectionId === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.history.replaceState(null, '', homeHref);
                } else {
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.replaceState(null, '', `#${sectionId}`);
                }
            } else {
                window.location.assign(`${homeHref}#${sectionId}`);
            }
            return;
        }

        if (href === homeHref && isHome) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', homeHref);
            return;
        }

        router.visit(href);
    };

    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string | null) => {
        e.preventDefault();
        navigateToItem(href, sectionId);
        setMenuOpen(false);
        setMobileExpandedItem(null);
    };

    const isItemActive = (item: NavChildItem): boolean => {
        if (item.href === '#') {
            return false;
        }

        if (item.sectionId) {
            return isHome && currentHash === item.sectionId;
        }

        const path = item.href.split('#')[0] || '/';

        if (path === '/' || path === '/home') {
            return isHome && currentHash === '';
        }

        return url === path || url.startsWith(`${path}/`);
    };

    const isNavItemActive = (item: NavItem) => {
        if (isItemActive(item)) {
            return true;
        }

        return item.children?.some((child) => isItemActive(child)) ?? false;
    };

    const isHeroState = isAtTop && isHome;

    const containerBase = 'fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out';
    const containerPosition = isHeroState
        ? 'top-0 px-6 py-6 lg:px-12'
        : 'top-4 w-full max-w-full px-4 lg:px-8';
    const containerTransform = isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0';

    const innerStyle = isHeroState
        ? 'flex w-full items-center justify-between border-transparent bg-transparent transition-all duration-300'
        : 'flex w-full items-center justify-between rounded-3xl border border-gray-200/60 bg-white/95 px-6 py-3 shadow-md backdrop-blur-md transition-all duration-300';

    const subTextColor = isHeroState ? 'text-white/60 hover:text-white' : 'text-[#1833a0] hover:text-gray-900';
    const logoSrc = isHeroState ? "/images/wijaya/logo/wijaya_white.png" : "/images/wijaya/logo/wijaya_blue.png";

    const renderBrandCarouselRow = (brands: BrandMenuItem[], reverse = false) => {
        const items = brands.length > 3 ? brands : [...brands, ...brands];

        return (
            <Carousel
                className="w-full"
                opts={{ loop: true, align: 'start', direction: reverse ? 'rtl' : 'ltr' }}
                plugins={[Autoplay({ delay: 1000 })]}
            >
                <CarouselContent className="-ml-3">
                    {items.map((brand, index) => (
                        <CarouselItem key={`${brand.name}-${index}`} className="basis-1/4 pl-3">
                            <div className="flex">
                                <img src={brand.image} alt={brand.name} className="h-20 w-full object-contain" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        );
    };

    const renderDesktopDropdown = (item: NavItem) => {
        if (item.kind === 'brands') {
            const cta = item.children?.[0];

            return (
                <div className="pointer-events-none invisible absolute top-full left-1/2 z-50 w-152 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-2xl shadow-[#1833a0]/10">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.24em] text-[#1833a0]/60 uppercase">{t('nav.products')}</p>
                            </div>
                        </div>

                        <div className="space-y-3 rounded-3xl bg-gray-50/80 p-4">
                            {productBrandRows.map((row, rowIndex) => (
                                <div key={`brand-row-${rowIndex}`}>
                                    {renderBrandCarouselRow(row, rowIndex === 0)}
                                </div>
                            ))}
                        </div>
                        {cta && (
                                <a
                                    href={cta.href}
                                    onClick={(e) => handleNavClick(e, cta.href, cta.sectionId)}
                                    className="flex items-center justify-between rounded-xl px-3 py-2 font-medium transition hover:bg-red-50 text-red-600"
                                >
                                    {cta.label}
                                    <LuArrowRight className="size-6" />
                                </a>
                            )}
                    </div>
                </div>
            );
        }

        if (!item.children?.length) {
            return null;
        }

        return (
            <div className="pointer-events-none invisible absolute top-full left-1/2 z-50 w-80 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-4xl border border-gray-200 bg-white p-3 shadow-2xl shadow-[#1833a0]/10">
                    {item.children.map((child) => (
                        <a
                            key={child.label}
                            href={child.href}
                            onClick={(e) => handleNavClick(e, child.href, child.sectionId)}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                child.highlight
                                    ? 'text-red-600 hover:bg-red-50 border-t'
                                    : 'text-gray-700 hover:bg-[#1833a0]/5 hover:text-[#1833a0]'
                            }`}
                        >
                            <span>{child.label}</span>
                            {child.highlight && <LuArrowRight className="size-4" />}
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <header className={`${containerBase} ${containerPosition} ${containerTransform}`}>
            <div className={innerStyle}>
                <Link href={homeHref} className="group flex shrink-0 items-center gap-2">
                    <img
                        src={logoSrc}
                        alt="Wijaya International"
                        className="w-48 h-12 object-cover"
                    />
                </Link>

                <nav className="ml-auto mr-10 hidden items-center gap-8 md:flex">
                    {navItems.map((item) => {
                        const active = isNavItemActive(item);
                        const hasDropdown = item.kind === 'brands' || Boolean(item.children?.length);

                        return (
                            <div key={item.label} className="group relative">
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                    className={`inline-flex items-center gap-2 text-base font-medium transition-colors duration-200 ${
                                        active
                                            ? isHeroState
                                                ? 'font-semibold text-white underline'
                                                : 'font-semibold text-[#1833a0] underline'
                                            : subTextColor
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {hasDropdown && <LuChevronDown className="size-4" />}
                                </a>
                                {renderDesktopDropdown(item)}
                            </div>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <a
                        href={`${homeHref}#contact`}
                        onClick={(e) => handleNavClick(e, `${homeHref}#contact`, 'contact')}
                        className={`hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                            isHeroState
                                ? 'bg-white text-[#1833a0] hover:bg-white/90 shadow-md'
                                : 'bg-[#1833a0] text-white hover:bg-blue-700 shadow-sm'
                        }`}
                    >
                        {t('nav.getInTouch')} <LuPhone className="ml-2 size-4" />
                    </a>

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

            {menuOpen && (
                <div className="absolute top-full left-4 right-4 mt-3 rounded-2xl bg-white border border-gray-200 py-6 px-6 flex flex-col gap-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
                    {navItems.map((item) => {
                        const hasDropdown = item.kind === 'brands' || Boolean(item.children?.length);
                        const isExpanded = mobileExpandedItem === item.label;

                        if (!hasDropdown) {
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                    className={`border-b border-gray-100 py-2 text-base font-medium transition-colors last:border-0 ${
                                        isNavItemActive(item) ? 'font-semibold text-[#1833a0]' : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                >
                                    {item.label}
                                </a>
                            );
                        }

                        return (
                            <div key={item.label} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2">
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                                        className={`flex-1 py-2 text-base font-medium transition-colors ${
                                            isNavItemActive(item) ? 'font-semibold text-[#1833a0]' : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setMobileExpandedItem(isExpanded ? null : item.label)}
                                        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                        aria-label={`Toggle ${item.label} submenu`}
                                        aria-expanded={isExpanded}
                                    >
                                        <LuChevronDown className={`size-4 transition ${isExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>

                                {isExpanded && (
                                    <div className="mt-2 space-y-2 pl-4">
                                        {item.kind === 'brands' && (
                                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
                                                <div className="space-y-2">
                                                    {productBrandRows.map((row, rowIndex) => (
                                                        <div key={`mobile-brand-row-${rowIndex}`} className="grid grid-cols-3 gap-2">
                                                            {row.map((brand) => (
                                                                <div
                                                                    key={brand.name}
                                                                    className="flex h-16 items-center justify-center rounded-xl bg-white p-2"
                                                                >
                                                                    <img src={brand.image} alt={brand.name} className="h-8 w-full object-contain" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {item.children?.map((child) => (
                                            <a
                                                key={child.label}
                                                href={child.href}
                                                onClick={(e) => handleNavClick(e, child.href, child.sectionId)}
                                                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                                                    child.highlight
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1833a0]'
                                                }`}
                                            >
                                                <span>{child.label}</span>
                                                {child.highlight && <LuArrowRight className="size-4" />}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <a
                        href={`${homeHref}#contact`}
                        onClick={(e) => handleNavClick(e, `${homeHref}#contact`, 'contact')}
                        className="mt-2 flex items-center justify-center gap-2 bg-[#1833a0] text-white px-6 py-3 rounded-full font-bold transition-all active:scale-95"
                    >
                        {t('nav.getInTouch')} <LuPhone className="size-5" />
                    </a>
                </div>
            )}
        </header>
    );
}
