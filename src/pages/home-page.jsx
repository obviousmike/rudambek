import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../features/products/components/product-card';
import { PRODUCTS } from '../features/products/product-store';
import { HeroCarousel } from '../components/ui/hero-carousel';
import { Reveal } from '../components/ui/reveal';
import { AsSeenOnSection } from './as-seen-on-page';
import { usePageMeta } from '../hooks/use-page-meta';
import { TruckIcon, ShieldIcon, ReturnIcon, PinIcon } from '../components/ui/trust-icons';

import editorial01 from '../assets/products/editorial-01.jpg';
import editorial02 from '../assets/products/editorial-02.jpg';
import editorial03 from '../assets/products/editorial-03.jpg';
import editorial04 from '../assets/products/editorial-04.jpg';
import editorial05 from '../assets/products/editorial-05.jpg';
import editorial06 from '../assets/products/editorial-06.jpg';

import embroideredKaftan from '../assets/products/embroidered-kaftan.jpg';
import ankaraKaftan from '../assets/products/ankara-kaftan.jpg';
import resortShirt from '../assets/products/resort-shirt.jpg';
import amaniNation from '../assets/products/amani-nation.jpg';

const GOLD = '#c9a24b';

const SIGNATURE_COLLECTIONS = [
    {
        id: 'contemporary',
        number: '01',
        name: 'Contemporary African Wear',
        description:
            'Modern designs inspired by African heritage for everyday elegance.',
        image: ankaraKaftan,
        span: 'lg:row-span-2 sm:col-span-2 lg:col-span-1',
        minHeight: 'min-h-[340px] sm:min-h-[420px] lg:min-h-0',
    },
    {
        id: 'northern-heritage',
        number: '02',
        name: 'Northern Heritage Collection',
        description:
            'Premium garments crafted from authentic handwoven Fugu fabric, celebrating the rich textile traditions of Northern Ghana.',
        image: editorial06,
        span: 'sm:col-span-2 lg:col-span-2',
        minHeight: 'min-h-[280px] lg:min-h-0',
    },
    {
        id: 'ready-to-wear',
        number: '03',
        name: 'Ready-to-Wear Collection',
        description:
            'Stylish, comfortable, and versatile outfits suitable for work, travel, social events, and casual wear.',
        image: editorial03,
        span: 'lg:col-span-1',
        minHeight: 'min-h-[240px] lg:min-h-0',
    },
    {
        id: 'bespoke',
        number: '04',
        name: 'Bespoke Collection',
        description:
            'Personalized clothing designed and tailored to meet clients’ unique preferences and occasions.',
        image: editorial04,
        span: 'lg:col-span-1',
        minHeight: 'min-h-[240px] lg:min-h-0',
    },
];

const CATEGORIES = [
    {
        id: 'dresses',
        name: 'African Print Dresses',
        eyebrow: 'Womenswear',
        description:
            'Bold prints and expressive silhouettes for celebrations, evenings, and everyday presence.',
        image: ankaraKaftan,
        shopCategory: 'Dresses',
    },
    {
        id: 'kaftans',
        name: 'Boubou & Kaftans',
        eyebrow: 'Womenswear',
        description:
            'Fluid shapes, considered volume, and effortless elegance in motion.',
        image: embroideredKaftan,
        shopCategory: 'Kaftans',
    },
    {
        id: 'shirts',
        name: 'Printed Shirts',
        eyebrow: 'Menswear',
        description:
            'Confident resort and occasion shirts made for modern self-expression.',
        image: resortShirt,
        shopCategory: 'Shirts',
    },
    {
        id: 'sets',
        name: 'Two-Piece Sets',
        eyebrow: 'Coordinated dressing',
        description:
            'Thoughtful separates designed to work together and apart.',
        image: amaniNation,
        shopCategory: 'Two-Piece Sets',
    },
    {
        id: 'heritage',
        name: 'Heritage Textures',
        eyebrow: 'Craft and identity',
        description:
            'Pieces inspired by African pattern, tradition, and textile craft.',
        image: editorial01,
        shopCategory: 'Two-Piece Sets',
    },
    {
        id: 'occasionwear',
        name: 'Occasionwear',
        eyebrow: 'For significant moments',
        description:
            'Distinctive dressing for ceremonies, celebrations, and milestones.',
        image: editorial02,
        shopCategory: 'Dresses',
    },
    {
        id: 'ready-to-wear',
        name: 'Ready-to-Wear',
        eyebrow: 'The immediate edit',
        description:
            'Curated seasonal pieces available now, without compromise.',
        image: editorial03,
        shopCategory: 'All',
    },
    {
        id: 'custom-made',
        name: 'Custom Made',
        eyebrow: 'Made for you',
        description:
            'A considered service for pieces designed around your vision.',
        image: editorial04,
        shopCategory: 'All',
    },
    {
        id: 'accessories',
        name: 'Accessories',
        eyebrow: 'Finishing touches',
        description:
            'The final details that complete a distinctive Rudambek look.',
        image: editorial05,
        shopCategory: 'All',
    },
    {
        id: 'family-dressing',
        name: 'Family Dressing',
        eyebrow: 'Together edit',
        description:
            'Coordinated pieces for couples, families, and group occasions.',
        image: editorial06,
        shopCategory: 'Two-Piece Sets',
    },
];

