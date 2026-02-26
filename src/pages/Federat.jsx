import { useLanguage } from '../context/LanguageContext';
import Accordion from '../components/Accordion';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Federat() {
    const { t, tHtml } = useLanguage();
    const breadcrumbs = [{ label: t('nav.federated') }];

    return (
        <>
            <SEO title={t('nav.federated')} description={t('seo.federated_description')} />
            <PageHeader title={t('federated.header')} breadcrumbs={breadcrumbs} />

            {/* Com federar-me */}
            <div className="container text-center my-5">
                <h2 className="font-weight-bold text-primary mb-4">{t('federated.title')}</h2>
                <div className="row">
                    <div className="col-md-4">
                        <i className="flaticon-form display-4 text-primary mb-3"></i>
                        <h5>{t('federated.step1_title')}</h5>
                        <p>{t('federated.step1_text')}</p>
                    </div>
                    <div className="col-md-4">
                        <i className="flaticon-payment display-4 text-primary mb-3"></i>
                        <h5>{t('federated.step2_title')}</h5>
                        <p>{t('federated.step2_text')}</p>
                    </div>
                    <div className="col-md-4">
                        <i className="flaticon-success display-4 text-primary mb-3"></i>
                        <h5>{t('federated.step3_title')}</h5>
                        <p>{t('federated.step3_text')}</p>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <div className="text-center mb-4">
                    <h2 className="font-weight-bold text-primary">{t('federated.why_title')}</h2>
                    <p>{t('federated.why_text')}</p>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <h4 className="text-primary">{t('federated.benefits_title')}</h4>
                        <ul>
                            <li dangerouslySetInnerHTML={tHtml('federated.benefit_1')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.benefit_2')}></li>
                            <li>{t('federated.benefit_3')}</li>
                            <li>{t('federated.benefit_4')}</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-primary">{t('federated.fees_title')}</h4>
                        <p>{t('federated.fees_text')}</p>

                        <ul>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_16_plus')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_65_plus')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_disabled')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_disabled_65')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_16_minus')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_14_minus')}></li>
                            <li dangerouslySetInnerHTML={tHtml('federated.fee_10_minus')}></li>
                        </ul>

                    </div>
                </div>
                <p>{t('federated.soci_option')}</p>

                <div className="mt-5 text-center">
                    <h4 className="text-primary">{t('federated.req_title')}</h4>
                    <p>{t('federated.req_text')}</p>
                </div>

                <div className="text-center mt-4">
                    <Link to="/contact" className="btn btn-primary btn-lg px-5">{t('federated.btn_join')}</Link>
                </div>
            </div>

            {/* FAQ Start */}
            <div className="container mt-5">
                <h4 className="font-weight-bold text-primary mb-4 text-center">{t('federated.faq_title')}</h4>
                <Accordion id="federatFaq" items={[
                    { title: t('federated.faq_q1'), content: t('federated.faq_a1') },
                    { title: t('federated.faq_q2'), content: t('federated.faq_a2') },
                    { title: t('federated.faq_q3'), content: t('federated.faq_a3') },
                    { title: t('federated.faq_q4'), content: t('federated.faq_a4') },
                    { title: t('federated.faq_q5'), content: t('federated.faq_a5') },
                ]} />
            </div>
            {/* FAQ End */}
        </>
    );
}
