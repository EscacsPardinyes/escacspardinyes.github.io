import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from './LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import { localizePath } from '../utils/i18nRouting';

const LANGUAGE_OPTIONS = [
    { code: 'ca', label: 'Català' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const { pathname } = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLang = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLangOpen(!isLangOpen);
    };

    const changeLanguage = (lang, e) => {
        e.preventDefault();
        setLanguage(lang);
        setIsLangOpen(false);
    };

    // Handle scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsLangOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header className={`container-fluid p-0 nav-bar ${isScrolled ? 'scrolled shadow-sm' : ''}`} 
             style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1050
             }}>
            <nav className={`navbar navbar-expand-lg navbar-dark py-3 ${isScrolled ? 'py-lg-1' : 'py-lg-3'}`} style={{ transition: 'all 0.5s' }}>
                <Link to="/" className="navbar-brand">
                    <span className="m-0 display-4 font-weight-bold text-uppercase text-white" style={{ 
                        fontSize: isScrolled ? '1.4rem' : '2rem', 
                        transition: 'all 0.5s',
                        lineHeight: 1,
                        display: 'block'
                    }}>Club Escacs Pardinyes</span>
                </Link>
                <button type="button" className="navbar-toggler border-0" onClick={toggleMenu} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-between ${isMenuOpen ? 'show' : ''}`} id="navbarCollapse">
                    <div className="navbar-nav ml-auto p-4 p-lg-0 bg-lg-transparent">
                        <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>

                        <NavLink to="/feature" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.feature')}</NavLink>
                        <NavLink to="/school" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.school')}</NavLink>
                        <NavLink to="/federat" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.federated')}</NavLink>
                        <NavLink to="/tancats" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.tancats')}</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</NavLink>

                        <button 
                            type="button" 
                            className="nav-item nav-link border-0 bg-transparent text-left d-flex align-items-center" 
                            onClick={() => {
                                setIsMenuOpen(false);
                                window.dispatchEvent(new CustomEvent('open-search-modal'));
                            }}
                            title="Cerca (Cmd/Ctrl + K)"
                        >
                            <i className="fa fa-search"></i>
                            <span className="d-lg-none ml-2">Cercar</span>
                        </button>

                        <div className={`nav-item dropdown ${isLangOpen ? 'show' : ''}`}>
                            <a href="#" className="nav-link dropdown-toggle d-flex align-items-center" onClick={toggleLang} aria-label="Select Language">
                                <img
                                    src={`/img/flags/${language}.svg`}
                                    alt={language}
                                    style={{ width: '25px', height: 'auto', marginRight: '5px' }}
                                />
                                <i className="fa fa-angle-down ml-1"></i>
                            </a>
                            <div className={`dropdown-menu dropdown-menu-right border-0 shadow-lg ${isLangOpen ? 'show' : ''}`} 
                                 style={{ 
                                    backgroundColor: 'rgba(10, 10, 10, 0.9)', 
                                    backdropFilter: 'blur(10px)',
                                    marginTop: '10px'
                                 }}>
                                {/* Real links to the same page in each language, so search engines find them */}
                                {LANGUAGE_OPTIONS.map(({ code, label }) => (
                                    <a
                                        key={code}
                                        href={localizePath(pathname, code)}
                                        hrefLang={code}
                                        lang={code}
                                        className="dropdown-item lang-btn d-flex align-items-center"
                                        onClick={(e) => changeLanguage(code, e)}
                                    >
                                        <img src={`/img/flags/${code}.svg`} alt={label} style={{ width: '20px', marginRight: '10px' }} /> {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
