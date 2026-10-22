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
- `scripts/postbuild.js` — genera `sitemap.xml` i un `index.html` amb meta tags per a cada ruta. Una ruta nova s'ha d'afegir també a la llista `staticPages` d'aquest fitxer.
- `src/utils/consent.js` — consentiment de cookies; Metricool només es carrega si s'accepta.
