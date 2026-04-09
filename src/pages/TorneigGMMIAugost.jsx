import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

// Placeholders for August 2026 assets (Replace with real paths once available)
const posterImg = 'https://placehold.co/600x800/2A769C/ffffff?text=COMING+SOON';

export default function TorneigGMMIAugost() {
    const { t, tHtml } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '', name: '', fideId: '', flag: '', elo: '', phone: ''
    });
    const [status, setStatus] = useState(null);

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

    const breadcrumbs = [
        { label: t('tancats.list_breadcrumb') || 'Tancats de GM i MI', path: '/tancats' },
        { label: t('gmmi_agost.breadcrumb') }
    ];

    return (
        <>
            <SEO title={t('gmmi_agost.breadcrumb')} description={t('gmmi_agost.intro_text').replace(/<[^>]*>/g, '')} />
            <PageHeader title={t('gmmi_agost.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('gmmi_agost.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src={posterImg}
                            alt="Cartell oficial del Torneig d'Agost"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=COMING+SOON' }}
                            loading="lazy"
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('gmmi_agost.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('gmmi_agost.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('gmmi_agost.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi_agost.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi_agost.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi_agost.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('gmmi_agost.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi_agost.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi_agost.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi_agost.fee')}></li>
                            </ul>

                            <h4 className="mt-4 mb-3"><i className="fa fa-trophy text-warning mr-2"></i>{t('gmmi_agost.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4 mb-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi_agost.trophies')}></li>
                            </ul>

                            {/* Formulari d'Inscripció / Reserva de Plaça */}
                            <div className="bg-light p-4 rounded shadow-sm border-left border-primary mt-5" style={{ borderWidth: '4px !important' }}>
                                <h4 className="font-weight-bold mb-2 text-primary">{t('gmmi.interest_form_title')}</h4>
                                <p className="text-muted mb-4">{t('gmmi.interest_form_subtitle')}</p>

                                {status === 'success' ? (
                                    <div className="alert alert-success text-center py-3">
                                        <h5><i className="fa fa-check-circle mr-2"></i>{t('contact.form.success')}</h5>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="_template" value="table" />
                                        <input type="hidden" name="_subject" value={`Reserva Tancats Agost: ${formData.name}`} />
                                        <input type="hidden" name="_captcha" value="false" />

                                        <div className="row">
                                            <div className="col-md-6 form-group small">
                                                <label htmlFor="title">{t('gmmi.form_title')}</label>
                                                <input type="text" className="form-control form-control-sm" id="title" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Ex: GM / MI / WGM / WMI" />
                                            </div>
                                            <div className="col-md-6 form-group small">
                                                <label htmlFor="name">{t('gmmi.form_name')}</label>
                                                <input type="text" className="form-control form-control-sm" id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group small">
                                                <label htmlFor="fideId">{t('gmmi.form_fide')}</label>
                                                <input type="text" className="form-control form-control-sm" id="fideId" name="fideId" required value={formData.fideId} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6 form-group small">
                                                <label htmlFor="elo">{t('gmmi.form_elo')}</label>
                                                <input type="number" className="form-control form-control-sm" id="elo" name="elo" required value={formData.elo} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 form-group small">
                                                <label htmlFor="phone">{t('gmmi.form_phone')}</label>
                                                <input type="tel" className="form-control form-control-sm" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block mt-2 font-weight-bold" disabled={status === 'sending'}>
                                            {status === 'sending' ? (
                                                <span><i className="fa fa-spinner fa-spin mr-2"></i> Enviant...</span>
                                            ) : (
                                                t('gmmi.form_submit')
                                            )}
                                        </button>
                                        {status === 'error' && (
                                            <div className="mt-2 text-danger small text-center">
                                                Error en enviar. Prova-ho més tard.
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}

            {/* Secció de Col·laboradors */}
            <div className="container pb-5 pt-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.collab_title')}</h3>
                <p className="text-center mb-5 lead">{t('gmmi.collab_text')}</p>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/orvepard.webp" alt="ORVEPARD" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/logopaeria-color.webp" alt="La Paeria - Ajuntament de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/diputaciolleida.webp" alt="Diputació de Lleida" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
                </div>
            </div>

            {/* Crònica i Galeria */}
            <div className="container pb-5">
                <hr className="mb-5" />
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi_agost.report_title')}</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi_agost.report_p1')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi_agost.report_p2')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi_agost.report_p3')}></p>
                    </div>
                </div>
            </div>
            {/* Fi Crònica i Galeria */}

            {/* Modal d'Imatge Ampliada */}
            {selectedImage && (
                <div 
                    className="d-flex justify-content-center align-items-center" 
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.85)', cursor: 'zoom-out' }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="position-relative" style={{ maxWidth: '90%', maxHeight: '90%' }}>
                        <button 
                            className="position-absolute" 
                            style={{ top: '-40px', right: '0', fontSize: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                            onClick={() => setSelectedImage(null)}
                            aria-label="Tancar"
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Imatge ampliada" 
                            style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} 
                            className="rounded shadow-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
