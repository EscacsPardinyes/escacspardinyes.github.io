import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'ca';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
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
