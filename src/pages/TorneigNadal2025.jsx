import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function TorneigNadal2025() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('nadal2025.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('nadal2025.breadcrumb')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('nadal2025.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/cartell-nadal-2025.png"
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
        </>
    );
}
