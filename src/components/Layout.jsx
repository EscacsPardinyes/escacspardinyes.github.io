import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

import BackToTop from './BackToTop';
import NewsletterModal from './NewsletterModal';
import SearchModal from './SearchModal';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
    return (
        <div className="bg-white">
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
