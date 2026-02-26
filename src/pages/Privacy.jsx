import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Privacy() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            <SEO title={t('privacy.header')} />
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('privacy.header')}</h1>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contingut de la Política de Privacitat */}
            <div className="privacy-container" style={{
                maxWidth: '800px',
                margin: '40px auto',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                lineHeight: '1.6'
            }}>
                <h1 style={{ fontSize: '2em', color: '#E31C25', textAlign: 'center', marginBottom: '20px' }}>{t('privacy.title')}</h1>

                <p>{t('privacy.intro')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.identity_title')}</h2>
                <p dangerouslySetInnerHTML={tHtml('privacy.identity_text')}></p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.purpose_title')}</h2>
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('privacy.purpose_clients')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('privacy.purpose_potential')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('privacy.purpose_employees')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('privacy.purpose_providers')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('privacy.purpose_surveillance')}></li>
                </ul>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.legitimation_title')}</h2>
                <p>{t('privacy.legitimation_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.rights_title')}</h2>
                <p>{t('privacy.rights_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.conservation_title')}</h2>
                <p>{t('privacy.conservation_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.recipients_title')}</h2>
                <p>{t('privacy.recipients_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.transfers_title')}</h2>
                <p>{t('privacy.transfers_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.security_title')}</h2>
                <p>{t('privacy.security_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.violations_title')}</h2>
                <p>{t('privacy.violations_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('privacy.more_info_title')}</h2>
                <p dangerouslySetInnerHTML={tHtml('privacy.more_info_text')}></p>
            </div>
        </>
    );
}
