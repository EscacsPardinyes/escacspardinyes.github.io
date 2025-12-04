import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        if (!cookieAccepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div id="cookie-banner" style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#333',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            zIndex: 1000
        }}>
            {t('cookie.banner.text')} <Link to="/cookies" style={{ color: '#ffc107' }}>{t('cookie.banner.link')}</Link>.
            <button onClick={acceptCookies} style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#ffc107',
                border: 'none',
                color: 'black',
                cursor: 'pointer'
            }}>{t('cookie.banner.accept')}</button>
        </div>
    );
}
