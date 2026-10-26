import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES, localizePath, withTrailingSlash } from '../utils/i18nRouting';
import { openingHours } from '../data/schedule';

/**
 * SEO Component to handle dynamic document title, meta tags, JSON-LD, and canonical links.
 * @param {Object} props
 * @param {string} props.title - The specific title for the current page.
 * @param {string} props.description - The meta description for the page.
 * @param {string} props.image - The image URL for social sharing (Open Graph).
 * @param {Object} props.schema - Optional JSON-LD schema object for the page.
 * @param {string} props.type - The OG Type (default: website).
 * @param {Array} props.breadcrumbs - Breadcrumbs for the page.
 * @param {Array} props.faq - Optional array of FAQ items {question, answer} for FAQ snippets.
 */
export default function SEO({ title, description, image, schema: schemaProp, type = 'website', breadcrumbs: breadcrumbsProp = [], faq: faqProp = [] }) {
    const { pathname } = useLocation();
    const { language, t } = useLanguage();

    // Pages pass new objects/arrays on every render: compare them by content so the
    // <head> is only rebuilt when something actually changes
    const schemaKey = JSON.stringify(schemaProp ?? null);
    const breadcrumbsKey = JSON.stringify(breadcrumbsProp);
    const faqKey = JSON.stringify(faqProp);

    useEffect(() => {
        const schema = JSON.parse(schemaKey);
        const breadcrumbs = JSON.parse(breadcrumbsKey);
        const faq = JSON.parse(faqKey);

        const baseTitle = 'Club Escacs Pardinyes';
        const defaultDescription = t('seo.default_description');
        const entityDescription = t('seo.entity_description');
        const defaultImage = '/img/galeria/logos/logo.webp';
        const siteUrl = 'https://escacspardinyes.com';
        
        // Helper to ensure absolute URL for images
        const getAbsoluteUrl = (path) => {
            if (!path) return '';
            if (path.startsWith('http')) return path;
            return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        };

        // Canonical page URL in a given language (always with trailing slash, see i18nRouting)
        const pageUrl = (path, lang) => `${siteUrl}${withTrailingSlash(localizePath(path, lang))}`;

        const fullDefaultImage = getAbsoluteUrl(defaultImage);
        const fullImageUrl = image ? getAbsoluteUrl(image) : fullDefaultImage;
        const currentUrl = pageUrl(pathname, language);

        // Update HTML Lang attribute
        document.documentElement.lang = language || 'ca';

        // Update Title
        // Some titles (e.g. the home page) already include the club name
        const pageTitle = !title ? baseTitle : title.includes(baseTitle) ? title : `${title} | ${baseTitle}`;
        document.title = pageTitle;

        // Update Canonical Link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', currentUrl);

        // Update Hreflang Tags (Multilingual SEO): the same page at /, /es/ and /en/
        // x-default points to the Catalan version (the default language)
        [...LANGUAGES, 'x-default'].forEach(lang => {
            let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'alternate');
                link.setAttribute('hreflang', lang);
                document.head.appendChild(link);
            }
            link.setAttribute('href', pageUrl(pathname, lang === 'x-default' ? 'ca' : lang));
        });

        // Resource Hints
        const hints = [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
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

        // Add theme-color for mobile browsers
        let themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
            themeColor = document.createElement('meta');
            themeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(themeColor);
        }
        themeColor.setAttribute('content', '#ffc107');

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
            "alternateName": ["CE Pardinyes", "Club d'Escacs Pardinyes", "Club de Ajedrez Pardinyes"],
            "sport": "Chess",
            "foundingDate": "1992",
            "foundingLocation": { "@type": "Place", "name": "Pardinyes, Lleida" },
            "memberOf": {
                "@type": "SportsOrganization",
                "name": "Federació Catalana d'Escacs",
                "alternateName": "FCE",
                "url": "https://www.escacs.cat"
            },
            "knowsAbout": ["Chess", "Chess lessons", "Chess tournaments", "FIDE rating", "Grandmaster norms", "International Master norms", "Chess for children", "Chess league"],
            "audience": { "@type": "Audience", "audienceType": "Children from age 5, teenagers and adults" },
            "makesOffer": [
                {
                    "@type": "Offer",
                    "name": t('schema.offer_school'),
                    "price": "20",
                    "priceCurrency": "EUR",
                    "url": pageUrl('/school', language),
                    "itemOffered": { "@type": "Course", "name": t('seo.school_title'), "courseMode": "onsite", "provider": { "@id": `${siteUrl}/#organization` } }
                },
                { "@type": "Offer", "name": t('schema.offer_membership'), "price": "35", "priceCurrency": "EUR", "url": pageUrl('/federat', language) },
                { "@type": "Offer", "name": t('schema.offer_federation'), "price": "75", "priceCurrency": "EUR", "url": pageUrl('/federat', language) }
            ],
            "areaServed": [
                { "@type": "City", "name": "Lleida" },
                { "@type": "AdministrativeArea", "name": "Segrià" }
            ],
            "url": siteUrl,
            "logo": fullDefaultImage,
            "image": fullDefaultImage,
            "description": entityDescription,
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
            "priceRange": "€15–€75",
            "slogan": t('carousel.slide1.title'),
            // Derived from the timetable shown on the site, so they can't drift apart
            "openingHoursSpecification": openingHours,
            "sameAs": [
                "https://www.facebook.com/escacspardinyes",
                "https://www.instagram.com/escacspardinyes",
                "https://twitter.com/escacspardinyes",
                "https://www.youtube.com/@escacspardinyes",
                "https://www.chess.com/club/club-escacs-pardinyes"
            ]
        };

        // WebSite entity: ties the site, its language and the club together for answer engines
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            "url": siteUrl,
            "name": baseTitle,
            "inLanguage": language,
            "publisher": { "@id": `${siteUrl}/#organization` }
        };

        // Page-level entity: tells engines what kind of page this is and what it is about
        const pageKind = /^\/(es\/|en\/)?about\/?$/.test(pathname) ? 'AboutPage'
            : /^\/(es\/|en\/)?contact\/?$/.test(pathname) ? 'ContactPage'
            : 'WebPage';
        const webPageSchema = type === 'article' ? null : {
            "@context": "https://schema.org",
            "@type": pageKind,
            "@id": `${currentUrl}#webpage`,
            "url": currentUrl,
            "name": pageTitle,
            "description": description || defaultDescription,
            "inLanguage": language,
            "isPartOf": { "@id": `${siteUrl}/#website` },
            "about": { "@id": `${siteUrl}/#organization` },
            "primaryImageOfPage": { "@type": "ImageObject", "url": fullImageUrl }
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
                "dateModified": schema?.dateModified || schema?.datePublished || new Date().toISOString(),
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
                        "item": pageUrl('/', language)
                    },
                    ...breadcrumbs.map((crumb, index) => ({
                        "@type": "ListItem",
                        "position": index + 2,
                        "name": crumb.label,
                        "item": crumb.path ? pageUrl(crumb.path, language) : currentUrl
                    }))
                ]
            };
        }

        // 4. FAQ Schema
        let faqSchema = null;
        if (faq && faq.length > 0) {
            faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faq.map(f => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                }))
            };
        }

        // 5. Page Specific Schema (e.g. Event)
        let pageSchema = schema;
        if (pageSchema && !pageSchema["@context"]) {
            pageSchema = {
                "@context": "https://schema.org",
                ...pageSchema
            };
        }

        const schemasToInject = [clubSchema, websiteSchema];
        if (webPageSchema) schemasToInject.push(webPageSchema);
        if (articleSchema) schemasToInject.push(articleSchema);
        if (breadcrumbSchema) schemasToInject.push(breadcrumbSchema);
        if (faqSchema) schemasToInject.push(faqSchema);
        // NewsDetail passes only dates (no @type/@graph) to feed the article schema: don't inject it on its own
        const isStandaloneSchema = pageSchema && (pageSchema["@graph"] || (pageSchema["@type"] && pageSchema["@type"] !== 'NewsArticle'));
        if (isStandaloneSchema) schemasToInject.push(pageSchema);

        schemasToInject.forEach((s) => {
            const script = document.createElement('script');
            script.className = 'seo-json-ld';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(s);
            document.head.appendChild(script);
        });

    }, [title, description, image, pathname, language, t, schemaKey, type, breadcrumbsKey, faqKey]);

    return null;
}
