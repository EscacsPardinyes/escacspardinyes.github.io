// Language in the URL: Catalan keeps the original paths (/school), Spanish and English get a
// prefix (/es/school, /en/school). Shared by the app and scripts/postbuild.js (no browser APIs
// at module level).
export const LANGUAGES = ['ca', 'es', 'en'];
export const DEFAULT_LANGUAGE = 'ca';
const PREFIXED = ['es', 'en'];

export function getLangFromPath(pathname) {
    const firstSegment = pathname.split('/')[1];
    return PREFIXED.includes(firstSegment) ? firstSegment : DEFAULT_LANGUAGE;
}

// '/es/school' -> '/school', '/es' -> '/'
export function stripLangPrefix(pathname) {
    const lang = getLangFromPath(pathname);
    if (lang === DEFAULT_LANGUAGE) return pathname;
    return pathname.slice(lang.length + 1) || '/';
}

// Internal path (optionally with ?query/#hash) in the given language.
// External URLs, anchors and protocol-relative links are returned untouched.
export function localizePath(path, lang) {
    if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) return path;
    const [, pathname, rest] = path.match(/^([^?#]*)(.*)$/);
    const base = stripLangPrefix(pathname);
    if (lang === DEFAULT_LANGUAGE) return base + rest;
    return `/${lang}${base === '/' ? '/' : base}${rest}`;
}

// GitHub Pages serves /about/index.html at /about/ and 301-redirects /about there,
// so canonical URLs end with a slash
export function withTrailingSlash(pathname) {
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

// On first load: old links with ?lang=es and returning visitors who chose another language
// go to the prefixed URL. Returns the language of the final URL.
export function applyInitialLanguageRedirect() {
    const { pathname, search, hash } = window.location;
    const params = new URLSearchParams(search);
    const langParam = params.get('lang');
    params.delete('lang');

    let target = pathname;
    if (getLangFromPath(pathname) === DEFAULT_LANGUAGE) {
        let preferred = PREFIXED.includes(langParam) ? langParam : null;
        if (!preferred && !langParam) {
            try {
                const saved = localStorage.getItem('language');
                if (PREFIXED.includes(saved)) preferred = saved;
            } catch {
                // Storage unavailable
            }
        }
        if (preferred) target = localizePath(pathname, preferred);
    }

    const query = params.toString();
    const finalUrl = `${target}${query ? `?${query}` : ''}${hash}`;
    if (finalUrl !== pathname + search + hash) {
        window.history.replaceState(window.history.state, '', finalUrl);
    }
    return getLangFromPath(target);
}
