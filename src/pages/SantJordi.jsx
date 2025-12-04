import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function SantJordi() {
    const { t, tHtml } = useLanguage();

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('santjordi.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('santjordi.breadcrumb')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Inici Secció Jornada Sant@ Jordi/na */}
            <div className="container py-5">
                <div className="text-center mb-4">
                    <h2 className="font-weight-bold text-primary">{t('santjordi.title')}</h2>
                    <p>{t('santjordi.p1')}</p>
                    <p dangerouslySetInnerHTML={tHtml('santjordi.p2')}></p>
                    <p dangerouslySetInnerHTML={tHtml('santjordi.p3')}></p>
                    <p dangerouslySetInnerHTML={tHtml('santjordi.p4')}></p>
                    <p>{t('santjordi.p5')}</p>
                </div>

                {/* Note: The original HTML didn't actually have the gallery images in the provided snippet, 
              but the text describes a gallery. I'll leave a placeholder for images if they were intended. 
              If the user provides images later, they can be added here. */}
            </div>
        </>
    );
}
