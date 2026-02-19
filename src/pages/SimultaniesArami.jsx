import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';

export default function SimultaniesArami() {
    const { t, tHtml } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Placeholder images - can be replaced later
    const images = [
        // '/img/galeria/WFMAramiLobo/1.jpg',
    ];

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('arami.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white"><Link className="text-white" to="/simultanies">{t('nav.simultanies')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('nav.arami_short')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('arami.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/galeria/WFMAramiLobo/cartell-simultanies-arami.webp" alt="WFM Aramí Lobo Simultànies" className="img-fluid rounded shadow" />
                    </div>
                    <div className="col-lg-6">
                        <div className="text-left">
                            <p className="lead font-weight-bold text-primary">{t('arami.p1')}</p>
                            <p dangerouslySetInnerHTML={tHtml('arami.p2')}></p>
                            <p dangerouslySetInnerHTML={tHtml('arami.p3')}></p>
                            <p dangerouslySetInnerHTML={tHtml('arami.p4')}></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secció Inscripció i Cartells side-by-side */}
            <div className="container pb-5 mt-5">
                <div className="row">
                    {/* Columna Esquerra: Posters */}
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <h3 className="text-center font-weight-bold mb-4">Pardinyes en Lila</h3>
                        <div className="row">
                            <div className="col-6 col-lg-12 mb-4">
                                <img src="/img/galeria/WFMAramiLobo/cartell-pardinyes-en-lila-1.webp" alt="Poster Pardinyes en Lila 1" className="img-fluid rounded shadow" />
                            </div>
                            <div className="col-6 col-lg-12 mb-4">
                                <img src="/img/galeria/WFMAramiLobo/cartell-pardinyes-en-lila-2.webp" alt="Poster Pardinyes en Lila 2" className="img-fluid rounded shadow" />
                            </div>
                        </div>
                    </div>

                    {/* Columna Dreta: Formulari */}
                    <div className="col-lg-7">
                        <h3 className="text-center font-weight-bold mb-4">{t('simultanies.form_title')}</h3>
                        <div className="embed-responsive shadow rounded" style={{ minHeight: '1000px', backgroundColor: '#f8f9fa' }}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSdzCp2b7UZZOKv_YIrSi00dxmd791quiPFq-wZEY1j_XXjw8g/viewform?embedded=true"
                                width="100%"
                                height="1000"
                                frameborder="0"
                                marginheight="0"
                                marginwidth="0"
                                title="Formulari d'inscripció simultànies Aramí Lobo"
                            >
                                S&#39;està carregant…
                            </iframe>
                        </div>
                    </div>
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

            {images.length > 0 && (
                <Lightbox
                    images={images}
                    currentIndex={photoIndex}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onNext={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    onPrev={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                />
            )}
        </>
    );
}
