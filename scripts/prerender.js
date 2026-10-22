// Prerender: opens every route of the built site in headless Chrome and writes the rendered
// content into its dist/<route>/index.html, so crawlers and link previews get real HTML
// instead of an empty <div id="root">. Visitors see the same page; React re-renders it on load.
import fs from 'fs';
import path from 'path';
import { preview } from 'vite';

const PORT = 4179;
const CONCURRENCY = 6;

function routeFile(distDir, routePath) {
    return routePath === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, routePath, 'index.html');
}

async function renderRoute(browser, baseUrl, route) {
    // Own context per page: pages rendered in parallel must not share localStorage (language)
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    try {
        // Render as a returning visitor who already chose: no cookie banner, no newsletter
        // popup and no analytics script in the snapshot
        await page.evaluateOnNewDocument((lang) => {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('newsletter_dismissed', 'true');
            localStorage.setItem('language', lang);
        }, route.lang || 'ca');

        // Only load the site itself (skip fonts, CDNs, embedded forms, flags...)
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.url().startsWith(baseUrl) || req.url().startsWith('data:')) req.continue();
            else req.abort();
        });

        // networkidle2: big gallery images may keep a couple of requests open for a while
        await page.goto(`${baseUrl}${route.url || route.path}`, { waitUntil: 'networkidle2', timeout: 60000 });
        // Wait until the lazy page has replaced the Suspense loader (App.jsx PageLoader)
        await page.waitForFunction(
            () => document.querySelector('#root > *') && !document.querySelector('#root .spinner-grow'),
            { timeout: 15000 }
        );

        return await page.evaluate(() => ({
            root: document.getElementById('root').innerHTML,
            jsonLd: [...document.querySelectorAll('script.seo-json-ld')].map((s) => s.outerHTML),
            pathname: window.location.pathname,
        }));
    } finally {
        await context.close();
    }
}

export async function prerenderRoutes(distDir, routes) {
    let puppeteer;
    try {
        puppeteer = (await import('puppeteer')).default;
    } catch {
        console.warn('Prerender omès: puppeteer no està instal·lat.');
        return;
    }

    let browser;
    try {
        // --no-sandbox: required on GitHub Actions' Ubuntu runners
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    } catch (err) {
        // Never block a deploy because of the prerender: pages still work rendered by JavaScript
        console.warn(`Prerender omès: no s'ha pogut obrir Chrome (${err.message}).`);
        return;
    }

    const server = await preview({ preview: { port: PORT, strictPort: true, open: false }, logLevel: 'silent' });
    const baseUrl = `http://localhost:${PORT}`;

    let ok = 0;
    const failed = [];
    const queue = [...routes];

    async function worker() {
        while (queue.length) {
            const route = queue.shift();
            const file = routeFile(distDir, route.path);
            try {
                const result = await renderRoute(browser, baseUrl, route)
                    .catch(() => renderRoute(browser, baseUrl, route)); // one retry
                // NewsDetail and others redirect when something is missing: don't save the wrong page
                const expected = (route.url || route.path).split('?')[0];
                if (result.pathname !== expected) throw new Error(`redirigit a ${result.pathname}`);

                const html = fs.readFileSync(file, 'utf-8')
                    .replace('<div id="root"></div>', () => `<div id="root">${result.root}</div>`)
                    .replace('</head>', () => `${result.jsonLd.join('\n')}\n</head>`);
                fs.writeFileSync(file, html);
                ok++;
            } catch (err) {
                failed.push(`${route.path} (${err.message})`);
            }
        }
    }

    try {
        await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    } finally {
        await browser.close();
        await new Promise((resolve) => server.httpServer.close(resolve));
    }

    console.log(`Prerender: ${ok} pàgines amb contingut.`);
    if (failed.length) {
        // Those pages keep working as before (empty shell rendered by JavaScript)
        console.warn(`Prerender fallit en ${failed.length} pàgines:\n  ${failed.join('\n  ')}`);
    }
}
