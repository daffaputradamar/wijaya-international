import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';

export default function CookieBanner() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem('cookie_consent');
        if (!accepted) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'rejected');
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#111] border-t border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-white/70 text-sm flex-1">
                    {t('cookie.message')}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                        onClick={handleReject}
                        className="text-sm text-white/50 hover:text-white transition-colors px-4 py-1.5 border border-white/20 rounded-full"
                    >
                        {t('cookie.reject')}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="text-sm text-black bg-white hover:bg-white/90 transition-colors px-4 py-1.5 rounded-full font-medium"
                    >
                        {t('cookie.accept')}
                    </button>
                </div>
            </div>
        </div>
    );
}
