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
                        <i className="fab fa-2x fa-whatsapp mb-3 text-primary"></i>
                        <h4 className="font-weight-bold">{t('contact.phone_title')}</h4>
                        <p><a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="text-dark">+34 641 91 52 66 (WhatsApp)</a></p>
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
                            title="Ubicació del Club Escacs Pardinyes a Google Maps"
                        ></iframe>
                    </div>
                    <div className="col-md-6 pb-5">
                        <ContactForm />
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>
    );
}
