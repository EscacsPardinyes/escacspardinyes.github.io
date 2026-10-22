import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react(),
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
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
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
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudflare-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
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
