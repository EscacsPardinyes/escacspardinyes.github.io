import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <>
            <div className="footer container-fluid mt-5 py-5 px-sm-3 px-md-5 text-white">
                <div className="row pt-5">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="text-primary mb-4">{t('footer.contact')}</h4>
                        <p><i className="fa fa-map-marker-alt mr-2"></i>Carrer Sant Pere Claver, 1, segona planta, Lleida 25005</p>
                        <p><i className="fa fa-phone-alt mr-2"></i>+34 973 23 02 06</p>
                        <p><i className="fa fa-envelope mr-2"></i>escacspardinyes@gmail.com</p>
                        <div className="d-flex justify-content-start mt-4">
                            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="https://x.com/EscacsPardinyes" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="https://www.facebook.com/profile.php?id=61553973365334" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="https://www.instagram.com/clubescacspardinyes/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="https://www.youtube.com/@ClubEscacsPardinyes" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border-top border-dark pt-5">
                <p className="m-0 text-center text-black">
                    &copy; <Link className="text-black font-weight-bold" to="/privacy">Club Escacs Pardinyes</Link>. {t('footer.rights')} {t('footer.founded')}
                </p>
            </div>
        </>
    );
}
