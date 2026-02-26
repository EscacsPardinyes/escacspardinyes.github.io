export const eventsConfig = {
    'ivette': {
        headerKey: 'simultanies.header',
        titleKey: 'simultanies.title',
        titleKeySEO: 'nav.ivette', // Key for SEO dynamic title
        descriptionKeySEO: 'seo.ivette_description', // Key for SEO dynamic description
        summaryKey: 'simultanies.ivette_summary', // Key for list view summary
        poster: '/img/galeria/WIMIvetteGarcía/cartell-simultanies-ivette.webp',
        paragraphs: ['simultanies.p1', 'simultanies.p2', 'simultanies.p3', 'simultanies.p4'],
        images: [
            '/img/galeria/WIMIvetteGarcía/1.jpg',
            '/img/galeria/WIMIvetteGarcía/2.jpg',
            '/img/galeria/WIMIvetteGarcía/3.jpg',
            '/img/galeria/WIMIvetteGarcía/4.jpg',
            '/img/galeria/WIMIvetteGarcía/5.jpg',
            '/img/galeria/WIMIvetteGarcía/6.jpg'
        ],
        breadcrumbs: (t) => [
            { label: t('nav.simultanies'), path: '/simultanies' },
            { label: t('nav.ivette') }
        ],
        path: '/simultanies-ivette',
        hasCollaborators: true
    },
    'sant-jordi': {
        headerKey: 'santjordi.header',
        titleKey: 'santjordi.title',
        titleKeySEO: 'nav.santjordi',
        descriptionKeySEO: 'seo.santjordi_description',
        summaryKey: 'simultanies.lola_summary', // Reusing the summary from SimultaniesList for Sant Jordi/Lola
        poster: '/img/galeria/JornadaSantJordi2025/cartell-simultanies.webp',
        paragraphs: ['santjordi.p1', 'santjordi.p2', 'santjordi.p3', 'santjordi.p4', 'santjordi.p5'],
        isThtml: true, // Some paragraphs use tHtml
        images: [
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi1.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi2.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi3.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi4.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi5.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi6.webp',
            '/img/galeria/JornadaSantJordi2025/JornadaSantJordi7.webp'
        ],
        breadcrumbs: (t) => [
            { label: t('nav.simultanies'), path: '/simultanies' },
            { label: t('nav.santjordi') }
        ],
        path: '/sant-jordi2025',
        hasCollaborators: false
    }
};
