import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';

export type Language = 'id' | 'en';

interface LanguageContextValue {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return ctx;
}

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [lang, setLangState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('lang') as Language) ?? 'id';
        }
        return 'id';
    });

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', newLang);
        }
    };

    const t = (key: string): string => {
        return (translations[lang] as Record<string, string>)?.[key]
            ?? (translations['id'] as Record<string, string>)?.[key]
            ?? key;
    };

    return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}
