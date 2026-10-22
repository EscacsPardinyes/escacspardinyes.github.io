import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { news } from '../src/data/news.js';
import { masterclassConfig } from '../src/data/masterclassConfig.js';
import { eventsConfig } from '../src/data/eventsConfig.js';
import ca from '../src/data/translations/ca.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BASE_URL = 'https://escacspardinyes.com';
const SITE_NAME = 'Club Escacs Pardinyes';
const DEFAULT_IMAGE = '/img/galeria/logos/logo.webp';

// Helper: Catalan translation (same fallback as LanguageContext: returns the key if missing)
function t(key) {
    const value = ca[key];
    if (!value) console.warn(`  Traduccio no trobada: ${key}`);
    return value || key;
}

// Helper: strip HTML tags, collapse whitespace and truncate for meta descriptions
function cleanText(str, max = 155) {
    const text = (str || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.substring(0, max - 1).trimEnd()}…` : text;
}

// Helper: escape a value for use inside HTML text or a double-quoted attribute
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

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

// ── PAGES ─────────────────────────────────────────────────────────────────────
// Every route declared in App.jsx (except "/" and the catch-all). Each one gets its own
// dist/<path>/index.html so GitHub Pages serves it with HTTP 200 instead of 404.html.
// title/desc mirror the <SEO> props of each page (Catalan). sitemap: false = not listed.
const staticPages = [
    { path: '/about',                         changefreq: 'monthly', priority: '0.8', title: t('nav.about'),                desc: t('seo.about_description') },
    { path: '/school',                        changefreq: 'monthly', priority: '0.8', title: t('nav.school'),               desc: t('seo.school_description') },
    { path: '/federat',                       changefreq: 'monthly', priority: '0.8', title: t('nav.federated'),            desc: t('seo.federated_description') },
    { path: '/contact',                       changefreq: 'monthly', priority: '0.8', title: t('contact.header'),           desc: t('seo.contact_description') },
    { path: '/noticies',                      changefreq: 'daily',   priority: '0.9', title: t('news.header'),              desc: t('news.subtitle') },
    { path: '/masterclass',                   changefreq: 'monthly', priority: '0.8', title: t('masterclass.list_header'),  desc: t('seo.masterclass_description') },
    { path: '/simultanies',                   changefreq: 'monthly', priority: '0.7', title: t('simultanies.list_header'),  desc: t('seo.list_description') },
    { path: '/tancats',                       changefreq: 'monthly', priority: '0.7', title: t('tancats.list_header'),      desc: t('tancats.list_subtitle') },
    { path: '/elo-calculator',                changefreq: 'monthly', priority: '0.6', title: t('elo.header'),               desc: 'Calcula la variació del teu ELO FIDE/FCE de forma ràpida i senzilla. Eina gratuïta per als jugadors del Club Escacs Pardinyes i de Lleida.' },
    // Tournament / event archive pages
    { path: '/TorneigAlcarras',               changefreq: 'yearly',  priority: '0.5', title: t('alcarras.breadcrumb'),      desc: t('alcarras.intro_text') },
    { path: '/torneig-alcarras-2',            changefreq: 'yearly',  priority: '0.5', title: t('alcarras2.breadcrumb'),     desc: t('alcarras2.intro_text') },
    { path: '/torneig-nadal-2025',            changefreq: 'yearly',  priority: '0.5', title: t('nadal2025.breadcrumb'),     desc: t('nadal2025.report_p1') },
    { path: '/tancats-setmana-santa-2026',    changefreq: 'yearly',  priority: '0.5', title: t('gmmi.breadcrumb'),          desc: t('gmmi.intro_text') },
    { path: '/tancats-setmana-santa-2027',    changefreq: 'yearly',  priority: '0.5', title: t('gmmi_agost.breadcrumb'),    desc: t('gmmi_agost.intro_text') },
    { path: '/torneig-festa-major',           changefreq: 'yearly',  priority: '0.6', title: t('festamajor.breadcrumb'),    desc: 'Crònica i resultats del Torneig de Festa Major 2026 del Club Escacs Pardinyes.' },
    { path: '/torneig-festa-major/historial', changefreq: 'yearly',  priority: '0.5', title: 'Historial i Classificacions del Torneig de Festa Major', desc: "Historial de guanyadors, cròniques i classificacions del Torneig d'Escacs de Festa Major de Pardinyes." },
    { path: '/torneig-bordeta',               changefreq: 'yearly',  priority: '0.5', title: t('bordeta.breadcrumb'),       desc: t('bordeta.intro_text') },
    { path: '/simultanies-arami2026',         changefreq: 'yearly',  priority: '0.5', title: t('nav.arami_short'),          desc: t('arami.p1'), image: '/img/galeria/WFMAramiLobo2026/cartell-simultanies-arami.webp' },
    // Secondary pages (served with 200, not listed in the sitemap)
    { path: '/feature',  sitemap: false, title: t('features.page.header'), desc: t('seo.feature_description') },
    { path: '/privacy',  sitemap: false, title: t('privacy.header'),       desc: t('seo.privacy_description') },
    { path: '/cookies',  sitemap: false, title: t('cookies.header'),       desc: t('seo.cookies_description') },
    { path: '/enquesta', sitemap: false, title: t('enquesta.title'),       desc: t('enquesta.subtitle') },
    { path: '/baixa',    sitemap: false, title: t('unsubscribe.title'),    desc: t('unsubscribe.subtitle') },
];

const masterclassPages = Object.entries(masterclassConfig).map(([slug, mc]) => ({
    path: `/masterclass/${slug}`,
    title: t(mc.titleKeySEO),
    desc: t(mc.summaryKey),
    image: mc.poster,
}));

const eventPages = Object.values(eventsConfig).map(ev => ({
    path: ev.path,
    title: t(ev.titleKeySEO),
    desc: t(ev.descriptionKeySEO),
    image: ev.poster,
}));

const newsPages = news.map(n => ({
    path: `/noticies/${n.id}`,
    title: n.title['ca'],
    desc: (n.summary && n.summary['ca']) || '',
    image: n.image,
    type: 'article',
    lastmod: toDate(n.date),
}));

// ── 1. GENERATE SITEMAP ───────────────────────────────────────────────────────
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];

    const mainEntries = [
        urlEntry({ loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' }),
        ...staticPages
            .filter(p => p.sitemap !== false)
            .map(p => urlEntry({ loc: p.path, lastmod: today, changefreq: p.changefreq, priority: p.priority })),
    ];
    const masterclassEntries = masterclassPages.map(p =>
        urlEntry({ loc: p.path, lastmod: today, changefreq: 'monthly', priority: '0.7' })
    );
    const eventEntries = eventPages.map(p =>
        urlEntry({ loc: p.path, lastmod: today, changefreq: 'yearly', priority: '0.6' })
    );
    const newsEntries = newsPages.map(p =>
        urlEntry({ loc: p.path, lastmod: p.lastmod, changefreq: 'never', priority: '0.7' })
    );

    const allEntries = [
        '  <!-- Pagines principals -->',
        ...mainEntries,
        '',
        '  <!-- Masterclasses -->',
        ...masterclassEntries,
        '',
        '  <!-- Esdeveniments -->',
        ...eventEntries,
        '',
        '  <!-- Noticies -->',
        ...newsEntries,
    ].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries}
</urlset>`;

    // Write to dist/ (used at runtime) AND public/ (committed to git, visible in dev)
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');

    const total = mainEntries.length + masterclassEntries.length + eventEntries.length + newsEntries.length;
    console.log(`Sitemap generat: ${total} URLs (${newsEntries.length} noticies, ${masterclassEntries.length} masterclasses, ${eventEntries.length} events)`);
}

