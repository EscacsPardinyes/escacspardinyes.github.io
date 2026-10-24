import { useState } from 'react';

const STORAGE_KEY = 'theme';

function currentTheme() {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// The saved theme is applied before first paint by a small inline script in index.html
export default function ThemeToggle() {
    const [theme, setTheme] = useState(currentTheme);
    const isDark = theme === 'dark';

    const toggle = () => {
        const next = isDark ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage unavailable: the choice only lasts for this visit
        }
        setTheme(next);
    };

    return (
        <button
            type="button"
            className="nav-item nav-link theme-toggle"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label={isDark ? 'Mode clar' : 'Mode fosc'}
            title={isDark ? 'Mode clar' : 'Mode fosc'}
        >
            <i className={`fa ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
    );
}
