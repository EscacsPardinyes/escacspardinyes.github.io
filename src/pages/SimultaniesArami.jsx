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

    // Load all images from the folder
    const images = [
        '/img/galeria/simultanies-arami2026/WhatsApp Image 2026-03-06 at 21.17.46.webp',
        '/img/galeria/simultanies-arami2026/WhatsApp Image 2026-03-07 at 06.43.16.webp',
        '/img/galeria/simultanies-arami2026/WhatsApp Image 2026-04-05 at 10.25.45.webp',
        '/img/galeria/simultanies-arami2026/WhatsApp Image 2026-04-05 at 10.25.45o.webp',
        '/img/galeria/simultanies-arami2026/WhatsApp Image 2026-04-05 at u.webp',
        '/img/galeria/simultanies-arami2026/i.webp'
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
        "image": `https://escacspardinyes.com/img/galeria/WFMAramiLobo2026/cartell-simultanies-arami.webp`,
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
            "url": "https://escacspardinyes.com"
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
                image="/img/galeria/WFMAramiLobo2026/cartell-simultanies-arami.webp"
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
                            src="/img/galeria/WFMAramiLobo2026/cartell-simultanies-arami.webp"
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

            {/* Galeria de Fotos */}
            {images.length > 0 && (
                <div className="container pb-5 mt-5">
                    <h3 className="text-center font-weight-bold mb-4">{t('gmmi.gallery_title') || 'Galeria d\'Imatges'}</h3>
                    <div className="row justify-content-center">
                        {images.map((photo, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                                <img 
                                    src={photo} 
                                    alt={`Foto ${index + 1}`} 
                                    className="img-fluid rounded shadow" 
                                    style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    onClick={() => {
                                        setPhotoIndex(index);
                                        setIsOpen(true);
                                    }}
                                    loading="lazy" 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Fi de contingut */}



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
