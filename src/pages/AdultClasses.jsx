import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import Accordion from '../components/Accordion';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

// Landing page for "classes d'escacs per a adults a Lleida" searches.
// Times and prices must match ScheduleTable.jsx and the school.* translations.
const levels = [
    { key: 'beginner', icon: 'fa-chess-pawn', time: 'adults.level_beginner_time' },
    { key: 'intermediate', icon: 'fa-chess-knight', time: 'adults.level_intermediate_time' },
    { key: 'advanced', icon: 'fa-chess-queen', time: 'adults.level_advanced_time' }
];

export default function AdultClasses() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('nav.school'), path: '/school' }, { label: t('adults.breadcrumb') }];

    const faqItems = [1, 2, 3, 4, 5].map(n => ({ title: t(`adults.faq_q${n}`), content: t(`adults.faq_a${n}`) }));

    return (
        <>
            <SEO
                title={t('seo.adults_title')}
                description={t('seo.adults_description')}
                breadcrumbs={breadcrumbs}
                faq={faqItems.map(item => ({ question: item.title, answer: item.content }))}
            />
            <PageHeader title={t('adults.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-3">{t('adults.title')}</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '800px' }} dangerouslySetInnerHTML={tHtml('adults.intro')}></p>
                </div>

                {/* Levels */}
                <div className="row mb-5">
                    {levels.map(level => (
                        <div key={level.key} className="col-md-4 mb-4">
                            <div className="h-100 shadow-sm p-4 bg-white rounded" style={{ borderTop: '4px solid var(--primary-color)' }}>
                                <i className={`fas ${level.icon} fa-2x text-primary mb-3`} aria-hidden="true"></i>
                                <h3 className="h4 font-weight-bold">{t(`adults.level_${level.key}_title`)}</h3>
                                <p className="font-weight-bold text-primary mb-2">
                                    <i className="far fa-clock mr-2" aria-hidden="true"></i>{t(level.time)}
                                </p>
                                <p className="mb-0">{t(`adults.level_${level.key}_text`)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mb-5">
                    {/* Why chess as an adult */}
                    <div className="col-lg-6 mb-4">
                        <h2 className="h3 font-weight-bold text-primary mb-4">{t('adults.why_title')}</h2>
                        <ul className="list-unstyled">
                            {[1, 2, 3, 4].map(n => (
                                <li key={n} className="mb-3 d-flex">
                                    <i className="fas fa-check text-primary mr-3 mt-1" aria-hidden="true"></i>
                                    <span dangerouslySetInnerHTML={tHtml(`adults.why_${n}`)}></span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Prices and practical info */}
                    <div className="col-lg-6 mb-4">
                        <h2 className="h3 font-weight-bold text-primary mb-4">{t('adults.info_title')}</h2>
                        <div className="d-flex flex-column gap-3">
                            <div className="shadow-sm p-4 bg-white rounded" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('adults.price')}></p>
                            </div>
                            <div className="shadow-sm p-4 bg-white rounded" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('adults.trial')}></p>
                            </div>
                            <div className="shadow-sm p-4 bg-white rounded" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                                <p className="mb-0 h5" dangerouslySetInnerHTML={tHtml('adults.place')}></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-5">
                    <Link to="/school" className="btn btn-primary btn-lg px-5 mr-sm-3 mb-3">{t('adults.btn_enroll')}</Link>
                    <a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-lg px-5 mb-3">
                        <i className="fab fa-whatsapp mr-2" aria-hidden="true"></i>{t('adults.btn_whatsapp')}
                    </a>
                    <p className="mt-2">
                        <Link to="/on-jugar-escacs-lleida">{t('adults.link_where')}</Link>
                    </p>
                </div>

                <div className="mb-5">
                    <h2 className="h3 font-weight-bold text-primary mb-4">{t('adults.faq_title')}</h2>
                    <Accordion id="adultsFaq" items={faqItems} />
                </div>
            </div>
        </>
    );
}