export function HomePage() {
    usePageMeta();

    const latestProducts = PRODUCTS.slice(0, 4);

    return (
        <main className="bg-[#faf7f3]">
            <section aria-label="Rudambek featured collection">
                <HeroCarousel />
            </section>

            <TrustStrip />

            <section
                id="catalog"
                aria-labelledby="catalog-title"
                className="scroll-mt-[156px] bg-[#faf7f3] py-24 sm:py-28"
            >
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    <div className="mb-10 flex flex-col gap-7 border-b border-slate-200/80 pb-8 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <p
                                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                                style={{ color: GOLD }}
                            >
                                The latest edit
                            </p>

                            <h1
                                id="catalog-title"
                                className="font-display font-normal text-4xl leading-tight text-slate-900 sm:text-5xl"
                            >
                                New Arrivals
                            </h1>

                            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                                Discover timeless silhouettes, expressive
                                prints, and considered pieces from the latest
                                Rudambek collection.
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-5 md:justify-end">
                            <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                {PRODUCTS.length}{' '}
                                {PRODUCTS.length === 1 ? 'piece' : 'pieces'}
                            </span>
                        </div>
                    </div>

                    {latestProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                                {latestProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        showColorSwatches={false}
                                    />
                                ))}
                            </div>

                            {/* Gold collection CTA */}
                            <div className="mt-12 overflow-hidden bg-slate-900 shadow-xl shadow-slate-900/10">
                                <div className="flex flex-col gap-7 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-8">
                                    <div className="max-w-xl">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e1bd6c]">
                                            Continue exploring
                                        </p>

                                        <h2 className="mt-2 font-display font-normal text-2xl leading-tight text-white sm:text-3xl">
                                            Find the piece that feels like you.
                                        </h2>

                                        <p className="mt-2 text-sm leading-6 text-white/60">
                                            Explore the complete Rudambek
                                            wardrobe, from expressive prints
                                            to considered occasionwear.
                                        </p>
                                    </div>

                                    <Link
                                        to="/shop"
                                        className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#c9a24b] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8822f] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-9"
                                    >
                                        View all pieces

                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyCollection />
                    )}
                </div>
            </section>

            <Reveal>
                <CategoryRail />
            </Reveal>

            <Reveal>
                <ProductMarquee />
            </Reveal>

            <Reveal>
                <OurStoryTeaser />
            </Reveal>

            <Reveal>
                <SignatureCollections />
            </Reveal>

            <Reveal>
                <AsSeenOnSection />
            </Reveal>

            <Reveal>
                <FaqNewsletter />
            </Reveal>
        </main>
    );
}

