import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function SimultaniesList() {
    const { t } = useLanguage();

    const events = [
        {
            id: 'arami',
            title: t('nav.arami_short'),
            summary: t('simultanies.arami_summary'),
            img: '/img/galeria/WFMAramiLobo/cartell-simultanies-arami.webp',
            path: '/simultanies-arami2026',
            fallbackImg: 'https://placehold.co/600x400/2A769C/ffffff?text=WFMAramiLobo'
        },
        {
            id: 'ivette',
            title: t('nav.ivette'),
            summary: t('simultanies.ivette_summary'),
            img: '/img/galeria/WIMIvetteGarcía/cartell-simultanies-ivette.webp',
            path: '/simultanies-ivette',
            fallbackImg: 'https://placehold.co/600x400/2A769C/ffffff?text=WIMIvetteGarcia'
        },
        {
            id: 'lola',
            title: "Lola Fernández",
            summary: t('simultanies.lola_summary'),
            img: '/img/galeria/JornadaSantJordi2025/cartell-simultanies.webp',
            path: '/sant-jordi2025',
            fallbackImg: 'https://placehold.co/600x400/2A769C/ffffff?text=LolaFernandez'
        }
    ];

    return (
        <>
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('simultanies.list_header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('simultanies.list_breadcrumb')}</p>
                    </div>
                </div>
            </div>

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
