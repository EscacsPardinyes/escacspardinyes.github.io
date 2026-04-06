import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

import posterImg from '../img/galeria/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.webp';
import posterPdf from '../img/galeria/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.pdf';
import logoBarcelona from '../img/galeria/Setmana Santa 2026/logo-barcelona.webp';

export default function TorneigGMMI() {
    const { t, tHtml } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);

    const breadcrumbs = [
        { label: t('tancats.list_breadcrumb') || 'Tancats de GM i MI', path: '/tancats' },
        { label: t('gmmi.breadcrumb') }
    ];

    return (
        <>
            <SEO title={t('gmmi.breadcrumb')} description={t('gmmi.intro_text').replace(/<[^>]*>/g, '')} />
            <PageHeader title={t('gmmi.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('gmmi.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src={posterImg}
                            alt="Cartell oficial del Torneig de GM i MI"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                            loading="lazy"
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('gmmi.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('gmmi.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('gmmi.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('gmmi.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.fee')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('gmmi.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4 mb-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.trophies')}></li>
                            </ul>

                            {/* Enllaços Chess-Results */}
                            <h4 className="mt-4 mb-3"><i className="fa fa-link text-info mr-2"></i>Chess-Results</h4>
                            <div className="d-flex flex-column mb-4">
                                <a href="https://s1.chess-results.com/tnr1342523.aspx?lan=9"
                                    className="btn btn-outline-info mb-2 text-left"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-external-link-alt mr-2"></i>{t('gmmi.btn_gm')}
                                </a>
                                <a href="https://s1.chess-results.com/tnr1358939.aspx?lan=9"
                                    className="btn btn-outline-info text-left"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-external-link-alt mr-2"></i>{t('gmmi.btn_mi')}
                                </a>
                            </div>

                            <div className="d-flex flex-column flex-md-row mt-4">
                                <a href={posterPdf}
                                    className="btn btn-primary mr-md-3 mb-3 mb-md-0 px-4 py-2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-download mr-2"></i>{t('gmmi.btn_bases')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}

            {/* Fi del Contingut Principal del Torneig */}

            {/* Secció de Col·laboradors */}
            <div className="container pb-5 pt-5">
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.collab_title')}</h3>
                <p className="text-center mb-5 lead">{t('gmmi.collab_text')}</p>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src={logoBarcelona} alt="Club d'Escacs Barcelona" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/orvepard.webp" alt="ORVEPARD" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/logopaeria-color.webp" alt="La Paeria - Ajuntament de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/diputaciolleida.webp" alt="Diputació de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                </div>
            </div>

            {/* Crònica i Galeria */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.report_title')}</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p1')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p2')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p3')}></p>
                    </div>
                </div>

                <h3 className="text-center font-weight-bold mb-4 mt-5">{t('gmmi.gallery_title')}</h3>
                <div className="row justify-content-center">
                    {(() => {
                        const mainImages = import.meta.glob('/src/img/galeria/Setmana Santa 2026/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url' });
                        const prensaImages = import.meta.glob('/src/img/galeria/prensa/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url' });

                        let photos = [
                            ...Object.entries(prensaImages)
                                .filter(([key, _]) => key.toLowerCase().includes('tancatsetmanasanta2026'))
                                .map(([_, mod]) => mod.default || mod),
                            ...Object.values(mainImages).map(mod => mod.default || mod)
                        ];
                        
                        // Exclude the poster, logo, and any other non-gallery files that might appear matched
                        photos = photos.filter(photo => 
                            !photo.toLowerCase().includes('cerrados') && 
                            !photo.toLowerCase().includes('logo-barcelona') &&
                            !photo.toLowerCase().includes('precios')
                        );

                        if (photos.length === 0) {
                            return <p className="text-muted">{t('gmmi.gallery_placeholder')}</p>;
                        }

                        return photos.map((photo, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                                <img 
                                    src={photo} 
                                    alt={`Galeria Tancats foto ${index + 1}`} 
                                    className="img-fluid rounded shadow" 
                                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onClick={() => setSelectedImage(photo)}
                                    loading="lazy" 
                                />
                            </div>
                        ));
                    })()}
                </div>
            </div>
            {/* Fi Crònica i Galeria */}

            {/* Modal d'Imatge Ampliada */}
            {selectedImage && (
                <div 
                    className="d-flex justify-content-center align-items-center" 
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.85)', cursor: 'zoom-out' }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="position-relative" style={{ maxWidth: '90%', maxHeight: '90%' }}>
                        <button 
                            className="position-absolute" 
                            style={{ top: '-40px', right: '0', fontSize: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Tancar"
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Imatge ampliada" 
                            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} 
                            className="rounded shadow-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
