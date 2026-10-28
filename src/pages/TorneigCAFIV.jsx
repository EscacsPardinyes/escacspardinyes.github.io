import { useLanguage } from '../context/LanguageContext';
import { Link } from '../components/LocalizedLink';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import CafivForm from '../components/CafivForm';

export default function TorneigCAFIV() {
    const { t, tHtml } = useLanguage();

    const breadcrumbs = [
        { label: t('tornejos.breadcrumb'), path: '/tornejos' },
        { label: t('cafiv.breadcrumb') }
    ];

    const eventSchema = {
        "@type": "Event",
        "name": t('cafiv.title'),
        "description": t('cafiv.intro_text')?.replace(/<[^>]*>/g, ''),
        "startDate": "2026-11-25",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Lleida",
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
                title={t('cafiv.breadcrumb')}
                description={t('cafiv.intro_text')?.replace(/<[^>]*>/g, '').substring(0, 160)}
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('cafiv.header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('cafiv.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h3 className="mb-3">{t('cafiv.details_title')}</h3>

                        <p dangerouslySetInnerHTML={tHtml('cafiv.intro_text')}></p>

                        <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('cafiv.info_title')}</h4>
                        <ul className="list-unstyled ml-4">
                            <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('cafiv.date')}></span></li>
                            <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('cafiv.time')}></span></li>
                            <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('cafiv.location')}></span></li>
                        </ul>

                        <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('cafiv.rules_title')}</h4>
                        <ul className="list-unstyled ml-4">
                            <li dangerouslySetInnerHTML={tHtml('cafiv.format')}></li>
                            <li dangerouslySetInnerHTML={tHtml('cafiv.rhythm')}></li>
                            <li dangerouslySetInnerHTML={tHtml('cafiv.tiebreak')}></li>
                            <li dangerouslySetInnerHTML={tHtml('cafiv.priority')}></li>
                        </ul>

                        <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('cafiv.prizes_title')}</h4>
                        <ul className="list-unstyled ml-4">
                            <li dangerouslySetInnerHTML={tHtml('cafiv.prize_first')}></li>
                            <li dangerouslySetInnerHTML={tHtml('cafiv.prize_second')}></li>
                            <li dangerouslySetInnerHTML={tHtml('cafiv.prize_raffle')}></li>
                        </ul>

                        <h4 className="mt-4 mb-3"><i className="fa fa-handshake text-success mr-2"></i>{t('cafiv.organizers_title')}</h4>
                        <div className="row">
                            {[['/img/galeria/logos/logo.webp', 'cafiv.organizer_pardinyes', 'Club Escacs Pardinyes'], ['/img/galeria/TorneigCAFIV/logo-udl.gif', 'cafiv.organizer_udl', 'Universitat de Lleida']].map(([src, key, alt]) => (
                                <div className="col-sm-6 mb-3" key={src}>
                                    <div className="h-100 bg-white rounded shadow-sm p-3 text-center">
                                        <img
                                            src={src}
                                            alt={alt}
                                            className="mb-2"
                                            style={{ height: '70px', width: 'auto', maxWidth: '100%' }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <div dangerouslySetInnerHTML={tHtml(key)}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-clipboard-list text-primary mr-2"></i>
                            {t('cafiv.signup_title')}
                        </h3>
                        <p className="mb-4">{t('cafiv.signup_text')}</p>
                        <CafivForm />
                        <p className="mt-3 mb-0 small text-center">
                            <Link to="/contact">{t('cafiv.signup_btn')}</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="container pb-5">
                <hr className="mb-5" />
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-graduation-cap text-primary mr-2"></i>
                            {t('cafiv.classes_title')}
                        </h3>
                        <p className="mb-4" dangerouslySetInnerHTML={tHtml('cafiv.classes_text')}></p>
                        <Link to="/school" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="fa fa-chess-knight mr-2"></i>
                            {t('cafiv.classes_btn')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
