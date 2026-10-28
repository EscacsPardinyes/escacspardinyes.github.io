import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

const LOGO = '/img/galeria/logos/logo.webp';

const tournaments = [
    { id: 'cafiv', titleKey: 'cafiv.header', summaryKey: 'tornejos.sum_cafiv', path: '/torneig-biblioteca-cafiv', poster: false },
    { id: 'alcarras2', titleKey: 'alcarras2.header', summaryKey: 'tornejos.sum_alcarras2', path: '/torneig-alcarras-2', poster: false },
    { id: 'tancats', titleKey: 'gmmi_agost.header', summaryKey: 'tornejos.sum_tancats', path: '/tancats-setmana-santa-2027', poster: false }
];

export default function TornejosList() {
    const { t } = useLanguage();

    const breadcrumbs = [{ label: t('tornejos.breadcrumb') }];

    return (
        <>
            <SEO title={t('tornejos.header')} description={t('tornejos.subtitle')} breadcrumbs={breadcrumbs} />
            <PageHeader title={t('tornejos.header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold">{t('tornejos.title')}</h2>
                    <p className="lead">{t('tornejos.subtitle')}</p>
                </div>
                <div className="row">
                    {tournaments.map((item) => (
                        <div key={item.id} className="col-lg-4 mb-4">
                            <div className="card border-0 shadow rounded overflow-hidden h-100">
                                {item.poster === false ? (
                                    <div
                                        className="card-img-top d-flex flex-column align-items-center justify-content-center bg-white"
                                        style={{ height: '250px' }}
                                    >
                                        <img src={LOGO} alt="" style={{ height: '130px', width: 'auto' }} />
                                        <span className="mt-3 font-weight-bold text-muted">{t('tornejos.soon')}</span>
                                    </div>
                                ) : (
                                    <img
                                        src={item.img}
                                        className="card-img-top"
                                        alt={t(item.titleKey)}
                                        style={{ height: '250px', objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                )}
                                <div className="card-body text-center d-flex flex-column justify-content-between">
                                    <h4 className="font-weight-bold mb-3">{t(item.titleKey)}</h4>
                                    <p className="text-muted mb-4">{t(item.summaryKey)}</p>
                                    <Link to={item.path} className="btn btn-outline-primary mt-auto">{t('tornejos.more_info')}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
