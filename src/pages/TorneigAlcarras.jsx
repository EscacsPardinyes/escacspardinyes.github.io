import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function TorneigAlcarras() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('alcarras.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('alcarras.breadcrumb')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('alcarras.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/cartell-alcarras.webp"
                            alt="Cartell oficial del 1r Torneig d'Escacs Vila d'Alcarràs La Marató"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                        />

                        <div className="mt-4 text-left">
                            <h3 className="mt-4 mb-3">{t('alcarras.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('alcarras.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('alcarras.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('alcarras.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('alcarras.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.fee')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.confirmation')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('alcarras.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_general')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_veteran')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_non_federated')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_local')}></li>
                                <li dangerouslySetInnerHTML={tHtml('alcarras.trophy_age')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-gift text-success mr-2"></i>{t('alcarras.raffle_title')}</h4>
                            <div className="ml-4">
                                <p>{t('alcarras.raffle_text')}</p>
                                <ul>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_shirt_child')}></li>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_shirt_adult')}></li>
                                    <li dangerouslySetInnerHTML={tHtml('alcarras.raffle_massage')}></li>
                                </ul>
                            </div>

                            <h4 className="mt-4 mb-2"><i className="fa fa-heart text-danger mr-2"></i>{t('alcarras.charity_title')}</h4>
                            <p className="ml-4" dangerouslySetInnerHTML={tHtml('alcarras.charity_text')}></p>
                            <p className="mt-4 font-weight-bold text-danger">{t('alcarras.charity_warning')}</p>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <h3 className="text-center font-weight-bold mb-3">{t('alcarras.form_title')}</h3>
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeTAPy9iZpo-l7Emk4iBSKVjxhTq9IBk3Yl443lbAr4kka6Zw/viewform?embedded=true"
                            width="100%"
                            height="1624"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                        >S'està carregant…</iframe>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}
        </>
    );
}
