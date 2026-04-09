import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
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

const SimultaniesArami = lazy(() => import('./pages/SimultaniesArami'));
const SimultaniesList = lazy(() => import('./pages/SimultaniesList'));
const TancatsList = lazy(() => import('./pages/TancatsList'));
const EventPage = lazy(() => import('./pages/EventPage'));
const NewsList = lazy(() => import('./pages/NewsList'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Carregant...</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
            <Route path="tancats-agost-2026" element={<TorneigGMMIAugost />} />

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
