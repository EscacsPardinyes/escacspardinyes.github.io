import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

import BackToTop from './BackToTop';

export default function Layout() {
    return (
        <div className="bg-white">
            <Header />
            <Outlet />
            <Footer />
            <CookieBanner />
            <BackToTop />
        </div>
    );
}
