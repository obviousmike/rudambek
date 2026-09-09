import pFuguDesign from '../../assets/products/P-FUGU Design GHS - 400.jpg';
import pFuguPatches from '../../assets/products/P-FUGU Patches ghs - 450.jpg';
import tdPDesign from '../../assets/products/TD-P Design GHS -  350.jpg';
import fuguMTassels221 from '../../assets/products/FUGU-M-TASSELS 221.jpg';
import fuguMTassels221Side from '../../assets/products/FUGU-M-TASSELS 221 SIDE.jpeg';
import fuguMultiC from '../../assets/products/FUGU-MULTI C.jpg';
import fuguMultiCSide from '../../assets/products/FUGU-MULTI C SIDE.jpg';
import fuguMultiC01 from '../../assets/products/FUGU-MULTI C 01.jpg';
import fuguMultiC01Side from '../../assets/products/FUGU-MULTI C 01 SIDE.jpeg';
import fuguMultiC02 from '../../assets/products/FUGU-MULTI C 02.jpg';
import fuguMTassels222 from '../../assets/products/FUGU-M-TASSELS 222.jpg';
import fuguMTassels222Maroon from '../../assets/products/FUGU-M-TASSELS 222-1.jpeg';
import fuguMTassels222Green from '../../assets/products/FUGU-M-TASSELS 222-2.jpeg';
import fuguMTassels222Mustard from '../../assets/products/FUGU-M-TASSELS 222-3.jpeg';
import fugu300Green from '../../assets/products/FUGU 300-1.png';
import fugu300Black from '../../assets/products/FUGU 300-2.png';
import fugu300Fringe from '../../assets/products/FUGU 300-3.png';
import fuguPDesign112 from '../../assets/products/FUGU-P-DESIGN 112.jpg';
import tdFuguDesign from '../../assets/products/TD-FUGU Design 111 - GHS450.jpg';
import tdFuguBatik from '../../assets/products/TD-FUGU 01.jpg';
import tdFuguChartreuse from '../../assets/products/TD-FUGU 02.jpg';
import tdFuguPlum from '../../assets/products/TD-FUGU 03.jpg';
import tdFuguCocoa from '../../assets/products/TD-FUGU 04.jpg';
import burgundyStripeKaftan1 from '../../assets/products/burgundy-stripe-kaftan-1.jpg';
import burgundyStripeKaftan2 from '../../assets/products/burgundy-stripe-kaftan-2.jpg';
import burgundyStripeKaftan3 from '../../assets/products/burgundy-stripe-kaftan-3.jpg';
import burgundyStripeKaftan4 from '../../assets/products/burgundy-stripe-kaftan-4.jpg';
import embroideredKaftanMen from '../../assets/products/embroidered-kaftan-men.jpg';
import embroideredKaftanMen1 from '../../assets/products/embroidered-kaftan-men 1.jpg';
import kaftan440Blue from '../../assets/products/kaftan-440.jpeg';
import kaftan440Grey from '../../assets/products/kaftan-440-1.jpeg';
import kaftan440Wine from '../../assets/products/kaftan-440-2.jpeg';
import kaftan440Cream from '../../assets/products/kaftan-440-3.jpeg';
import kaftan440Green from '../../assets/products/kaftan-440-4.jpeg';
import resortShirt from '../../assets/products/resort-shirt.jpg';
import menTwoPieceNavy from '../../assets/products/Men two piece 1.png';
import menTwoPieceBrown from '../../assets/products/Men two piece 2.jpeg';
import menTwoPieceCharcoal from '../../assets/products/Men two piece 3.jpeg';
import menTwoPieceGrey from '../../assets/products/Men two piece 4.jpeg';
import womenTwoPieceChocolateLeaf from '../../assets/products/Women two piece1.png';
import womenTwoPieceWhiteRedBatik from '../../assets/products/Women two piece2.png';
import womenTwoPieceTaupeBronzeIkat from '../../assets/products/Women two piece3.png';
import womenTwoPieceWhiteEmeraldBatik from '../../assets/products/Women two piece4.png';
import womenTwoPieceKhakiMaroonMedallion from '../../assets/products/Women two piece5.png';
import clothPatchworkBlackSunsetBatik from '../../assets/products/Cloth Patchworks Women two piece1.png';
import clothPatchworkCobaltSunsetBatik from '../../assets/products/Cloth Patchworks Women two piece2.png';
import clothPatchworkBlackFuchsiaAnkara from '../../assets/products/Cloth Patchworks Women two piece3.png';
import clothPatchworkBlackTropical from '../../assets/products/Cloth Patchworks Women two piece4.png';
import womenTwoPieceBlushPinstripe from "../../assets/products/Women's Matching shirts & Pants set - Women two piece1.PNG";
import womenTwoPieceNavySolid from "../../assets/products/Women's Matching shirts & Pants set - Women two piece2.PNG";

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
        category: "Women's Fugu",
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
        category: "Women's Fugu",
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
        category: "Women's Fugu",
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
        category: "Women's Fugu",
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
        category: "Women's Fugu",
        image: fuguMultiC,
        images: [fuguMultiC, fuguMultiCSide, fuguMultiC02],
        colors: [
            { name: 'Gold & Burgundy Stripe', image: fuguMultiC, hoverImage: fuguMultiCSide, images: [fuguMultiC, fuguMultiCSide] },
            { name: 'Forest & Sky Colorblock', image: fuguMultiC01, hoverImage: fuguMultiC01Side, images: [fuguMultiC01, fuguMultiC01Side] },
            { name: 'Teal & Rust Stripe', image: fuguMultiC02, images: [fuguMultiC02] },
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
        category: "Women's Fugu",
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
        category: "Women's Fugu",
        image: fuguMTassels221,
        images: [fuguMTassels221, fuguMTassels221Side],
        colors: [
            { name: 'Multicolor Stripe', image: fuguMTassels221, hoverImage: fuguMTassels221Side, images: [fuguMTassels221, fuguMTassels221Side] },
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
        id: 'womens-patchwork-two-piece-set',
        name: "WOMEN'S PATCHWORK TWO-PIECE SET",
        slug: 'womens-patchwork-two-piece-set',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: womenTwoPieceChocolateLeaf,
        images: [
            womenTwoPieceChocolateLeaf,
            womenTwoPieceWhiteRedBatik,
            womenTwoPieceTaupeBronzeIkat,
            womenTwoPieceWhiteEmeraldBatik,
            womenTwoPieceKhakiMaroonMedallion,
        ],
        colors: [
            { name: 'Chocolate & Fern Leaf Print', image: womenTwoPieceChocolateLeaf, images: [womenTwoPieceChocolateLeaf] },
            { name: 'White & Red Batik', image: womenTwoPieceWhiteRedBatik, images: [womenTwoPieceWhiteRedBatik] },
            { name: 'Taupe & Bronze Ikat', image: womenTwoPieceTaupeBronzeIkat, images: [womenTwoPieceTaupeBronzeIkat] },
            { name: 'White & Emerald Batik Leaf', image: womenTwoPieceWhiteEmeraldBatik, images: [womenTwoPieceWhiteEmeraldBatik] },
            { name: 'Khaki & Maroon Medallion', image: womenTwoPieceKhakiMaroonMedallion, images: [womenTwoPieceKhakiMaroonMedallion] },
        ],
        imageAlt: 'Chocolate brown short-sleeve shirt with a leaf-print patch bib, paired with matching wide-leg leaf-print trousers',
        description: 'A short-sleeve collared shirt with a contrast patchwork bib, paired with coordinating wide-leg print trousers — available in a range of bold fabric pairings for a striking, considered silhouette.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'womens-matching-shirts-pants-set',
        name: "WOMEN'S MATCHING SHIRTS & PANTS SET",
        slug: 'womens-matching-shirts-pants-set',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: womenTwoPieceBlushPinstripe,
        images: [womenTwoPieceBlushPinstripe, womenTwoPieceNavySolid],
        colors: [
            { name: 'Blush Pinstripe', image: womenTwoPieceBlushPinstripe, images: [womenTwoPieceBlushPinstripe] },
            { name: 'Navy Solid', image: womenTwoPieceNavySolid, images: [womenTwoPieceNavySolid] },
        ],
        imageAlt: 'Blush pink pinstriped long-sleeve shirt and matching wide-leg trousers',
        description: 'A relaxed long-sleeve shirt and matching wide-leg trousers cut from the same fabric, for an easy, coordinated silhouette — available in striped and solid colorways.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'cloth-patchworks-women-two-piece',
        name: 'CLOTH PATCHWORKS WOMEN TWO PIECE',
        slug: 'cloth-patchworks-women-two-piece',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: 'Women Two-Piece',
        image: clothPatchworkBlackSunsetBatik,
        images: [
            clothPatchworkBlackSunsetBatik,
            clothPatchworkCobaltSunsetBatik,
            clothPatchworkBlackFuchsiaAnkara,
            clothPatchworkBlackTropical,
        ],
        colors: [
            { name: 'Black & Sunset Batik', image: clothPatchworkBlackSunsetBatik, images: [clothPatchworkBlackSunsetBatik] },
            { name: 'Cobalt & Sunset Batik', image: clothPatchworkCobaltSunsetBatik, images: [clothPatchworkCobaltSunsetBatik] },
            { name: 'Black & Fuchsia Ankara', image: clothPatchworkBlackFuchsiaAnkara, images: [clothPatchworkBlackFuchsiaAnkara] },
            { name: 'Black & Tropical Abstract', image: clothPatchworkBlackTropical, images: [clothPatchworkBlackTropical] },
        ],
        imageAlt: 'Black short-sleeve shirt with an orange and blue batik patch bib, paired with matching wide-leg batik trousers',
        description: 'A short-sleeve collared shirt with a contrast patchwork bib, paired with coordinating wide-leg print trousers — a bold patchwork edit in vivid batik and Ankara pairings.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'burgundy-stripe-kaftan',
        name: 'BURGUNDY STRIPE KAFTAN',
        slug: 'burgundy-stripe-kaftan',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: "Women's Fugu",
        image: burgundyStripeKaftan1,
        images: [burgundyStripeKaftan1, burgundyStripeKaftan2, burgundyStripeKaftan3, burgundyStripeKaftan4],
        colors: [
            { name: 'Burgundy & Green Stripe — Look 1', image: burgundyStripeKaftan1, images: [burgundyStripeKaftan1] },
            { name: 'Burgundy & Green Stripe — Look 2', image: burgundyStripeKaftan2, images: [burgundyStripeKaftan2] },
            { name: 'Navy & Orange Stripe', image: burgundyStripeKaftan3, images: [burgundyStripeKaftan3] },
            { name: 'Burgundy, Navy & Grey Stripe', image: burgundyStripeKaftan4, images: [burgundyStripeKaftan4] },
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
        images: [embroideredKaftanMen, embroideredKaftanMen1],
        colors: [
            { name: 'Plum & Teal Embroidery', image: embroideredKaftanMen, images: [embroideredKaftanMen] },
            { name: 'Rust & Gold Embroidery', image: embroideredKaftanMen1, images: [embroideredKaftanMen1] },
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
    {
        id: 'fugu-m-tassels-222',
        name: 'FUGU-M-TASSELS 222',
        slug: 'fugu-m-tassels-222',
        price: 52.70,
        compareAtPrice: null,
        currency: 'USD',
        category: "Men's Fugu",
        image: fuguMTassels222,
        images: [fuguMTassels222, fuguMTassels222Maroon, fuguMTassels222Green, fuguMTassels222Mustard],
        colors: [
            { name: 'Royal Blue & Silver Stripe', image: fuguMTassels222, images: [fuguMTassels222] },
            { name: 'Maroon & Gold Embroidery', image: fuguMTassels222Maroon, images: [fuguMTassels222Maroon] },
            { name: 'Forest Green & White Stripe', image: fuguMTassels222Green, images: [fuguMTassels222Green] },
            { name: 'Mustard Pattern', image: fuguMTassels222Mustard, images: [fuguMTassels222Mustard] },
        ],
        imageAlt: 'Royal blue men’s smock with silver stripe detailing and a beaded round collar',
        description: 'A traditional men’s smock with a richly beaded or embroidered round collar and flared bell sleeves, available in a range of bold colorways for a striking, ceremonial look.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'fugu-300',
        name: 'FUGU 300',
        slug: 'fugu-300',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: "Men's Fugu",
        image: fugu300Green,
        images: [fugu300Green, fugu300Black, fugu300Fringe],
        colors: [
            { name: 'Green & Yellow Stripe', image: fugu300Green, images: [fugu300Green] },
            { name: 'Black, Yellow & White Stripe', image: fugu300Black, images: [fugu300Black] },
            { name: 'Blue & Yellow Fringe', image: fugu300Fringe, images: [fugu300Fringe] },
        ],
        imageAlt: 'Green and yellow striped Fugu smock with patch pockets',
        description: 'A relaxed, short-sleeve Fugu smock with patch pockets, woven in bold multicolor stripes — available in a range of colorways for an easy, considered look.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'kaftan-440',
        name: 'KAFTAN 440',
        slug: 'kaftan-440',
        price: 43.91,
        compareAtPrice: null,
        currency: 'USD',
        category: "Men's",
        image: kaftan440Blue,
        images: [kaftan440Blue, kaftan440Grey, kaftan440Wine, kaftan440Cream, kaftan440Green],
        colors: [
            { name: 'Sky Blue', image: kaftan440Blue, images: [kaftan440Blue] },
            { name: 'Charcoal Grey', image: kaftan440Grey, images: [kaftan440Grey] },
            { name: 'Wine', image: kaftan440Wine, images: [kaftan440Wine] },
            { name: 'Cream', image: kaftan440Cream, images: [kaftan440Cream] },
            { name: 'Forest Green', image: kaftan440Green, images: [kaftan440Green] },
        ],
        imageAlt: 'Sky blue men’s kaftan with a mandarin collar and navy piped placket',
        description: 'A modern men’s kaftan in a clean silhouette, finished with a mandarin collar, navy piped placket, and a single breast pocket, paired with matching trousers for a polished, contemporary look.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'resort-shirt',
        name: 'Printed Resort Shirt',
        slug: 'printed-resort-shirt',
        price: 40.1786, // PLACEHOLDER — update once the real price is provided
        compareAtPrice: null,
        currency: 'USD',
        category: 'Men Shirt',
        image: resortShirt,
        images: [resortShirt],
        colors: [
            { name: 'Teal Geometric Print', image: resortShirt, images: [resortShirt] },
        ],
        imageAlt: 'Teal geometric print resort shirt with red and tan accents, paired with checked trousers',
        description: 'A short-sleeve resort shirt in a bold teal geometric print with red and tan accents, cut for a relaxed, confident silhouette.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
    },
    {
        id: 'mens-two-piece-set',
        name: "MEN'S TWO-PIECE SET",
        slug: 'mens-two-piece-set',
        price: 44.6429, // GHS 500 at the site's current rate (CURRENCY_RATES.GHS = 11.20) — displays as exactly ₵500 when currency is set to GHS
        compareAtPrice: null,
        currency: 'USD',
        category: 'Men Two-Piece',
        image: menTwoPieceNavy,
        images: [menTwoPieceNavy, menTwoPieceBrown, menTwoPieceCharcoal, menTwoPieceGrey],
        colors: [
            { name: 'Navy Blue', image: menTwoPieceNavy, images: [menTwoPieceNavy] },
            { name: 'Brown & Black Colorblock', image: menTwoPieceBrown, images: [menTwoPieceBrown] },
            { name: 'Charcoal Grey', image: menTwoPieceCharcoal, images: [menTwoPieceCharcoal] },
            { name: 'Grey & Blue Trim', image: menTwoPieceGrey, images: [menTwoPieceGrey] },
        ],
        imageAlt: 'Navy blue men’s two-piece set with a mandarin collar and matching trousers',
        description: 'A tailored men’s two-piece set pairing a mandarin-collar tunic with matching trousers, cut for a clean, coordinated silhouette suited to both formal and everyday occasions.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 5,
        featured: true,
        isNew: true,
        rating: 4.8,
        reviewCount: 3,
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
