import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
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
                                <li dangerouslySetInnerHTML={tHtml('bordeta.trophy_sub14')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-handshake text-success mr-2"></i>{t('bordeta.collaborators_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_diputacio')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_ajuntament')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_club')}></li>
                                <li dangerouslySetInnerHTML={tHtml('bordeta.collaborator_casal')}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulari d'Inscripció */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">
                    <i className="fa fa-clipboard-list text-primary mr-2"></i>
                    {t('bordeta.form_title')}
                </h3>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="rounded shadow p-3" style={{ backgroundColor: '#fff' }}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfxLuUGFq3U7arqV6eVOn_umFXhc1lC3fLS4eFzbXmT0SHG1A/viewform?embedded=true"
                                width="100%"
                                height="1279"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title={t('bordeta.form_title')}
                                style={{ border: 'none', maxWidth: '100%' }}
                            >
                                S&apos;està carregant…
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secció Classes d'Escacs */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-graduation-cap text-primary mr-2"></i>
                            {t('bordeta.classes_title')}
                        </h3>
                        <p className="mb-4" dangerouslySetInnerHTML={tHtml('bordeta.classes_text')}></p>
                        <Link to="/school" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow">
                            <i className="fa fa-chess-knight mr-2"></i>
                            {t('bordeta.classes_btn')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Secció Pròxims Tornejos */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-calendar-plus text-primary mr-2"></i>
                            {t('bordeta.upcoming_title')}
                        </h3>
                        <p className="mb-4">{t('bordeta.upcoming_text')}</p>
                        <Link to="/torneig-alcarras-2" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="fa fa-arrow-right mr-2"></i>
                            {t('bordeta.upcoming_btn')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
