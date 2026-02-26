import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

import BackToTop from './BackToTop';
import NewsletterModal from './NewsletterModal';

export default function Layout() {
    return (
        <div className="bg-white">
            <Header />
            <Outlet />
            <Footer />
            <CookieBanner />
            <BackToTop />
            <NewsletterModal />
        </div>
    );
}
