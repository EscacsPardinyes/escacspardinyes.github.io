import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import './assets/style.min.css'
import { getConsent, loadAnalytics } from './utils/consent.js'
import { loadTranslations } from './data/translations'
import { applyInitialLanguageRedirect } from './utils/i18nRouting.js'

if (getConsent() === 'accepted') {
  loadAnalytics()
}

// Load the visitor's language (es/en are separate chunks) before the first render to avoid
// a flash of Catalan. If it fails (e.g. offline), render anyway: texts fall back to Catalan.
loadTranslations(applyInitialLanguageRedirect())
  .catch(() => {})
  .finally(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })

import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true })
}
