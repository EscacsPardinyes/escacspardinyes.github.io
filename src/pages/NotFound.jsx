import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <>
            <Link to="/" style={{
                display: 'block',
                position: 'relative', // Context for absolute positioning
                width: '100%',
                height: 'calc(100vh - 80px)', // Subtract approx header height to avoid scrollbar
                marginTop: '0', // Reset margin so top is not cut off
                overflow: 'hidden', // Prevent blur scrollbars
                textDecoration: 'none'
            }} aria-label={t('nav.home')}>
                {/* Blurred Background to fill screen */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/img/404gif.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(15px)',
                    transform: 'scale(1.1)', // Reduce edge bleeding from blur
                    opacity: 0.6
                }}></div>

                {/* Main Content Image - Contained */}
                <div style={{
                    position: 'relative', // Sit on top of blur
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/img/404gif.webp)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}></div>
            </Link>
        </>
    );
}
