import { useLanguage } from '../context/LanguageContext';
import ContactForm from '../components/ContactForm';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Contact() {
    const { t } = useLanguage();
    const breadcrumbs = [{ label: t('contact.header') }];

    return (
        <>
            <SEO title={t('contact.header')} description={t('seo.contact_description')} />
            <PageHeader title={t('contact.header')} breadcrumbs={breadcrumbs} />

            <div className="container section-padding">
                <div className="text-center mb-5 animate-fade-in">
                    <h4 className="text-primary font-weight-bold text-uppercase letter-spacing-2 mb-2">{t('contact.title')}</h4>
                    <h2 className="display-3 font-weight-bold">{t('contact.subtitle')}</h2>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>Estem aquí per ajudar-te. Contacta amb nosaltres per qualsevol dubte o per venir a provar un dia.</p>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="glass-card p-5 h-100 text-center transition-base hover-up" style={{ borderRadius: '32px' }}>
                            <div className="icon-box mb-4 mx-auto bg-primary-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                <i className="fa fa-map-marker-alt fa-2x text-primary"></i>
                            </div>
                            <h4 className="font-weight-bold mb-3">{t('contact.address_title')}</h4>
                            <p className="mb-0 text-muted">{t('contact.address_val')}</p>
                            <a href="https://maps.app.goo.gl/..." target="_blank" rel="noopener noreferrer" className="btn btn-link text-primary mt-3 font-weight-bold">Com arribar <i className="fas fa-external-link-alt ml-1 small"></i></a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-5 h-100 text-center transition-base hover-up" style={{ borderRadius: '32px' }}>
                            <div className="icon-box mb-4 mx-auto bg-primary-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                <i className="fab fa-whatsapp fa-2x text-primary"></i>
                            </div>
                            <h4 className="font-weight-bold mb-3">{t('contact.phone_title')}</h4>
                            <p className="mb-0"><a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="text-dark font-weight-bold">+34 641 91 52 66</a></p>
                            <p className="small text-muted mt-2">(WhatsApp disponible)</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-5 h-100 text-center transition-base hover-up" style={{ borderRadius: '32px' }}>
                            <div className="icon-box mb-4 mx-auto bg-primary-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                <i className="far fa-envelope fa-2x text-primary"></i>
                            </div>
                            <h4 className="font-weight-bold mb-3">{t('contact.email_title')}</h4>
                            <p className="mb-0 text-muted font-weight-bold">escacspardinyes@gmail.com</p>
                            <p className="small text-muted mt-2">Responem en menys de 24h</p>
                        </div>
                    </div>
                </div>

                <div className="row g-5 align-items-stretch">
                    <div className="col-lg-6">
                        <div className="h-100 shadow-lg overflow-hidden" style={{ borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <iframe
                                style={{ width: '100%', height: '100%', minHeight: '450px', border: '0', display: 'block' }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.3656617805677!2d0.6353778764491446!3d41.62622698114585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a6e12b177dc631%3A0xbf308c439f6338b7!2sClub%20Escacs%20Pardinyes!5e0!3m2!1sca!2ses!4v1727617805465!5m2!1sca!2ses"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicació del Club Escacs Pardinyes a Google Maps"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="glass-card p-4 p-md-5 h-100" style={{ borderRadius: '32px' }}>
                            <h3 className="font-weight-bold mb-4 d-flex align-items-center">
                                <i className="fas fa-paper-plane text-primary mr-3"></i>
                                Envia'ns un missatge
                            </h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>
    );
}
