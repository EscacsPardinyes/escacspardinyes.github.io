import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import Accordion from '../components/Accordion';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

const STEPS = [
    { icon: 'flaticon-form', key: 'step1' },
    { icon: 'flaticon-payment', key: 'step2' },
    { icon: 'flaticon-success', key: 'step3' },
];

const FEES = ['fee_16_plus', 'fee_16_20', 'fee_65_plus', 'fee_disabled', 'fee_disabled_65', 'fee_16_minus', 'fee_14_minus', 'fee_10_minus'];

export default function Federat() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('nav.federated') }];
    const faqItems = [1, 2, 3, 4, 5].map(n => ({ title: t(`federated.faq_q${n}`), content: t(`federated.faq_a${n}`) }));

    return (
        <>
            <SEO title={t('seo.federated_title')} description={t('seo.federated_description')} faq={faqItems.map(i => ({ question: i.title, answer: i.content }))} />
            <PageHeader title={t('federated.header')} breadcrumbs={breadcrumbs} />

            {/* Com federar-me */}
            <div className="container text-center my-5 federat-steps">
                <h2 className="font-weight-bold text-primary mb-5">{t('federated.title')}</h2>
                <div className="row">
                    {STEPS.map(({ icon, key }) => (
                        <div className="col-md-4 mb-4 mb-md-0" key={key}>
                            <div className="step-card">
                                <i className={`${icon} step-icon`}></i>
                                <h5>{t(`federated.${key}_title`)}</h5>
                                <p>{t(`federated.${key}_text`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container my-5 federat-info">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold text-primary">{t('federated.why_title')}</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '760px' }}>{t('federated.why_text')}</p>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="panel-card h-100">
                            <h3 className="text-primary">{t('federated.benefits_title')}</h3>
                            <ul className="check-list">
                                <li dangerouslySetInnerHTML={tHtml('federated.benefit_1')}></li>
                                <li dangerouslySetInnerHTML={tHtml('federated.benefit_2')}></li>
                                <li>{t('federated.benefit_3')}</li>
                                <li>{t('federated.benefit_4')}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="panel-card h-100">
                            <h3 className="text-primary">{t('federated.fees_title')}</h3>
                            <p>{t('federated.fees_text')}</p>
                            <ul className="fee-list">
                                {FEES.map((fee) => (
                                    <li key={fee} dangerouslySetInnerHTML={tHtml(`federated.${fee}`)}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-center text-muted">{t('federated.soci_option')}</p>

                <div className="panel-card callout-card mt-5 text-center">
                    <h3 className="text-primary">{t('federated.req_title')}</h3>
                    <p className="mb-4">{t('federated.req_text')}</p>
                    <Link to="/contact" className="btn btn-primary btn-lg px-5">{t('federated.btn_join')}</Link>
                </div>
            </div>

            {/* FAQ Start */}
            <div className="container mt-5">
                <h4 className="font-weight-bold text-primary mb-4 text-center">{t('federated.faq_title')}</h4>
                <Accordion id="federatFaq" items={faqItems} />
            </div>
            {/* FAQ End */}
        </>
    );
}
