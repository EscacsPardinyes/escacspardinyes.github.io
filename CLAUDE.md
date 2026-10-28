# Club Escacs Pardinyes (escacspardinyes.com)

Web del club d'escacs de Lleida. React 19 + Vite, GitHub Pages, deploy automàtic a cada push a `main`. Comandes i mapa general: `README.md`.

## On tocar segons la tasca

- **Afegir/editar una notícia o guia:** `src/data/news/<id>.js` (un fitxer per notícia, `export default {...}`) i l'import + entrada a `src/data/news.js`. No obris `news.js` per llegir contingut: és només l'índex.
- **Esdeveniments i masterclasses:** `src/data/eventsConfig.js`, `src/data/masterclassConfig.js`. Horaris: `src/data/schedule.js`.
- **Textos de la interfície:** `src/data/translations/{ca,es,en}.js`. El català és el per defecte i el fallback.
- **Pàgines:** `src/pages/` (una per ruta, rutes a `src/App.jsx`). Components compartits a `src/components/`.
- **SEO/sitemap:** `scripts/postbuild.js`. Una ruta nova s'afegeix també a `staticPages`.
- **Estils:** `src/index.css`, `src/modern.css`. `src/assets/style.min.css` és generat.

## Convencions

- Tot el contingut va en 3 idiomes: `ca`, `es`, `en`. Els enllaços interns porten el prefix d'idioma (`/es/...`, `/en/...`); en components fes servir `LocalizedLink`.
- Camps d'una notícia: `id`, `title`, `date` (`YYYY-MM-DD`), `category`, `image`, `summary`, `content` (HTML) i opcionalment `oldIds`, `gallery`. Cada idioma és `{ ca, es, en }`.
- Sense emojis decoratius a encapçalaments ni títols de notícies.
- Imatges de notícies a `public/img/galeria/Noticies/<slug>/`, en `.webp` (`npm run optimize`).
- Commits i PRs sense atribució a Claude.

## Què no cal llegir

`node_modules/`, `dist/`, `public/img/`, `package-lock.json`, els PDFs de PageSpeed i `src/assets/style.min.css`. Les lectures dels quatre primers i dels PDFs estan bloquejades a `.claude/settings.json`.

## Notes

- Dev: l'inici de la pàgina fa servir `virtual:latest-news` (`vite.config.js`), que carrega `news.js` amb Node. Si edites una notícia en dev i la targeta de la Home no canvia, reinicia el servidor.
- El vault d'Obsidian (`C:\Obsidian\WebClub`) enllaça aquest projecte a `Projecte/`. Les notes van fora d'aquesta carpeta.
