import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';
import PageHeader from '../components/PageHeader';
import Collaborators from '../components/Collaborators';
import { eventsConfig } from '../data/eventsConfig';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function EventPage({ id }) {
    const { t, tHtml } = useLanguage();
    const config = eventsConfig[id];

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    if (!config) {
        return <Navigate to="/404" />;
    }

    const {
        headerKey,
        titleKey,
        titleKeySEO,
        descriptionKeySEO,
        poster,
        paragraphs,
        images,
        breadcrumbs,
        hasCollaborators,
        isThtml
    } = config;

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": t(titleKeySEO),
        "description": t(descriptionKeySEO),
        "image": `https://escacspardinyes.github.io${poster}`,
        "startDate": id === 'sant-jordi' ? "2025-04-23" : "2025-01-01", // Approximate or specific if known
        "location": {
            "@type": "Place",
            "name": "Club Escacs Pardinyes",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrer de Pardinyes Baixes, 17",
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
                title: t(titleKeySEO),
                text: t(descriptionKeySEO),
                url: window.location.href,
            }).catch(console.error);
        }
    };

    return (
        <>
            <SEO
                title={t(titleKeySEO)}
                description={t(descriptionKeySEO)}
                image={poster}
                schema={eventSchema}
                breadcrumbs={breadcrumbs(t)}
            />
            <PageHeader title={t(headerKey)} breadcrumbs={breadcrumbs(t)} />

            <div className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="font-weight-bold m-0">{t(titleKey)}</h2>
                    {navigator.share && (
                        <button className="btn btn-outline-primary" onClick={handleShare}>
                            <i className="fa fa-share-alt mr-2"></i>{t('common.share') || 'Compartir'}
                        </button>
                    )}
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img
                            src={poster}
                            alt={t(headerKey)}
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="text-left">
                            {paragraphs.map((pKey, index) => (
                                <p
                                    key={index}
                                    className={index === 0 ? "lead font-weight-bold text-primary" : ""}
                                    dangerouslySetInnerHTML={isThtml ? tHtml(pKey) : { __html: t(pKey) }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {images && images.length > 0 && (
                <div className="container pb-5">
                    <h3 className="text-center font-weight-bold mb-4">{t('nav.gallery')}</h3>
                    <div className="row justify-content-center">
                        {images.map((img, index) => (
                            <div key={index} className="col-md-4 col-6 mb-4">
                                <div
                                    className="card border-0 shadow-sm"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
                                >
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
            )}

            {hasCollaborators && <Collaborators />}

            {images && images.length > 0 && (
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