function CategoryRail() {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const categoryCount = CATEGORIES.length;

    const productCounts = useMemo(() => {
        return CATEGORIES.reduce((counts, category) => {
            counts[category.shopCategory] =
                category.shopCategory === 'All'
                    ? PRODUCTS.length
                    : PRODUCTS.filter(
                        (product) =>
                            product.category === category.shopCategory
                    ).length;

            return counts;
        }, {});
    }, []);

    const updateScrollState = useCallback(() => {
        const container = scrollRef.current;

        if (!container) return;

        const firstCard = container.querySelector(
            '[data-category-card]'
        );

        const cardWidth =
            firstCard?.getBoundingClientRect().width || 230;

        const maxScrollLeft =
            container.scrollWidth - container.clientWidth;

        const nextIndex = Math.round(
            container.scrollLeft / (cardWidth + 20)
        );

        setActiveIndex(
            Math.min(Math.max(nextIndex, 0), categoryCount - 1)
        );
        setCanScrollLeft(container.scrollLeft > 4);
        setCanScrollRight(container.scrollLeft < maxScrollLeft - 4);
    }, [categoryCount]);

    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return undefined;

        updateScrollState();

        container.addEventListener('scroll', updateScrollState, {
            passive: true,
        });

        window.addEventListener('resize', updateScrollState);

        return () => {
            container.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [updateScrollState]);

    const scroll = (direction) => {
        const container = scrollRef.current;

        if (!container) return;

        const firstCard = container.querySelector(
            '[data-category-card]'
        );

        const cardWidth =
            firstCard?.getBoundingClientRect().width || 230;

        container.scrollBy({
            left: direction * (cardWidth + 20),
            behavior: 'smooth',
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            scroll(1);
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scroll(-1);
        }
    };

    return (
        <section
            aria-labelledby="categories-title"
            className="bg-white py-24 sm:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-16">
                    <div className="max-w-sm shrink-0 lg:w-64">
                        <p
                            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                            style={{ color: GOLD }}
                        >
                            Explore the wardrobe
                        </p>

                        <h2
                            id="categories-title"
                            className="font-display font-normal text-3xl leading-tight text-slate-900 sm:text-4xl"
                        >
                            Find your expression
                        </h2>

                        <div
                            className="mt-5 h-px w-12"
                            style={{ backgroundColor: GOLD }}
                        />

                        <p className="mt-5 text-sm leading-6 text-slate-500">
                            Explore collections shaped around your style,
                            occasion, and point of view.
                        </p>

                        <Link
                            to="/categories"
                            className="group mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:text-[#a8822f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
                        >
                            Browse all categories

                            <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>

                        <div className="mt-8 border-t border-slate-200 pt-5">
                            <div className="flex items-center justify-between gap-4">
                                <div
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    <div className="flex items-baseline gap-1 font-mono text-xs tracking-[0.12em] text-slate-500">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {String(
                                                activeIndex + 1
                                            ).padStart(2, '0')}
                                        </span>

                                        <span className="text-slate-300">
                                            /
                                        </span>

                                        <span>
                                            {String(categoryCount).padStart(
                                                2,
                                                '0'
                                            )}
                                        </span>
                                    </div>

                                    <p className="mt-2 max-w-[180px] truncate text-[10px] uppercase tracking-[0.14em] text-slate-400">
                                        {CATEGORIES[activeIndex]?.name}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => scroll(-1)}
                                        disabled={!canScrollLeft}
                                        aria-label="Previous category"
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center border border-slate-300 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ←
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => scroll(1)}
                                        disabled={!canScrollRight}
                                        aria-label="Next category"
                                        className="flex h-10 w-10 cursor-pointer items-center justify-center border border-slate-300 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <div
                            ref={scrollRef}
                            tabIndex={0}
                            onKeyDown={handleKeyDown}
                            role="region"
                            aria-label="Browse Rudambek categories"
                            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 outline-none scrollbar-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-4"
                        >
                            {CATEGORIES.map((category) => {
                                const productCount =
                                    productCounts[category.shopCategory];

                                const destination =
                                    category.shopCategory === 'All'
                                        ? '/shop'
                                        : `/shop?category=${encodeURIComponent(
                                            category.shopCategory
                                        )}`;

                                return (
                                    <Link
                                        key={category.id}
                                        to={destination}
                                        data-category-card
                                        className="group w-[68vw] max-w-[260px] shrink-0 snap-start outline-none sm:w-[220px] lg:w-[230px]"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 ring-offset-4 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/20 group-focus-visible:ring-2 group-focus-visible:ring-[#c9a24b]">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                loading="lazy"
                                                className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                                            <div className="absolute inset-x-0 bottom-0 p-4">
                                                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e1bd6c]">
                                                    {category.eyebrow}
                                                </p>

                                                <h3 className="mt-2 font-display font-normal text-xl leading-tight text-white">
                                                    {category.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3">
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-700 transition group-hover:text-[#a8822f]">
                                                Shop collection
                                            </span>

                                            <span className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                                {productCount > 0
                                                    ? `${productCount} ${productCount === 1
                                                        ? 'piece'
                                                        : 'pieces'
                                                    }`
                                                    : 'Explore edit'}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div
                            className="mt-2 flex gap-1.5"
                            aria-hidden="true"
                        >
                            {CATEGORIES.map((category, index) => (
                                <span
                                    key={category.id}
                                    className={`h-1 transition-all duration-300 ${index === activeIndex
                                            ? 'w-8 bg-[#c9a24b]'
                                            : 'w-2 bg-slate-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MarqueeItem({ product, duplicate = false }) {
    return (
        <Link
            to={`/product/${product.id}`}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap sm:gap-10"
            aria-hidden={duplicate ? 'true' : undefined}
            tabIndex={duplicate ? -1 : 0}
        >
            <span className="font-serif text-lg italic text-white transition-colors hover:text-slate-900 sm:text-xl">
                {product.name}
            </span>

            <span aria-hidden="true" className="text-sm text-white/70">
                ·
            </span>
        </Link>
    );
}

function ProductMarquee() {
    return (
        <section
            aria-label="Featured products"
            className="overflow-hidden py-4"
            style={{ backgroundColor: GOLD }}
        >
            <div className="aso-marquee-wrap overflow-hidden">
                <div className="aso-track flex w-max items-center gap-8 sm:gap-10">
                    <div className="flex items-center gap-8 sm:gap-10">
                        {PRODUCTS.map((product) => (
                            <MarqueeItem
                                key={`first-${product.id}`}
                                product={product}
                            />
                        ))}
                    </div>

                    <div
                        className="flex items-center gap-8 sm:gap-10"
                        aria-hidden="true"
                    >
                        {PRODUCTS.map((product) => (
                            <MarqueeItem
                                key={`second-${product.id}`}
                                product={product}
                                duplicate
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const TRUST_ITEMS = [
    {
        id: 'delivery',
        icon: TruckIcon,
        title: 'Free delivery in Ghana',
        detail: 'On all orders over ₵500',
    },
    {
        id: 'secure',
        icon: ShieldIcon,
        title: 'Secure checkout',
        detail: 'Protected payment processing',
    },
    {
        id: 'returns',
        icon: ReturnIcon,
        title: '14-day returns',
        detail: 'On ready-to-wear pieces',
    },
    {
        id: 'made',
        icon: PinIcon,
        title: 'Made in Ghana',
        detail: 'Designed and produced locally',
    },
];

function TrustStrip() {
    return (
        <section
            aria-label="Why shop with Rudambek"
            className="bg-white"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/80 lg:grid-cols-4 lg:divide-y-0">
                    {TRUST_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 px-4 py-6 sm:gap-4 sm:px-6"
                            >
                                <Icon
                                    className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
                                    style={{ color: GOLD }}
                                />

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold leading-tight text-slate-900 sm:text-sm">
                                        {item.title}
                                    </p>
                                    <p className="mt-0.5 hidden text-[11px] leading-tight text-slate-500 sm:block">
                                        {item.detail}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function OurStoryTeaser() {
    return (
        <section
            aria-labelledby="our-story-title"
            className="bg-[#faf7f3] py-24 sm:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 shadow-xl sm:aspect-[16/10] lg:aspect-[4/5]">
                        <img
                            src={editorial02}
                            alt="Rudambek design studio and craftsmanship"
                            loading="lazy"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="max-w-xl">
                        <p
                            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                            style={{ color: GOLD }}
                        >
                            Our story
                        </p>

                        <h2
                            id="our-story-title"
                            className="font-display font-normal text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
                        >
                            Rooted in Ghana,
                            <br />
                            worn everywhere.
                        </h2>

                        <div
                            className="mt-5 h-px w-12"
                            style={{ backgroundColor: GOLD }}
                        />

                        <p className="mt-5 text-sm leading-7 text-slate-500">
                            Rudambek began as a small studio in Accra with a
                            simple belief: that African craft and heritage
                            textiles deserve a place in modern wardrobes.
                            Every piece is designed, cut, and finished by
                            hand — a slower, more considered way of making
                            clothes.
                        </p>

                        <Link
                            to="/about"
                            className="group mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:text-[#a8822f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
                        >
                            Discover our story
                            <span
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SignatureCollections() {
    return (
        <section
            aria-labelledby="signature-collections-title"
            className="bg-white py-24 sm:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="max-w-2xl">
                    <p
                        className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                        style={{ color: GOLD }}
                    >
                        The Rudambek edit
                    </p>

                    <h2
                        id="signature-collections-title"
                        className="font-display font-normal text-3xl leading-tight text-slate-900 sm:text-4xl"
                    >
                        Signature Collections
                    </h2>

                    <div
                        className="mt-5 h-px w-12"
                        style={{ backgroundColor: GOLD }}
                    />

                    <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500">
                        From heritage textiles to made-to-measure tailoring —
                        four distinct lines, one philosophy.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[280px_280px]">
                    {SIGNATURE_COLLECTIONS.map((collection) => (
                        <SignatureCollectionCard
                            key={collection.id}
                            collection={collection}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SignatureCollectionCard({ collection }) {
    return (
        <Link
            to="/shop"
            className={`group relative flex flex-col justify-end overflow-hidden bg-slate-900 ${collection.span} ${collection.minHeight}`}
        >
            <img
                src={collection.image}
                alt={collection.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -top-3 right-5 text-[110px] font-normal leading-none text-white/10 sm:text-[130px]"
            >
                {collection.number}
            </span>

            <div className="relative p-6 sm:p-8">
                <h3 className="font-display text-xl font-normal leading-tight text-white sm:text-2xl">
                    {collection.name}
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                    {collection.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e1bd6c] transition-transform duration-300 group-hover:translate-x-1">
                    Explore collection
                    <span aria-hidden="true">→</span>
                </span>
            </div>
        </Link>
    );
}


function EmptyCollection() {
    return (
        <div className="py-20 text-center">
            <p className="font-display text-2xl text-slate-800">
                The collection is being refreshed.
            </p>
            <p className="mt-2 text-sm text-slate-500">
                Please check back soon for new arrivals.
            </p>
        </div>
    );
}

const HOME_FAQS = [
    { q: 'What payment methods do you accept?', a: 'We accept major credit and debit cards, mobile money, and bank transfers. All transactions are processed securely.' },
    { q: 'Where are you located?', a: 'Rudambek is based in Accra, Ghana. We design and produce locally and ship worldwide.' },
    { q: 'What is your shipping and return policy?', a: 'We offer delivery within Ghana (3–5 business days) and international shipping (7–14 business days). Ready-to-wear pieces can be returned within 14 days in original condition. Custom orders are non-returnable.' },
    { q: 'How can I track my order?', a: 'Once your order is dispatched, you will receive a tracking number by email to follow your delivery in real time.' },
];

function FaqNewsletter() {
    const [openIndex, setOpenIndex] = useState(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) setSubscribed(true);
    };

    return (
        <section className="bg-white py-24 sm:py-28">
            <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24">

                    {/* Left: FAQ */}
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
                            Need to know
                        </p>
                        <h2 className="mt-3 font-display font-normal text-4xl leading-tight text-slate-900 sm:text-5xl">
                            Frequently asked<br />questions
                        </h2>
                        <div className="mt-4 w-10 h-[2px]" style={{ backgroundColor: GOLD }} />

                        <div className="mt-10 divide-y divide-slate-200 border-b border-slate-200">
                            {HOME_FAQS.map((item, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div key={i}>
                                        <button
                                            onClick={() => toggle(i)}
                                            className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className={`text-sm font-medium transition-colors ${isOpen ? 'text-[#C9A24B]' : 'text-slate-800 group-hover:text-[#C9A24B]'}`}>
                                                {item.q}
                                            </span>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                            >
                                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        {isOpen && (
                                            <p className="pb-5 text-sm leading-7 text-slate-500">{item.a}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            to="/faq"
                            className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 hover:text-[#a8822f] transition-colors"
                        >
                            View all FAQs →
                        </Link>
                    </div>

                    {/* Right: Newsletter */}
                    <div className="min-w-0 bg-[#F5F0E8] p-8 sm:p-10 flex flex-col justify-center shadow-sm ring-1 ring-black/[0.03]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>
                            Stay in the know
                        </p>
                        <h3 className="mt-3 font-display font-normal text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Style updates,<br />delivered<br />thoughtfully.
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Be the first to discover new collections, private events, styling notes, and special offers from Rudambek.
                        </p>

                        {subscribed ? (
                            <div className="mt-8">
                                <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: GOLD }} />
                                <p className="font-display text-lg text-slate-900">You're subscribed.</p>
                                <p className="mt-1 text-sm text-slate-500">Welcome to the Rudambek inner circle.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="mt-8">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email address"
                                        required
                                        className="min-w-0 flex-1 min-h-12 border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] transition"
                                    />
                                    <button
                                        type="submit"
                                        className="min-h-12 bg-slate-900 hover:bg-[#C9A24B] text-white px-5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center gap-2 whitespace-nowrap"
                                    >
                                        Subscribe
                                        <span aria-hidden="true" className="text-sm">↗</span>
                                    </button>
                                </div>
                                <p className="mt-3 text-[10px] text-slate-400 leading-5">
                                    By subscribing, you agree to receive updates from Rudambek Clothing.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}