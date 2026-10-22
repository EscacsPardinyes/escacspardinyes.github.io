import { useState, useEffect } from 'react';
import { Link } from './LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import { getConsent, setConsent, OPEN_COOKIE_SETTINGS_EVENT } from '../utils/consent';

const buttonStyle = {
    marginLeft: '10px',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer'
};

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(() => !getConsent());
    const { t } = useLanguage();

    // Reopen the banner from the Cookies page ("change preferences")
    useEffect(() => {
        const open = () => setIsVisible(true);
        window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
        return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    }, []);

    const choose = (value) => {
        setIsVisible(false);
        setConsent(value);
    };

    if (!isVisible) return null;

    return (
        <div id="cookie-banner" role="dialog" aria-live="polite" style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#333',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            zIndex: 1060 // above NewsletterModal (1050) so the choice is always reachable
        }}>
            {t('cookie.banner.text')} <Link to="/cookies" style={{ color: '#ffc107' }}>{t('cookie.banner.link')}</Link>.
            <span style={{ display: 'inline-block', marginTop: '5px' }}>
                <button onClick={() => choose('rejected')} style={{
                    ...buttonStyle,
                    backgroundColor: 'transparent',
                    border: '1px solid #ffc107',
                    color: '#ffc107'
                }}>{t('cookie.banner.reject')}</button>
                <button onClick={() => choose('accepted')} style={{
                    ...buttonStyle,
                    backgroundColor: '#ffc107',
                    color: 'black'
                }}>{t('cookie.banner.accept')}</button>
            </span>
        </div>
    );
}
