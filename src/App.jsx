import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import School from './pages/School';
import Feature from './pages/Feature';
import Federat from './pages/Federat';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import EloCalculator from './pages/EloCalculator';
import SantJordi from './pages/SantJordi';
import TorneigAlcarras from './pages/TorneigAlcarras';
import Simultanies from './pages/Simultanies';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="school" element={<School />} />
          <Route path="feature" element={<Feature />} />
          <Route path="federat" element={<Federat />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy.html" element={<Privacy />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="elo-calculator" element={<EloCalculator />} />
          <Route path="sant-jordi" element={<SantJordi />} />
          <Route path="TorneigAlcarras.html" element={<TorneigAlcarras />} />
          <Route path="TorneigAlcarras" element={<TorneigAlcarras />} />
          <Route path="simultanies" element={<Simultanies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
