import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import Accordion from '../components/Accordion';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

// Landing page for schools and parents' associations (AMPA) looking for chess
// as an extracurricular activity in Lleida.
const services = [
    { key: 'weekly', icon: 'fa-calendar-alt' },
    { key: 'tournament', icon: 'fa-trophy' },
    { key: 'workshop', icon: 'fa-chess-board' }
];

const MAIL_SUBJECT = encodeURIComponent('Extraescolar d\'escacs');

export default function SchoolsProgram() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('schools.breadcrumb') }];

    const faqItems = [1, 2, 3, 4, 5].map(n => ({ title: t(`schools.faq_q${n}`), content: t(`schools.faq_a${n}`) }));

    return (
        <>
            <SEO
                title={t('seo.schools_title')}
                description={t('seo.schools_description')}
                breadcrumbs={breadcrumbs}
                faq={faqItems.map(item => ({ question: item.title, answer: item.content }))}
            />
            <PageHeader title={t('schools.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-3">{t('schools.title')}</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '800px' }} dangerouslySetInnerHTML={tHtml('schools.intro')}></p>
                </div>

                {/* What we offer */}
                <div className="row mb-5">
                    {services.map(service => (
                        <div key={service.key} className="col-md-4 mb-4">
                            <div className="h-100 shadow-sm p-4 bg-white rounded" style={{ borderTop: '4px solid var(--primary-color)' }}>
                                <i className={`fas ${service.icon} fa-2x text-primary mb-3`} aria-hidden="true"></i>
                                <h3 className="h4 font-weight-bold">{t(`schools.${service.key}_title`)}</h3>
                                <p className="mb-0">{t(`schools.${service.key}_text`)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mb-5">
                    {/* Benefits for students */}
                    <div className="col-lg-6 mb-4">
                        <h2 className="h3 font-weight-bold text-primary mb-4">{t('schools.why_title')}</h2>
                        <ul className="list-unstyled">
                            {[1, 2, 3, 4].map(n => (
                                <li key={n} className="mb-3 d-flex">
                                    <i className="fas fa-check text-primary mr-3 mt-1" aria-hidden="true"></i>
                                    <span dangerouslySetInnerHTML={tHtml(`schools.why_${n}`)}></span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/noticies/beneficis-escacs-nens" className="font-weight-bold">{t('schools.link_benefits')} →</Link>
                    </div>

                    {/* Experience */}
                    <div className="col-lg-6 mb-4">
                        <h2 className="h3 font-weight-bold text-primary mb-4">{t('schools.experience_title')}</h2>
                        <ul className="list-unstyled">
                            {[1, 2, 3].map(n => (
                                <li key={n} className="mb-3 d-flex">
                                    <i className="fas fa-star text-primary mr-3 mt-1" aria-hidden="true"></i>
                                    <span dangerouslySetInnerHTML={tHtml(`schools.experience_${n}`)}></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="shadow-sm p-4 mb-5 rounded text-center" style={{ background: 'rgba(255, 193, 7, 0.15)', border: '1px solid #ffc107' }}>
                    <h2 className="h4 font-weight-bold mb-3">{t('schools.cta_title')}</h2>
                    <p className="mx-auto" style={{ maxWidth: '700px' }}>{t('schools.cta_text')}</p>
                    <a href={`mailto:escacspardinyes@gmail.com?subject=${MAIL_SUBJECT}`} className="btn btn-primary mr-sm-3 mb-2">
                        <i className="fa fa-envelope mr-2" aria-hidden="true"></i>{t('schools.btn_email')}
                    </a>
                    <a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mb-2">
                        <i className="fab fa-whatsapp mr-2" aria-hidden="true"></i>{t('adults.btn_whatsapp')}
                    </a>
                </div>

                <div className="mb-5">
                    <h2 className="h3 font-weight-bold text-primary mb-4">{t('schools.faq_title')}</h2>
                    <Accordion id="schoolsFaq" items={faqItems} />
                </div>
            </div>
        </>
    );
}
