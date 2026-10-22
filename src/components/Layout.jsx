import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

import BackToTop from './BackToTop';
import NewsletterModal from './NewsletterModal';
import SearchModal from './SearchModal';
import WhatsAppButton from './WhatsAppButton';
import { useLanguage } from '../context/LanguageContext';

export default function Layout() {
    const navigate = useNavigate();
    const { localize } = useLanguage();

    // Plain <a href="/..."> links (e.g. inside translated HTML or news content) navigate inside
    // the app and keep the current language, like <Link> does
    const handleInternalLinks = (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const anchor = e.target.closest('a[href^="/"]');
        if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
        const href = anchor.getAttribute('href');
        // Files (/sitemap.xml, /img/...pdf) and protocol-relative URLs are left to the browser
        if (href.startsWith('//') || /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0])) return;
        e.preventDefault();
        navigate(localize(href));
    };

    return (
        <div className="bg-white" onClick={handleInternalLinks}>
            <Header />
            <Outlet />
            <Footer />
            <CookieBanner />
            <BackToTop />
            <WhatsAppButton />
            <NewsletterModal />
            <SearchModal />
        </div>
    );
}
