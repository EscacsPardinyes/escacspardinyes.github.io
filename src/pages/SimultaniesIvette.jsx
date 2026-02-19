import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';

export default function SimultaniesIvette() {
    const { t, tHtml } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = [
        '/img/galeria/WIMIvetteGarcía/1.jpg',
        '/img/galeria/WIMIvetteGarcía/2.jpg',
        '/img/galeria/WIMIvetteGarcía/3.jpg',
        '/img/galeria/WIMIvetteGarcía/4.jpg',
        '/img/galeria/WIMIvetteGarcía/5.jpg',
        '/img/galeria/WIMIvetteGarcía/6.jpg'
    ];

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('simultanies.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white"><Link className="text-white" to="/simultanies">{t('nav.simultanies')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('nav.ivette')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('simultanies.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/galeria/WIMIvetteGarcía/cartell-simultanies-ivette.webp" alt="Cartell simultànies WIM Ivette García" className="img-fluid rounded shadow" />
                    </div>
                    <div className="col-lg-6">
                        <div className="text-left">
                            <p className="lead">{t('simultanies.p1')}</p>
                            <p>{t('simultanies.p2')}</p>
                            <p>{t('simultanies.p3')}</p>
                            <p>{t('simultanies.p4')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="container pb-5">
                <h3 className="text-center font-weight-bold mb-4">{t('nav.gallery')}</h3>
                <div className="row justify-content-center">
                    {images.map((img, index) => (
                        <div key={index} className="col-md-4 col-6 mb-4">
                            <div className="card border-0 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => { setPhotoIndex(index); setIsOpen(true); }}>
                                <img src={img} className="card-img-top rounded" alt={`Foto ${index + 1}`} style={{ height: '200px', objectFit: 'cover' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container pb-5 mt-5">
                <h2 className="text-center font-weight-bold mb-5">{t('simultanies.collaborators_title')}</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <img src="/img/galeria/WIMIvetteGarcía/cartell-colaboradors.webp" alt="Cartell de Col·laboradors del Club Escacs Pardinyes" className="img-fluid rounded shadow" />
                        <div className="mt-4">
                            <p className="lead">{t('simultanies.collaborators_text1')}</p>
                            <p>{t('simultanies.collaborators_text2')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Lightbox
                images={images}
                currentIndex={photoIndex}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onNext={() => setPhotoIndex((photoIndex + 1) % images.length)}
                onPrev={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
            />
        </>
    );
}
