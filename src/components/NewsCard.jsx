import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NewsCard({ item }) {
    const { language, t } = useLanguage();

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0 news-card-premium"
                style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img
                        src={item.image}
                        alt={item.title[language]}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="card-img-top news-image"
                        loading="lazy"
                    />
                    <div className="position-absolute" style={{ top: '15px', right: '15px' }}>
                        <span className="badge px-3 py-2" style={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            color: '#2e7d32',
                            borderRadius: '10px',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            {t(`news.cat_${item.category}`).toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: '0.85rem' }}>
                        <i className="fa fa-calendar-alt mr-2 text-primary" style={{ color: '#2e7d32' }}></i>
                        {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <h5 className="card-title font-weight-bold mb-3" style={{ color: '#1a3a1a', lineHeight: '1.4' }}>
                        {item.title[language]}
                    </h5>

                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {item.summary[language].length > 120 ? item.summary[language].substring(0, 117) + '...' : item.summary[language]}
                    </p>

                    <Link to={`/noticies/${item.id}`} className="read-more-link d-inline-flex align-items-center mt-3 font-weight-bold" style={{ color: '#2e7d32', textDecoration: 'none', fontSize: '0.9rem' }}>
                        {t('news.read_more').toUpperCase()}
                        <i className="fa fa-arrow-right ml-2" style={{ transition: 'transform 0.3s ease' }}></i>
                    </Link>
                </div>
            </div>

            <style>{`
                .news-card-premium:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(46, 125, 50, 0.1) !important;
                }
                .news-card-premium:hover .news-image {
                    transform: scale(1.1);
                }
                .read-more-link:hover i {
                    transform: translateX(5px);
                }
            `}</style>
        </div>
    );
}
