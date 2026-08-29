// Regenerates public/sitemap.xml from the live route list and product
// catalog, so it never goes stale as products are added or removed.
//
// Product ids are extracted with a regex instead of importing
// product-store.js directly, because that file uses Vite's asset-import
// syntax (`import img from '*.jpg'`) which plain Node can't resolve outside
// the Vite pipeline. If the catalog moves to Shopify (see
// docs/shopify-setup.md), this script should be replaced with one that
// fetches the product list from the Storefront API instead.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://rudambek.com';

const STATIC_ROUTES = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/shop', changefreq: 'weekly', priority: '0.9' },
    { path: '/categories', changefreq: 'weekly', priority: '0.8' },
    { path: '/about', changefreq: 'monthly', priority: '0.6' },
    { path: '/as-seen-on', changefreq: 'weekly', priority: '0.5' },
    { path: '/contact', changefreq: 'monthly', priority: '0.5' },
    { path: '/faq', changefreq: 'monthly', priority: '0.5' },
];

function getProductIds() {
    const source = readFileSync(
        path.join(ROOT, 'src/features/products/product-store.js'),
        'utf-8'
    );
    const productsBlock = source.split('export const PRODUCTS')[1] ?? '';
    const matches = productsBlock.matchAll(/\bid:\s*'([^']+)'/g);

    return [...matches].map((match) => match[1]);
}

function buildUrlEntry({ loc, changefreq, priority }) {
    return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
    ].join('\n');
}

function generateSitemap() {
    const staticEntries = STATIC_ROUTES.map((route) =>
        buildUrlEntry({
            loc: `${SITE_URL}${route.path}`,
            changefreq: route.changefreq,
            priority: route.priority,
        })
    );

    const productEntries = getProductIds().map((id) =>
        buildUrlEntry({
            loc: `${SITE_URL}/product/${id}`,
            changefreq: 'weekly',
            priority: '0.7',
        })
    );

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...staticEntries,
        ...productEntries,
        '</urlset>',
        '',
    ].join('\n');

    writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml, 'utf-8');

    console.log(
        `sitemap.xml written with ${staticEntries.length} static routes and ${productEntries.length} products.`
    );
}

generateSitemap();
