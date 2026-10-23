import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
import path from 'path'
import { pathToFileURL } from 'url'

// news.js holds every article in 3 languages (~200 KB). The home page only shows the
// latest 3 cards, so it imports this virtual module: those 3 items without content/gallery.
function latestNews() {
  const virtualId = 'virtual:latest-news'
  const resolvedId = '\0' + virtualId
  const newsFile = path.resolve('src/data/news.js')
  return {
    name: 'latest-news',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    async load(id) {
      if (id !== resolvedId) return
      this.addWatchFile(newsFile)
      const { news } = await import(`${pathToFileURL(newsFile).href}?t=${Date.now()}`)
      const latest = [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        .map(({ id, title, date, category, image, summary }) => ({ id, title, date, category, image, summary }))
      return `export const latestNews = ${JSON.stringify(latest)};`
    },
    handleHotUpdate({ file, server }) {
      if (path.resolve(file) !== newsFile) return
      const mod = server.moduleGraph.getModuleById(resolvedId)
      if (mod) server.moduleGraph.invalidateModule(mod)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react(),
    latestNews(),
    compression(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/icons/apple-touch-icon.png'],
      manifest: {
        name: 'Club Escacs Pardinyes',
        short_name: 'CE Pardinyes',
        description: 'La gran família dels escacs a Lleida',
        lang: 'ca',
        start_url: '/',
        theme_color: '#ffc107', // same as --primary and the theme-color meta in index.html / SEO.jsx
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/img/icons/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            // Logo with padding so Android's circular/rounded masks don't crop it
            src: '/img/icons/pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Precache only the app shell; gallery images (~48 MB) are cached on demand below
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
        // Every route has its own prerendered HTML (scripts/prerender.js): don't answer all
        // navigations with index.html (the home page). Pages come from the network, with the
        // last visited copy as offline fallback.
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50
              }
            }
          },
          {
            urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          news: ['./src/data/news.js']
        }
      }
    }
  }
})
