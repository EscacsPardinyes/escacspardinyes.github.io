import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

import posterImg from '../img/galeria/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.webp';

export default function TancatsList() {
    const { t } = useLanguage();
    
    const [formData, setFormData] = useState({
        title: '', name: '', fideId: '', flag: '', elo: '', phone: ''
    });
    const [status, setStatus] = useState(null);

    const breadcrumbs = [{ label: t('tancats.list_breadcrumb') }];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        const formDataToSend = new FormData(form);
        try {
            const response = await fetch("https://formsubmit.co/ajax/escacspardinyes@gmail.com", {
                method: "POST", body: formDataToSend
            });
            if (response.ok) {
                setStatus('success');
                form.reset();
                setFormData({ title: '', name: '', fideId: '', flag: '', elo: '', phone: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        }
    };

    return (
        <>
            <SEO title={t('tancats.list_header')} description={t('tancats.list_subtitle')} />
            <PageHeader title={t('tancats.list_header')} breadcrumbs={breadcrumbs} />

            {/* Formulari d'Inscripció General */}
            <div className="container py-5 mt-4">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold">{t('tancats.list_title')}</h2>
                    <p className="lead">{t('tancats.list_subtitle')}</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bg-light p-5 rounded shadow">
                            <h3 className="text-center font-weight-bold mb-2">{t('gmmi.interest_form_title')}</h3>
                            <p className="text-center text-muted mb-4">{t('gmmi.interest_form_subtitle')}</p>

                            {status === 'success' ? (
                                <div className="alert alert-success text-center py-4">
                                    <h4><i className="fa fa-check-circle mr-2"></i>{t('contact.form.success')}</h4>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="hidden" name="_subject" value={`Interès Tancats: ${formData.name}`} />
                                    <input type="hidden" name="_captcha" value="false" />

                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="title">{t('gmmi.form_title')}</label>
                                            <input type="text" className="form-control" id="title" name="title" required value={formData.title} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="name">{t('gmmi.form_name')}</label>
                                            <input type="text" className="form-control" id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="fideId">{t('gmmi.form_fide')}</label>
                                            <input type="text" className="form-control" id="fideId" name="fideId" required value={formData.fideId} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="flag">{t('gmmi.form_flag')}</label>
                                            <input type="text" className="form-control" id="flag" name="flag" required value={formData.flag} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="elo">{t('gmmi.form_elo')}</label>
                                            <input type="number" className="form-control" id="elo" name="elo" required value={formData.elo} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label htmlFor="phone">{t('gmmi.form_phone')}</label>
                                            <input type="tel" className="form-control" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3 pl-4">
                                        <input type="checkbox" className="form-check-input" id="privacy" name="privacy" required />
                                        <label className="form-check-label text-muted" htmlFor="privacy">
                                            {t('contact.form.privacy')} <a href={t('contact.form.link')} target="_blank" rel="noopener noreferrer">{t('contact.form.policy')}</a>
                                        </label>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary px-5 py-3" disabled={status === 'sending'}>
                                            {status === 'sending' ? (
                                                <span><i className="fa fa-spinner fa-spin mr-2"></i> Enviant...</span>
                                            ) : (
                                                t('gmmi.form_submit')
                                            )}
                                        </button>
                                    </div>
                                    {status === 'error' && (
                                        <div className="mt-3 text-danger text-center">
                                            Hi ha hagut un error en enviar les dades. Si us plau, prova-ho més tard o envia un mail directament.
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <hr className="container mb-5" />

            {/* Graella de Tancats Anteriors */}
            <div className="container pb-5">
                <div className="text-center mb-5 mt-5">
                    <h2 className="font-weight-bold">{t('tancats.history_title')}</h2>
                    <p className="lead">{t('tancats.history_subtitle')}</p>
                </div>
                <div className="row">
                    {/* Tancat Setmana Santa 2026 */}
                    <div className="col-lg-4 mb-4">
                        <div className="card border-0 shadow rounded overflow-hidden h-100">
                            <img
                                src={posterImg}
                                className="card-img-top"
                                alt="Tancat Setmana Santa 2026"
                                style={{ height: '350px', objectFit: 'contain', backgroundColor: '#f8f9fa', padding: '10px' }}
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/2A769C/ffffff?text=Tancat+Setmana+Santa'; }}
                                loading="lazy"
                            />
                            <div className="card-body text-center d-flex flex-column justify-content-between">
                                <h4 className="font-weight-bold mb-3">{t('nav.gmmi')}</h4>
                                <p className="text-muted mb-4">{t('gmmi.intro_text').replace(/<[^>]*>/g, '')}</p>
                                <Link to="/tancats-setmana-santa-2026" className="btn btn-outline-primary mt-auto">{t('simultanies.read_more') || 'Descobreix-ho'}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
