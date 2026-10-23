import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { news } from '../src/data/news.js';
import { masterclassConfig } from '../src/data/masterclassConfig.js';
import { eventsConfig } from '../src/data/eventsConfig.js';
import ca from '../src/data/translations/ca.js';
import es from '../src/data/translations/es.js';
import en from '../src/data/translations/en.js';
import { LANGUAGES, localizePath, withTrailingSlash } from '../src/utils/i18nRouting.js';
import { prerenderRoutes } from './prerender.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BASE_URL = 'https://escacspardinyes.com';
const SITE_NAME = 'Club Escacs Pardinyes';
const DEFAULT_IMAGE = '/img/galeria/logos/logo.webp';
const DICTIONARIES = { ca, es, en };
const OG_LOCALES = { ca: 'ca_ES', es: 'es_ES', en: 'en_US' };

// A translation key, resolved for each language when the files are generated
const k = (key) => ({ key });

// Text of a page field in a language: translation key (same fallback to Catalan as
// LanguageContext), { ca, es, en } object (news) or a fixed string (Catalan only)
function resolve(value, lang) {
    if (value && typeof value === 'object' && 'key' in value) {
        const text = DICTIONARIES[lang][value.key] || ca[value.key];
        if (!text) console.warn(`  Traduccio no trobada: ${value.key}`);
        return text || value.key;
    }
    if (value && typeof value === 'object') return value[lang] || value.ca || '';
    return value || '';
}

