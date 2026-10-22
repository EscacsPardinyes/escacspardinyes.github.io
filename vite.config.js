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
      includeAssets: ['img/galeria/logos/logo.webp'],
      manifest: {
        name: 'Club Escacs Pardinyes',
        short_name: 'CE Pardinyes',
        description: 'La gran família dels escacs a Lleida',
        theme_color: '#ffc107',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/img/galeria/logos/logo.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: '/img/galeria/logos/logo.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Precache only the app shell; gallery images (~48 MB) are cached on demand below
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
        runtimeCaching: [
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
