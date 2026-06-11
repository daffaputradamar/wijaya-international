import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import {
    LuSearch,
    LuMapPin,
    LuExternalLink,
    LuArrowRight,
} from 'react-icons/lu';
import { useLanguage } from '@/lib/language-context';
import { SplitIconButton } from '../ui/split-icon-button';
import { fadeUp, staggerSlow } from './motion-variants';
import type { DealerData } from './types';

interface DealerNetworkSectionProps {
    dealers: DealerData[];
}

export default function DealerNetworkSection({
    dealers = [],
}: DealerNetworkSectionProps) {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const leafletMapRef = useRef<any>(null);
    const markersRef = useRef<{ [key: number]: any }>({});
    const LRef = useRef<any>(null);

    // Handle search query matching
    const filteredDealers = useMemo(() => {
        return dealers.filter((d) => {
            const matchesQuery =
                !searchQuery ||
                d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (d.address &&
                    d.address
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (d.contact_number &&
                    d.contact_number
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()));
            return matchesQuery;
        });
    }, [dealers, searchQuery]);

    // Load Leaflet dynamically to support SSR
    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) return;

        let mapInstance: any;

        // Dynamic import Leaflet to bypass Server-Side Rendering (SSR) limits
        import('leaflet').then((LModule) => {
            const Leaflet = LModule.default || LModule;
            LRef.current = Leaflet;

            // Initialize Map
            mapInstance = Leaflet.map(mapContainerRef.current, {
                zoomControl: true,
                scrollWheelZoom: false,
                attributionControl: true,
            }).setView([-2.5, 118], 5); // Centered on Indonesia

            // Use elegant CartoDB light map tiles
            Leaflet.tileLayer(
                'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 19,
                },
            ).addTo(mapInstance);

            leafletMapRef.current = mapInstance;

            // Trigger initial render of markers
            updateMapMarkers();
        });

        return () => {
            if (mapInstance) {
                mapInstance.remove();
                leafletMapRef.current = null;
            }
        };
    }, []);

    // Helper to generate marker icons based on category
    const makeIcon = (Leaflet: any, category: string, isActive: boolean) => {
        const pinColor = isActive
            ? '#dc2626' // Red highlight
            : category === 'retail'
              ? '#1833a0' // Royal Blue
              : category === 'service'
                ? '#059669' // Emerald Green
                : category === 'health'
                  ? '#7c3aed' // Purple
                  : '#b45309'; // Amber

        const size = isActive ? [32, 42] : [28, 38];
        const anchor = isActive ? [16, 42] : [14, 38];
        const popupAnchor = isActive ? [0, -42] : [0, -38];

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}" viewBox="0 0 28 38">
            <ellipse cx="14" cy="35" rx="6" ry="3" fill="rgba(0,0,0,0.3)"/>
            <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${pinColor}"/>
            <circle cx="14" cy="14" r="6" fill="white" opacity="0.9"/>
        </svg>`;

        return Leaflet.divIcon({
            html: svg,
            iconSize: size,
            iconAnchor: anchor,
            popupAnchor: popupAnchor,
            className: '',
        });
    };

    // Keep markers synchronized with state and search
    const updateMapMarkers = () => {
        const Leaflet = LRef.current;
        const map = leafletMapRef.current;
        if (!Leaflet || !map) return;

        // Remove previous markers
        Object.values(markersRef.current).forEach((marker) => {
            map.removeLayer(marker);
        });
        markersRef.current = {};

        // Place markers
        filteredDealers.forEach((dealer) => {
            if (isNaN(dealer.lat) || isNaN(dealer.lng)) return;

            const isCurrentActive = activeCardId === dealer.id;
            const marker = Leaflet.marker([dealer.lat, dealer.lng], {
                icon: makeIcon(Leaflet, dealer.category, isCurrentActive),
            }).addTo(map);

            const directionUrl = `https://www.google.com/maps/search/?api=1&query=${dealer.lat},${dealer.lng}`;
            const openStatus = dealer.is_open
                ? t('dealer.openNow')
                : t('dealer.closed');
            const popupContent = `
                <div style="font-family: inherit; font-size: 13px; max-width: 220px; padding: 4px;">
                    <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #1833a0; line-height: 1.2;">
                        ${dealer.name}
                    </div>
                    <div style="color: #4b5563; font-size: 11px; margin-bottom: 8px; line-height: 1.4;">
                        ${dealer.address || ''}
                    </div>
                    ${
                        dealer.contact_number
                            ? `
                    <div style="margin-bottom: 8px; font-size: 11px; color: #1833a0; font-weight: 600;">
                        📞 ${dealer.contact_number}
                    </div>`
                            : ''
                    }
                    <div style="margin-bottom: 8px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">
                        <span style="height: 6px; width: 6px; border-radius: 50%; display: inline-block; background-color: ${dealer.is_open ? '#10b981' : '#ef4444'};"></span>
                        <span style="color: #4b5563; font-weight: 500;">${openStatus}</span>
                    </div>
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
                        <a href="${directionUrl}" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px; color: #ffffff; background-color: #dc2626; padding: 5px 10px; border-radius: 6px; font-weight: 600; font-size: 10px; transition: background 0.2s;">
                            <span>🗺️ ${t('dealer.popupDirections')}</span>
                        </a>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                closeButton: true,
                offset: [0, -5],
            });

            marker.on('click', () => {
                setActiveCardId(dealer.id);
                const element = document.getElementById(
                    `dealer-card-${dealer.id}`,
                );
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                }
            });

            markersRef.current[dealer.id] = marker;
        });

        // Autocenter if there are any dealers matching
        if (filteredDealers.length > 0 && !activeCardId) {
            const points = filteredDealers.map(
                (d) => [d.lat, d.lng] as [number, number],
            );
            if (filteredDealers.length === 1) {
                map.setView(points[0], 12);
            } else {
                map.fitBounds(points, { padding: [40, 40] });
            }
        }
    };

    // Sync markers
    useEffect(() => {
        updateMapMarkers();
    }, [filteredDealers, activeCardId]);

    const handleFocusDealer = (dealer: DealerData) => {
        setActiveCardId(dealer.id);
        const map = leafletMapRef.current;
        if (map) {
            map.flyTo([dealer.lat, dealer.lng], 14, { duration: 1.2 });
            setTimeout(() => {
                const marker = markersRef.current[dealer.id];
                if (marker) {
                    marker.openPopup();
                }
            }, 1200);
        }
    };

    return (
        <section
            id="dealer"
            className="relative z-20 bg-background px-6 pb-24 lg:px-12"
        >
            <div className="mx-auto max-w-7xl">
                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mt-12 text-center"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 text-4xl leading-tight font-bold text-[#1833a0] md:text-6xl"
                    >
                        {t('dealer.trusted')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-[#000168]"
                    >
                        {t('dealer.trustedBody')}
                    </motion.p>
                </motion.div>

                {/* Locator Area */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Sidebar */}
                        <div className="flex flex-col border-b border-gray-100 lg:col-span-5 lg:border-r lg:border-b-0 dark:border-gray-800">
                            <div className="dark:border-gray-850 border-b border-gray-50 p-4">
                                <div className="relative mb-3 flex items-center">
                                    <LuSearch className="absolute left-3.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={t(
                                            'dealer.searchPlaceholder',
                                        )}
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-2.5 pl-10 text-sm transition outline-none focus:border-red-600 focus:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus:border-red-600"
                                    />
                                </div>
                            </div>

                            <div className="scrollbar-thin max-h-[500px] overflow-y-auto p-2 lg:h-[600px] lg:max-h-[600px]">
                                {filteredDealers.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <div className="mb-2 text-3xl">🗺️</div>
                                        <p className="text-sm">
                                            {t('dealer.emptyState')}
                                        </p>
                                    </div>
                                ) : (
                                    filteredDealers.map((dealer) => {
                                        const isSelected =
                                            activeCardId === dealer.id;
                                        return (
                                            <div
                                                id={`dealer-card-${dealer.id}`}
                                                key={dealer.id}
                                                onClick={() =>
                                                    handleFocusDealer(dealer)
                                                }
                                                className={`mb-2 cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                                                    isSelected
                                                        ? 'border-red-600 bg-red-50/20 dark:bg-red-950/10'
                                                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50 dark:hover:border-gray-800 dark:hover:bg-gray-900/50'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="leading-tight font-bold text-gray-900 dark:text-gray-100">
                                                        {dealer.name}
                                                    </h4>
                                                </div>
                                                {dealer.contact_number && (
                                                    <div className="mt-2 text-[11px] font-semibold text-[#1833a0] dark:text-blue-400">
                                                        📞 {dealer.contact_number}
                                                    </div>
                                                )}
                                                {dealer.address && (
                                                    <p className="mt-2 flex items-start gap-1 p-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <LuMapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
                                                        <span>
                                                            {dealer.address}
                                                        </span>
                                                    </p>
                                                )}
                                                <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-gray-100/50 pt-2 text-[11px] text-gray-400 dark:border-gray-800/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                dealer.is_open
                                                                    ? 'bg-emerald-500'
                                                                    : 'bg-red-500'
                                                            }`}
                                                        ></span>
                                                        <span className="font-medium text-gray-600 dark:text-gray-400">
                                                            {dealer.is_open
                                                                ? t(
                                                                      'dealer.openNow',
                                                                  )
                                                                : t(
                                                                      'dealer.closed',
                                                                  )}
                                                        </span>
                                                    </div>
                                                    <button className="flex items-center gap-0.5 font-semibold text-[#1833a0] hover:underline dark:text-blue-400">
                                                        {t('dealer.viewOnMap')}{' '}
                                                        <LuExternalLink className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative h-[400px] w-full lg:col-span-7 lg:h-[685px]">
                            <div
                                ref={mapContainerRef}
                                className="z-10 h-full w-full"
                            />
                        </div>
                    </div>
                </div>

                <motion.div
                    variants={staggerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mt-12 text-center"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="mb-6 text-4xl leading-tight font-bold text-[#1833a0] md:text-6xl"
                    >
                        {t('dealer.title')}
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-[#000168]"
                    >
                        {t('dealer.body')}
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        className="mb-12 flex items-center justify-center"
                    >
                        <SplitIconButton
                            text={t('dealer.cta')}
                            icon={<LuArrowRight className="h-5 w-5" />}
                            variant="red"
                            size="lg"
                            onClick={() =>
                                document
                                    .getElementById('contact')
                                    ?.scrollIntoView({ behavior: 'smooth' })
                            }
                        />
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
