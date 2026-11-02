import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { circuitUi } from '../data/circuitStrings';

const currentYear = 2027;

export default function CircuitSignupForm({ tournament, birthFrom = 1940, birthTo = 2022, federatedOnly = false, formType = 'standard', lang = 'ca' }) {
    const { t } = useLanguage();
    const f = (circuitUi[lang] || circuitUi.ca).form;
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'
    const titled = formType === 'tancat';
    const years = [];
    for (let y = birthTo; y >= birthFrom; y--) years.push(y);

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
                <h4 className="font-weight-bold">{f.success}</h4>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm text-left">
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value={`Inscripció: ${tournament}`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_autoresponse" value={f.autoresponse(tournament)} />
                <input type="hidden" name="tournament" value={tournament} />

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-name">{f.name}</label>
                    <input type="text" className="form-control p-4" id="cs-name" name="name" required autoComplete="name" />
                </div>

                {titled && (
                <>
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-title">{f.title}</label>
                    <select className="form-control" id="cs-title" name="title" required defaultValue="" style={{ height: '56px' }}>
                        <option value="" disabled>{f.selectTitle}</option>
                        {['GM', 'MI', 'FM', 'CM', 'WGM', 'WIM', 'WFM'].map(x => <option key={x} value={x}>{x}</option>)}
                        <option value="Sense títol">{f.noTitle}</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-fide">{f.fideId}</label>
                    <input type="text" className="form-control p-4" id="cs-fide" name="fideId" required inputMode="numeric" />
                </div>
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-flag">{f.federation}</label>
                    <input type="text" className="form-control p-4" id="cs-flag" name="federation" required placeholder="ESP, ARG, ECU..." />
                </div>
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-elo">{f.elo}</label>
                    <input type="number" className="form-control p-4" id="cs-elo" name="elo" required min="0" max="3000" />
                </div>
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-phone">{f.phone}</label>
                    <input type="tel" className="form-control p-4" id="cs-phone" name="phone" required pattern="[\d\s\+]+" onInput={(e) => { e.target.value = e.target.value.replace(/[^\d\s+]/g, ''); }} />
                </div>
                </>
                )}

                {!federatedOnly && !titled && (
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-year">{f.birthYear}</label>
                    <select className="form-control" id="cs-year" name="birthYear" required defaultValue="" style={{ height: '56px' }}>
                        <option value="" disabled>{f.selectYear}</option>
                        {years.map(y => <option key={y} value={y}>{y} ({currentYear - y} {f.years})</option>)}
                    </select>
                </div>
                )}

                {titled ? null : federatedOnly ? (
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-code">{f.code}</label>
                    <input type="text" className="form-control p-4" id="cs-code" name="fideOrCatalanCode" required />
                    <small className="text-muted">{f.codeHint}</small>
                </div>

                ) : (
                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-3">{f.federated}</label>
                    <div className="d-flex">
                        <div className="custom-control custom-radio mr-4">
                            <input type="radio" id="cs-fed-yes" name="federated" className="custom-control-input" value="Sí" required />
                            <label className="custom-control-label" htmlFor="cs-fed-yes">{f.yes}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="cs-fed-no" name="federated" className="custom-control-input" value="No" />
                            <label className="custom-control-label" htmlFor="cs-fed-no">{f.no}</label>
                        </div>
                    </div>
                </div>

                )}

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-club">{federatedOnly || titled ? f.clubOnly : f.club}</label>
                    <input type="text" className="form-control p-4" id="cs-club" name="club" />
                </div>

                <div className="form-group mb-4">
                    <label className="font-weight-bold mb-2" htmlFor="cs-email">{f.email}</label>
                    <input type="email" className="form-control p-4" id="cs-email" name="email" required autoComplete="email" />
                </div>

                <div className="custom-control custom-checkbox mb-4">
                    <input type="checkbox" className="custom-control-input" id="cs-accept" name="accept" value="1" required />
                    <label className="custom-control-label" htmlFor="cs-accept">
                        {f.acceptPre}<a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer">{f.acceptLink}</a>{f.acceptPost}
                    </label>
                </div>

                <button className="btn btn-primary btn-block py-3 px-5 font-weight-bold" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                        <span><i className="fas fa-spinner fa-spin mr-2"></i>{f.sending}</span>
                    ) : (
                        <><i className="fas fa-paper-plane mr-2"></i>{f.submit}</>
                    )}
                </button>
                {status === 'error' && (
                    <div className="mt-3 text-danger text-center small font-weight-bold">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {f.error}
                    </div>
                )}
            </form>
        </div>
    );
}
