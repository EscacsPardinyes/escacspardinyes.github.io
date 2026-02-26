import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Cookies() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            <SEO title={t('cookies.header')} />
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('cookies.header')}</h1>
                </div>
            </div>
            {/* Page Header End */}

            {/* Contingut de la Política de Cookies */}
            <div className="cookie-container" style={{
                maxWidth: '800px',
                margin: '40px auto',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                lineHeight: '1.6'
            }}>
                <h1 style={{ fontSize: '2em', color: '#E31C25', textAlign: 'center', marginBottom: '20px' }}>{t('cookies.title')}</h1>

                <p>{t('cookies.intro')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('cookies.what_are_title')}</h2>
                <p>{t('cookies.what_are_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('cookies.types_title')}</h2>
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('cookies.type_necessary')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('cookies.type_preferences')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('cookies.type_statistics')}></li>
                    <li style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={tHtml('cookies.type_marketing')}></li>
                </ul>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('cookies.manage_title')}</h2>
                <p>{t('cookies.manage_text')}</p>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('cookies.browser_title')}</h2>
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                    <li style={{ marginBottom: '8px' }}><a href="https://support.google.com/chrome/answer/95647?hl=ca" target="_blank" rel="noopener noreferrer" style={{ color: '#E31C25', textDecoration: 'none' }}>Google Chrome</a></li>
                    <li style={{ marginBottom: '8px' }}><a href="https://support.mozilla.org/ca/kb/activar-desactivar-cookies-preferencies" target="_blank" rel="noopener noreferrer" style={{ color: '#E31C25', textDecoration: 'none' }}>Mozilla Firefox</a></li>
                    <li style={{ marginBottom: '8px' }}><a href="https://support.microsoft.com/ca-es/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" style={{ color: '#E31C25', textDecoration: 'none' }}>Internet Explorer</a></li>
                    <li style={{ marginBottom: '8px' }}><a href="https://support.apple.com/ca-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: '#E31C25', textDecoration: 'none' }}>Safari</a></li>
                    <li style={{ marginBottom: '8px' }}><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" style={{ color: '#E31C25', textDecoration: 'none' }}>Opera</a></li>
                </ul>

                <h2 style={{ fontSize: '1.5em', color: '#111111', marginTop: '20px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' }}>{t('cookies.more_info_title')}</h2>
                <p dangerouslySetInnerHTML={tHtml('cookies.more_info_text')}></p>
            </div>
        </>
    );
}
