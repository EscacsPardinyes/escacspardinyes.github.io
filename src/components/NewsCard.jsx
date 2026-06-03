import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NewsCard({ item }) {
    const { language, t } = useLanguage();

    return (
        <div className="col-lg-4 col-md-6 mb-4 animate-fade-in">
            <div className="card h-100 border-0 news-card-premium shadow-hover"
                style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                }}
            >
                <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                    <img
                        src={item.image}
                        alt={item.title[language]}
                        style={{ width: '100%', height: '100%', objectFit: item.category === 'prensa' ? 'contain' : 'cover', backgroundColor: item.category === 'prensa' ? '#f8f9fa' : 'transparent', transition: 'transform 0.8s ease' }}
                        className="card-img-top news-image"
                        loading="lazy"
                    />
                    <div className="position-absolute" style={{ top: '20px', right: '20px' }}>
                        <span className="badge px-3 py-2 text-uppercase" style={{
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--secondary-color)',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)'
                        }}>
                            {t(`news.cat_${item.category}`)}
                        </span>
                    </div>
                    <div className="img-overlay"></div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center mb-3 text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                        <i className="fa fa-calendar-alt mr-2 text-primary"></i>
                        {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <h4 className="card-title font-weight-bold mb-3" style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>
                        {item.title[language]}
                    </h4>

                    <p className="card-text text-muted flex-grow-1 mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                        {item.summary[language].length > 120 ? item.summary[language].substring(0, 117) + '...' : item.summary[language]}
                    </p>

                    <Link to={`/noticies/${item.id}`} className="btn btn-outline-primary btn-sm rounded-pill font-weight-bold py-2 px-4 align-self-start" style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
                        {t('news.read_more')}
                        <i className="fa fa-arrow-right ml-2"></i>
                    </Link>
                </div>
            </div>

            <style>{`
                .news-card-premium {
                    border: 1px solid rgba(0,0,0,0.05) !important;
                }
                .news-card-premium:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1) !important;
                    border-color: var(--primary-color) !important;
                }
                .news-card-premium:hover .news-image {
                    transform: scale(1.05);
                }
                .news-card-premium .btn-outline-primary:hover {
                    transform: translateX(5px);
                }
                .img-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .news-card-premium:hover .img-overlay {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}
