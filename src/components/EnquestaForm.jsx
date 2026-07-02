import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function EnquestaForm() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const classOptions = t('enquesta.form.class_options').split(',');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle multiple checkboxes for best_days
        const bestDays = formData.getAll('best_days');
        data.best_days = bestDays.join(', ');

        try {
            await fetch('https://script.google.com/macros/s/AKfycbxYazeA0zDMS6bUxausBhrBUgg3o2U1aYtV7BuhQpcq4ycXyA-XVJ_Mri3idISwsU3y/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(data)
            });

            // Amb no-cors la resposta és opaca (response.ok = false sempre), així que assumim èxit si no peta.
            setStatus('success');
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="alert alert-success p-5 text-center shadow-sm">
                <i className="fas fa-check-circle fa-4x text-success mb-4"></i>
                <h4 className="font-weight-bold">{t('enquesta.form.success')}</h4>
                <button onClick={() => setStatus(null)} className="btn btn-outline-primary mt-4">{t('enquesta.form.submit')}</button>
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
                    <label className="font-weight-bold mb-2">{t('enquesta.form.name')} *</label>
                    <input type="text" className="form-control p-4" id="name" name="name" placeholder={t('enquesta.form.name')} required />
                </div>

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2">{t('enquesta.form.phone')}</label>
                    <input 
                        type="tel" 
                        className="form-control p-4" 
                        id="phone" 
                        name="phone" 
                        placeholder={t('enquesta.form.phone')} 
                        pattern="[\d\s\+]+"
                        title="Només números, espais i el signe +"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^\d\s+]/g, '');
                        }}
                    />
                </div>

                {/* Current Class */}
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-3">{t('enquesta.form.current_class')} *</label>
                    {classOptions.map((option, index) => (
                        <div className="custom-control custom-radio mb-2" key={`class-${index}`}>
                            <input type="radio" id={`currentClass${index}`} name="current_class" className="custom-control-input" value={option.trim()} required />
                            <label className="custom-control-label" htmlFor={`currentClass${index}`}>{option.trim()}</label>
                        </div>
                    ))}
                </div>

                {/* Is Schedule OK? */}
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-3">{t('enquesta.form.schedule_ok')} *</label>
                    <div className="d-flex gap-4">
                        <div className="custom-control custom-radio mr-4">
                            <input type="radio" id="scheduleOkYes" name="schedule_ok" className="custom-control-input" value="Sí" required />
                            <label className="custom-control-label" htmlFor="scheduleOkYes">{t('enquesta.form.yes')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="scheduleOkNo" name="schedule_ok" className="custom-control-input" value="No" />
                            <label className="custom-control-label" htmlFor="scheduleOkNo">{t('enquesta.form.no')}</label>
                        </div>
                    </div>
                </div>

                {/* Other schedule */}
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2">{t('enquesta.form.other_schedule')}</label>
                    <input type="text" className="form-control p-4" id="other_schedule" name="other_schedule" placeholder={t('enquesta.form.other_schedule')} />
                </div>

                {/* Would like 2 hours? */}
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-3">{t('enquesta.form.two_hours')} *</label>
                    <div className="d-flex gap-4">
                        <div className="custom-control custom-radio mr-4">
                            <input type="radio" id="twoHoursYes" name="wants_two_hours" className="custom-control-input" value="Sí" required />
                            <label className="custom-control-label" htmlFor="twoHoursYes">{t('enquesta.form.yes')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="twoHoursNo" name="wants_two_hours" className="custom-control-input" value="No" />
                            <label className="custom-control-label" htmlFor="twoHoursNo">{t('enquesta.form.no')}</label>
                        </div>
                    </div>
                </div>

                {/* Best Days (Checkboxes) */}
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-3">{t('enquesta.form.best_days')}</label>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="dayMonday" name="best_days" value="Dilluns" />
                        <label className="custom-control-label" htmlFor="dayMonday">{t('enquesta.form.days.monday')}</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="dayTuesday" name="best_days" value="Dimarts" />
                        <label className="custom-control-label" htmlFor="dayTuesday">{t('enquesta.form.days.tuesday')}</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="dayWednesday" name="best_days" value="Dimecres" />
                        <label className="custom-control-label" htmlFor="dayWednesday">{t('enquesta.form.days.wednesday')}</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="dayThursday" name="best_days" value="Dijous" />
                        <label className="custom-control-label" htmlFor="dayThursday">{t('enquesta.form.days.thursday')}</label>
                    </div>
                    <div className="custom-control custom-checkbox mb-2">
                        <input type="checkbox" className="custom-control-input" id="dayFriday" name="best_days" value="Divendres" />
                        <label className="custom-control-label" htmlFor="dayFriday">{t('enquesta.form.days.friday')}</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2">{t('enquesta.form.comments')}</label>
                    <textarea className="form-control p-4" rows="3" id="comments" name="comments" placeholder={t('enquesta.form.comments')}></textarea>
                </div>

                <div>
                    <button className="btn btn-primary btn-block py-3 px-5 font-weight-bold" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                            <span><i className="fas fa-spinner fa-spin mr-2"></i> Enviant...</span>
                        ) : (
                            <><i className="fas fa-paper-plane mr-2"></i>{t('enquesta.form.submit')}</>
                        )}
                    </button>
                </div>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center small font-weight-bold">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {t('enquesta.form.error')}
                    </div>
                )}
            </form>
        </div>
    );
}
