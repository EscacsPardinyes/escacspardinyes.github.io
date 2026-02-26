import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import PageHeader from '../components/PageHeader';
import Collaborators from '../components/Collaborators';
import SEO from '../components/SEO';

export default function SimultaniesArami() {
    const { t, tHtml } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Placeholder images - can be replaced later
    const images = [
        // '/img/galeria/WFMAramiLobo/1.jpg',
    ];

    const breadcrumbs = [
        { label: t('nav.simultanies'), path: '/simultanies' },
        { label: t('nav.arami_short') }
    ];

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": t('nav.arami_short'),
        "description": t('arami.p1'),
        "image": `https://escacspardinyes.github.io/img/galeria/WFMAramiLobo/cartell-simultanies-arami.png`,
        "startDate": "2026-03-06",
        "location": {
            "@type": "Place",
            "name": "Rambla Corregidor Escofet i Pl. Maria Rúbies",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rambla Corregidor Escofet",
                "addressLocality": "Lleida",
                "postalCode": "25005",
                "addressCountry": "ES"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Club Escacs Pardinyes",
            "url": "https://escacspardinyes.github.io"
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: t('nav.arami_short'),
                text: t('arami.p1'),
                url: window.location.href,
            }).catch(console.error);
        }
    };

    return (
        <>
            <SEO
                title={t('nav.arami_short')}
                description={t('arami.p1')}
                image="/img/galeria/WFMAramiLobo/cartell-simultanies-arami.png"
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('arami.header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="font-weight-bold m-0">{t('arami.title')}</h2>
                    {navigator.share && (
                        <button className="btn btn-outline-primary" onClick={handleShare}>
                            <i className="fa fa-share-alt mr-2"></i>{t('common.share') || 'Compartir'}
                        </button>
                    )}
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img
                            src="/img/galeria/WFMAramiLobo/cartell-simultanies-arami.png"
                            alt="WFM Aramí Lobo Simultànies"
                            className="img-fluid rounded shadow"
                        />
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

            {/* Columna Plena: Formulari */}
            <div className="container pb-5 mt-5">
                <div className="row">
                    <div className="col-lg-12">
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



            {
                images.length > 0 && (
                    <Lightbox
                        images={images}
                        currentIndex={photoIndex}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onNext={() => setPhotoIndex((photoIndex + 1) % images.length)}
                        onPrev={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    />
                )
            }
        </>
    );
}
