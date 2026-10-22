import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getConsent, CONSENT_CHANGE_EVENT } from '../utils/consent';

const DISMISSED_KEY = 'newsletter_dismissed';

function isDismissed() {
    try {
        return !!localStorage.getItem(DISMISSED_KEY);
    } catch {
        return false;
    }
}

export default function NewsletterModal() {
    const { t, tHtml } = useLanguage();
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'
    const [dismissed, setDismissed] = useState(isDismissed);
    // Wait until the cookie banner has been answered so both popups never overlap
    const [cookieChoiceMade, setCookieChoiceMade] = useState(() => !!getConsent());

    useEffect(() => {
        const onConsentChange = () => setCookieChoiceMade(true);
        window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
        return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    }, []);

    useEffect(() => {
        if (dismissed || !cookieChoiceMade) return;

        const timer = setTimeout(() => {
            setShowModal(true);
        }, 5000); // Show 5 seconds after the cookie choice / page load

        return () => clearTimeout(timer);
    }, [dismissed, cookieChoiceMade]);

    const handleClose = useCallback(() => {
        setShowModal(false);
        try {
            localStorage.setItem(DISMISSED_KEY, 'true');
        } catch {
            // Storage unavailable: it will show again on the next visit
        }
        setDismissed(true);
    }, []);

    useEffect(() => {
        if (!showModal) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [showModal, handleClose]);

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

    if ((!showModal || dismissed) && status !== 'success') return null;

    return (
        <div
            onClick={handleClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1050,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="newsletter-title"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '500px',
                    width: '90%',
                    position: 'relative',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                <button
                    onClick={handleClose}
                    aria-label={t('newsletter.close')}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    &times;
                </button>

                {status === 'success' ? (
                    <div className="text-center py-4">
                        <i className="fa fa-check-circle fa-4x text-success mb-3"></i>
                        <h3 id="newsletter-title" className="font-weight-bold mb-3">{t('newsletter.success_title')}</h3>
                        <p className="mb-4">{t('newsletter.success_text')}</p>
                        <button onClick={handleClose} className="btn btn-primary px-4">{t('newsletter.close')}</button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-4">
                            <h3 id="newsletter-title" className="font-weight-bold mb-3">{t('newsletter.title')}</h3>
                            <p className="mb-4" dangerouslySetInnerHTML={tHtml('newsletter.text')}></p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="_subject" value="Nova Subscripció Newsletter" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                            <div className="form-group mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-right-0"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text" name="name" className="form-control border-left-0" placeholder={t('newsletter.name')} aria-label={t('newsletter.name')} required />
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-right-0"><i className="fa fa-phone"></i></span>
                                    </div>
                                    <input type="tel" name="phone" className="form-control border-left-0" placeholder={t('newsletter.phone')} aria-label={t('newsletter.phone')} required />
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-right-0"><i className="fa fa-envelope"></i></span>
                                    </div>
                                    <input type="email" name="email" className="form-control border-left-0" placeholder={t('newsletter.email')} aria-label={t('newsletter.email')} required />
                                </div>
                            </div>

                            <div className="form-check d-flex align-items-center mb-4">
                                <input type="checkbox" className="form-check-input mt-0" id="newsletter-privacy" name="privacy" value="acceptada" required style={{ width: '18px', height: '18px' }} />
                                <label className="form-check-label ml-3 small text-muted" htmlFor="newsletter-privacy">
                                    {t('newsletter.consent')}
                                    <a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer" className="text-primary font-weight-bold">{t('contact.form.policy')}</a>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block text-white font-weight-bold py-2" disabled={status === 'sending'}>
                                {status === 'sending' ? t('newsletter.sending') : t('newsletter.send')} <i className="fa fa-arrow-right ml-2"></i>
                            </button>

                            {status === 'error' && (
                                <div className="mt-3 text-danger text-center small font-weight-bold">
                                    {t('newsletter.error')}
                                </div>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
