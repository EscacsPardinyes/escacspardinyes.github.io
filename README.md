# Club Escacs Pardinyes

Web del Club Escacs Pardinyes (Lleida): https://escacspardinyes.com

React + Vite, publicada a GitHub Pages amb GitHub Actions (`.github/workflows/deploy.yml`) a cada push a `main`.

## Comandes

```bash
npm install
npm run dev       # servidor de desenvolupament (http://localhost:3001)
npm run build     # build a dist/ + postbuild (sitemap i HTML per ruta per a SEO)
npm run preview   # serveix dist/ en local
npm run lint
npm run optimize  # optimitza imatges (scripts/optimize-images.js)
```

## On és cada cosa

- `src/pages/` — una pàgina per ruta (rutes a `src/App.jsx`).
- `src/data/news.js` — notícies.
- `src/data/eventsConfig.js`, `src/data/masterclassConfig.js` — esdeveniments i masterclasses.
- `src/data/translations/` — textos en `ca.js`, `es.js` i `en.js`. El català és l'idioma per defecte i el que s'usa si falta una traducció.
- Idiomes a la URL: català sense prefix (`/school`), castellà a `/es/...` i anglès a `/en/...` (`src/utils/i18nRouting.js`). Per enllaçar pàgines internes fes servir `Link`/`NavLink` de `src/components/LocalizedLink.jsx`, que mantenen l'idioma.
- `scripts/postbuild.js` — genera `sitemap.xml` (amb hreflang) i un `index.html` amb meta tags per a cada ruta i idioma. Una ruta nova s'ha d'afegir també a la llista `staticPages` d'aquest fitxer.
- `scripts/prerender.js` — després del build obre cada pàgina amb Chrome (Puppeteer) i en desa el contingut al HTML, perquè Google i les xarxes vegin el text sense executar JavaScript.
- `src/utils/consent.js` — consentiment de cookies; Metricool només es carrega si s'accepta.
