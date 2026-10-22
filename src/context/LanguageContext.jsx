import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getTranslations, loadTranslations, getInitialLanguage, SUPPORTED_LANGUAGES } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // main.jsx loads the initial language before the first render
    const [language, setCurrentLanguage] = useState(getInitialLanguage);

    // Switch only once the language file is downloaded, so the page never shows missing texts
    const setLanguage = useCallback(async (lang) => {
        if (!SUPPORTED_LANGUAGES.includes(lang)) return;
        await loadTranslations(lang);
        setCurrentLanguage(lang);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch {
            // Storage unavailable
        }
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
        const current = getTranslations(language);
        if (current && current[key]) {
            return current[key];
        }
        // Fallback to Catalan if not found
        const ca = getTranslations('ca');
        if (ca[key]) {
            return ca[key];
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

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    return useContext(LanguageContext);
}
