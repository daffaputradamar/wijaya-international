import { X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/lib/language-context';
import { contrastText } from './types';
import type { PublicBrand, PublicProduct } from './types';

interface ProductDetailOverlayProps {
    product: PublicProduct | null;
    brand: PublicBrand | null;
    onClose: () => void;
}

type Tab = 'discover' | 'specification';

export default function ProductDetailOverlay({ product, brand, onClose }: ProductDetailOverlayProps) {
    return (
        <Dialog open={product !== null} onOpenChange={(open) => !open && onClose()}>
            {product && <OverlayContent key={product.id} product={product} brand={brand} />}
        </Dialog>
    );
}

function OverlayContent({ product, brand }: { product: PublicProduct; brand: PublicBrand | null }) {
    const { t } = useLanguage();
    const hasSpecs = product.specifications.length > 0;
    const [tab, setTab] = useState<Tab>('discover');
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <DialogContent
            showCloseButton={false}
            className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl border-0 bg-white p-5 text-gray-900 sm:max-w-5xl md:p-7 dark:bg-[#0f1117] dark:text-white"
        >
            {/* Prominent close */}
            <DialogClose className="absolute top-5 right-5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-[#1833a0] text-white shadow-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1833a0]/40">
                <X className="h-3 w-3" />
                <span className="sr-only">Close</span>
            </DialogClose>

            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
                {/* Left — imagery */}
                <div className="flex flex-col gap-4">
                    {brand && (
                        <div className={`flex justify-start`}>
                            <img src={brand.logo_url} alt={brand.name} className="max-h-12 w-28 object-contain" />
                        </div>
                    )}

                    <div className="flex min-h-72 flex-1 items-center justify-center rounded-2xl bg-[#f2f2f4] p-8 md:min-h-96 dark:bg-white/10">
                        {product.images[imageIndex] ? (
                            <img
                                src={product.images[imageIndex]}
                                alt={product.name}
                                className="max-h-80 max-w-full object-contain"
                            />
                        ) : (
                            <span className="text-sm text-gray-400">No image</span>
                        )}
                    </div>

                    {product.images.length > 1 && (
                        <div className="flex flex-wrap gap-2.5">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setImageIndex(index)}
                                    className={`flex h-16 w-20 items-center justify-center rounded-2xl border-2 bg-[#f2f2f4] p-2 transition-colors dark:bg-white/10 ${
                                        index === imageIndex
                                            ? 'border-[#1833a0]'
                                            : 'border-transparent hover:border-gray-300 dark:hover:border-white/20'
                                    }`}
                                >
                                    <img src={image} alt="" className="max-h-full max-w-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right — details */}
                <div className="flex flex-col gap-6 pr-10 md:pr-8">
                    {/* Tabs */}
                    <div className="flex gap-2 bg-accent rounded-full p-1 text-center text-gray-900 dark:bg-white/10 dark:text-white/80">
                        <button
                            type="button"
                            onClick={() => setTab('discover')}
                            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                tab === 'discover'
                                    ? 'bg-[#1833a0] text-white'
                                    : 'bg-gray-100 text-[#1833a0] hover:bg-gray-200 dark:bg-white/10 dark:text-white/80'
                            }`}
                        >
                            {t('products.discover')}
                        </button>
                        {hasSpecs && (
                            <button
                                type="button"
                                onClick={() => setTab('specification')}
                                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    tab === 'specification'
                                        ? 'bg-[#1833a0] text-white'
                                        : 'bg-gray-100 text-[#1833a0] hover:bg-gray-200 dark:bg-white/10 dark:text-white/80'
                                }`}
                            >
                                {t('products.techspec')}
                            </button>
                        )}
                    </div>

                    {tab === 'discover' ? (
                        <div className="flex flex-col gap-6">
                            <div>
                                <DialogTitle className="text-3xl font-extrabold tracking-tight uppercase">
                                    {product.name}
                                </DialogTitle>
                                {product.category && (
                                    <p className="mt-1 text-sm font-medium tracking-[0.2em] text-gray-500 uppercase dark:text-white/60">
                                        {product.category}
                                    </p>
                                )}
                            </div>

                            {product.key_specs.length > 0 && (
                                <div className="flex flex-wrap gap-2.5">
                                    {product.key_specs.map((spec, index) => (
                                        <div
                                            key={index}
                                            className="flex min-w-16 flex-col items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-center dark:border-white/20"
                                        >
                                            <span className="text-sm font-bold whitespace-nowrap">{spec.value}</span>
                                            {spec.label && (
                                                <span className="mt-0.5 text-[10px] leading-tight text-gray-500 dark:text-white/60">
                                                    {spec.label}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {product.colors.length > 0 && (
                                <div className="mt-auto rounded-2xl bg-gray-50 p-4 dark:bg-white/5">
                                    <p className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-white/60">
                                        {t('products.availableColors')}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map((color) => (
                                            <span
                                                key={color.name}
                                                className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold dark:border-white/10"
                                                style={{ backgroundColor: color.hex, color: contrastText(color.hex) }}
                                            >
                                                {color.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-extrabold">{t('products.specification')}</h3>
                            <div className="max-h-[26rem] overflow-y-auto rounded-2xl bg-gray-50 p-2 dark:bg-white/5">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {product.specifications.map((row, index) =>
                                            row.type === 'header' ? (
                                                <tr key={index}>
                                                    <td
                                                        colSpan={2}
                                                        className="px-3 pt-5 pb-1 text-xs font-bold tracking-wide text-gray-800 uppercase dark:text-white/80"
                                                    >
                                                        {row.label}
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index} className="border-b border-gray-200/70 last:border-0 dark:border-white/10">
                                                    <td className="w-2/5 px-3 py-2 align-top text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-white/60">
                                                        {row.label}
                                                    </td>
                                                    <td className="px-3 py-2 align-top text-gray-800 dark:text-white/90">
                                                        {row.value}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DialogContent>
    );
}
