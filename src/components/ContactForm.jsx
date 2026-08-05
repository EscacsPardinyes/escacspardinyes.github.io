import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/escacspardinyes@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-5 animate-fade-in">
                <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-check fa-2x"></i>
                </div>
                <h4 className="font-weight-bold mb-3">{t('contact.form.success')}</h4>
                <p className="text-muted mb-4">Hem rebut el teu missatge. T'escriurem ben aviat!</p>
                <button onClick={() => setStatus(null)} className="btn btn-primary rounded-pill">Enviar un altre missatge</button>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <form 
                onSubmit={handleSubmit}
            >
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="Nou missatge de web Escacs Pardinyes" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_autoresponse" value="Hem rebut el teu missatge correctament. Ens posarem en contacte amb tu ben aviat." />

                <div className="row g-3">
                    <div className="col-md-6 mb-3">
                        <label className="small font-weight-bold text-muted text-uppercase mb-2">{t('contact.form.name')}</label>
                        <input type="text" className="form-control border-0 bg-light p-3 rounded-xl shadow-none" name="name" placeholder={t('contact.form.name')} required style={{ height: '55px' }} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="small font-weight-bold text-muted text-uppercase mb-2">{t('contact.form.email')}</label>
                        <input type="email" className="form-control border-0 bg-light p-3 rounded-xl shadow-none" name="email" placeholder={t('contact.form.email')} required style={{ height: '55px' }} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6 mb-3">
                        <label className="small font-weight-bold text-muted text-uppercase mb-2">{t('contact.form.phone')}</label>
                        <input 
                            type="tel" 
                            className="form-control border-0 bg-light p-3 rounded-xl shadow-none" 
                            name="phone" 
                            placeholder={t('contact.form.phone')} 
                            style={{ height: '55px' }} 
                            pattern="[\d\s\+]+"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^\d\s+]/g, '');
                            }}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="small font-weight-bold text-muted text-uppercase mb-2">{t('contact.form.subject')}</label>
                        <input type="text" className="form-control border-0 bg-light p-3 rounded-xl shadow-none" name="subject" placeholder={t('contact.form.subject')} required style={{ height: '55px' }} />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="small font-weight-bold text-muted text-uppercase mb-2">{t('contact.form.message')}</label>
                    <textarea className="form-control border-0 bg-light p-3 rounded-xl shadow-none" rows="5" name="message" placeholder={t('contact.form.message')} required></textarea>
                </div>
                <div className="mb-4">
                    <div className="form-check d-flex align-items-center">
                        <input type="checkbox" className="form-check-input mt-0" id="privacy" name="privacy" required style={{ width: '20px', height: '20px' }} />
                        <label className="form-check-label ml-3 small text-muted" htmlFor="privacy">
                            {t('contact.form.privacy')} <a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer" className="text-primary font-weight-bold">{t('contact.form.policy')}</a>
                        </label>
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary btn-lg btn-block rounded-pill shadow-md" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                            <span><i className="fas fa-spinner fa-spin mr-2"></i> Enviant...</span>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane mr-2"></i>
                                {t('contact.form.send')}
                            </>
                        )}
                    </button>
                </div>
                {status === 'error' && (
                    <div className="mt-4 p-3 bg-danger-light text-danger rounded-xl text-center small font-weight-bold">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        Hi ha hagut un error en enviar el missatge (El servei extern de correu no respon). 
                        Si us plau, envia un email directament a <strong>escacspardinyes@gmail.com</strong>
                    </div>
                )}
            </form>
        </div>
    );
}
