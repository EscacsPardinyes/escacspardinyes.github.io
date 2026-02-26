import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Feature() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('features.page.header') }];

    return (
        <>
            <SEO title={t('features.page.header')} description={t('seo.feature_description')} />
            <PageHeader title={t('features.page.header')} breadcrumbs={breadcrumbs} />

            {/* Què Oferim del Club Start */}
            <div className="container feature pt-5">
                <div className="d-flex flex-column text-center mb-5">
                    <h4 className="text-primary font-weight-bold">{t('features.page.title')}</h4>
                    <h4 className="display-4 font-weight-bold">{t('features.page.subtitle')}</h4>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <img className="img-fluid mb-3 mb-sm-0" src="/img/Classes-1.webp" alt="Imatge de classes d'escacs" />
                                <i className="flaticon-chess"></i>
                            </div>
                            <div className="col-sm-7">
                                <h4 className="font-weight-bold">{t('features.page.classes_title')}</h4>
                                <p>{t('features.page.classes_desc')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <img className="img-fluid mb-3 mb-sm-0" src="/img/feature-2.webp" alt="Imatge de tornejos d'escacs" />
                                <i className="flaticon-strategy"></i>
                            </div>
                            <div className="col-sm-7">
                                <h4 className="font-weight-bold">{t('features.page.tournaments_title')}</h4>
                                <p dangerouslySetInnerHTML={tHtml('features.page.tournaments_desc')}></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <img className="img-fluid mb-3 mb-sm-0" src="/img/carousel-3.webp" alt="Imatge de la comunitat d'escacs" />
                                <i className="flaticon-community"></i>
                            </div>
                            <div className="col-sm-7">
                                <h4 className="font-weight-bold">{t('feature.community_title')}</h4>
                                <p>{t('feature.community_text')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="row align-items-center">
                            <div className="col-sm-5">
                                <img className="img-fluid mb-3 mb-sm-0" src="/img/feature-4.webp" alt="Imatge de motivació i suport" />
                                <i className="flaticon-medal"></i>
                            </div>
                            <div className="col-sm-7">
                                <h4 className="font-weight-bold">{t('feature.tech_title')}</h4>
                                <p>{t('feature.tech_text')}</p>
                            </div>
                        </div>
                    </div>
                    {/* Nova secció Comunitat Online Chess.com */}
                    <div className="col-md-12 text-center mt-5">
                        <h4 className="font-weight-bold">{t('feature.chesscom_title')}</h4>
                        <p dangerouslySetInnerHTML={tHtml('feature.chesscom_text')}></p>
                        <a href="https://www.chess.com/club/club-escacs-pardinyes/join" target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t('feature.btn_join_online')}</a>
                    </div>
                </div>
            </div>
            {/* Què Oferim del Club End */}
        </>
    );
}
