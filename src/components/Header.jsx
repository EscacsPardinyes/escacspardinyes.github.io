import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

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
        <div className="container-fluid p-0 nav-bar">
            <nav className="navbar navbar-expand-lg bg-none navbar-dark py-3">
                <Link to="/" className="navbar-brand">
                    <h1 className="m-0 display-4 font-weight-bold text-uppercase text-white">Club Escacs Pardinyes</h1>
                </Link>
                <button type="button" className="navbar-toggler" onClick={toggleMenu} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-between ${isMenuOpen ? 'show' : ''}`} id="navbarCollapse">
                    <div className="navbar-nav ml-auto p-4 bg-secondary">
                        <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>
                        <NavLink to="/feature" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.feature')}</NavLink>
                        <NavLink to="/school" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.school')}</NavLink>
                        <NavLink to="/federat" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.federated')}</NavLink>
                        {/* <NavLink to="/noticies" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('news.header')}</NavLink> */}
                        <NavLink to="/simultanies-arami2026" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.simultanies')}</NavLink>
                        {/* <NavLink to="/torneig-nadal-2025" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.nadal2025')}</NavLink> */}
                        <NavLink to="/tancats-setmana-santa-2026" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.gmmi')}</NavLink>

                        <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</NavLink>


                        <div className={`nav-item dropdown ${isLangOpen ? 'show' : ''}`}>
                            <a href="#" className="nav-link dropdown-toggle d-flex align-items-center" onClick={toggleLang} aria-label="Select Language">
                                <img
                                    src={`/img/flags/${language}.svg`}
                                    alt={language}
                                    style={{ width: '25px', height: 'auto', marginRight: '5px' }}
                                />
                                <i className="fa fa-angle-down ml-1"></i>
                            </a>
                            <div className={`dropdown-menu bg-secondary border-0 rounded-0 w-100 m-0 ${isLangOpen ? 'show' : ''}`}>
                                <a href="#" className="dropdown-item lang-btn text-white d-flex align-items-center" onClick={(e) => changeLanguage('ca', e)}>
                                    <img src="/img/flags/ca.svg" alt="Català" style={{ width: '20px', marginRight: '10px' }} /> Català
                                </a>
                                <a href="#" className="dropdown-item lang-btn text-white d-flex align-items-center" onClick={(e) => changeLanguage('es', e)}>
                                    <img src="/img/flags/es.svg" alt="Español" style={{ width: '20px', marginRight: '10px' }} /> Español
                                </a>
                                <a href="#" className="dropdown-item lang-btn text-white d-flex align-items-center" onClick={(e) => changeLanguage('en', e)}>
                                    <img src="/img/flags/en.svg" alt="English" style={{ width: '20px', marginRight: '10px' }} /> English
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