// Public URL of a page in a language: /school -> https://escacspardinyes.com/es/school/
function pageUrl(pagePath, lang) {
    return `${BASE_URL}${withTrailingSlash(localizePath(pagePath, lang))}`;
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

// ── PAGES ─────────────────────────────────────────────────────────────────────
// Every route declared in App.jsx (except the catch-all), in Catalan paths. Each one gets a
// dist/<path>/index.html per language (/<path>, /es/<path>, /en/<path>) so GitHub Pages serves
// it with HTTP 200 instead of 404.html. title/desc mirror the <SEO> props of each page.
// sitemap: false = not listed.
const staticPages = [
    { path: '/',                              changefreq: 'weekly',  priority: '1.0', title: k('seo.home_title'),           desc: k('seo.default_description') },
    { path: '/about',                         changefreq: 'monthly', priority: '0.8', title: k('seo.about_title'),          desc: k('seo.about_description') },
    { path: '/school',                        changefreq: 'monthly', priority: '0.8', title: k('seo.school_title'),         desc: k('seo.school_description') },
    { path: '/classes-escacs-adults-lleida',  changefreq: 'monthly', priority: '0.8', title: k('seo.adults_title'),         desc: k('seo.adults_description') },
    { path: '/on-jugar-escacs-lleida',        changefreq: 'monthly', priority: '0.8', title: k('seo.where_title'),          desc: k('seo.where_description') },
    { path: '/federat',                     changefreq: 'monthly', priority: '0.8', title: k('seo.federated_title'),      desc: k('seo.federated_description') },
    { path: '/contact',                       changefreq: 'monthly', priority: '0.8', title: k('seo.contact_title'),        desc: k('seo.contact_description') },
    { path: '/noticies',                      changefreq: 'daily',   priority: '0.9', title: k('news.header'),              desc: k('news.subtitle') },
    { path: '/masterclass',                   changefreq: 'monthly', priority: '0.8', title: k('masterclass.list_header'),  desc: k('seo.masterclass_description') },
    { path: '/simultanies',                   changefreq: 'monthly', priority: '0.7', title: k('simultanies.list_header'),  desc: k('seo.list_description') },
    { path: '/tancats',                       changefreq: 'monthly', priority: '0.7', title: k('tancats.list_header'),      desc: k('tancats.list_subtitle') },
    { path: '/elo-calculator',                changefreq: 'monthly', priority: '0.6', title: k('elo.header'),               desc: 'Calcula la variació del teu ELO FIDE/FCE de forma ràpida i senzilla. Eina gratuïta per als jugadors del Club Escacs Pardinyes i de Lleida.' },
    // Tournament / event archive pages
    { path: '/TorneigAlcarras',               changefreq: 'yearly',  priority: '0.5', title: k('alcarras.breadcrumb'),      desc: k('alcarras.intro_text') },
    { path: '/torneig-alcarras-2',            changefreq: 'yearly',  priority: '0.5', title: k('alcarras2.breadcrumb'),     desc: k('alcarras2.intro_text') },
    { path: '/torneig-nadal-2025',            changefreq: 'yearly',  priority: '0.5', title: k('nadal2025.breadcrumb'),     desc: k('nadal2025.report_p1') },
    { path: '/tancats-setmana-santa-2026',    changefreq: 'yearly',  priority: '0.5', title: k('gmmi.breadcrumb'),          desc: k('gmmi.intro_text') },
    { path: '/tancats-setmana-santa-2027',    changefreq: 'yearly',  priority: '0.5', title: k('gmmi_agost.breadcrumb'),    desc: k('gmmi_agost.intro_text') },
    { path: '/torneig-festa-major',           changefreq: 'yearly',  priority: '0.6', title: k('festamajor.breadcrumb'),    desc: 'Crònica i resultats del Torneig de Festa Major 2026 del Club Escacs Pardinyes.' },
    { path: '/torneig-festa-major/historial', changefreq: 'yearly',  priority: '0.5', title: 'Historial i Classificacions del Torneig de Festa Major', desc: "Historial de guanyadors, cròniques i classificacions del Torneig d'Escacs de Festa Major de Pardinyes." },
    { path: '/torneig-bordeta',               changefreq: 'yearly',  priority: '0.5', title: k('bordeta.breadcrumb'),       desc: k('bordeta.intro_text') },
    { path: '/simultanies-arami2026',         changefreq: 'yearly',  priority: '0.5', title: k('nav.arami_short'),          desc: k('arami.p1'), image: '/img/galeria/WFMAramiLobo2026/cartell-simultanies-arami.webp' },
    // Secondary pages (served with 200, not listed in the sitemap)
    { path: '/feature',  sitemap: false, title: k('seo.feature_title'),    desc: k('seo.feature_description') },
    { path: '/privacy',  sitemap: false, title: k('privacy.header'),       desc: k('seo.privacy_description') },
    { path: '/cookies',  sitemap: false, title: k('cookies.header'),       desc: k('seo.cookies_description') },
    { path: '/enquesta', sitemap: false, title: k('enquesta.title'),       desc: k('enquesta.subtitle') },
    { path: '/baixa',    sitemap: false, title: k('unsubscribe.title'),    desc: k('unsubscribe.subtitle') },
];

const masterclassPages = Object.entries(masterclassConfig).map(([slug, mc]) => ({
    path: `/masterclass/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    title: k(mc.titleKeySEO),
    desc: k(mc.summaryKey),
    image: mc.poster,
}));

const eventPages = Object.values(eventsConfig).map(ev => ({
    path: ev.path,
    changefreq: 'yearly',
    priority: '0.6',
    title: k(ev.titleKeySEO),
    desc: k(ev.descriptionKeySEO),
    image: ev.poster,
}));

const newsPages = news.map(n => ({
    path: `/noticies/${n.id}`,
    changefreq: 'never',
    priority: '0.7',
    title: n.title,
    desc: n.summary || '',
    image: n.image,
    type: 'article',
    lastmod: toDate(n.date),
}));

const allPages = [...staticPages, ...masterclassPages, ...eventPages, ...newsPages];

// ── 1. GENERATE SITEMAP ───────────────────────────────────────────────────────
// One <url> per page and language, each listing its translations (hreflang)
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    const pages = allPages.filter(p => p.sitemap !== false);

    const entries = pages.flatMap(page => {
        const alternates = [
            ...LANGUAGES.map(lang => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(page.path, lang)}" />`),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(page.path, 'ca')}" />`,
        ].join('\n');

        return LANGUAGES.map(lang => `  <url>
    <loc>${pageUrl(page.path, lang)}</loc>
${alternates}
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || '0.6'}</priority>
  </url>`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

    // Write to dist/ (used at runtime) AND public/ (committed to git, visible in dev)
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');

    console.log(`Sitemap generat: ${entries.length} URLs (${pages.length} pagines x ${LANGUAGES.length} idiomes)`);
}

// ── 2. GENERATE STATIC META HTML FILES (Social Sharing / SEO bots) ───────────
// Tags present in index.html that are replaced per route (instead of duplicated)
const MANAGED_TAGS = [
    /<title>[\s\S]*?<\/title>\s*/gi,
    /<meta\s+(?:name|property)="(?:description|og:(?:type|url|title|description|image|locale)|twitter:(?:card|url|title|description|image))"[^>]*>\s*/gi,
    /<link\s+rel="(?:canonical|alternate)"[^>]*>\s*/gi,
];

function generateStaticMetaFiles() {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('dist/index.html not found! Run npm run build first.');
        return null;
    }

    const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
    // After a prerender, dist/index.html holds the home page: it can't be used as the template again
    if (!templateHtml.includes('<div id="root"></div>')) {
        throw new Error('dist/index.html ja està prerenderitzat. Torna a executar npm run build (no només el postbuild).');
    }

    // Copy to 404.html (GitHub Pages SPA requirement)
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), templateHtml);

    const baseHtml = MANAGED_TAGS.reduce((html, re) => html.replace(re, ''), templateHtml);

    const generated = [];
    allPages.forEach(page => {
        LANGUAGES.forEach(lang => {
            const urlPath = withTrailingSlash(localizePath(page.path, lang));
            const routeDir = path.join(DIST_DIR, urlPath);
            fs.mkdirSync(routeDir, { recursive: true });

            const image = page.image || DEFAULT_IMAGE;
            const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
            const url = escapeHtml(pageUrl(page.path, lang));
            // Same rule as SEO.jsx: don't append the club name if the title already has it
            const rawTitle = cleanText(resolve(page.title, lang), 120);
            const title = escapeHtml(rawTitle.includes(SITE_NAME) ? rawTitle : `${rawTitle} | ${SITE_NAME}`);
            const desc = escapeHtml(cleanText(resolve(page.desc, lang)));
            const img = escapeHtml(encodeURI(fullImageUrl));

            const metaTags = [
                `    <title>${title}</title>`,
                `    <meta name="description" content="${desc}">`,
                `    <link rel="canonical" href="${url}">`,
                ...LANGUAGES.map(l => `    <link rel="alternate" hreflang="${l}" href="${escapeHtml(pageUrl(page.path, l))}">`),
                `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl(page.path, 'ca'))}">`,
                `    <meta property="og:type" content="${page.type || 'website'}">`,
                `    <meta property="og:locale" content="${OG_LOCALES[lang]}">`,
                `    <meta property="og:url" content="${url}">`,
                `    <meta property="og:title" content="${title}">`,
                `    <meta property="og:description" content="${desc}">`,
                `    <meta property="og:image" content="${img}">`,
                `    <meta name="twitter:card" content="summary_large_image">`,
                `    <meta name="twitter:url" content="${url}">`,
                `    <meta name="twitter:title" content="${title}">`,
                `    <meta name="twitter:description" content="${desc}">`,
                `    <meta name="twitter:image" content="${img}">`,
            ].join('\n');

            const newHtml = baseHtml
                .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
                .replace('</head>', `${metaTags}\n</head>`);
            fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
            generated.push({ path: urlPath, lang });
        });
    });

    console.log(`${generated.length} fitxers HTML generats per SEO i Social Sharing!`);
    return generated;
}

// ── RUN ───────────────────────────────────────────────────────────────────────
generateSitemap();
const generatedRoutes = generateStaticMetaFiles();
// 3. Fill each HTML file with the rendered page content
if (generatedRoutes) {
    await prerenderRoutes(DIST_DIR, generatedRoutes);
}
