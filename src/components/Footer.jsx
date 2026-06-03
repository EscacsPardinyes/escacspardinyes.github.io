import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer container-fluid mt-0 py-5 px-sm-3 px-md-5 text-white">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-5">
                        <h4 className="text-primary mb-4 text-uppercase" style={{ letterSpacing: '2px' }}>{t('footer.contact')}</h4>
                        <p className="mb-3 d-flex align-items-center"><i className="fa fa-map-marker-alt mr-3 text-primary"></i>{t('contact.address_val')}</p>
                        <p className="mb-3 d-flex align-items-center">
                            <a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center">
                                <i className="fab fa-whatsapp mr-3 text-primary" style={{ fontSize: '1.2rem' }}></i>
                                +34 641 91 52 66
                            </a>
                        </p>
                        <p className="mb-3 d-flex align-items-center"><i className="fa fa-envelope mr-3 text-primary"></i>escacspardinyes@gmail.com</p>
                        <div className="d-flex justify-content-start mt-4">
                            <a className="btn btn-outline-primary rounded-circle text-center mr-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', padding: 0 }} href="https://x.com/EscacsPardinyes" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="btn btn-outline-primary rounded-circle text-center mr-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', padding: 0 }} href="https://www.facebook.com/profile.php?id=61553973365334" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="btn btn-outline-primary rounded-circle text-center mr-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', padding: 0 }} href="https://www.instagram.com/clubescacspardinyes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="btn btn-outline-primary rounded-circle text-center mr-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', padding: 0 }} href="https://www.youtube.com/@ClubEscacsPardinyes" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container copyright-section text-center border-0">
                <p className="m-0">
                    &copy; <Link className="font-weight-bold" to="/privacy">Club Escacs Pardinyes</Link>. {t('footer.rights')} {t('footer.founded')}
                </p>
            </div>
        </footer>
    );
}
