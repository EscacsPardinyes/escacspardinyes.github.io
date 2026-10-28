import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// URL de l'aplicació web de Google Apps Script (veure scripts/apps-script-cafiv.gs)
const CAFIV_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLCvT3Ylab5_8z2nq8McCKAc2n8bB9OVmnbPJztIgMn4x5h_jYkXOi52yjMoqPldXYgA/exec';

export default function CafivForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = Object.fromEntries(new FormData(form).entries());

        // Honeypot: els bots omplen aquest camp
        if (data.website) return;
        delete data.website;

        if (!CAFIV_SCRIPT_URL) {
            setStatus('error');
            return;
        }

        setStatus('sending');
        try {
            await fetch(CAFIV_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data)
            });
            // Amb no-cors la resposta és opaca: assumim èxit si no peta.
            setStatus('success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="alert alert-success p-5 text-center shadow-sm">
                <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                <h4 className="font-weight-bold">{t('cafiv.form.success')}</h4>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm text-left">
                <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px' }} />

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cafiv-name">{t('cafiv.form.name')} *</label>
                    <input type="text" className="form-control p-4" id="cafiv-name" name="name" required />
                </div>

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cafiv-email">{t('cafiv.form.email')} *</label>
                    <input type="email" className="form-control p-4" id="cafiv-email" name="email" required />
                </div>

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cafiv-phone">{t('cafiv.form.phone')}</label>
                    <input
                        type="tel"
                        className="form-control p-4"
                        id="cafiv-phone"
                        name="phone"
                        pattern="[\d\s\+]+"
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^\d\s+]/g, ''); }}
                    />
                </div>

                {[['udl_student', 'udl'], ['federated', 'federated']].map(([name, key]) => (
                    <div className="form-group mb-4" key={name}>
                        <label className="font-weight-bold mb-3">{t(`cafiv.form.${key}`)} *</label>
                        <div className="d-flex">
                            <div className="custom-control custom-radio mr-4">
                                <input type="radio" id={`cafiv-${name}-yes`} name={name} className="custom-control-input" value="Sí" required />
                                <label className="custom-control-label" htmlFor={`cafiv-${name}-yes`}>{t('cafiv.form.yes')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id={`cafiv-${name}-no`} name={name} className="custom-control-input" value="No" />
                                <label className="custom-control-label" htmlFor={`cafiv-${name}-no`}>{t('cafiv.form.no')}</label>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="custom-control custom-checkbox mb-4">
                    <input type="checkbox" className="custom-control-input" id="cafiv-privacy" name="privacy" value="1" required />
                    <label className="custom-control-label" htmlFor="cafiv-privacy">{t('cafiv.form.privacy')} *</label>
                </div>

                <button className="btn btn-primary btn-block py-3 px-5 font-weight-bold" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <span><i className="fas fa-spinner fa-spin mr-2"></i>{t('cafiv.form.sending')}</span>
                    ) : (
                        <><i className="fas fa-paper-plane mr-2"></i>{t('cafiv.form.submit')}</>
                    )}
                </button>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center small font-weight-bold">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {t('cafiv.form.error')}
                    </div>
                )}
            </form>
        </div>
    );
}
