import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SchoolForm from '../components/SchoolForm';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import ScheduleTable from '../components/ScheduleTable';

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

    const seoFaq = faqItems.map(item => ({
        question: item.title,
        answer: item.content
    }));

    return (
        <>
            <SEO title={t('nav.school')} description={t('seo.school_description')} faq={seoFaq} />
            <PageHeader title={t('nav.school')} breadcrumbs={breadcrumbs} />

            <div className="container py-5" style={{ marginTop: '20px' }}>
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-3">{t('school.title')}</h2>
                    <p className="lead mx-auto mb-4" style={{ maxWidth: '800px' }} dangerouslySetInnerHTML={tHtml('school.subtitle')}></p>
                </div>

                <div className="row g-5">
                    {/* LEFT COLUMN: Info & Schedule */}
                    <div className="col-lg-7">
                        
                        {/* Success Badge */}
                        <div className="success-badge mb-5 p-3 rounded" style={{ background: 'rgba(255, 193, 7, 0.15)', border: '1px solid #ffc107' }}>
                            <span className="h6 mb-0 text-dark d-flex align-items-center flex-wrap justify-content-center">
                                <i className="fas fa-trophy text-warning mr-2 animate-pulse"></i>
                                <strong>Èxit recent:</strong>&nbsp;Campions Sub-10 i Sub-20 a la Minicopa 2026! 🏆 
                                <Link to="/noticies/minicopa-territorial-lleida-2026" className="ml-2 text-primary font-weight-bold" style={{ textDecoration: 'underline' }}>Llegir més</Link>
                            </span>
                        </div>

                        {/* Practical Info (Prices) */}
                        <div className="mb-5">
                            <h4 className="font-weight-bold text-primary mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>{t('school.info_title')}</h4>
                            <div className="d-flex flex-column gap-3">
                                <div className="info-card shadow-sm p-4 bg-white rounded border-left-primary" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                    <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('school.price')}></p>
                                </div>
                                <div className="info-card shadow-sm p-4 bg-white rounded border-left-primary" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                    <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('school.membership')}></p>
                                </div>
                                <div className="info-card shadow-sm p-4 rounded" style={{ background: 'rgba(220, 53, 69, 0.05)', borderLeft: '4px solid #dc3545' }}>
                                    <p className="mb-0 h6 text-danger font-weight-bold">
                                        <i className="fas fa-exclamation-triangle mr-2"></i>
                                        {t('school.warning')}
                                        <Link to="/federat" className="ml-2 text-danger" style={{textDecoration: 'underline'}}>Més info</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="mb-5">
                            <div className="d-flex flex-column mb-4">
                                <h4 className="text-primary font-weight-bold text-uppercase" style={{ letterSpacing: '1px' }}>{t('schedule.title')}</h4>
                                <h3 className="h2 font-weight-bold">{t('schedule.subtitle')}</h3>
                            </div>
                            <div className="tab-class">
                                <ul className="nav nav-pills mb-4 gap-2 flex-wrap">
                                    <li className="nav-item">
                                        <button className={`nav-link px-3 py-2 font-weight-bold ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{t('schedule.tab.all')}</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link px-3 py-2 font-weight-bold ${activeTab === 'beginner' ? 'active' : ''}`} onClick={() => setActiveTab('beginner')}>{t('schedule.tab.beginner')}</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link px-3 py-2 font-weight-bold ${activeTab === 'intermediate' ? 'active' : ''}`} onClick={() => setActiveTab('intermediate')}>{t('schedule.tab.intermediate')}</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link px-3 py-2 font-weight-bold ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>{t('schedule.tab.advanced')}</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link px-3 py-2 font-weight-bold ${activeTab === 'games' ? 'active' : ''}`} onClick={() => setActiveTab('games')}>{t('schedule.tab.games')}</button>
                                    </li>
                                </ul>
                                <div className="tab-content shadow-sm rounded overflow-hidden bg-white">
                                    <ScheduleTable activeTab={activeTab} />
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-5">
                            <h4 className="text-primary font-weight-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>{t('school.faq_title')}</h4>
                            <Accordion id="schoolFaq" items={faqItems} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Form */}
                    <div className="col-lg-5">
                        <div className="sticky-top" style={{ top: '120px', zIndex: 10 }}>
                            <div className="shadow-lg overflow-hidden bg-white" style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <div className="bg-primary text-white text-center p-4">
                                    <i className="fas fa-edit fa-2x mb-2"></i>
                                    <h3 className="font-weight-bold mb-0">{t('school.enroll_title')}</h3>
                                </div>
                                <div className="p-4 bg-light">
                                    <SchoolForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
