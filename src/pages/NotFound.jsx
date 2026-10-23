import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <>
            <SEO title="404 - Pàgina No Trobada" description={t('notfound.title')} />
            <Link to="/" style={{
                display: 'block',
                position: 'relative', // Context for absolute positioning
                width: '100%',
                height: 'calc(100vh - 80px)', // Subtract approx header height to avoid scrollbar
                marginTop: '0', // Reset margin so top is not cut off
                overflow: 'hidden', // Prevent blur scrollbars
                textDecoration: 'none'
            }} aria-label={t('nav.home')}>
                {/* Blurred Background to fill screen (still frame: blurred, the motion isn't noticeable) */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/img/404-poster.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(15px)',
                    transform: 'scale(1.1)', // Reduce edge bleeding from blur
                    opacity: 0.6
                }}></div>

                {/* Main Content Animation - Contained (video is ~200 KB vs 15 MB as animated WebP) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/img/404-poster.webp"
                    aria-hidden="true"
                    style={{
                        position: 'relative', // Sit on top of blur
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                >
                    <source src="/img/404.webm" type="video/webm" />
                    <source src="/img/404.mp4" type="video/mp4" />
                </video>
            </Link>
        </>
    );
}
