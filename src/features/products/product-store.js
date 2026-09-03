import pFuguDesign from '../../assets/products/P-FUGU Design GHS - 400.jpg';
import pFuguPatches from '../../assets/products/P-FUGU Patches ghs - 450.jpg';
import tdPDesign from '../../assets/products/TD-P Design GHS -  350.jpg';
import fuguMTassels221 from '../../assets/products/FUGU-M-TASSELS 221.jpg';
import fuguMTassels221Side from '../../assets/products/FUGU-M-TASSELS 221 SIDE.jpeg';
import fuguMultiC from '../../assets/products/FUGU-MULTI C.jpg';
import fuguMultiCSide from '../../assets/products/FUGU-MULTI C SIDE.jpg';
import fuguMultiC01 from '../../assets/products/FUGU-MULTI C 01.jpg';
import fuguMultiC01Side from '../../assets/products/FUGU-MULTI C 01 SIDE.jpeg';
import fuguPDesign112 from '../../assets/products/FUGU-P-DESIGN 112.jpg';
import tdFuguDesign from '../../assets/products/TD-FUGU Design 111 - GHS450.jpg';
import tdFuguBatik from '../../assets/products/TD-FUGU 01.jpg';
import tdFuguChartreuse from '../../assets/products/TD-FUGU 02.jpg';
import tdFuguPlum from '../../assets/products/TD-FUGU 03.jpg';
import tdFuguCocoa from '../../assets/products/TD-FUGU 04.jpg';
import burgundyStripeKaftan1 from '../../assets/products/burgundy-stripe-kaftan-1.jpg';
import burgundyStripeKaftan2 from '../../assets/products/burgundy-stripe-kaftan-2.jpg';
import embroideredKaftanMen from '../../assets/products/embroidered-kaftan-men.jpg';
import editorial01 from '../../assets/products/editorial-01.jpg';
import editorial02 from '../../assets/products/editorial-02.jpg';
import editorial03 from '../../assets/products/editorial-03.jpg';
import editorial05 from '../../assets/products/editorial-05.jpg';
import editorial06 from '../../assets/products/editorial-06.jpg';

