import { Link as RouterLink, NavLink as RouterNavLink, Navigate as RouterNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { stripLangPrefix } from '../utils/i18nRouting';

// Drop-in replacements for react-router's Link / NavLink / Navigate that keep the current
// language: <Link to="/school"> goes to /es/school when browsing in Spanish.

export function Link({ to, ...props }) {
    const { localize } = useLanguage();
    return <RouterLink to={localize(to)} {...props} />;
}

export function NavLink({ to, end, ...props }) {
    const { localize } = useLanguage();
    // The home link ("/" or "/es/") must only be active on the home page
    const isHome = typeof to === 'string' && stripLangPrefix(to) === '/';
    return <RouterNavLink to={localize(to)} end={end ?? isHome} {...props} />;
}

export function Navigate({ to, ...props }) {
    const { localize } = useLanguage();
    return <RouterNavigate to={localize(to)} {...props} />;
}
