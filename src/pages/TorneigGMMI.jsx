import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function TorneigGMMI() {
    const { t, tHtml } = useLanguage();
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        fideId: '',
        flag: '',
        elo: '',
        phone: ''
    });
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const breadcrumbs = [
        { label: t('gmmi.breadcrumb') }
    ];

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
                method: "POST",
                body: formDataToSend
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
                setFormData({
                    title: '',
                    name: '',
                    fideId: '',
                    flag: '',
                    elo: '',
                    phone: ''
                });
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
            <SEO title={t('gmmi.breadcrumb')} description={t('gmmi.intro_text').replace(/<[^>]*>/g, '')} />
            <PageHeader title={t('gmmi.header')} breadcrumbs={breadcrumbs} />

            {/* Contingut Principal del Torneig */}
            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{t('gmmi.title')}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                        <img src="/img/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.png"
                            alt="Cartell oficial del Torneig de GM i MI"
                            className="img-fluid rounded shadow"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/2A769C/ffffff?text=CARTEL+TORNEIG+ESCASCS' }}
                            loading="lazy"
                        />
                    </div>

                    <div className="col-lg-6">
                        <div className="text-left">
                            <h3 className="mb-3">{t('gmmi.details_title')}</h3>

                            <p dangerouslySetInnerHTML={tHtml('gmmi.intro_text')}></p>

                            <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{t('gmmi.info_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.date')}></span></li>
                                <li><i className="fa fa-clock text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.time')}></span></li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><span dangerouslySetInnerHTML={tHtml('gmmi.location')}></span></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{t('gmmi.rules_title')}</h4>
                            <ul className="list-unstyled ml-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.format')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.rhythm')}></li>
                                <li dangerouslySetInnerHTML={tHtml('gmmi.fee')}></li>
                            </ul>

                            <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{t('gmmi.trophies_title')}</h4>
                            <ul className="list-unstyled ml-4 mb-4">
                                <li dangerouslySetInnerHTML={tHtml('gmmi.trophies')}></li>
                            </ul>

                            {/* Enllaços Chess-Results */}
                            <h4 className="mt-4 mb-3"><i className="fa fa-link text-info mr-2"></i>Chess-Results</h4>
                            <div className="d-flex flex-column mb-4">
                                <a href="https://s1.chess-results.com/tnr1342523.aspx?lan=9"
                                    className="btn btn-outline-info mb-2 text-left"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-external-link-alt mr-2"></i>{t('gmmi.btn_gm')}
                                </a>
                                <a href="https://s1.chess-results.com/tnr1358939.aspx?lan=9"
                                    className="btn btn-outline-info text-left"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-external-link-alt mr-2"></i>{t('gmmi.btn_mi')}
                                </a>
                            </div>

                            <div className="d-flex flex-column flex-md-row mt-4">
                                <a href="/img/Setmana Santa 2026/CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.pdf"
                                    className="btn btn-primary mr-md-3 mb-3 mb-md-0 px-4 py-2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-download mr-2"></i>{t('gmmi.btn_bases')}
                                </a>
                                <a href="/img/Setmana Santa 2026/PRECIOS CERRADOS DE GM Y MI SEMANA SANTA 2026 DEL CLUB ESCACS DE PARDINYES.pdf"
                                    className="btn btn-secondary px-4 py-2"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <i className="fa fa-download mr-2"></i>{t('gmmi.btn_preus')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fi del Contingut Principal del Torneig */}

            {/* Formulario de Interés */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="bg-white p-5 rounded shadow">
                                <h3 className="text-center font-weight-bold mb-2">{t('gmmi.interest_form_title')}</h3>
                                <p className="text-center text-muted mb-4">{t('gmmi.interest_form_subtitle')}</p>

                                {status === 'success' ? (
                                    <div className="alert alert-success text-center py-4">
                                        <h4><i className="fa fa-check-circle mr-2"></i>{t('contact.form.success')}</h4>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {/* Configuration */}
                                        <input type="hidden" name="_template" value="table" />
                                        <input type="hidden" name="_subject" value={`Interès Tancats 2026: ${formData.name}`} />
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
            </div>

            {/* Secció de Col·laboradors */}
            <div className="container pb-5 pt-5">
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.collab_title')}</h3>
                <p className="text-center mb-5 lead">{t('gmmi.collab_text')}</p>
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col-6 col-md-4 col-lg-3 mb-4">
                        <img src="/img/Setmana Santa 2026/logo-barcelona.jpeg" alt="Club d'Escacs Barcelona" className="img-fluid" style={{ maxHeight: '120px' }} loading="lazy" />
                    </div>
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
                <h3 className="text-center font-weight-bold mb-4">{t('gmmi.report_title')}</h3>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p1')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p2')}></p>
                        <p className="text-justify" dangerouslySetInnerHTML={tHtml('gmmi.report_p3')}></p>
                    </div>
                </div>

                <h3 className="text-center font-weight-bold mb-4 mt-5">{t('gmmi.gallery_title')}</h3>
                <div className="row justify-content-center">
                    <p className="text-muted">{t('gmmi.gallery_placeholder')}</p>
                </div>
            </div>
            {/* Fi Crònica i Galeria */}
        </>
    );
}
