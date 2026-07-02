import { useLanguage } from '../context/LanguageContext';
import EnquestaForm from '../components/EnquestaForm';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function Enquesta() {
    const { t } = useLanguage();

    const breadcrumbs = [{ label: t('enquesta.title') }];

    return (
        <>
            <SEO title={t('enquesta.title')} description={t('enquesta.subtitle')} />
            <PageHeader title={t('enquesta.title')} breadcrumbs={breadcrumbs} />

            <div className="bg-light section-padding" style={{ minHeight: '80vh' }}>
                <div className="container" style={{ marginTop: '50px' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center mb-5">
                                <div className="mb-4 d-inline-block p-4 rounded-circle gradient-primary text-white shadow">
                                    <i className="fas fa-clipboard-list fa-3x"></i>
                                </div>
                                <h2 className="display-4 font-weight-bold mb-3">{t('enquesta.title')}</h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                                    {t('enquesta.subtitle')}
                                </p>
                            </div>
                            
                            <div className="shadow-lg overflow-hidden bg-white" style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <EnquestaForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
