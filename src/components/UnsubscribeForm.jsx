import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function UnsubscribeForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Afegeix el teu Access Key de Web3Forms aquí
        formData.append("access_key", "1602f5f7-d452-44a9-bbfe-b05b68076d74");
        formData.append("subject", "Baixa de Notificacions");
        formData.append("from_name", "Web Escacs Pardinyes");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="alert alert-success p-5 text-center shadow-sm">
                <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                <h4 className="font-weight-bold">{t('unsubscribe.form.success')}</h4>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <form 
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded shadow-sm text-left"
            >
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2">{t('unsubscribe.form.email')} *</label>
                    <input type="email" className="form-control p-4" id="email" name="email" placeholder={t('unsubscribe.form.email')} required />
                </div>

                <div>
                    <button className="btn btn-primary btn-block py-3 px-5 font-weight-bold" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                            <span><i className="fas fa-spinner fa-spin mr-2"></i> Enviant...</span>
                        ) : (
                            <><i className="fas fa-paper-plane mr-2"></i>{t('unsubscribe.form.submit')}</>
                        )}
                    </button>
                </div>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center small font-weight-bold">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {t('unsubscribe.form.error')}
                    </div>
                )}
            </form>
        </div>
    );
}
