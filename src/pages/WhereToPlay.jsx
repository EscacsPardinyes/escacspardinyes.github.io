import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import Accordion from '../components/Accordion';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

// Evergreen guide for "on jugar a escacs a Lleida" / "dónde jugar al ajedrez en Lleida".
// Each section links to the club page that covers it in depth.
const sections = [
    { key: 'club', icon: 'fa-chess-board', link: '/contact' },
    { key: 'classes', icon: 'fa-graduation-cap', link: '/school' },
    { key: 'tournaments', icon: 'fa-trophy', link: '/torneig-festa-major' },
    { key: 'league', icon: 'fa-users', link: '/federat' },
    { key: 'online', icon: 'fa-laptop', link: '/elo-calculator' }
];

export default function WhereToPlay() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('where.breadcrumb') }];

    const faqItems = [1, 2, 3, 4, 5].map(n => ({ title: t(`where.faq_q${n}`), content: t(`where.faq_a${n}`) }));

    return (
        <>
            <SEO
                title={t('seo.where_title')}
                description={t('seo.where_description')}
                breadcrumbs={breadcrumbs}
                faq={faqItems.map(item => ({ question: item.title, answer: item.content }))}
            />
            <PageHeader title={t('where.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5" style={{ maxWidth: '900px' }}>
                <h2 className="font-weight-bold mb-3">{t('where.title')}</h2>
                <p className="lead mb-5" dangerouslySetInnerHTML={tHtml('where.intro')}></p>

                {sections.map(section => (
                    <section key={section.key} className="mb-5">
                        <h2 className="h3 font-weight-bold text-primary mb-3">
                            <i className={`fas ${section.icon} mr-3`} aria-hidden="true"></i>{t(`where.${section.key}_title`)}
                        </h2>
                        <p dangerouslySetInnerHTML={tHtml(`where.${section.key}_text`)}></p>
                        <Link to={section.link} className="font-weight-bold">{t(`where.${section.key}_link`)} →</Link>
                    </section>
                ))}

                <div className="shadow-sm p-4 mb-5 rounded" style={{ background: 'rgba(255, 193, 7, 0.15)', border: '1px solid #ffc107' }}>
                    <h2 className="h4 font-weight-bold mb-3">{t('where.cta_title')}</h2>
                    <p dangerouslySetInnerHTML={tHtml('where.cta_text')}></p>
                    <Link to="/classes-escacs-adults-lleida" className="btn btn-primary mr-sm-3 mb-2">{t('where.cta_adults')}</Link>
                    <a href="https://wa.me/34641915266" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mb-2">
                        <i className="fab fa-whatsapp mr-2" aria-hidden="true"></i>{t('adults.btn_whatsapp')}
                    </a>
                </div>

                <h2 className="h3 font-weight-bold text-primary mb-4">{t('where.faq_title')}</h2>
                <Accordion id="whereFaq" items={faqItems} />
            </div>
        </>
    );
}
