import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';
import PageHeader from '../components/PageHeader';

export default function TorneigAlcarras() {
    const { t, tHtml } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = [
        '/img/galeria/TorneigAlcarras/1.webp',
        '/img/galeria/TorneigAlcarras/2.webp',
        '/img/galeria/TorneigAlcarras/3.webp'
    ];

    const breadcrumbs = [
        { label: t('alcarras.breadcrumb') }
    ];

    return (
        <>
            <SEO title={t('alcarras.breadcrumb')} description={t('alcarras.intro_text').replace(/<[^>]*>/g, '')} />
            <PageHeader title={t('alcarras.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('alcarras.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img
                            src="/img/galeria/TorneigAlcarras/cartell-alcarras.webp"
                            alt="Cartell oficial del 1r Torneig d'Escacs Vila d'Alcarràs La Marató"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('alcarras.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('alcarras.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('alcarras.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('alcarras.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.fee')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.confirmation')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('alcarras.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_general')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_veteran')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_non_federated')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_local')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_age')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-gift text-success mr-2"></i>{t('alcarras.raffle_title')}</h4>
                            <div className="ml-4">
                                <p>{t('alcarras.raffle_text')}</p>
                                <ul>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_shirt_child')}></li>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_shirt_adult')}></li>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_massage')}></li>
                                </ul>
                            </div>

                            <h4 className="mt-4 mb-2"><i className="fa fa-heart text-danger mr-2"></i>{t('alcarras.charity_title')}</h4>
                            <p className="ml-4" dangerouslySetInnerHTML={tHtml('alcarras.charity_text')}></p>
                            <p className="mt-4 font-weight-bold text-success text-center h4">{t('alcarras.charity_warning')}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Galeria d'Imatges */}
            <div className="container pb-5">
                <h3 className="text-center font-weight-bold mb-4">{t('santjordi.header')}</h3>
                <div className="row justify-content-center">
                    {images.map((img, index) => (
                        <div key={index} className="col-md-4 col-6 mb-4">
                            <div className="card border-0 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => { setPhotoIndex(index); setIsOpen(true); }}>
                                <img
                                    src={img}
                                    className="card-img-top rounded"
                                    alt={`Foto ${index + 1}`}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
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
