import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PatrociniForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        const data = Object.fromEntries(new FormData(e.target).entries());

        try {
            const response = await fetch('https://formsubmit.co/ajax/escacspardinyes@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            setStatus(response.ok ? 'success' : 'error');
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="alert alert-success p-5 text-center shadow-sm">
                <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                <h4 className="font-weight-bold">Gràcies! Hem rebut la teva sol·licitud.</h4>
                <p className="mb-0">Ens posarem en contacte amb tu ben aviat.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm mt-4">
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="Nova sol·licitud de patrocini - web Escacs Pardinyes" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_autoresponse" value="Hem rebut la teva sol·licitud de patrocini correctament. Ens posarem en contacte amb tu ben aviat." />

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="small font-weight-bold text-muted text-uppercase mb-2" htmlFor="pf-company">Empresa o entitat *</label>
                    <input type="text" className="form-control bg-light p-3" id="pf-company" name="company" required style={{ height: '55px' }} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="small font-weight-bold text-muted text-uppercase mb-2" htmlFor="pf-name">Persona de contacte *</label>
                    <input type="text" className="form-control bg-light p-3" id="pf-name" name="name" required style={{ height: '55px' }} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="small font-weight-bold text-muted text-uppercase mb-2" htmlFor="pf-email">{t('contact.form.email')} *</label>
                    <input type="email" className="form-control bg-light p-3" id="pf-email" name="email" required style={{ height: '55px' }} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="small font-weight-bold text-muted text-uppercase mb-2" htmlFor="pf-phone">{t('contact.form.phone')}</label>
                    <input type="tel" className="form-control bg-light p-3" id="pf-phone" name="phone" pattern="[\d\s\+]+" style={{ height: '55px' }}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^\d\s+]/g, ''); }} />
                </div>
            </div>
            <div className="mb-4">
                <label className="small font-weight-bold text-muted text-uppercase mb-2" htmlFor="pf-message">{t('contact.form.message')}</label>
                <textarea className="form-control bg-light p-3" id="pf-message" rows="4" name="message"></textarea>
            </div>
            <div className="mb-4 form-check d-flex align-items-center">
                <input type="checkbox" className="form-check-input mt-0" id="pf-privacy" name="privacy" required style={{ width: '20px', height: '20px' }} />
                <label className="form-check-label ml-3 small text-muted" htmlFor="pf-privacy">
                    {t('contact.form.privacy')} <a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer" className="font-weight-bold">{t('contact.form.policy')}</a>
                </label>
            </div>
            <button className="btn btn-primary btn-lg btn-block rounded-pill" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviant...' : <><i className="fas fa-paper-plane mr-2"></i>{t('contact.form.send')}</>}
            </button>
            {status === 'error' && (
                <div className="mt-3 p-3 text-danger text-center small font-weight-bold">
                    Hi ha hagut un error en enviar el missatge. Si us plau, escriu-nos a <strong>escacspardinyes@gmail.com</strong>
                </div>
            )}
        </form>
    );
}
