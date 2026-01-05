import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">404 Error</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">404</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="text-center" style={{ padding: '50px' }}>
                <div className="chess-piece-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <h1 className="chess-pieces white-rook floating-piece" style={{ fontSize: '120px', color: '#000' }}>♖</h1>
                    <h1 className="chess-pieces flipped-knight floating-piece-flipped" style={{ fontSize: '120px' }}>♞</h1>
                </div>
                <p style={{ fontSize: '22px', textShadow: '1px 1px 3px #ccc' }}>{t('notfound.title')}</p>
                <p style={{ fontSize: '22px', textShadow: '1px 1px 3px #ccc' }}>{t('notfound.subtitle')}</p>
                <div className="fun-message" style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '40px' }}>
                    {t('notfound.message')}
                </div>
                <Link to="/" style={{
                    color: '#FFD700',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    border: '2px solid #FFD700',
                    display: 'inline-block',
                    marginTop: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>{t('notfound.button')}</Link>
            </div>
        </>
    );
}
