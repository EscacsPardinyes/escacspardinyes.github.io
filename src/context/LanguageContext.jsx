import { createContext, useContext, useEffect, useCallback, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranslations, loadTranslations } from '../data/translations';
import { LANGUAGES, getLangFromPath, localizePath } from '../utils/i18nRouting';

const LanguageContext = createContext();

// The language comes from the URL (/es/..., /en/..., or no prefix for Catalan).
// Must be rendered inside the router.
export function LanguageProvider({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const language = getLangFromPath(location.pathname);
    const [, rerender] = useReducer((x) => x + 1, 0);

    // main.jsx loads the initial language before the first render; this covers arriving at
    // another language later (e.g. browser back/forward)
    useEffect(() => {
        if (!getTranslations(language)) loadTranslations(language).then(rerender);
    }, [language]);

    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch {
            // Storage unavailable
        }
        document.documentElement.lang = language;
    }, [language]);

    // Switch only once the language file is downloaded, so the page never shows missing texts
    const setLanguage = useCallback(async (lang) => {
        if (!LANGUAGES.includes(lang)) return;
        await loadTranslations(lang);
        navigate(localizePath(location.pathname, lang) + location.search + location.hash, {
            state: { keepScroll: true }
        });
    }, [location, navigate]);

    // Internal path in the current language: localize('/school') -> '/es/school'
    const localize = useCallback((path) => localizePath(path, language), [language]);

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
        <LanguageContext.Provider value={{ language, setLanguage, localize, t, tHtml }}>
            {children}
        </LanguageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    return useContext(LanguageContext);
}
