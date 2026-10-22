// Catalan is the default and the fallback for missing keys, so it ships in the main bundle.
// Spanish and English are separate chunks, downloaded only when that language is used.
import ca from './ca.js';

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
