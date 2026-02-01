import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function TorneigGMMI() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('gmmi.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('gmmi.breadcrumb')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('gmmi.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.png"
                            alt="Cartell oficial del Torneig de GM i MI"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('gmmi.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('gmmi.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('gmmi.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('gmmi.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.fee')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('gmmi.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4 mb-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.trophies')}></li>
                            </ul>

                            <div className="d-flex flex-column flex-md-row mt-4">
                                <a href="/img/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.pdf"
                                    className="btn btn-primary mr-md-3 mb-3 mb-md-0 px-4 py-2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-download mr-2"></i>{t('gmmi.btn_bases')}
                                </a>
                                <a href="/img/Setmana Santa 2026/PRECIOS CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.pdf"
                                    className="btn btn-secondary px-4 py-2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-download mr-2"></i>{t('gmmi.btn_preus')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}

            {/* Secció de Col·laboradors */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.collab_title')}</h3>
                <p className="text-center mb-5 lead">{t('gmmi.collab_text')}</p>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/Setmana Santa 2026/logo-barcelona.jpeg" alt="Club d'Escacs Barcelona" className="img-fluid" style={{ maxHeight: '120px' }} />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/orvepard.webp" alt="ORVEPARD" className="img-fluid" style={{ maxHeight: '120px' }} />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/logopaeria-color.webp" alt="La Paeria - Ajuntament de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/diputaciolleida.webp" alt="Diputació de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} />
                    </div>
                </div>
            </div>

            {/* Crònica i Galeria */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.report_title')}</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p1')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p2')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p3')}></p>
                    </div>
                </div>

                <h3 className="text-center font-weight-bold mb-4 mt-5">{t('gmmi.gallery_title')}</h3>
                <div className="row justify-content-center">
                    <p className="text-muted">{t('gmmi.gallery_placeholder')}</p>
                </div>
            </div>
            {/* Fi Crònica i Galeria */}
        </>
    );
}
