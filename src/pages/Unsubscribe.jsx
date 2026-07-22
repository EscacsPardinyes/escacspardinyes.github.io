import { useLanguage } from '../context/LanguageContext';
import UnsubscribeForm from '../components/UnsubscribeForm';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Unsubscribe() {
    const { t } = useLanguage();

    const breadcrumbs = [{ label: t('unsubscribe.title') }];

    return (
        <>
            <SEO title={t('unsubscribe.title')} description={t('unsubscribe.subtitle')} />
            <PageHeader title={t('unsubscribe.title')} breadcrumbs={breadcrumbs} />

            <div className="bg-light section-padding" style={{ minHeight: '80vh' }}>
                <div className="container" style={{ marginTop: '50px' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center mb-5">
                                <div className="mb-4 d-inline-block p-4 rounded-circle gradient-primary text-white shadow">
                                    <i className="fas fa-envelope-open-text fa-3x"></i>
                                </div>
                                <h2 className="display-4 font-weight-bold mb-3">{t('unsubscribe.title')}</h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                                    {t('unsubscribe.subtitle')}
                                </p>
                            </div>
                            
                            <div className="shadow-lg overflow-hidden bg-white" style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <UnsubscribeForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
