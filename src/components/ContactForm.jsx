import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formsubmit.co/ajax/escacspardinyes@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="alert alert-success p-5 text-center shadow-sm">
                <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                <h4 className="font-weight-bold">{t('contact.form.success')}</h4>

                <button onClick={() => setStatus(null)} className="btn btn-outline-primary mt-4">Enviar un altre missatge</button>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">

                {/* Honeypot for spam protection */}
                <input type="text" name="_honey" style={{ display: 'none' }} />

                {/* Configuration */}
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="Nou missatge de web Escacs Pardinyes" />

                {/* Force JSON response for AJAX (though fetch url /ajax/ does this too) */}
                <input type="hidden" name="_captcha" value="false" />

                {/* Autoresponse: This sends a copy to the user */}
                <input type="hidden" name="_autoresponse" value="Hem rebut el teu missatge correctament. Ens posarem en contacte amb tu ben aviat. / Hemos recibido tu mensaje correctamente. Contactaremos contigo pronto. / We received your message. We will contact you soon." />

                <div className="form-group mb-3">
                    <input type="text" className="form-control p-4" id="name" name="name" placeholder={t('contact.form.name')} required />
                </div>
                <div className="form-group mb-3">
                    <input type="email" className="form-control p-4" id="email" name="email" placeholder={t('contact.form.email')} required />
                </div>
                <div className="form-group mb-3">
                    <input type="tel" className="form-control p-4" id="phone" name="phone" placeholder={t('contact.form.phone')} />
                </div>
                <div className="form-group mb-3">
                    <input type="text" className="form-control p-4" id="subject" name="subject" placeholder={t('contact.form.subject')} required />
                </div>
                <div className="form-group mb-3">
                    <textarea className="form-control p-4" rows="6" id="message" name="message" placeholder={t('contact.form.message')} required></textarea>
                </div>
                <div className="form-group mb-3 pl-4">
                    <input type="checkbox" className="form-check-input" id="privacy" name="privacy" required />
                    <label className="form-check-label" htmlFor="privacy">
                        {t('contact.form.privacy')} <a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer">{t('contact.form.policy')}</a>
                    </label>
                </div>
                <div>
                    <button className="btn btn-primary btn-block py-3 px-5" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                            <span><i className="fas fa-spinner fa-spin mr-2"></i> Enviant...</span>
                        ) : (
                            t('contact.form.send')
                        )}
                    </button>
                </div>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center">
                        Hi ha hagut un error en enviar el missatge. Si us plau, prova-ho més tard o envia un mail directament.
                    </div>
                )}
            </form>
        </div>
    );
}
