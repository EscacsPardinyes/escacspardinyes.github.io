import { Link } from './LocalizedLink';
import { useLanguage } from '../context/LanguageContext';

// Shown instead of the sign-up form while the circuit sign-ups are closed (CIRCUIT_SIGNUP_OPEN in circuitConfig.js)
export default function SignupSoon({ showCircuitLink = true }) {
    const { t } = useLanguage();
    return (
        <div className="signup-soon" role="note">
            <p className="signup-soon-title"><i className="fa fa-hourglass-half mr-2" aria-hidden="true"></i>{t('circuitinfo.signup_soon_title')}</p>
            <p className="mb-0">{t('circuitinfo.signup_soon_text')}</p>
            {showCircuitLink && (
                <Link to="/circuit-2027" className="btn btn-outline-primary btn-sm mt-3">{t('circuitinfo.see_all')}</Link>
            )}
        </div>
    );
}
