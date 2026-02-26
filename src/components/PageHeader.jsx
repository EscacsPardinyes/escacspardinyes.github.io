import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * Reusable PageHeader component
 * @param {Object} props
 * @param {string} props.title - The main title of the header
 * @param {Array} props.breadcrumbs - Array of { label: string, path?: string }
 */
export default function PageHeader({ title, breadcrumbs = [] }) {
    const { t } = useLanguage();

    return (
        <div className="container-fluid page-header mb-5">
            <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{title}</h1>
                <div className="d-inline-flex">
                    <p className="m-0 text-white">
                        <Link className="text-white" to="/">{t('nav.home')}</Link>
                    </p>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} className="d-flex align-items-center">
                            <p className="m-0 text-white px-2">/</p>
                            {crumb.path ? (
                                <p className="m-0 text-white">
                                    <Link className="text-white" to={crumb.path}>{crumb.label}</Link>
                                </p>
                            ) : (
                                <p className="m-0 text-white">{crumb.label}</p>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
