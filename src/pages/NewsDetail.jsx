import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { news } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import SEO from '../components/SEO';

export default function NewsDetail() {
    const { id } = useParams();
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    // Find current item
    const itemIndex = news.findIndex(n => n.id === id);
    const item = news[itemIndex];

    // Navigation logic (sorted by date)
    const sortedNews = useMemo(() => [...news].sort((a, b) => new Date(b.date) - new Date(a.date)), []);
    const currentSortedIndex = sortedNews.findIndex(n => n.id === id);
    const nextItem = currentSortedIndex > 0 ? sortedNews[currentSortedIndex - 1] : null;
    const prevItem = currentSortedIndex < sortedNews.length - 1 ? sortedNews[currentSortedIndex + 1] : null;

    // Related news logic
    const relatedNews = useMemo(() => {
        if (!item) return [];
        return news
            .filter(n => n.id !== id && (n.category === item.category))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
    }, [id, item]);

    const allImages = item ? [item.image, ...(item.gallery || [])] : [];

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        setModalImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        setModalImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isImageModalOpen) return;
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') setIsImageModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isImageModalOpen, allImages.length]);

    useEffect(() => {
        if (!item) {
            navigate('/noticies');
        }
        window.scrollTo(0, 0);
    }, [id, item, navigate]);

    if (!item) return null;

    const breadcrumbs = [
        { label: t('news.breadcrumb'), path: '/noticies' },
        { label: item.title[language] }
    ];

    const shareUrl = window.location.href;
    const shareTitle = item.title[language];

    return (
        <div style={{ backgroundColor: '#fcfdfc' }}>
            <SEO
                title={item.title[language]}
                description={item.summary[language]}
                image={item.image}
                type="article"
                breadcrumbs={breadcrumbs}
                schema={{
                    datePublished: item.date,
                    dateModified: item.date
                }}
            />
            <PageHeader title={t('news.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        {/* Header Actions */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="/noticies" className="btn btn-link px-0 text-primary d-flex align-items-center font-weight-bold" style={{ textDecoration: 'none' }}>
                                <i className="fa fa-arrow-left mr-2"></i> {t('news.back')}
                            </Link>
                            
                            <div className="d-flex align-items-center text-muted small">
                                <i className="fa fa-calendar-alt mr-2"></i>
                                {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="position-relative mb-5 shadow-lg rounded overflow-hidden news-main-img-container">
                            <img
                                src={item.image}
                                alt={item.title[language]}
                                className="img-fluid w-100"
                                style={{ 
                                    maxHeight: '600px', 
                                    objectFit: item.category === 'prensa' ? 'contain' : 'cover', 
                                    backgroundColor: item.category === 'prensa' ? '#f8f9fa' : 'transparent', 
                                    cursor: 'zoom-in',
                                    transition: 'transform 0.5s ease'
                                }}
                                onClick={() => {
                                    setModalImageIndex(0);
                                    setIsImageModalOpen(true);
                                }}
                            />
                            <div className="position-absolute" style={{ top: '20px', left: '20px' }}>
                                <span className="badge badge-primary px-3 py-2 shadow" style={{ borderRadius: '10px', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    {t(`news.cat_${item.category}`).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Article Header */}
                        <div className="text-center mb-5">
                            <h1 className="display-4 font-weight-bold mb-4" style={{ color: '#1a3a1a', lineHeight: '1.2' }}>{item.title[language]}</h1>
                            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1.25rem', fontStyle: 'italic' }}>
                                {item.summary[language]}
                            </p>
                        </div>

                        {/* Article Content */}
                        <div 
                            className="news-content-body mb-5" 
                            style={{ 
                                fontSize: '1.15rem', 
                                lineHeight: '1.8', 
                                color: '#333' 
                            }} 
                            dangerouslySetInnerHTML={{ __html: item.content[language].replace(/\n/g, '<br />') }}
                        />

                        {/* Social Sharing Section */}
                        <div className="p-4 rounded mb-5 d-flex flex-wrap align-items-center justify-content-center" style={{ backgroundColor: '#fff', border: '1px solid #eee', gap: '15px' }}>
                            <span className="font-weight-bold mr-3">{t('common.share')}:</span>
                            <a href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn btn-social-icon btn-whatsapp shadow-sm" aria-label="WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`} target="_blank" rel="noopener noreferrer" className="btn btn-social-icon btn-telegram shadow-sm" aria-label="Telegram">
                                <i className="fab fa-telegram-plane"></i>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn btn-social-icon btn-facebook shadow-sm" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn btn-social-icon btn-twitter shadow-sm" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <button
                                className="btn btn-social-icon btn-share-native shadow-sm"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({ title: shareTitle, text: item.summary[language], url: shareUrl });
                                    }
                                }}
                                aria-label="Other options"
                            >
                                <i className="fa fa-share-alt"></i>
                            </button>
                        </div>

                        {/* Gallery Section */}
                        {item.gallery && item.gallery.length > 0 && (
                            <div className="mt-5 pt-4 border-top">
                                <h3 className="h2 font-weight-bold mb-4">{language === 'ca' ? "Galeria d'imatges" : language === 'es' ? "Galería de imágenes" : "Image Gallery"}</h3>
                                <div className="row">
                                    {item.gallery.map((img, index) => (
                                        <div key={index} className="col-md-4 col-sm-6 mb-4">
                                            <div 
                                                className="rounded shadow-sm overflow-hidden gallery-thumb-container" 
                                                style={{ height: '220px', cursor: 'zoom-in' }}
                                                onClick={() => {
                                                    setModalImageIndex(index + 1);
                                                    setIsImageModalOpen(true);
                                                }}
                                            >
                                                <img 
                                                    src={img} 
                                                    alt={`${item.title[language]} - ${index + 1}`}
                                                    className="w-100 h-100 gallery-thumb-img"
                                                    style={{ objectFit: 'cover' }}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Between News */}
                        <div className="row py-5 border-top border-bottom mt-5 mx-0">
                            <div className="col-6 pl-0">
                                {prevItem && (
                                    <Link to={`/noticies/${prevItem.id}`} className="nav-news-link d-flex flex-column text-left" style={{ textDecoration: 'none' }}>
                                        <span className="text-muted small font-weight-bold mb-2">
                                            <i className="fa fa-arrow-left mr-2"></i> {t('news.prev').toUpperCase()}
                                        </span>
                                        <span className="h6 mb-0 text-dark font-weight-bold text-truncate-2">{prevItem.title[language]}</span>
                                    </Link>
                                )}
                            </div>
                            <div className="col-6 pr-0 text-right">
                                {nextItem && (
                                    <Link to={`/noticies/${nextItem.id}`} className="nav-news-link d-flex flex-column text-right" style={{ textDecoration: 'none' }}>
                                        <span className="text-muted small font-weight-bold mb-2">
                                            {t('news.next').toUpperCase()} <i className="fa fa-arrow-right ml-2"></i>
                                        </span>
                                        <span className="h6 mb-0 text-dark font-weight-bold text-truncate-2">{nextItem.title[language]}</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Related News Section */}
                        {relatedNews.length > 0 && (
                            <div className="mt-5">
                                <h3 className="h3 font-weight-bold mb-4" style={{ color: '#1a3a1a' }}>{t('news.related')}</h3>
                                <div className="row">
                                    {relatedNews.map(related => (
                                        <NewsCard key={related.id} item={related} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {isImageModalOpen && (
                <div 
                    className="d-flex justify-content-center align-items-center" 
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, cursor: 'zoom-out' }}
                    onClick={() => setIsImageModalOpen(false)}
                >
                    {allImages.length > 1 && (
                        <button 
                            className="btn btn-link text-white position-absolute modal-nav-btn" 
                            style={{ left: '20px', zIndex: 10000, fontSize: '2.5rem' }}
                            onClick={handlePrev}
                        >
                            <i className="fa fa-chevron-left"></i>
                        </button>
                    )}

                    <img 
                        src={allImages[modalImageIndex]} 
                        alt={item.title[language]} 
                        className="modal-main-img"
                        style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }} 
                        onClick={(e) => e.stopPropagation()}
                    />

                    {allImages.length > 1 && (
                        <button 
                            className="btn btn-link text-white position-absolute modal-nav-btn" 
                            style={{ right: '20px', zIndex: 10000, fontSize: '2.5rem' }}
                            onClick={handleNext}
                        >
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    )}

                    <div className="position-absolute text-white" style={{ bottom: '30px', fontSize: '1rem', opacity: 0.8 }}>
                        {modalImageIndex + 1} / {allImages.length}
                    </div>

                    <button 
                        className="btn btn-dark position-absolute" 
                        style={{ top: '20px', right: '20px', fontSize: '1.2rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}
                        onClick={(e) => { e.stopPropagation(); setIsImageModalOpen(false); }}
                        aria-label="Close"
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            )}

            <style>{`
                .news-main-img-container:hover img {
                    transform: scale(1.02);
                }
                .gallery-thumb-container {
                    transition: all 0.3s ease;
                }
                .gallery-thumb-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
                .gallery-thumb-container:hover img {
                    transform: scale(1.08);
                }
                .gallery-thumb-img {
                    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .news-content-body img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 12px;
                    margin: 2rem 0;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }
                .btn-social-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    color: white !important;
                }
                .btn-social-icon:hover {
                    transform: translateY(-3px);
                    filter: brightness(1.1);
                }
                .btn-whatsapp { background-color: #25d366; }
                .btn-telegram { background-color: #0088cc; }
                .btn-facebook { background-color: #1877f2; }
                .btn-twitter { background-color: #1da1f2; }
                .btn-share-native { background-color: #6c757d; }
                
                .nav-news-link {
                    padding: 15px;
                    border-radius: 12px;
                    transition: background 0.3s ease;
                }
                .nav-news-link:hover {
                    background-color: #f0f7f0;
                }
                .text-truncate-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .modal-nav-btn {
                    transition: transform 0.2s ease, opacity 0.2s ease;
                    opacity: 0.6;
                }
                .modal-nav-btn:hover {
                    opacity: 1;
                    transform: scale(1.1);
                    color: white !important;
                    text-decoration: none !important;
                }
                @media (max-width: 768px) {
                    .display-4 { font-size: 2.2rem; }
                    .btn-social-icon { width: 40px; height: 40px; font-size: 1rem; }
                }
            `}</style>
        </div>
    );
}
