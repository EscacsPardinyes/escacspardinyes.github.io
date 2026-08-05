import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import Lightbox from '../components/Lightbox';

export default function TorneigFestaMajor() {
    const { t, tHtml } = useLanguage();
    
    // Gallery State
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const breadcrumbs = [
        { label: t('festamajor.breadcrumb') }
    ];

    // Generate gallery image paths (24 converted WebP photos)
    const galleryImages = Array.from({ length: 24 }, (_, i) => `/img/galeria/TorneigFestaMajor/foto-${i + 1}.webp`);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <SEO 
                title={t('festamajor.breadcrumb')} 
                description="Crònica i resultats del Torneig de Festa Major 2026 del Club Escacs Pardinyes." 
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('festamajor.breadcrumb')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5 mt-4">
                    <span className="badge badge-success mb-3 px-3 py-2" style={{ fontSize: '1rem' }}>{t('festamajor.chronicle_badge')}</span>
                    <h2 className="display-4 font-weight-bold mb-4">{t('festamajor.chronicle_title')}</h2>
                    <p className="lead text-muted" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {t('festamajor.chronicle_subtitle')}
                    </p>
                    <a href="https://s3.chess-results.com/Tnr1461122.aspx?lan=9&SNode=S0" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg mt-4 font-weight-bold shadow-sm px-5 py-3" style={{ borderRadius: '50px' }}>
                        <i className="fa fa-list-ol mr-2"></i> {t('festamajor.chronicle_btn')}
                    </a>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="bg-white p-4 p-md-5 rounded shadow-lg border-top border-primary" style={{ borderTopWidth: '5px !important' }}>
                            <h3 className="mb-4 text-primary font-weight-bold"><i className="fa fa-newspaper mr-2"></i> {t('festamajor.summary_title')}</h3>
                            <p className="text-justify" style={{ fontSize: '1.15rem', lineHeight: '1.8' }} dangerouslySetInnerHTML={tHtml('festamajor.summary_p1')} />
                            <p className="text-justify" style={{ fontSize: '1.15rem', lineHeight: '1.8' }} dangerouslySetInnerHTML={tHtml('festamajor.summary_p2')} />
                            
                            <hr className="my-5" />

                            <h3 className="mb-4 text-warning font-weight-bold text-center"><i className="fa fa-trophy mr-2"></i> {t('festamajor.honor_title')}</h3>
                            
                            <div className="row mt-4">
                                <div className="col-md-6 mb-4">
                                    <div className="p-4 bg-light rounded h-100">
                                        <h5 className="font-weight-bold text-dark border-bottom pb-3 mb-3">{t('festamajor.prizes_general_title')}</h5>
                                        <ul className="list-unstyled" style={{ fontSize: '1.1rem' }}>
                                            <li className="mb-3">🥇 <strong>1r:</strong> Daniel Badia (C.E. Balaguer) - <em>7 pts</em></li>
                                            <li className="mb-3">🥈 <strong>2n:</strong> Daniel Sastre (C.E. Lleida) - <em>7 pts</em></li>
                                            <li className="mb-3">🥉 <strong>3r:</strong> Edgar Niubo (C.E. Mollerussa) - <em>7 pts</em></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="p-4 bg-light rounded h-100">
                                        <h5 className="font-weight-bold text-dark border-bottom pb-3 mb-3">{t('festamajor.prizes_elo_title')}</h5>
                                        <ul className="list-unstyled" style={{ fontSize: '1.1rem' }}>
                                            <li className="mb-2"><strong>Grup A:</strong> Héctor Garcia (C.E. Almenar) - <em>6,5 pts</em></li>
                                            <li className="mb-2"><strong>Grup B:</strong> Dídac Gómez (C.E. Lleida) - <em>5 pts</em></li>
                                            <li className="mb-2"><strong>Grup C:</strong> Elias Belmonte (Monzón) - <em>6 pts</em></li>
                                            <li className="mb-2"><strong>Grup D:</strong> Oliver Bencosme (C.E. Torreblanca) - <em>4,5 pts</em></li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="col-12 mt-2">
                                    <div className="p-4 rounded border border-primary bg-white shadow-sm">
                                        <h5 className="font-weight-bold text-primary border-bottom pb-3 mb-3">{t('festamajor.prizes_special_title')}</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-unstyled" style={{ fontSize: '1.05rem' }}>
                                                    <li className="mb-2">🏠 <strong>Millor Local / Vet. +50:</strong> Àngel Blanch (C.E. Pardinyes)</li>
                                                    <li className="mb-2">👦 <strong>Millor Sub-14 (Local):</strong> Eloi Canales (C.E. Pardinyes)</li>
                                                    <li className="mb-2">👴 <strong>Millor Veterà +65:</strong> Velimir Stankov (C.E. Pardinyes)</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-unstyled" style={{ fontSize: '1.05rem' }}>
                                                    <li className="mb-2">👩 <strong>Millor Femenina:</strong> Arlet Calabria (C.E. Montblanc)</li>
                                                    <li className="mb-2">👦 <strong>Millor Sub-16:</strong> Aleix Ramon Argiles (C.E. Pardinyes)</li>
                                                    <li className="mb-2">👦 <strong>Millor Sub-10:</strong> Oliver Bencosme (C.E. Torreblanca)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gallery Section */}
                <hr className="mt-5 mb-5" />
                <div className="text-center mb-5">
                    <h3 className="mb-4 text-primary font-weight-bold"><i className="fa fa-camera mr-2"></i> {t('festamajor.gallery_title')}</h3>
                    <p className="text-muted">{t('festamajor.gallery_desc')}</p>
                </div>
                
                <div className="row g-3 px-2">
                    {galleryImages.map((src, idx) => (
                        <div key={idx} className="col-6 col-md-4 col-lg-3 mb-3">
                            <div 
                                className="gallery-item overflow-hidden rounded shadow-sm position-relative" 
                                style={{ cursor: 'pointer', height: '220px', backgroundColor: '#f8f9fa' }}
                                onClick={() => openLightbox(idx)}
                            >
                                <img 
                                    src={src} 
                                    alt={`Foto ${idx + 1} Torneig Festa Major`} 
                                    className="img-fluid w-100 h-100"
                                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <Lightbox 
                    images={galleryImages}
                    isOpen={lightboxOpen}
                    currentIndex={currentImageIndex}
                    onClose={() => setLightboxOpen(false)}
                    onNext={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
                    onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                />

                <hr className="mt-5 mb-4" />
                <div className="text-center">
                    <Link to="/torneig-festa-major/historial" className="btn btn-outline-info px-4 py-2 font-weight-bold" style={{ borderRadius: '30px' }}>
                        <i className="fa fa-history mr-2"></i>{t('festamajor.history_btn')}
                    </Link>
                </div>
            </div>
        </>
    );
}