export const PRODUCTS = [
    {
        id: 'p-fugu-design',
        name: 'P-FUGU Design',
        slug: 'p-fugu-design',
        // price: 199, // original placeholder price
        // price: 36, // superseded — was converted at the live market GHS rate
        // price: 25.8065, // superseded — was converted at the site's old, stale GHS rate (15.50)
        price: 35.7143, // GHS 400 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵400 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: pFuguDesign,
        images: [pFuguDesign],
        // Color variants of this design. Add more entries here as new
        // color photos come in — the first entry is shown by default.
        colors: [
            { name: 'Navy & Tan', image: pFuguDesign, images: [pFuguDesign] },
        ],
        imageAlt: 'Navy Fugu with a striped colorblock yoke and cuffs',
        description: 'A relaxed, oversized Fugu in solid navy, punctuated by a pinstriped tan yoke and matching cuffs for a sharp, considered contrast.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 12,
        featured: true,
        isNew: true,
        rating: 4.9,
        reviewCount: 128,
    },
    {
        id: 'p-fugu-patches',
        name: 'P-FUGU Patches',
        slug: 'p-fugu-patches',
        // price: 159, // original placeholder price
        // price: 40, // superseded — was converted at the live market GHS rate
        // price: 29.0323, // superseded — was converted at the site's old, stale GHS rate (15.50)
        price: 40.1786, // GHS 450 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵450 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: pFuguPatches,
        images: [pFuguPatches],
        colors: [
            { name: 'Navy Patchwork', image: pFuguPatches, images: [pFuguPatches] },
        ],
        imageAlt: 'Navy Fugu with woven plaid patchwork and fringe details',
        description: 'This navy Fugu layers in woven plaid patches and raw fringe, with a striped collar adding a handcrafted, textural edge.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 8,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 96,
    },
    {
        id: 'td-p-design',
        name: 'TD-P Design',
        slug: 'td-p-design',
        // price: 75, // original placeholder price
        // price: 31, // superseded — was converted at the live market GHS rate
        // price: 22.5806, // superseded — was converted at the site's old, stale GHS rate (15.50)
        price: 31.25, // GHS 350 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵350 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: tdPDesign,
        images: [tdPDesign],
        colors: [
            { name: 'Black & White', image: tdPDesign, images: [tdPDesign] },
        ],
        imageAlt: 'Black and white tie-dye Fugu with a white colorblock yoke',
        description: 'A monochrome tie-dye Fugu where the print flows into a crisp white yoke and cuffs, balancing pattern with clean contrast.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 20,
        featured: false,
        isNew: true,
        rating: 4.7,
        reviewCount: 74,
    },
    {
        id: 'td-fugu-design-111',
        name: 'TD-FUGU Design 111',
        slug: 'td-fugu-design-111',
        // price: 179, // original placeholder price
        // price: 40, // superseded — was converted at the live market GHS rate
        // price: 29.0323, // superseded — was converted at the site's old, stale GHS rate (15.50)
        price: 40.1786, // GHS 450 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵450 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: tdFuguDesign,
        images: [tdFuguDesign],
        colors: [
            { name: 'Gold & Green', image: tdFuguDesign, images: [tdFuguDesign] },
            { name: 'Maroon Batik', image: tdFuguBatik, images: [tdFuguBatik] },
            { name: 'Chartreuse Tie-Dye', image: tdFuguChartreuse, images: [tdFuguChartreuse] },
            { name: 'Plum Tie-Dye', image: tdFuguPlum, images: [tdFuguPlum] },
            { name: 'Cocoa Tie-Dye', image: tdFuguCocoa, images: [tdFuguCocoa] },
        ],
        imageAlt: 'Tie-dye Fugu with a striped colorblock yoke and cuffs',
        description: 'An oversized tie-dye Fugu balanced by a striped colorblock yoke and cuffs, for a bold, considered silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: false,
        rating: 4.9,
        reviewCount: 143,
    },
    {
        id: 'fugu-multi-c',
        name: 'FUGU-MULTI C',
        slug: 'fugu-multi-c',
        price: 75.8929, // GHS 850 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵850 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: fuguMultiC,
        images: [fuguMultiC, fuguMultiCSide],
        colors: [
            { name: 'Gold & Burgundy Stripe', image: fuguMultiC, hoverImage: fuguMultiCSide, images: [fuguMultiC, fuguMultiCSide] },
            { name: 'Forest & Sky Colorblock', image: fuguMultiC01, hoverImage: fuguMultiC01Side, images: [fuguMultiC01, fuguMultiC01Side] },
        ],
        imageAlt: 'Striped Fugu with a metallic gold panel and fringe pockets',
        description: 'A striped Fugu with contrasting patch pockets and fringe trim, finished with a bold colorblock panel for a handcrafted, textural edge.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 12,
    },
    {
        id: 'fugu-p-design-112',
        name: 'FUGU-P-DESIGN 112',
        slug: 'fugu-p-design-112',
        price: 71.4286, // GHS 800 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵800 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: fuguPDesign112,
        images: [fuguPDesign112],
        colors: [
            { name: 'Green & Gold Stripe', image: fuguPDesign112, images: [fuguPDesign112] },
        ],
        imageAlt: 'Striped Fugu with a black colorblock yoke and patch pockets',
        description: 'A striped Fugu grounded by a bold black colorblock yoke and patch pockets, for a sharp, graphic silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 9,
    },
    {
        id: 'fugu-m-tassels-221',
        name: 'FUGU-M-TASSELS 221',
        slug: 'fugu-m-tassels-221',
        price: 71.4286, // GHS 800 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵800 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: fuguMTassels221,
        images: [fuguMTassels221, fuguMTassels221Side],
        colors: [
            { name: 'Multicolor Stripe — Front', image: fuguMTassels221, images: [fuguMTassels221] },
            { name: 'Multicolor Stripe — Side', image: fuguMTassels221Side, images: [fuguMTassels221Side] },
        ],
        imageAlt: 'Multicolor striped Fugu poncho with tassel fringe',
        description: 'A relaxed, poncho-style Fugu in a rich multicolor stripe, finished with a V-neckline and tassel fringe hem for a bold, easy silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 7,
    },
    {
        id: 'editorial-flowing-gown',
        name: 'Flowing Editorial Gown',
        slug: 'editorial-flowing-gown',
        price: 289,
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: editorial01,
        images: [editorial01],
        imageAlt: 'Flowing editorial gown',
        description: 'A dramatic floor-length gown with fluid movement and refined silhouette — made for moments that demand presence.',
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 6,
        featured: true,
        isNew: true,
        rating: 5.0,
        reviewCount: 42,
    },
    {
        id: 'structured-statement-dress',
        name: 'Structured Statement Dress',
        slug: 'structured-statement-dress',
        price: 215,
        // compareAtPrice: 260, // superseded — placeholder "was" price, not a real sale
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: editorial02,
        images: [editorial02],
        imageAlt: 'Structured statement dress',
        description: 'Clean lines meet expressive design in this structured midi dress — a wardrobe investment built to last seasons.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 9,
        featured: false,
        isNew: true,
        rating: 4.8,
        reviewCount: 58,
    },
    {
        id: 'signature-print-maxi',
        name: 'Signature Print Maxi',
        slug: 'signature-print-maxi',
        price: 185,
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: editorial03,
        images: [editorial03],
        imageAlt: 'Signature print maxi dress',
        description: 'A bold maxi in one of Rudambek\'s signature prints — full length, full impact, effortlessly elegant.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 14,
        featured: false,
        isNew: false,
        rating: 4.7,
        reviewCount: 81,
    },
    {
        id: 'relaxed-print-co-ord',
        name: 'Relaxed Print Co-ord',
        slug: 'relaxed-print-co-ord',
        price: 155,
        // compareAtPrice: 185, // superseded — placeholder "was" price, not a real sale
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: editorial05,
        images: [editorial05],
        imageAlt: 'Relaxed print co-ord set',
        description: 'A lightweight co-ord set in a seasonal print — wear together for a complete look or mix with your existing wardrobe.',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 11,
        featured: false,
        isNew: true,
        rating: 4.6,
        reviewCount: 63,
    },
    {
        id: 'wrap-front-midi-dress',
        name: 'Wrap-Front Midi Dress',
        slug: 'wrap-front-midi-dress',
        price: 139,
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: editorial06,
        images: [editorial06],
        imageAlt: 'Wrap-front midi dress',
        description: 'A versatile wrap-front midi with an adjustable fit and flattering silhouette — a reliable cornerstone for any wardrobe.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 18,
        featured: false,
        isNew: false,
        rating: 4.8,
        reviewCount: 107,
    },
    {
        id: 'burgundy-stripe-kaftan',
        name: 'BURGUNDY STRIPE KAFTAN',
        slug: 'burgundy-stripe-kaftan',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: 'Fugu',
        image: burgundyStripeKaftan1,
        images: [burgundyStripeKaftan1, burgundyStripeKaftan2],
        colors: [
            { name: 'Burgundy & Green Stripe — Look 1', image: burgundyStripeKaftan1, images: [burgundyStripeKaftan1] },
            { name: 'Burgundy & Green Stripe — Look 2', image: burgundyStripeKaftan2, images: [burgundyStripeKaftan2] },
        ],
        imageAlt: 'Burgundy and green striped kaftan with a V-neck and patch pockets',
        description: 'An elegant floor-length kaftan in bold burgundy and green stripes, finished with a V-neckline and structured patch pockets for a striking, statement silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.9,
        reviewCount: 6,
    },
    {
        id: 'embroidered-kaftan-men',
        name: 'EMBROIDERED KAFTAN MEN',
        slug: 'embroidered-kaftan-men',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: "Men's",
        image: embroideredKaftanMen,
        images: [embroideredKaftanMen],
        colors: [
            { name: 'Plum & Teal Embroidery', image: embroideredKaftanMen, images: [embroideredKaftanMen] },
        ],
        imageAlt: 'Plum embroidered agbada with teal detailing and matching cap',
        description: 'A regal agbada in deep plum, richly embroidered in teal and paired with a matching cap for a commanding, ceremonial silhouette.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.9,
        reviewCount: 4,
    },
];

