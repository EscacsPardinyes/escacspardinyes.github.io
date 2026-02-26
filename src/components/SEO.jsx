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
 */
export default function SEO({ title, description, image, schema, type = 'website', breadcrumbs = [] }) {
    const location = useLocation();
    const { language } = useLanguage();

    useEffect(() => {
        const baseTitle = 'Club Escacs Pardinyes';
        const defaultDescription = 'Club Escacs Pardinyes - Fomentant l\'escacs a Lleida des de 1992. Escola d\'escacs, competicions i una gran comunitat.';
        const defaultImage = '/img/logo.png';
        const siteUrl = 'https://escacspardinyes.github.io';

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
        canonicalLink.setAttribute('href', `${siteUrl}${location.pathname}`);

        // Update Hreflang Tags (Multilingual SEO)
        const languages = ['ca', 'es', 'en'];
        languages.forEach(lang => {
            let link = document.querySelector(`link[hreflang="${lang}"]`);
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'alternate');
                link.setAttribute('hreflang', lang);
                document.head.appendChild(link);
            }
            link.setAttribute('href', `${siteUrl}${location.pathname}`);
        });

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
            { property: 'og:image', content: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}` },
            { property: 'og:url', content: `${siteUrl}${location.pathname}` },
            { property: 'og:type', content: type },
            { property: 'og:site_name', content: baseTitle }
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
            { name: 'twitter:image', content: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}` },
            { name: 'twitter:site', content: '@escacspardinyes' }
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

        // Default Organization Schema
        const defaultSchema = {
            "@context": "https://schema.org",
            "@type": "SportsClub",
            "name": "Club Escacs Pardinyes",
            "image": `${siteUrl}${defaultImage}`,
            "description": defaultDescription,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrer de Pardinyes Baixes, 17",
                "addressLocality": "Lleida",
                "postalCode": "25005",
                "addressCountry": "ES"
            },
            "url": siteUrl,
            "telephone": "+34641915266",
            "sameAs": [
                "https://www.facebook.com/escacspardinyes",
                "https://www.instagram.com/escacspardinyes",
                "https://twitter.com/escacspardinyes"
            ]
        };

        // Breadcrumb Schema
        let breadcrumbSchema = null;
        if (breadcrumbs && breadcrumbs.length > 0) {
            breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.label,
                    "item": crumb.path ? `${siteUrl}${crumb.path}` : `${siteUrl}${location.pathname}`
                }))
            };
        }

        const schemasToInject = [schema || defaultSchema];
        if (breadcrumbSchema) schemasToInject.push(breadcrumbSchema);

        schemasToInject.forEach((s, i) => {
            const script = document.createElement('script');
            script.className = 'seo-json-ld';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(s);
            document.head.appendChild(script);
        });

    }, [title, description, image, location, language, schema, type, breadcrumbs]);

    return null;
}
