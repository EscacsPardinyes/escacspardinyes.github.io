import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO Component to handle dynamic document title, meta tags, JSON-LD, and canonical links.
 * @param {Object} props
 * @param {string} props.title - The specific title for the current page.
 * @param {string} props.description - The meta description for the page.
 * @param {string} props.image - The image URL for social sharing (Open Graph).
 * @param {Object} props.schema - Optional JSON-LD schema object for the page.
 * @param {string} props.type - The OG Type (default: website).
 * @param {Array} props.breadcrumbs - Breadcrumbs for the page.
 */
export default function SEO({ title, description, image, schema, type = 'website', breadcrumbs = [] }) {
    const location = useLocation();
    const { language } = useLanguage();

    useEffect(() => {
        const baseTitle = 'Club Escacs Pardinyes';
        const defaultDescription = language === 'ca' 
            ? "Club Escacs Pardinyes - Fomentant l'escacs a Lleida des de 1992. Escola d'escacs, competicions i una gran comunitat."
            : language === 'es'
                ? "Club Escacs Pardinyes - Fomentando el ajedrez en Lleida desde 1992. Escuela de ajedrez, competiciones y una gran comunidad."
                : "Club Escacs Pardinyes - Promoting chess in Lleida since 1992. Chess school, competitions and a great community.";
        const defaultImage = '/img/galeria/logos/logo.webp';
        const siteUrl = 'https://escacspardinyes.github.io';
        
        // Helper to ensure absolute URL for images
        const getAbsoluteUrl = (path) => {
            if (!path) return '';
            if (path.startsWith('http')) return path;
            return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        };

        const fullDefaultImage = getAbsoluteUrl(defaultImage);
        const fullImageUrl = image ? getAbsoluteUrl(image) : fullDefaultImage;
        const currentUrl = `${siteUrl}${location.pathname}`;

        // Update HTML Lang attribute
        document.documentElement.lang = language || 'ca';

        // Update Title
        const pageTitle = title ? `${title} | ${baseTitle}` : baseTitle;
        document.title = pageTitle;

        // Update Canonical Link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', currentUrl);

        // Update Hreflang Tags (Multilingual SEO)
        const supportedLanguages = ['ca', 'es', 'en'];

        supportedLanguages.forEach(lang => {
            let link = document.querySelector(`link[hreflang="${lang}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'alternate');
                link.setAttribute('hreflang', lang);
                document.head.appendChild(link);
            }
            // Construct URL with lang parameter
            const langUrl = new URL(siteUrl + location.pathname);
            langUrl.searchParams.set('lang', lang);
            link.setAttribute('href', langUrl.toString());
        });

        // Add x-default (usually points to the default language selector)
        let xDefault = document.querySelector('link[hreflang="x-default"]');
        if (!xDefault) {
            xDefault = document.createElement('link');
            xDefault.setAttribute('rel', 'alternate');
            xDefault.setAttribute('hreflang', 'x-default');
            document.head.appendChild(xDefault);
        }
        xDefault.setAttribute('href', currentUrl);

        // Resource Hints
        const hints = [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' }
        ];
        hints.forEach(hint => {
            if (!document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) {
                const link = document.createElement('link');
                link.rel = hint.rel;
                link.href = hint.href;
                document.head.appendChild(link);
            }
        });

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || defaultDescription);

        // Update Open Graph Tags
        const ogTags = [
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: description || defaultDescription },
            { property: 'og:image', content: fullImageUrl },
            { property: 'og:url', content: currentUrl },
            { property: 'og:type', content: type },
            { property: 'og:site_name', content: baseTitle },
            { property: 'og:locale', content: language === 'ca' ? 'ca_ES' : language === 'es' ? 'es_ES' : 'en_US' }
        ];

        ogTags.forEach(tag => {
            let element = document.querySelector(`meta[property="${tag.property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', tag.property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        });

        // Update Twitter Card Tags
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: description || defaultDescription },
            { name: 'twitter:image', content: fullImageUrl },
            { name: 'twitter:site', content: '@escacspardinyes' },
            { name: 'twitter:url', content: currentUrl }
        ];

        twitterTags.forEach(tag => {
            let element = document.querySelector(`meta[name="${tag.name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', tag.name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        });

        // Update JSON-LD Structured Data
        const existingScripts = document.querySelectorAll('.seo-json-ld');
        existingScripts.forEach(s => s.remove());

        // 1. Club / LocalBusiness Schema
        const clubSchema = {
            "@context": "https://schema.org",
            "@type": "SportsClub",
            "@id": `${siteUrl}/#organization`,
            "name": "Club Escacs Pardinyes",
            "url": siteUrl,
            "logo": fullDefaultImage,
            "image": fullDefaultImage,
            "description": defaultDescription,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrer Sant Pere Claver, 1, 2a planta",
                "addressLocality": "Lleida",
                "postalCode": "25005",
                "addressRegion": "Lleida",
                "addressCountry": "ES"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.6264,
                "longitude": 0.6361
            },
            "telephone": "+34641915266",
            "email": "escacspardinyes@gmail.com",
            "priceRange": "$",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Tuesday",
                    "opens": "18:30",
                    "closes": "19:30"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Wednesday",
                    "opens": "18:30",
                    "closes": "20:30"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Thursday",
                    "opens": "19:45",
                    "closes": "21:15"
                }
            ],
            "sameAs": [
                "https://www.facebook.com/escacspardinyes",
                "https://www.instagram.com/escacspardinyes",
                "https://twitter.com/escacspardinyes",
                "https://www.youtube.com/@escacspardinyes"
            ]
        };

        // 2. Article Schema
        let articleSchema = null;
        if (type === 'article' && title) {
            articleSchema = {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": title,
                "description": description || defaultDescription,
                "image": [fullImageUrl],
                "datePublished": schema?.datePublished || new Date().toISOString(),
                "author": [{
                    "@type": "Organization",
                    "name": "Club Escacs Pardinyes",
                    "url": siteUrl
                }],
                "publisher": {
                    "@id": `${siteUrl}/#organization`
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": currentUrl
                }
            };
        }

        // 3. Breadcrumb Schema
        let breadcrumbSchema = null;
        if (breadcrumbs && breadcrumbs.length > 0) {
            breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": language === 'ca' ? 'Inici' : language === 'es' ? 'Inicio' : 'Home',
                        "item": siteUrl
                    },
                    ...breadcrumbs.map((crumb, index) => ({
                        "@type": "ListItem",
                        "position": index + 2,
                        "name": crumb.label,
                        "item": crumb.path ? getAbsoluteUrl(crumb.path) : currentUrl
                    }))
                ]
            };
        }

        // 4. Page Specific Schema (e.g. Event)
        let pageSchema = schema;
        if (pageSchema && !pageSchema["@context"]) {
            pageSchema = {
                "@context": "https://schema.org",
                ...pageSchema
            };
        }

        const schemasToInject = [clubSchema];
        if (articleSchema) schemasToInject.push(articleSchema);
        if (breadcrumbSchema) schemasToInject.push(breadcrumbSchema);
        if (pageSchema && pageSchema["@type"] !== 'NewsArticle') schemasToInject.push(pageSchema);

        schemasToInject.forEach((s) => {
            const script = document.createElement('script');
            script.className = 'seo-json-ld';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(s);
            document.head.appendChild(script);
        });

    }, [title, description, image, location, language, schema, type, breadcrumbs]);

    return null;
}
