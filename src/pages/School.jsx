import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SchoolForm from '../components/SchoolForm';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';

export default function School() {
    const { t, tHtml } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    const breadcrumbs = [{ label: t('nav.school') }];

    const faqItems = [
        { title: t('school.faq_q1'), content: t('school.faq_a1') },
        { title: t('school.faq_q2'), content: t('school.faq_a2') },
        { title: t('school.faq_q3'), content: t('school.faq_a3') },
        { title: t('school.faq_q4'), content: t('school.faq_a4') },
        { title: t('school.faq_q5'), content: t('school.faq_a5') },
    ];

    return (
        <>
            <SEO title={t('nav.school')} description={t('seo.school_description')} />
            <PageHeader title={t('nav.school')} breadcrumbs={breadcrumbs} />

            {/* Hero Section: School Levels */}
            <div className="container py-5" style={{ marginTop: '50px' }}>
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold">{t('school.title')}</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '800px' }} dangerouslySetInnerHTML={tHtml('school.subtitle')}></p>
                    
                    {/* Recent Success Highlight */}
                    <div className="mt-4 d-inline-block p-3 px-4 rounded-pill shadow-sm" style={{ backgroundColor: '#fff9e6', border: '1px solid #ffc107' }}>
                        <span className="h5 mb-0 text-dark">
                            <i className="fas fa-trophy text-primary mr-2"></i>
                            <strong>Èxit recent:</strong> Campions Sub-10 i Sub-20 a la Minicopa 2026! 🏆 
                            <Link to="/noticies/minicopa-territorial-lleida-2026" className="ml-2 text-primary font-weight-bold" style={{ textDecoration: 'underline' }}>Llegir més</Link>
                        </span>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div className="school-card h-100 d-flex flex-column gradient-primary text-white p-5 shadow">
                            <div className="mb-4">
                                <i className="fas fa-chess-pawn fa-4xl" style={{ fontSize: '4rem' }}></i>
                            </div>
                            <h3 className="display-4 mb-3 text-white font-weight-bold">{t('school.beginner_title')}</h3>
                            <p className="flex-grow-1 lead" dangerouslySetInnerHTML={tHtml('school.beginner_text')}></p>
                            <div className="mt-4">
                                <a href="#inscripcio" className="btn btn-lg btn-outline-light px-5 py-3 font-weight-bold">{t('school.btn_join')}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="school-card h-100 d-flex flex-column gradient-secondary text-white p-5 shadow">
                            <div className="mb-4">
                                <i className="fas fa-chess-knight fa-4xl" style={{ fontSize: '4rem' }}></i>
                            </div>
                            <h3 className="display-4 mb-3 text-white font-weight-bold">{t('school.advanced_title')}</h3>
                            <p className="flex-grow-1 lead" dangerouslySetInnerHTML={tHtml('school.advanced_text')}></p>
                            <div className="mt-4">
                                <Link to="/masterclass" className="btn btn-lg btn-outline-light px-5 py-3 font-weight-bold">{t('school.btn_masterclass')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-4 font-weight-bold text-primary">{t('school.values_title')}</h2>
                    </div>
                    <div className="row text-center g-4">
                        <div className="col-md-4">
                            <div className="value-item">
                                <i className="fas fa-brain value-icon"></i>
                                <h4 className="font-weight-bold mb-3">{t('school.val_concentration')}</h4>
                                <p>{t('school.val_concentration_text')}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="value-item">
                                <i className="fas fa-users value-icon"></i>
                                <h4 className="font-weight-bold mb-3">{t('school.val_companionship')}</h4>
                                <p>{t('school.val_companionship_text')}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="value-item">
                                <i className="fas fa-rocket value-icon"></i>
                                <h4 className="font-weight-bold mb-3">{t('school.val_improvement')}</h4>
                                <p>{t('school.val_improvement_text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Practical Info Section */}
            <div className="container my-5 py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h4 className="display-4 font-weight-bold text-primary mb-4">{t('school.info_title')}</h4>
                        <div className="info-card mb-3">
                            <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('school.price')}></p>
                        </div>
                        <div className="info-card mb-3">
                            <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('school.membership')}></p>
                        </div>
                        <div className="info-card mb-3 border-danger">
                            <p className="mb-0 h5 text-danger font-weight-bold">
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                {t('school.warning')}
                            </p>
                        </div>
                        <div className="mt-4">
                            <Link to="/federat" className="btn btn-primary btn-lg px-4 shadow-sm">
                                {t('school.more_info').replace(/<a.*?>|<\/a>/g, '')}
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <div className="position-relative d-inline-block">
                            <img src="/img/galeria/Minicopa2026/Fotogrup.webp" className="img-fluid rounded-xl shadow-lg" alt="Equip del Club d'Escacs Pardinyes a la Mini Copa 2026" style={{ maxHeight: '400px', borderRadius: '20px' }} width="600" height="400" loading="lazy" />
                            <div className="position-absolute shadow-sm bg-white p-3 rounded" style={{ bottom: '-20px', right: '-20px', maxWidth: '240px', border: '1px solid #ffc107' }}>
                                <p className="mb-0 font-weight-bold text-dark small">Projecte de base: El més fort de Lleida ciutat! 🦁</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white py-5 shadow-sm border-top border-bottom">
                <div className="container">
                    <div className="d-flex flex-column text-center mb-5">
                        <h4 className="text-primary font-weight-bold text-uppercase letter-spacing-1">{t('schedule.title')}</h4>
                        <h2 className="display-4 font-weight-bold">{t('schedule.subtitle')}</h2>
                    </div>
                    <div className="tab-class">
                        <ul className="nav nav-pills justify-content-center mb-5 gap-2">
                            <li className="nav-item">
                                <button className={`nav-link px-4 py-2 font-weight-bold ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{t('schedule.tab.all')}</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link px-4 py-2 font-weight-bold ${activeTab === 'beginner' ? 'active' : ''}`} onClick={() => setActiveTab('beginner')}>{t('schedule.tab.beginner')}</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link px-4 py-2 font-weight-bold ${activeTab === 'intermediate' ? 'active' : ''}`} onClick={() => setActiveTab('intermediate')}>{t('schedule.tab.intermediate')}</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link px-4 py-2 font-weight-bold ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>{t('schedule.tab.advanced')}</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link px-4 py-2 font-weight-bold ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>{t('schedule.tab.games')}</button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="class-all" className={`tab-pane fade ${activeTab === 'all' ? 'show active' : ''}`}>
                                <div className="table-responsive rounded shadow-sm">
                                    <table className="table table-bordered m-0 overflow-hidden">
                                        <thead className="bg-dark text-white text-center">
                                            <tr>
                                                <th className="py-3">{t('schedule.header.time')}</th>
                                                <th className="py-3">{t('schedule.header.mon')}</th>
                                                <th className="py-3">{t('schedule.header.tue')}</th>
                                                <th className="py-3">{t('schedule.header.wed')}</th>
                                                <th className="py-3">{t('schedule.header.thu')}</th>
                                                <th className="py-3">{t('schedule.header.fri')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center align-middle">
                                            <tr>
                                                <th className="bg-light font-weight-bold">18:30 - 19:30</th>
                                                <td className="table-level-games">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.free_play')}</h6>
                                                </td>
                                                <td className="table-level-intermediate">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.group.eso_bat')}</h6>
                                                    <small className="text-muted">{t('schedule.level.intermediate')}</small>
                                                </td>
                                                <td className="table-level-beginner">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.class.adults_primary')}</h6>
                                                    <small className="text-muted">{t('schedule.level.beginner')}</small>
                                                </td>
                                                <td></td>
                                                <td className="table-level-games">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.free_play')}</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light font-weight-bold">19:30 - 20:30</th>
                                                <td className="table-level-games">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.free_play')}</h6>
                                                </td>
                                                <td></td>
                                                <td className="table-level-intermediate">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.class.adults')}</h6>
                                                    <small className="text-muted">{t('schedule.level.intermediate')}</small>
                                                </td>
                                                <td></td>
                                                <td className="table-level-games">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.free_play')}</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light font-weight-bold">19:45 - 21:15</th>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="table-level-advanced">
                                                    <h6 className="mb-0 font-weight-bold">{t('schedule.class.adults')}</h6>
                                                    <small className="text-muted">{t('schedule.level.advanced')}</small>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div id="class-beginner" className={`tab-pane fade ${activeTab === 'beginner' ? 'show active' : ''}`}>
                                <div className="text-center py-5 bg-light rounded shadow-sm">
                                    <h5 className="font-weight-bold text-primary mb-3">{t('schedule.header.wed')}</h5>
                                    <h4 className="mb-2">18:30 - 19:30</h4>
                                    <p className="h5 mb-0">{t('schedule.class.adults_primary')} ({t('schedule.level.beginner')})</p>
                                </div>
                            </div>

                            <div id="class-intermediate" className={`tab-pane fade ${activeTab === 'intermediate' ? 'show active' : ''}`}>
                                <div className="row g-4 justify-content-center text-center">
                                    <div className="col-md-5">
                                        <div className="py-4 bg-light rounded shadow-sm">
                                            <h5 className="font-weight-bold text-primary mb-2">{t('schedule.header.tue')}</h5>
                                            <h4>18:30 - 19:30</h4>
                                            <p className="mb-0">{t('schedule.group.eso_bat')}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="py-4 bg-light rounded shadow-sm">
                                            <h5 className="font-weight-bold text-primary mb-2">{t('schedule.header.wed')}</h5>
                                            <h4>19:30 - 20:30</h4>
                                            <p className="mb-0">{t('schedule.class.adults')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="class-advanced" className={`tab-pane fade ${activeTab === 'advanced' ? 'show active' : ''}`}>
                                <div className="text-center py-5 bg-light rounded shadow-sm mx-auto" style={{maxWidth: '500px'}}>
                                    <h5 className="font-weight-bold text-primary mb-3">{t('schedule.header.thu')}</h5>
                                    <h4 className="mb-2">19:45 - 21:15</h4>
                                    <p className="h5 mb-0">{t('schedule.class.advanced')} ({t('schedule.level.advanced')})</p>
                                </div>
                            </div>

                            <div id="class-games" className={`tab-pane fade ${activeTab === 'games' ? 'show active' : ''}`}>
                                <div className="row g-4 justify-content-center text-center">
                                    <div className="col-md-4">
                                        <div className="py-4 bg-light rounded shadow-sm">
                                            <h5 className="font-weight-bold text-primary mb-2">{t('schedule.header.mon')} i {t('schedule.header.fri')}</h5>
                                            <h4>18:30 - 20:30</h4>
                                            <p className="mb-0">{t('schedule.free_play')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container py-5 faq-section">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold text-primary">{t('school.faq_title')}</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <Accordion id="schoolFaq" items={faqItems} />
                    </div>
                </div>
            </div>

            {/* Enrollment Form */}
            <div id="inscripcio" className="bg-light py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center mb-5">
                                <i className="fas fa-edit fa-3x text-primary mb-3"></i>
                                <h2 className="display-4 font-weight-bold">{t('school.enroll_title')}</h2>
                                <p className="text-muted">Uneix-te a la nostra escola i comença el teu camí cap a la mestria.</p>
                            </div>
                            <div className="shadow-lg rounded-xl overflow-hidden bg-white">
                                <SchoolForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
