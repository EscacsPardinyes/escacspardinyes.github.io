import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { eventsConfig } from '../data/eventsConfig';

export default function SimultaniesList() {
    const { t } = useLanguage();

    const breadcrumbs = [{ label: t('simultanies.list_breadcrumb') }];

    // We keep 'arami' as a special case for now as requested by user
    const aramiEvent = {
        id: 'arami',
        title: t('nav.arami_short'),
        summary: t('simultanies.arami_summary'),
        img: '/img/galeria/WFMAramiLobo/cartell-simultanies-arami.png',
        path: '/simultanies-arami2026',
        fallbackImg: 'https://placehold.co/600x400/2A769C/ffffff?text=WFMAramiLobo'
    };

    const dynamicEvents = Object.keys(eventsConfig).map(key => {
        const config = eventsConfig[key];
        return {
            id: key,
            title: t(config.titleKeySEO),
            summary: t(config.summaryKey),
            img: config.poster,
            path: config.path,
            fallbackImg: `https://placehold.co/600x400/2A769C/ffffff?text=${key}`
        };
    });

    const events = [aramiEvent, ...dynamicEvents];

    return (
        <>
            <SEO title={t('simultanies.list_header')} description={t('seo.list_description')} />
            <PageHeader title={t('simultanies.list_header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold">{t('simultanies.list_title')}</h2>
                    <p className="lead">{t('simultanies.list_subtitle')}</p>
                </div>
                <div className="row">
                    {events.map((event) => (
                        <div key={event.id} className="col-lg-4 mb-4">
                            <div className="card border-0 shadow rounded overflow-hidden h-100">
                                <img
                                    src={event.img}
                                    className="card-img-top"
                                    alt={event.title}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = event.fallbackImg; }}
                                    loading="lazy"
                                />
                                <div className="card-body text-center d-flex flex-column justify-content-between">
                                    <h4 className="font-weight-bold mb-3">{event.title}</h4>
                                    <p className="text-muted mb-4">{event.summary}</p>
                                    <Link to={event.path} className="btn btn-outline-primary mt-auto">{t('simultanies.read_more')}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