// ── 2. GENERATE STATIC META HTML FILES (Social Sharing / SEO bots) ───────────
// Tags present in index.html that are replaced per route (instead of duplicated)
const MANAGED_TAGS = [
    /<title>[\s\S]*?<\/title>\s*/gi,
    /<meta\s+(?:name|property)="(?:description|og:(?:type|url|title|description|image)|twitter:(?:card|url|title|description|image))"[^>]*>\s*/gi,
    /<link\s+rel="canonical"[^>]*>\s*/gi,
];

function generateStaticMetaFiles() {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('dist/index.html not found! Run npm run build first.');
        return;
    }

    const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Copy to 404.html (GitHub Pages SPA requirement)
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), templateHtml);

    const baseHtml = MANAGED_TAGS.reduce((html, re) => html.replace(re, ''), templateHtml);

    const routes = [...staticPages, ...masterclassPages, ...eventPages, ...newsPages];

    let generated = 0;
    routes.forEach(route => {
        const routeDir = path.join(DIST_DIR, route.path);
        fs.mkdirSync(routeDir, { recursive: true });

        const image = route.image || DEFAULT_IMAGE;
        const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
        const pageUrl = `${BASE_URL}${route.path}`;
        // Same rule as SEO.jsx: don't append the club name if the title already has it
        const rawTitle = cleanText(route.title, 120);
        const title = escapeHtml(rawTitle.includes(SITE_NAME) ? rawTitle : `${rawTitle} | ${SITE_NAME}`);
        const desc = escapeHtml(cleanText(route.desc));
        const img = escapeHtml(encodeURI(fullImageUrl));

        const metaTags = [
            `    <title>${title}</title>`,
            `    <meta name="description" content="${desc}">`,
            `    <link rel="canonical" href="${escapeHtml(pageUrl)}">`,
            `    <meta property="og:type" content="${route.type || 'website'}">`,
            `    <meta property="og:url" content="${escapeHtml(pageUrl)}">`,
            `    <meta property="og:title" content="${title}">`,
            `    <meta property="og:description" content="${desc}">`,
            `    <meta property="og:image" content="${img}">`,
            `    <meta name="twitter:card" content="summary_large_image">`,
            `    <meta name="twitter:url" content="${escapeHtml(pageUrl)}">`,
            `    <meta name="twitter:title" content="${title}">`,
            `    <meta name="twitter:description" content="${desc}">`,
            `    <meta name="twitter:image" content="${img}">`,
        ].join('\n');

        const newHtml = baseHtml.replace('</head>', `${metaTags}\n</head>`);
        fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
        generated++;
    });

    console.log(`${generated} fitxers HTML generats per SEO i Social Sharing!`);
}

// ── RUN ───────────────────────────────────────────────────────────────────────
generateSitemap();
generateStaticMetaFiles();
