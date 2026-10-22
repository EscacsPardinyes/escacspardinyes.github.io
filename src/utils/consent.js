// Cookie consent + analytics (Metricool). The tracker is only loaded after the user accepts.
const CONSENT_KEY = 'cookieConsent'; // 'accepted' | 'rejected'
const LEGACY_KEY = 'cookieAccepted'; // old banner without a reject option: ask again
const METRICOOL_SRC = 'https://tracker.metricool.com/resources/be.js';
const METRICOOL_HASH = '2184f666a01c5252ff0154bdad5ead69';

export const OPEN_COOKIE_SETTINGS_EVENT = 'open-cookie-settings';

export function getConsent() {
    try {
        return localStorage.getItem(CONSENT_KEY);
    } catch {
        return null;
    }
}

export function setConsent(value) {
    const previous = getConsent();
    try {
        localStorage.setItem(CONSENT_KEY, value);
        localStorage.removeItem(LEGACY_KEY);
    } catch {
        // Storage unavailable: the choice only lasts for this page view
    }

    if (value === 'accepted') {
        loadAnalytics();
    } else if (previous === 'accepted') {
        // The tracker can't be unloaded once running: reload so it is gone
        window.location.reload();
    }
}

export function loadAnalytics() {
    if (document.querySelector(`script[src="${METRICOOL_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = METRICOOL_SRC;
    script.async = true;
    script.onload = () => {
        if (typeof window.beTracker !== 'undefined') window.beTracker.t({ hash: METRICOOL_HASH });
    };
    document.head.appendChild(script);
}

export function openCookieSettings() {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
