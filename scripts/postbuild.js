import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { news } from '../src/data/news.js';
import { masterclassConfig } from '../src/data/masterclassConfig.js';
import { eventsConfig } from '../src/data/eventsConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BASE_URL = 'https://escacspardinyes.com';

// Helper: format a date string to YYYY-MM-DD
function toDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    return dateStr.split('T')[0];
}

// Helper: build a single <url> block for the sitemap
function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.6' }) {
    return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ── 1. GENERATE SITEMAP ───────────────────────────────────────────────────────
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];

    // Static main pages
    const staticPages = [
        { loc: '/',                              changefreq: 'weekly',  priority: '1.0' },
        { loc: '/about',                         changefreq: 'monthly', priority: '0.8' },
        { loc: '/school',                        changefreq: 'monthly', priority: '0.8' },
        { loc: '/federat',                       changefreq: 'monthly', priority: '0.8' },
        { loc: '/contact',                       changefreq: 'monthly', priority: '0.8' },
        { loc: '/noticies',                      changefreq: 'daily',   priority: '0.9' },
        { loc: '/masterclass',                   changefreq: 'monthly', priority: '0.8' },
        { loc: '/simultanies',                   changefreq: 'monthly', priority: '0.7' },
        { loc: '/tancats',                       changefreq: 'monthly', priority: '0.7' },
        { loc: '/elo-calculator',                changefreq: 'monthly', priority: '0.6' },
        // Tournament / event archive pages
        { loc: '/TorneigAlcarras',               changefreq: 'yearly',  priority: '0.5' },
        { loc: '/torneig-alcarras-2',            changefreq: 'yearly',  priority: '0.5' },
        { loc: '/torneig-nadal-2025',            changefreq: 'yearly',  priority: '0.5' },
        { loc: '/tancats-setmana-santa-2026',    changefreq: 'yearly',  priority: '0.5' },
        { loc: '/tancats-setmana-santa-2027',    changefreq: 'yearly',  priority: '0.5' },
        { loc: '/torneig-festa-major',           changefreq: 'yearly',  priority: '0.6' },
        { loc: '/torneig-festa-major/historial', changefreq: 'yearly',  priority: '0.5' },
        { loc: '/torneig-bordeta',               changefreq: 'yearly',  priority: '0.5' },
        { loc: '/simultanies-arami2026',         changefreq: 'yearly',  priority: '0.5' },
    ].map(p => urlEntry({ ...p, lastmod: today }));

    // Masterclass pages — read dynamically from masterclassConfig.js
    const masterclassPages = Object.keys(masterclassConfig).map(slug =>
        urlEntry({
            loc: `/masterclass/${slug}`,
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.7',
        })
    );

    // Event pages — read dynamically from eventsConfig.js
    const eventPages = Object.values(eventsConfig).map(ev =>
        urlEntry({
            loc: ev.path,
            lastmod: today,
            changefreq: 'yearly',
            priority: '0.6',
        })
    );

    // News articles — uses real publication date from news.js
    const newsPages = news.map(n =>
        urlEntry({
            loc: `/noticies/${n.id}`,
            lastmod: toDate(n.date),
            changefreq: 'never',
            priority: '0.7',
        })
    );

    const allEntries = [
        '  <!-- Pagines principals -->',
        ...staticPages,
        '',
        '  <!-- Masterclasses -->',
        ...masterclassPages,
        '',
        '  <!-- Esdeveniments -->',
        ...eventPages,
        '',
        '  <!-- Noticies -->',
        ...newsPages,
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries}
</urlset>`;

    // Write to dist/ (used at runtime) AND public/ (committed to git, visible in dev)
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');

    const total = staticPages.length + masterclassPages.length + eventPages.length + newsPages.length;
    console.log(`Sitemap generat: ${total} URLs (${newsPages.length} noticies, ${masterclassPages.length} masterclasses, ${eventPages.length} events)`);
}

// ── 2. GENERATE STATIC META HTML FILES (Social Sharing / SEO bots) ───────────
function generateStaticMetaFiles() {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('dist/index.html not found! Run npm run build first.');
        return;
    }

    const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Copy to 404.html (GitHub Pages SPA requirement)
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), templateHtml);

    // Core static routes with hardcoded titles/descriptions
    const routes = [
        { path: '/about',          title: 'Sobre Nosaltres',  desc: 'Coneix el Club Escacs Pardinyes, la nostra historia i el nostre equip.' },
        { path: '/school',         title: "Escola d'Escacs",  desc: "Apren a jugar als escacs amb els millors professionals a Lleida." },
        { path: '/contact',        title: 'Contacte',         desc: 'Contacta amb el Club Escacs Pardinyes.' },
        { path: '/federat',        title: 'Fes-te Soci',      desc: 'Uneix-te a la gran familia del Club Escacs Pardinyes.' },
        { path: '/masterclass',    title: 'Masterclasses',    desc: 'Masterclasses i formacio avancada en escacs a Lleida.' },
        { path: '/noticies',       title: 'Noticies',         desc: 'Totes les noticies i novetats del Club Escacs Pardinyes de Lleida.' },
        { path: '/simultanies',    title: 'Simultanees',      desc: 'Sessions de simultanees del Club Escacs Pardinyes.' },
        { path: '/tancats',        title: 'Tancats',          desc: 'Torneigs tancats del Club Escacs Pardinyes.' },
        { path: '/elo-calculator', title: 'Calculadora ELO',  desc: 'Calcula la variacio del teu ELO facilment.' },
    ];

    // Masterclass pages
    Object.keys(masterclassConfig).forEach(slug => {
        routes.push({
            path: `/masterclass/${slug}`,
            title: `Masterclass: ${slug.replace(/-/g, ' ')}`,
            desc: 'Masterclass del Club Escacs Pardinyes a Lleida.',
        });
    });

    // Event pages
    Object.values(eventsConfig).forEach(ev => {
        routes.push({
            path: ev.path,
            title: ev.titleKey,
            desc: 'Esdeveniment del Club Escacs Pardinyes.',
            image: ev.poster,
        });
    });

    // All news articles
    news.forEach(n => {
        const rawDesc = (n.summary && n.summary['ca']) ? n.summary['ca'] : '';
        routes.push({
            path: `/noticies/${n.id}`,
            title: n.title['ca'],
            desc: rawDesc.replace(/<[^>]*>/g, '').substring(0, 155),
            image: n.image,
        });
    });

    let generated = 0;
    routes.forEach(route => {
        const routeDir = path.join(DIST_DIR, route.path);
        fs.mkdirSync(routeDir, { recursive: true });

        const fullImageUrl = route.image
            ? (route.image.startsWith('http') ? route.image : `${BASE_URL}${route.image.startsWith('/') ? '' : '/'}${route.image}`)
            : `${BASE_URL}/img/galeria/logos/logo.webp`;

        const metaTags = [
            `    <title>${route.title} | Club Escacs Pardinyes</title>`,
            `    <meta name="description" content="${route.desc}">`,
            `    <meta property="og:title" content="${route.title} | Club Escacs Pardinyes">`,
            `    <meta property="og:description" content="${route.desc}">`,
            `    <meta property="og:image" content="${fullImageUrl}">`,
            `    <meta property="og:url" content="${BASE_URL}${route.path}">`,
            `    <meta name="twitter:card" content="summary_large_image">`,
            `    <meta name="twitter:title" content="${route.title} | Club Escacs Pardinyes">`,
            `    <meta name="twitter:description" content="${route.desc}">`,
            `    <meta name="twitter:image" content="${fullImageUrl}">`,
        ].join('\n');

        const newHtml = templateHtml.replace('</head>', `${metaTags}\n</head>`);
        fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
        generated++;
    });

    console.log(`${generated} fitxers HTML generats per SEO i Social Sharing!`);
}

// ── RUN ───────────────────────────────────────────────────────────────────────
generateSitemap();
generateStaticMetaFiles();
