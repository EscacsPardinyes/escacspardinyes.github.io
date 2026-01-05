import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const School = lazy(() => import('./pages/School'));
const Feature = lazy(() => import('./pages/Feature'));
const Federat = lazy(() => import('./pages/Federat'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const EloCalculator = lazy(() => import('./pages/EloCalculator'));
const SantJordi = lazy(() => import('./pages/SantJordi'));
const TorneigAlcarras = lazy(() => import('./pages/TorneigAlcarras'));
const TorneigNadal2025 = lazy(() => import('./pages/TorneigNadal2025'));
const SimultaniesIvette = lazy(() => import('./pages/SimultaniesIvette'));
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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="school" element={<School />} />
            <Route path="feature" element={<Feature />} />
            <Route path="federat" element={<Federat />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="elo-calculator" element={<EloCalculator />} />
            <Route path="sant-jordi2025" element={<SantJordi />} />
            <Route path="TorneigAlcarras" element={<TorneigAlcarras />} />
            <Route path="torneig-nadal-2025" element={<TorneigNadal2025 />} />
            <Route path="simultanies-ivette" element={<SimultaniesIvette />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
