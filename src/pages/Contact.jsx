import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('contact.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('contact.header')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contact Start */}
            <div className="container pt-5">
                <div className="d-flex flex-column text-center mb-5">
                    <h4 className="text-primary font-weight-bold">{t('contact.title')}</h4>
                    <h4 className="display-4 font-weight-bold">{t('contact.subtitle')}</h4>
                </div>
                <div className="row px-3 pb-2">
                    <div className="col-sm-4 text-center mb-3">
                        <i className="fa fa-2x fa-map-marker-alt mb-3 text-primary"></i>
                        <h4 className="font-weight-bold">{t('contact.address_title')}</h4>
                        <p>Carrer Sant Pere Claver, 1, segona planta, Lleida 25005</p>
                    </div>
                    <div className="col-sm-4 text-center mb-3">
                        <i className="fa fa-2x fa-phone-alt mb-3 text-primary"></i>
                        <h4 className="font-weight-bold">{t('contact.phone_title')}</h4>
                        <p>+34 973 23 02 06</p>
                    </div>
                    <div className="col-sm-4 text-center mb-3">
                        <i className="far fa-2x fa-envelope mb-3 text-primary"></i>
                        <h4 className="font-weight-bold">{t('contact.email_title')}</h4>
                        <p>escacspardinyes@gmail.com</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 pb-5">
                        <iframe
                            style={{ width: '100%', height: '392px', border: '0' }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.3656617805677!2d0.6353778764491446!3d41.62622698114585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a6e12b177dc631%3A0xbf308c439f6338b7!2sClub%20Escacs%20Pardinyes!5e0!3m2!1sca!2ses!4v1727617805465!5m2!1sca!2ses"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="col-md-6 pb-5">
                        <div className="contact-form">
                            <div id="success"></div>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfhevo5_9vVUwSL5kXM1qIYRUYWeUAT24bzzIK1GEEFpLGiPQ/viewform?embedded=true"
                                width="640"
                                height="957"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                            >S&#39;està carregant…</iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>
    );
}
