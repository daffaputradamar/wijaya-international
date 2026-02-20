import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/language-context';
import Navbar from '@/components/public/navbar';
import Footer from '@/components/public/footer';
import CookieBanner from '@/components/public/cookie-banner';

interface GuestLayoutProps {
    children: ReactNode;
    hideFooter?: boolean;
}

export default function GuestLayout({ children, hideFooter = false }: GuestLayoutProps) {
    return (
        <LanguageProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Navbar />
                <main>{children}</main>
                {!hideFooter && <Footer />}
                <CookieBanner />
            </div>
        </LanguageProvider>
    );
}
