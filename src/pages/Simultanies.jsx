import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Simultanies() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('simultanies.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('simultanies.breadcrumb')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('simultanies.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/cartell-simultanies-ivette.webp" alt="Cartell simultànies WIM Ivette García" className="img-fluid rounded shadow" />
                        <div className="mt-4 text-left">
                            <p>{t('simultanies.intro')}</p>

                            <h3 className="mt-4 mb-3">{t('simultanies.bio_title')}</h3>
                            <p>{t('simultanies.bio_text')}</p>

                            <h3 className="mt-4 mb-3">{t('simultanies.simul_title')}</h3>
                            <p>{t('simultanies.simul_text')}</p>

                            <h3 className="mt-4 mb-3">{t('simultanies.workshop_title')}</h3>
                            <p>{t('simultanies.workshop_text')}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLScTrzYJoJ3jCHoedQTs8GZkeNbPWr6mL3y_2zzrWLMyGz2t1A/viewform?embedded=true"
                            width="100%"
                            height="1624"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0"
                        >S'està carregant…</iframe>
                    </div>
                </div>
            </div>

            <div className="container pb-5 mt-5">
                <h2 className="text-center font-weight-bold mb-5">{t('simultanies.collaborators_title')}</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <img src="/img/cartell-colaboradors.webp" alt="Cartell de Col·laboradors del Club Escacs Pardinyes" className="img-fluid rounded shadow" />
                        <div className="mt-4">
                            <p className="lead">{t('simultanies.collaborators_text1')}</p>
                            <p>{t('simultanies.collaborators_text2')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
