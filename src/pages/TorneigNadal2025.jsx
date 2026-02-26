import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function TorneigNadal2025() {
    const { t, tHtml } = useLanguage();

    const breadcrumbs = [
        { label: t('nadal2025.breadcrumb') }
    ];

    return (
        <>
            <SEO title={t('nadal2025.breadcrumb')} description={t('nadal2025.report_p1').substring(0, 160)} />
            <PageHeader title={t('nadal2025.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('nadal2025.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img
                            src="/img/galeria/TornigNadal2026/cartell-nadal-2025.png"
                            alt="Cartell oficial del III Torneig d'Escacs de Nadal Pardinyes"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('nadal2025.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('nadal2025.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('nadal2025.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('nadal2025.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('nadal2025.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('nadal2025.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('nadal2025.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('nadal2025.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('nadal2025.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('nadal2025.fee')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('nadal2025.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('nadal2025.trophies')}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}

            {/* Crònica i Galeria */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('nadal2025.report_title')}</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('nadal2025.report_p1')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('nadal2025.report_p2')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('nadal2025.report_p3')}></p>
                    </div>
                </div>

                <h3 className="text-center font-weight-bold mb-4 mt-5">{t('nadal2025.gallery_title')}</h3>
                <div className="row">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="col-md-6 col-lg-3 mb-4">
                            <img
                                src={`/img/galeria/TornigNadal2026/${num}.jpeg`}
                                className="img-fluid rounded shadow-sm hover-zoom"
                                alt={`Torneig Nadal 2025 - Imatge ${num}`}
                                style={{ transition: 'transform 0.3s ease-in-out', cursor: 'pointer' }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Fi Crònica i Galeria */}
        </>
    );
}
