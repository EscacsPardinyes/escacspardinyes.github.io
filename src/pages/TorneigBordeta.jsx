import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function TorneigBordeta() {
    const { t, tHtml } = useLanguage();

    const breadcrumbs = [
        { label: t('bordeta.breadcrumb') }
    ];

    const eventSchema = {
        "@type": "Event",
        "name": t('bordeta.title'),
        "description": t('bordeta.intro_text')?.replace(/<[^>]*>/g, ''),
        "startDate": "2026-09-24T17:30:00+02:00",
        "endDate": "2026-09-24T21:00:00+02:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Casal d'Avis de la Bordeta",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lleida",
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
                title={t('bordeta.breadcrumb')}
                description={t('bordeta.intro_text')?.replace(/<[^>]*>/g, '').substring(0, 160)}
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('bordeta.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('bordeta.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img
                            src="/img/galeria/TorneigBordeta/cartell-bordeta.webp"
                            alt="Cartell oficial del Torneig d'Escacs Casal d'Avis de la Bordeta"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=TORNEIG+BORDETA' }}
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('bordeta.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('bordeta.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('bordeta.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('bordeta.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('bordeta.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('bordeta.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('bordeta.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('bordeta.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.rhythm')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('bordeta.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('bordeta.trophy_champion')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.trophy_senior')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-handshake text-success mr-2"></i>{t('bordeta.collaborators_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_diputacio')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_ajuntament')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_club')}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
