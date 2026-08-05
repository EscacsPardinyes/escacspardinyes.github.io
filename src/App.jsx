import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';


// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const School = lazy(() => import('./pages/School'));
const MasterclassList = lazy(() => import('./pages/MasterclassList'));
const MasterclassPage = lazy(() => import('./pages/MasterclassPage'));
const Feature = lazy(() => import('./pages/Feature'));
const Federat = lazy(() => import('./pages/Federat'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const EloCalculator = lazy(() => import('./pages/EloCalculator'));
const TorneigAlcarras = lazy(() => import('./pages/TorneigAlcarras'));
const TorneigNadal2025 = lazy(() => import('./pages/TorneigNadal2025'));
const TorneigGMMI = lazy(() => import('./pages/TorneigGMMI'));
const TorneigGMMIAugost = lazy(() => import('./pages/TorneigGMMIAugost'));
const TorneigFestaMajor = lazy(() => import('./pages/TorneigFestaMajor'));
const HistorialFestaMajor = lazy(() => import('./pages/HistorialFestaMajor'));
const Enquesta = lazy(() => import('./pages/Enquesta'));
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));

const SimultaniesArami = lazy(() => import('./pages/SimultaniesArami'));
const SimultaniesList = lazy(() => import('./pages/SimultaniesList'));
const TancatsList = lazy(() => import('./pages/TancatsList'));
const EventPage = lazy(() => import('./pages/EventPage'));
const NewsList = lazy(() => import('./pages/NewsList'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh', background: 'transparent' }}>
    <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="sr-only">Carregant...</span>
    </div>
    <div className="text-primary font-weight-bold animate-pulse" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
      Club Escacs Pardinyes
    </div>
  </div>
);

// Redirect legacy .html paths
function LegacyRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith('.html')) {
      const cleanPath = location.pathname.replace('.html', '');
      navigate(cleanPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LegacyRedirect />
      <Suspense fallback={<PageLoader />}>

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="school" element={<School />} />
            <Route path="masterclass" element={<MasterclassList />} />
            <Route path="masterclass/india-de-rey" element={<MasterclassPage id="india-de-rey" />} />
            <Route path="feature" element={<Feature />} />
            <Route path="federat" element={<Federat />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="elo-calculator" element={<EloCalculator />} />
            <Route path="sant-jordi2025" element={<EventPage id="sant-jordi" />} />
            <Route path="TorneigAlcarras" element={<TorneigAlcarras />} />
            <Route path="torneig-nadal-2025" element={<TorneigNadal2025 />} />
            <Route path="tancats-setmana-santa-2026" element={<TorneigGMMI />} />
            <Route path="tancats-setmana-santa-2027" element={<TorneigGMMIAugost />} />
            <Route path="torneig-festa-major" element={<TorneigFestaMajor />} />
            <Route path="torneig-festa-major/historial" element={<HistorialFestaMajor />} />
            <Route path="enquesta" element={<Enquesta />} />
            <Route path="baixa" element={<Unsubscribe />} />

            <Route path="simultanies-ivette" element={<EventPage id="ivette" />} />
            <Route path="simultanies-arami2026" element={<SimultaniesArami />} />
            <Route path="simultanies" element={<SimultaniesList />} />
            <Route path="tancats" element={<TancatsList />} />
            <Route path="noticies" element={<NewsList />} />
            <Route path="noticies/:id" element={<NewsDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
