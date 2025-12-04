import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('about.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('about.header')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Sobre el Club Escacs Pardinyes Start */}
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid mb-4 mb-lg-0" src="/img/about.webp" alt="Imatge del club" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="display-4 font-weight-bold mb-4">{t('about.founded_title')}</h2>
                        <p dangerouslySetInnerHTML={tHtml('about.founded_text_1')}></p>
                        <p dangerouslySetInnerHTML={tHtml('about.founded_text_2')}></p>
                    </div>
                </div>
            </div>

            {/* Missió del Club */}
            <div className="row py-5">
                <div className="col-lg-12">
                    <h3 className="font-weight-bold text-center mb-4">{t('about.mission_title')}</h3>
                    <p className="text-center" dangerouslySetInnerHTML={tHtml('about.mission_text')}></p>
                </div>
            </div>

            {/* Formació i Creixement */}
            <div className="container py-5">
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6">
                        <h3 className="font-weight-bold mb-3">{t('about.training_title')}</h3>
                        <p dangerouslySetInnerHTML={tHtml('about.training_text')}></p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src="/img/Classes-1.webp" alt="Formació d'escacs" className="img-fluid" style={{ maxWidth: '300px' }} />
                    </div>
                </div>

                {/* Comunitat i Voluntariat */}
                <div className="row align-items-center">
                    <div className="col-md-6 text-center order-md-1 order-2">
                        <img src="/img/community.webp" alt="Comunitat i Voluntariat" className="img-fluid" style={{ maxWidth: '300px' }} />
                    </div>
                    <div className="col-md-6 order-md-2 order-1">
                        <h3 className="font-weight-bold mb-3">{t('about.community_title')}</h3>
                        <p dangerouslySetInnerHTML={tHtml('about.community_text')}></p>
                    </div>
                </div>
            </div>

            {/* Valors del Club */}
            <div className="row py-5">
                <div className="col-lg-12">
                    <h3 className="font-weight-bold text-center mb-4">{t('about.values_title')}</h3>
                    <p className="text-center">{t('about.values_text')}</p>
                </div>
            </div>

            {/* Botó */}
            <div className="row text-center mt-5">
                <div className="col-lg-12">
                    <Link to="/feature" className="btn btn-lg px-4 btn-outline-primary">{t('about.btn_offer')}</Link>
                </div>
            </div>

            {/* Col·laboracions Start */}
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-12 text-center">
                        <h2 className="display-4 font-weight-bold mb-4">{t('about.collaborations_title')}</h2>
                        <p>{t('about.collaborations_text')}</p>
                    </div>
                </div>

                {/* Fila 1: Ajuntament - Diputació - Orvepard */}
                <div className="row justify-content-center text-center py-4 align-items-center">
                    <div className="col-lg-4 col-md-6 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.paeria.cat" target="_blank" rel="noopener noreferrer">
                            <img src="/img/logopaeria-color.webp" alt="Ajuntament de Lleida" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3">{t('about.collab_paeria')}</h5>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.diputaciolleida.cat" target="_blank" rel="noopener noreferrer">
                            <img src="/img/diputaciolleida.webp" alt="Diputació de Lleida" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3">{t('about.collab_diputacio')}</h5>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.instagram.com/orvepard/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/orvepard.webp" alt="Orvepard" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3" dangerouslySetInnerHTML={tHtml('about.collab_orvepard')}></h5>
                    </div>
                </div>

                {/* Fila 2: Chess.com - ChessNut - ChessKid */}
                <div className="row justify-content-center text-center py-4 align-items-center">
                    <div className="col-lg-4 col-md-4 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.chess.com/club/club-escacs-pardinyes" target="_blank" rel="noopener noreferrer">
                            <img src="/img/chesscom.webp" alt="Chess.com" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3">Chess.com</h5>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.chessnutech.com/blogs/promoting-chess-in-society-and-schools/chessnut-sponsors-lleida-s-escacs-pardinyes-club-tournament-supporting-chess-as-a-social-and-educational-activity/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/feature-4.webp" alt="ChessNut" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3">ChessNut</h5>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4 d-flex flex-column align-items-center">
                        <a href="https://www.chesskid.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/img/chesskid.webp" alt="ChessKid" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                        </a>
                        <h5 className="mt-3">ChessKid</h5>
                    </div>
                </div>
            </div>
            {/* Col·laboracions End */}
        </>
    );
}
