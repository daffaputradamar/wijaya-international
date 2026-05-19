import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { EASE, fadeUp, staggerSlow } from './motion-variants';
import type { BrandData } from './types';

interface BrandsSectionProps {
    brands: BrandData[];
}

export default function BrandsSection({ brands: brandData }: BrandsSectionProps) {
    const row1Brands =
        brandData.length > 0
            ? brandData.slice(0, Math.ceil(brandData.length / 2)).map((b) => ({ name: b.name, image: b.logo_url }))
            : [
                  { name: 'SBOX', image: '/assets/brands/SBOX.png' },
                  { name: 'Kodak PixPro', image: '/assets/brands/kodakpixpro.png' },
                  { name: 'Kodak Charmera', image: '/assets/brands/kodak charmera.png' },
                  { name: 'Canon', image: '/assets/brands/Canon.png' },
                  { name: 'Sony', image: '/assets/brands/Sony.png' },
                  { name: 'DJI', image: '/assets/brands/DJI.png' },
                  { name: 'FeiYuTech', image: '/assets/brands/Feiyutech.png' },
                  { name: '7Artisans', image: '/assets/brands/7artisan.png' },
              ];

    const row2Brands =
        brandData.length > 0
            ? brandData.slice(Math.ceil(brandData.length / 2)).map((b) => ({ name: b.name, image: b.logo_url }))
            : [
                  { name: 'Fujifilm', image: '/assets/brands/fujifilm.png' },
                  { name: 'Nikon', image: '/assets/brands/nikon.png' },
                  { name: 'Panasonic', image: '/assets/brands/panasonic.png' },
                  { name: 'Instax', image: '/assets/brands/instax.png' },
                  { name: 'Hollyland', image: '/assets/brands/hollyland.png' },
                  { name: 'Godox', image: '/assets/brands/godox.png' },
                  { name: 'SanDisk', image: '/assets/brands/sandisk.png' },
              ];

    const edgeFade = {
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
    };

    return (
        <section className="relative z-20 overflow-hidden border-t border-border bg-muted/10 pt-24">
            <motion.div
                variants={staggerSlow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-12 px-6 text-center lg:px-12"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-4xl leading-tight font-bold text-[#1833a0] md:text-6xl"
                >
                    Brand Partners
                </motion.h2>
            </motion.div>

            {/* Row 1 — slides right-to-left */}
            <div className="mb-8" style={edgeFade}>
                <Carousel
                    className="w-full"
                    opts={{ loop: true, direction: 'rtl' }}
                    plugins={[Autoplay({ delay: 2000 })]}
                >
                    <CarouselContent className="gap-8">
                        {row1Brands.map((brand) => (
                            <CarouselItem key={brand.name} className="basis-1/6 pl-0">
                                <motion.img
                                    src={brand.image}
                                    alt={brand.name}
                                    whileHover={{ scale: 1.15, transition: { duration: 0.3, ease: EASE } }}
                                    className="h-40 w-40 cursor-grab object-contain active:cursor-grabbing"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Row 2 — slides left-to-right */}
            <div className="mb-8" style={edgeFade}>
                <Carousel
                    className="w-full"
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 2000 })]}
                >
                    <CarouselContent className="gap-8">
                        {row2Brands.map((brand) => (
                            <CarouselItem key={brand.name} className="basis-1/6 pl-0">
                                <motion.img
                                    src={brand.image}
                                    alt={brand.name}
                                    whileHover={{ scale: 1.15, transition: { duration: 0.3, ease: EASE } }}
                                    className="h-40 w-40 cursor-grab object-contain active:cursor-grabbing"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
