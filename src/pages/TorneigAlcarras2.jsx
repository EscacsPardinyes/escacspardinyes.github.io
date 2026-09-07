import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function TorneigAlcarras2() {
    const { t, tHtml } = useLanguage();

    const breadcrumbs = [
        { label: t('alcarras2.breadcrumb') }
    ];

    const eventSchema = {
        "@type": "Event",
        "name": t('alcarras2.title'),
        "description": t('alcarras2.intro_text')?.replace(/<[^>]*>/g, ''),
        "startDate": "2026-12-08T10:00:00+01:00",
        "endDate": "2026-12-08T20:00:00+01:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Centre Cultural 'Lo Casino', Alcarràs",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Alcarràs",
                "addressRegion": "Lleida",
                "addressCountry": "ES"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Club Escacs Pardinyes",
            "url": "https://escacspardinyes.com"
        }
    };

    return (
        <>
            <SEO
                title={t('alcarras2.breadcrumb')}
                description={t('alcarras2.intro_text')?.replace(/<[^>]*>/g, '').substring(0, 160)}
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('alcarras2.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('alcarras2.title')}</h2>
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="text-left">
                            <h3 className="mb-3">{t('alcarras2.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('alcarras2.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('alcarras2.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras2.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras2.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras2.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('alcarras2.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.fee')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.confirmation')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('alcarras2.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.trophy_general')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.trophy_veteran')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.trophy_non_federated')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.trophy_local')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras2.trophy_age')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-heart text-danger mr-2"></i>{t('alcarras2.charity_title')}</h4>
                            <p className="ml-4" dangerouslySetInnerHTML={tHtml('alcarras2.charity_text')}></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulari d'Inscripció */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">
                    <i className="fa fa-clipboard-list text-primary mr-2"></i>
                    {t('alcarras2.form_title')}
                </h3>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="rounded shadow p-3" style={{ backgroundColor: '#fff' }}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSeyTUtW_iUQ8A3roGHIFEixHJ5GwaN_lDxfd51GdVR4fuNcDg/viewform?embedded=true"
                                width="100%"
                                height="1383"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title={t('alcarras2.form_title')}
                                style={{ border: 'none', maxWidth: '100%' }}
                            >
                                S&apos;està carregant…
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Link a l'edició anterior */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h4 className="font-weight-bold mb-3">
                            <i className="fa fa-history text-primary mr-2"></i>
                            {t('alcarras2.previous_title')}
                        </h4>
                        <p dangerouslySetInnerHTML={tHtml('alcarras2.previous_text')}></p>
                        <Link to="/TorneigAlcarras" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="fa fa-arrow-left mr-2"></i>
                            {t('alcarras2.previous_btn')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
