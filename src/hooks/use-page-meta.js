import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Rudambek Clothing';
const SITE_URL = 'https://rudambek.com';
const DEFAULT_DESCRIPTION =
    'Rudambek Clothing is a Ghana-based fashion house designing bold African print dresses, kaftans, and menswear. Wear your identity, live your style.';
const DEFAULT_IMAGE = `${SITE_URL}/rudambek-logo.png`;

function setMetaTag(attr, key, content) {
    let el = document.querySelector(`meta[${attr}="${key}"]`);

    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }

    el.setAttribute('content', content);
}

function setCanonicalLink(href) {
    let el = document.querySelector('link[rel="canonical"]');

    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }

    el.setAttribute('href', href);
}

/**
 * Keeps document title, meta description, Open Graph/Twitter tags, the
 * canonical link, and the robots directive in sync with the current route.
 * Runs client-side only — search engines that execute JS (Google) pick these
 * up, but social-preview crawlers that don't run JS will still see the
 * static defaults baked into index.html.
 */
export function usePageMeta({ title, description, image, noIndex = false } = {}) {
    const location = useLocation();

    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
        const desc = description || DEFAULT_DESCRIPTION;
        const ogImage = image
            ? image.startsWith('http')
                ? image
                : `${SITE_URL}${image}`
            : DEFAULT_IMAGE;
        const canonicalUrl = `${SITE_URL}${location.pathname}`;

        document.title = fullTitle;
        setMetaTag('name', 'description', desc);
        setMetaTag('property', 'og:title', fullTitle);
        setMetaTag('property', 'og:description', desc);
        setMetaTag('property', 'og:image', ogImage);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('name', 'twitter:title', fullTitle);
        setMetaTag('name', 'twitter:description', desc);
        setMetaTag('name', 'twitter:image', ogImage);
        setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
        setCanonicalLink(canonicalUrl);

        return () => {
            document.title = SITE_NAME;
        };
    }, [title, description, image, noIndex, location.pathname]);
}
