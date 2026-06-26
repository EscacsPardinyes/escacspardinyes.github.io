import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { news } from '../src/data/news.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://escacspardinyes.com';

// 1. Generate Sitemap
function generateSitemap() {
    const staticRoutes = [
        '', '/about', '/school', '/feature', '/federat', '/contact', '/privacy', '/cookies', '/tancats', '/noticies'
    ];

    const newsRoutes = news.map(n => `/noticies/${n.id}`);

    const allRoutes = [...staticRoutes, ...newsRoutes];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
    <url>
        <loc>${BASE_URL}${route}</loc>
        <changefreq>${route.includes('/noticies/') ? 'monthly' : 'weekly'}</changefreq>
        <priority>${route === '' ? '1.0' : route.includes('/noticies/') ? '0.7' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapContent);
    console.log('✅ Sitemap generated successfully!');
}

// 2. Generate Static HTML files for SEO (Pseudo-Prerender for WhatsApp/Twitter)
function generateStaticMetaFiles() {
    const indexHtmlPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('❌ dist/index.html not found! Run npm run build first.');
        return;
    }

    const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Copy to 404.html (GitHub Pages requirement)
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), templateHtml);

    // Routes to generate
    const routes = [
        { path: '/about', title: 'Sobre Nosaltres', desc: 'Coneix el Club Escacs Pardinyes.' },
        { path: '/school', title: "Escola d'Escacs", desc: 'Aprèn a jugar als escacs amb els millors professionals a Lleida.' },
        { path: '/contact', title: 'Contacte', desc: 'Contacta amb el Club Escacs Pardinyes.' },
        { path: '/federat', title: 'Fes-te Soci', desc: 'Uneix-te a la gran família del Club Escacs Pardinyes.' },
    ];

    // Add News routes
    news.forEach(n => {
        routes.push({
            path: `/noticies/${n.id}`,
            title: n.title['ca'],
            desc: n.summary['ca'].substring(0, 150) + '...',
            image: n.image
        });
    });

    routes.forEach(route => {
        const routeDir = path.join(DIST_DIR, route.path);
        fs.mkdirSync(routeDir, { recursive: true });

        const fullImageUrl = route.image 
            ? (route.image.startsWith('http') ? route.image : `${BASE_URL}${route.image.startsWith('/') ? '' : '/'}${route.image}`)
            : `${BASE_URL}/img/galeria/logos/logo.webp`;

        // Inject meta tags
        const metaTags = `
            <title>${route.title} | Club Escacs Pardinyes</title>
            <meta name="description" content="${route.desc}">
            <meta property="og:title" content="${route.title} | Club Escacs Pardinyes">
            <meta property="og:description" content="${route.desc}">
            <meta property="og:image" content="${fullImageUrl}">
            <meta property="og:url" content="${BASE_URL}${route.path}">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${route.title} | Club Escacs Pardinyes">
            <meta name="twitter:description" content="${route.desc}">
            <meta name="twitter:image" content="${fullImageUrl}">
        `;

        const newHtml = templateHtml.replace('</head>', `${metaTags}</head>`);
        fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
    });

    console.log(`✅ Generated ${routes.length} static HTML files for proper SEO and Social Sharing!`);
}

generateSitemap();
generateStaticMetaFiles();
