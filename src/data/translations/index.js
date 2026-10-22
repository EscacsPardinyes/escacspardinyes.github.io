// Catalan is the default and the fallback for missing keys, so it ships in the main bundle.
// Spanish and English are separate chunks, downloaded only when that language is used.
import ca from './ca.js';

export const SUPPORTED_LANGUAGES = ['ca', 'es', 'en'];

const loaders = {
    es: () => import('./es.js'),
    en: () => import('./en.js'),
};

const loaded = { ca };

export function getTranslations(lang) {
    return loaded[lang];
}

export async function loadTranslations(lang) {
    if (!loaded[lang]) {
        loaded[lang] = (await loaders[lang]()).default;
    }
    return loaded[lang];
}

// URL ?lang= (SEO and deep links) > saved preference > Catalan
export function getInitialLanguage() {
    const langParam = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED_LANGUAGES.includes(langParam)) return langParam;
    try {
        const savedLang = localStorage.getItem('language');
        if (SUPPORTED_LANGUAGES.includes(savedLang)) return savedLang;
    } catch {
        // Storage unavailable
    }
    return 'ca';
}
