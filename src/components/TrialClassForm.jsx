import { useState } from 'react';
import { Link } from './LocalizedLink';
import { useLanguage } from '../context/LanguageContext';

// Short "free trial class" form shown on the first screen of the Home page
export default function TrialClassForm() {
    const { t, localize } = useLanguage();
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

    return (
        <section className="trial-card" id="prova-gratuita" aria-labelledby="trial-title">
            <div className="trial-head">
                <h2 id="trial-title" className="trial-title">{t('trial.title')}</h2>
                <p className="trial-sub">{t('trial.sub')}</p>
                <Link to="/school" className="btn btn-outline-primary btn-sm trial-more d-none d-md-inline-block">
                    {t('trial.more')}<i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                </Link>
            </div>

            {status === 'success' ? (
                <div className="trial-success" role="status">
                    <p className="mb-2"><i className="fas fa-check-circle mr-2" aria-hidden="true"></i>{t('trial.success')}</p>
                    <p className="trial-success-wa mb-2">{t('trial.whatsapp_text')}</p>
                    <a
                        href={`https://wa.me/34641915266?text=${encodeURIComponent(t('trial.whatsapp_msg'))}`}
                        className="btn btn-success trial-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-whatsapp mr-2" aria-hidden="true"></i>{t('trial.whatsapp_btn')}
                    </a>
                </div>
            ) : (
                <form className="trial-form" onSubmit={handleSubmit}>
                    <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" aria-hidden="true" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value="Classe de prova gratuïta (web, pàgina d'inici)" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="trial-field">
                        <label htmlFor="trial-name">{t('trial.name')}</label>
                        <input type="text" className="form-control" id="trial-name" name="name" autoComplete="name" required />
                    </div>
                    <div className="trial-field">
                        <label htmlFor="trial-phone">{t('trial.phone')}</label>
                        <input type="tel" className="form-control" id="trial-phone" name="phone" autoComplete="tel" inputMode="tel" required />
                    </div>
                    <div className="trial-field">
                        <label htmlFor="trial-age">{t('trial.age')}</label>
                        <select className="form-control" id="trial-age" name="age" required defaultValue="">
                            <option value="" disabled>{t('trial.age_choose')}</option>
                            <option>{t('trial.age_kids')}</option>
                            <option>{t('trial.age_teens')}</option>
                            <option>{t('trial.age_adults')}</option>
                        </select>
                    </div>
                    <button className="btn btn-primary trial-submit" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? t('trial.sending') : t('trial.submit')}
                    </button>

                    <div className="trial-privacy">
                        <input type="checkbox" id="trial-privacy" name="privacy" required />
                        <label htmlFor="trial-privacy">
                            {t('contact.form.privacy')}<a href={localize(t('contact.form.link'))} target="_blank" rel="noopener noreferrer">{t('contact.form.policy')}</a>
                        </label>
                    </div>

                    {status === 'error' && (
                        <p className="trial-error" role="alert">{t('trial.error')}</p>
                    )}
                </form>
            )}

            {/* On phones the button goes under the form, so "Reserva la classe" stays on the first screen */}
            <Link to="/school" className="btn btn-outline-primary btn-block mt-3 d-md-none">
                {t('trial.more')}<i className="fa fa-arrow-right ml-2" aria-hidden="true"></i>
            </Link>
        </section>
    );
}
