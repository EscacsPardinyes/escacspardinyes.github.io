import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function SchoolForm() {
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
                <h4 className="font-weight-bold">{t('school.form.success')}</h4>
                <button onClick={() => setStatus(null)} className="btn btn-outline-primary mt-4">{t('school.form.submit')}</button>
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
                <input type="hidden" name="_subject" value="Nova Inscripció Escola d'Escacs" />
                <input type="hidden" name="_captcha" value="false" />

                {/* Autoresponse */}
                <input type="hidden" name="_autoresponse" value="Hem rebut la teva sol·licitud d'inscripció correctament. Ens posarem en contacte amb tu ben aviat. / Hemos recibido tu solicitud correctamente. Contactaremos contigo pronto." />

                <div className="form-group mb-3">
                    <input type="text" className="form-control p-4" id="name" name="name" placeholder={t('contact.form.name')} required />
                </div>
                <div className="form-group mb-3">
                    <input type="email" className="form-control p-4" id="email" name="email" placeholder={t('contact.form.email')} required />
                </div>
                <div className="form-group mb-3">
                    <input type="tel" className="form-control p-4" id="phone" name="phone" placeholder={t('contact.form.phone')} />
                </div>

                {/* Schedule Options */}
                <div className="form-group mb-3">
                    <label className="font-weight-bold mb-3">{t('school.form.schedule_label')} *</label>

                    <div className="custom-control custom-radio mb-2">
                        <input type="radio" id="schedule1" name="schedule" className="custom-control-input" value={t('school.form.schedule_option_1')} required />
                        <label className="custom-control-label" htmlFor="schedule1">{t('school.form.schedule_option_1')}</label>
                    </div>
                    <div className="custom-control custom-radio mb-2">
                        <input type="radio" id="schedule2" name="schedule" className="custom-control-input" value={t('school.form.schedule_option_2')} />
                        <label className="custom-control-label" htmlFor="schedule2">{t('school.form.schedule_option_2')}</label>
                    </div>
                    <div className="custom-control custom-radio mb-2">
                        <input type="radio" id="schedule3" name="schedule" className="custom-control-input" value={t('school.form.schedule_option_3')} />
                        <label className="custom-control-label" htmlFor="schedule3">{t('school.form.schedule_option_3')}</label>
                    </div>
                    <div className="custom-control custom-radio mb-2">
                        <input type="radio" id="schedule4" name="schedule" className="custom-control-input" value={t('school.form.schedule_option_4')} />
                        <label className="custom-control-label" htmlFor="schedule4">{t('school.form.schedule_option_4')}</label>
                    </div>
                    <div className="custom-control custom-radio mb-2">
                        <input type="radio" id="schedule5" name="schedule" className="custom-control-input" value={t('school.form.schedule_option_5')} />
                        <label className="custom-control-label" htmlFor="schedule5">{t('school.form.schedule_option_5')}</label>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <textarea className="form-control p-4" rows="3" id="message" name="message" placeholder={t('contact.form.message')}></textarea>
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
                            t('school.form.submit')
                        )}
                    </button>
                </div>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center">
                        Hi ha hagut un error en enviar. Si us plau, envia un mail directament.
                    </div>
                )}
            </form>
        </div>
    );
}
