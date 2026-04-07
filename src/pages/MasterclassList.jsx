import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { masterclassConfig } from '../data/masterclassConfig';

export default function MasterclassList() {
    const { t } = useLanguage();

    const breadcrumbs = [
        { label: t('school.header'), path: '/escola' },
        { label: t('masterclass.list_breadcrumb') }
    ];

    const dynamicEvents = Object.keys(masterclassConfig).map(key => {
        const config = masterclassConfig[key];
        return {
            id: key,
            title: t(config.titleKeySEO),
            summary: t(config.summaryKey),
            img: config.poster,
            path: config.path,
            fallbackImg: `https://placehold.co/600x400/2A769C/ffffff?text=${key}`
        };
    });

    const events = [...dynamicEvents];

    return (
        <>
            <SEO title={t('masterclass.list_header')} description={t('seo.masterclass_description')} />
            <PageHeader title={t('masterclass.list_header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold">{t('masterclass.list_title')}</h2>
                    <p className="lead">{t('masterclass.list_subtitle')}</p>
                </div>
                {events.length > 0 ? (
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
                                        <Link to={event.path} className="btn btn-outline-primary mt-auto">{t('masterclass.read_more')}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <p className="text-muted">{t('masterclass.no_events')}</p>
                    </div>
                )}
            </div>
        </>
    );
}