export function getProductById(id) {
    return PRODUCTS.find((product) => product.id === String(id));
}

export function isProductOnSale(product) {
    return (
        Number.isFinite(product.compareAtPrice) &&
        product.compareAtPrice > product.price
    );
}

export function getDiscountPercentage(product) {
    if (!isProductOnSale(product)) return 0;
    return Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
    );
}

const LOW_STOCK_THRESHOLD = 6;
const BEST_SELLER_REVIEW_THRESHOLD = 100;
const STANDOUT_DISCOUNT_THRESHOLD = 20;

export function getProductBadge(product) {
    const onSale = isProductOnSale(product);
    const discountPercentage = getDiscountPercentage(product);

    if (product.stock <= 0) {
        return { label: 'Restocking Soon', tone: 'restock' };
    }

    if (onSale && discountPercentage >= STANDOUT_DISCOUNT_THRESHOLD) {
        return { label: 'Sale', tone: 'sale' };
    }

    if (product.stock <= LOW_STOCK_THRESHOLD) {
        return { label: 'Limited Run', tone: 'limited' };
    }

    if (product.reviewCount >= BEST_SELLER_REVIEW_THRESHOLD) {
        return { label: 'Best Seller', tone: 'bestseller' };
    }

    if (product.isNew) {
        return { label: 'New', tone: 'new' };
    }

    if (onSale) {
        return { label: 'Sale', tone: 'sale' };
    }

    return null;
}

export function getRelatedProducts(product, limit = 4) {
    return PRODUCTS.filter(
        (item) => item.id !== product.id && item.category === product.category
    ).slice(0, limit);
}

export function getRecommendedProducts(excludeIds = [], limit = 4) {
    const eligible = PRODUCTS.filter((item) => !excludeIds.includes(item.id));
    const featured = eligible.filter((item) => item.featured);
    const rest = eligible.filter((item) => !item.featured);

    return [...featured, ...rest].slice(0, limit);
}
