import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from '../components/Lightbox';
import PageHeader from '../components/PageHeader';
import { masterclassConfig } from '../data/masterclassConfig';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function MasterclassPage({ id }) {
    const { t, tHtml } = useLanguage();
    const config = masterclassConfig[id];

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const {
        titleKey,
        titleKeySEO,
        summaryKey,
        poster,
        paragraphs = [],
        images = [],
        isThtml = true,
        speakerKey,
        flag,
        achievementsKey,
        priceKey,
        registrationIframe
    } = config;

    const breadcrumbs = [
        { label: t('school.header'), path: '/escola' },
        { label: t('masterclass.list_breadcrumb'), path: '/masterclass' }
    ];

    return (
        <>
            <SEO
                title={t(titleKeySEO)}
                description={t(summaryKey)}
                image={poster}
            />
            <PageHeader title={t('masterclass.list_header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold">{t(titleKey)}</h2>
                    <p className="lead text-primary font-weight-bold">{t(summaryKey)}</p>
                </div>

                <div className="row mb-5 align-items-center">
                    <div className="col-lg-5 mb-4 mb-lg-0 text-center">
                        <img
                            src={poster}
                            alt={t(titleKey)}
                            className="img-fluid rounded shadow-lg"
                            style={{ maxHeight: '500px', width: 'auto' }}
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x800/2A769C/ffffff?text=${id}`; }}
                        />
                    </div>
                    <div className="col-lg-7">
                        <div className="bg-light p-4 rounded shadow-sm mb-4">
                            <h4 className="font-weight-bold text-primary mb-3"><i className="fa fa-info-circle mr-2"></i>{t('masterclass.about_title')}</h4>
                            {paragraphs.map((pKey, index) => (
                                <p
                                    key={index}
                                    dangerouslySetInnerHTML={isThtml ? tHtml(pKey) : { __html: t(pKey) }}
                                />
                            ))}
                        </div>

                        {speakerKey && (
                            <div className="bg-secondary text-white p-4 rounded shadow-sm mb-4">
                                <h4 className="font-weight-bold text-white mb-3">
                                    <i className="fa fa-user-tie mr-2"></i>
                                    {t('masterclass.speaker_label')}: {t(speakerKey)}
                                    {flag && (
                                        <img 
                                            src={`https://flagcdn.com/w40/${flag.toLowerCase()}.png`} 
                                            alt={flag} 
                                            className="ml-2 mb-1 shadow-sm"
                                            style={{ height: '20px', border: '1px solid rgba(255,255,255,0.3)' }}
                                        />
                                    )}
                                </h4>
                                {achievementsKey && (
                                    <ul className="list-unstyled mb-0">
                                        {t(achievementsKey).split('\n').map((line, i) => (
                                            <li key={i} className="mb-2">
                                                <i className="fa fa-trophy text-warning mr-2"></i>{line}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        <div className="bg-primary text-white p-4 rounded shadow-sm mb-4">
                            <h4 className="font-weight-bold text-white mb-3"><i className="fa fa-tag mr-2"></i>{t('masterclass.price_label')}</h4>
                            <p className="mb-0" dangerouslySetInnerHTML={tHtml(priceKey)}></p>
                        </div>

                        <div className="bg-light border-primary p-4 rounded shadow-sm" style={{ borderLeft: '5px solid' }}>
                            <h4 className="font-weight-bold text-primary mb-3"><i className="fa fa-university mr-2"></i>{t('masterclass.payment_title')}</h4>
                            <p className="mb-2"><strong>{t('masterclass.payment_iban')}</strong></p>
                            <p className="mb-2">{t('masterclass.payment_beneficiary')}</p>
                            <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{t('masterclass.payment_info')}</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                {registrationIframe && (
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-10">
                            <h3 className="text-center font-weight-bold mb-4">{t('masterclass.enroll_title')}</h3>
                            <div className="embed-responsive shadow rounded" style={{ height: '800px', overflow: 'hidden' }}>
                                <iframe 
                                    src={`${registrationIframe}${registrationIframe.includes('?') ? '&' : '?'}hl=${useLanguage().language}`} 
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    marginHeight="0" 
                                    marginWidth="0"
                                    title="Registration Form"
                                >
                                    {t('masterclass.loading')}
                                </iframe>
                            </div>
                        </div>
                    </div>
                )}
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
