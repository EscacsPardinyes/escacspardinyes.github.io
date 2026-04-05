import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // 1. Check URL query parameter first (for SEO and deep links)
        const params = new URLSearchParams(window.location.search);
        const langParam = params.get('lang');
        if (langParam && translations[langParam]) {
            return langParam;
        }
        // 2. Check localStorage
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }
        // 3. Default to Catalan
        return 'ca';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;

        // Update URL query parameter without reloading if it's different
        const params = new URLSearchParams(window.location.search);
        if (params.get('lang') !== language) {
            params.set('lang', language);
            const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [language]);

    const t = (key) => {
        // Check if translation exists for the current language
        if (translations[language] && translations[language][key]) {
            return translations[language][key];
        }
        // Fallback to Catalan if not found
        if (translations['ca'] && translations['ca'][key]) {
            return translations['ca'][key];
        }
        // Return key if nothing found
        return key;
    };

    // Helper to get HTML content (for translations with tags like <strong>)
    const tHtml = (key) => {
        return { __html: t(key) };
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, tHtml }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
