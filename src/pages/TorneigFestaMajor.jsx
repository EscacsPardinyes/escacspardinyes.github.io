import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function TorneigFestaMajor() {
    const { t, tHtml } = useLanguage();

    const breadcrumbs = [
        { label: t('festamajor.breadcrumb') }
    ];

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": t('festamajor.title'),
        "description": t('festamajor.seo_desc'),
        "startDate": "2026-08-01T10:00:00+02:00",
        "endDate": "2026-08-01T20:00:00+02:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Club Escacs Pardinyes",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrer Sant Pere Claver, 1",
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

    return (
        <>
            <SEO 
                title={t('festamajor.breadcrumb')} 
                description={t('festamajor.seo_desc')} 
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('festamajor.breadcrumb')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-4">{t('festamajor.title')}</h2>
                    <p className="lead text-muted">{t('festamajor.subtitle')}</p>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="bg-light p-4 rounded shadow-sm border-left border-primary" style={{ borderWidth: '4px !important' }}>
                            <h4 className="mt-2 mb-3"><i className="fa fa-info-circle text-primary mr-2"></i>{t('festamajor.details_title')}</h4>
                            <ul className="list-unstyled ml-4" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><strong>{t('festamajor.date_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.date_val')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><strong>{t('festamajor.loc_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.loc_val')}></span></li>
                                <li><i className="fa fa-chess-board text-primary mr-2"></i><strong>{t('festamajor.format_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.format_val')}></span></li>
                                <li><i className="fa fa-stopwatch text-primary mr-2"></i><strong>{t('festamajor.rhythm_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.rhythm_val')}></span></li>
                                <li><i className="fa fa-euro-sign text-primary mr-2"></i><strong>{t('festamajor.fee_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.fee_val')}></span></li>
                                <li><i className="fa fa-university text-primary mr-2"></i><strong>{t('festamajor.payment_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.payment_val')}></span></li>
                                <li><i className="fab fa-whatsapp text-success mr-2"></i><strong>{t('festamajor.contact_label')}</strong> <span dangerouslySetInnerHTML={tHtml('festamajor.contact_val')}></span></li>
                            </ul>
                        </div>

                        <div className="bg-light p-4 rounded shadow-sm border-left border-warning mt-4" style={{ borderWidth: '4px !important' }}>
                            <h4 className="mt-2 mb-3"><i className="fa fa-trophy text-warning mr-2"></i>{t('festamajor.prizes_title')}</h4>
                            
                            <h5 className="font-weight-bold text-dark mt-3">{t('festamajor.prizes_general_title')}</h5>
                            <ul className="list-unstyled ml-4">
                                <li>🥇 {t('festamajor.prizes_general_1')}</li>
                                <li>🥈 {t('festamajor.prizes_general_2')}</li>
                                <li>🥉 {t('festamajor.prizes_general_3')}</li>
                            </ul>

                            <h5 className="font-weight-bold text-dark mt-4">{t('festamajor.prizes_elo_title')}</h5>
                            <ul className="list-unstyled ml-4">
                                <li>🏅 {t('festamajor.prizes_elo_a')}</li>
                                <li>🏅 {t('festamajor.prizes_elo_b')}</li>
                                <li>🏅 {t('festamajor.prizes_elo_c')}</li>
                                <li>🏅 {t('festamajor.prizes_elo_d')}</li>
                            </ul>

                            <h5 className="font-weight-bold text-dark mt-4">{t('festamajor.prizes_special_title')}</h5>
                            <ul className="list-unstyled ml-4">
                                <li>⭐ {t('festamajor.prizes_special_local')}</li>
                                <li>⭐ {t('festamajor.prizes_special_v50')}</li>
                                <li>⭐ {t('festamajor.prizes_special_v65')}</li>
                                <li>⭐ {t('festamajor.prizes_special_female')}</li>
                            </ul>

                            <h5 className="font-weight-bold text-dark mt-4">{t('festamajor.prizes_kids_title')}</h5>
                            <ul className="list-unstyled ml-4">
                                <li>👦 {t('festamajor.prizes_kids_16')}</li>
                                <li>👦 {t('festamajor.prizes_kids_14')}</li>
                                <li>👦 {t('festamajor.prizes_kids_12')}</li>
                                <li>👦 {t('festamajor.prizes_kids_10')}</li>
                                <li>👦 {t('festamajor.prizes_kids_8')}</li>
                            </ul>
                        </div>
                        
                        <div className="text-center mt-4">
                            <img 
                                src="/img/galeria/TorneigFestaMajor/cartell.webp" 
                                alt={t('festamajor.poster_alt')} 
                                className="img-fluid rounded shadow-lg"
                                style={{ maxHeight: '700px' }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center">
                            <h3 className="mb-4">{t('festamajor.form_title')}</h3>
                            <div className="d-flex justify-content-center shadow-lg rounded overflow-hidden" style={{ background: '#fff' }}>
                                <iframe 
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSeyWy3YoPoiOow0CVoC224SHAw0r59-7AFHPG0Sb1kH5l3wug/viewform?embedded=true" 
                                    width="100%" 
                                    height="1500" 
                                    frameBorder="0" 
                                    marginHeight="0" 
                                    marginWidth="0"
                                    title={t('festamajor.form_title')}
                                >
                                    {t('festamajor.loading')}
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
