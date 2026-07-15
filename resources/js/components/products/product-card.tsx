import { LuArrowUpRight } from 'react-icons/lu';
import type { PublicProduct } from './types';

interface ProductCardProps {
    product: PublicProduct;
    onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white p-3 text-left ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-[#1833a0]/40 dark:bg-white/5 dark:ring-white/10"
        >
            {/* Image panel */}
            <div className="relative flex h-52 items-center justify-center rounded-xl bg-[#f2f2f4] p-6 dark:bg-white/10">
                {product.images[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-sm text-gray-400">No image</span>
                )}

                <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1833a0] text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    <LuArrowUpRight className="h-4 w-4" />
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-2 px-2 pt-4 pb-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{product.name}</h3>
                {product.category && (
                    <p className="text-[11px] font-medium tracking-[0.18em] text-gray-400 uppercase dark:text-white/50">
                        {product.category}
                    </p>
                )}

                {product.colors.length > 0 && (
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                        {product.colors.map((color) => (
                            <span
                                key={color.name}
                                title={color.name}
                                className="h-4 w-4 rounded-full border border-black/15 dark:border-white/20"
                                style={{ backgroundColor: color.hex }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
}
