import { Head } from '@inertiajs/react';
import AboutSection from '@/components/home/about-section';
import BrandsSection from '@/components/home/brands-section';
import ContactSection from '@/components/home/contact-section';
import DealerNetworkSection from '@/components/home/dealer-network-section';
import HeroSection from '@/components/home/hero-section';
import ProductsTeaserSection from '@/components/home/products-teaser-section';
import type { HomeProps } from '@/components/home/types';
import WhatWeDoSection from '@/components/home/what-we-do-section';
import WhyChooseUsSection from '@/components/home/why-choose-us-section';
import Footer from '@/components/public/footer';
import GuestLayout from '@/layouts/guest-layout';

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home({
    brands,
    productCategories,
    serviceCards,
}: Omit<HomeProps, 'latestNews' | 'projects'>) {
    return (
        <GuestLayout hideFooter>
            <Head title="Perusahaan Distribusi Nasional">
                <meta
                    head-key="description"
                    name="description"
                    content="PT Wijaya International adalah distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia. Merek ternama: Sony, Canon, DJI, Feiyutech, Kodak, dan lainnya."
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content="PT Wijaya International | Distribusi Elektronik & Kamera"
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia."
                />
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content="PT Wijaya International | Distribusi Elektronik & Kamera"
                />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content="Distributor resmi produk kamera, elektronik, dan teknologi terkemuka di Indonesia."
                />
            </Head>
            <HeroSection />
            <AboutSection />
            <WhatWeDoSection serviceCards={serviceCards} />
            <ProductsTeaserSection productCategories={productCategories} />
            <BrandsSection brands={brands} />
            <DealerNetworkSection />
            <WhyChooseUsSection />
            {/* <NewsSectionHome latestNews={latestNews} /> */}
            <ContactSection />
            {/* Footer is pulled up -100vh to slide over the sticky portfolio */}
            <div className="relative z-30 -mt-[100vh]">
                <Footer />
            </div>
        </GuestLayout>
    );
}
