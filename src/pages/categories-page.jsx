import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

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

import { PRODUCTS } from '../features/products/product-store';

const CATEGORIES = [
    {
        id: 'african-print-dresses',
        name: 'African Print Dresses',
        description:
            'Bold Ankara and Kente prints crafted into elegant, wearable dresses for every occasion.',
        image: ankaraKaftan,
        shopCategory: 'Dresses',
        tag: "Women's",
    },
    {
        id: 'mens-african-print-shirts',
        name: "Men's African Print Shirts",
        description:
            'Expressive prints tailored into sharp, relaxed shirts that carry culture with confidence.',
        image: resortShirt,
        shopCategory: "Men's",
        tag: "Men's",
    },
    {
        id: 'mens-two-piece-sets',
        name: "Men's Two-Piece Sets",
        description:
            'Coordinated sets designed for the modern African man — effortlessly put together.',
        image: amaniNation,
        shopCategory: 'Two-Piece Sets',
        tag: "Men's",
    },
    {
        id: 'womens-boubou-dresses',
        name: "Women's Boubou Dresses",
        description:
            'Flowing, regal boubou silhouettes reimagined for contemporary style and everyday grace.',
        image: embroideredKaftan,
        shopCategory: 'Kaftans',
        tag: "Women's",
    },
    {
        id: 'northern-ghana-fugu',
        name: 'Northern Ghana Fugu (Smock) Wear',
        description:
            'Handwoven smock fabric from Northern Ghana, fashioned into statement pieces that honour tradition.',
        image: editorial01,
        shopCategory: 'Two-Piece Sets',
        tag: 'Heritage',
    },
    {
        id: 'corporate-african-wear',
        name: 'Corporate African Wear',
        description:
            'Professional silhouettes fused with African prints — dress for the boardroom without losing your identity.',
        image: editorial02,
        shopCategory: 'Dresses',
        tag: 'Corporate',
    },
    {
        id: 'ready-to-wear',
        name: 'Ready-to-Wear Collections',
        description:
            'Curated seasonal pieces available immediately — no waiting, no compromise.',
        image: editorial03,
        shopCategory: 'All',
        tag: 'Ready-to-Wear',
    },
    {
        id: 'custom-made',
        name: 'Custom-Made Clothing',
        description:
            'Your vision, our craft. Tell us what you need and we will bring it to life.',
        image: editorial04,
        shopCategory: 'All',
        tag: 'Custom',
    },
    {
        id: 'fashion-accessories',
        name: 'Fashion Accessories',
        description:
            'Headwraps, jewellery, bags, and finishing touches that complete any Rudambek look.',
        image: editorial05,
        shopCategory: 'All',
        tag: 'Accessories',
    },
    {
        id: 'family-couple-collections',
        name: 'Family and Couple Collections',
        description:
            'Matching and coordinated sets for couples, families, and special group occasions.',
        image: editorial06,
        shopCategory: 'Two-Piece Sets',
        tag: 'Family',
    },
    {
        id: 'event-occasion-wear',
        name: 'Event and Occasion Wear',
        description:
            'From weddings to funerals, naming ceremonies to graduations — dressed for every milestone.',
        image: editorial01,
        shopCategory: 'Dresses',
        tag: 'Occasions',
    },
];

const FILTER_TYPES = [
    'All',
    "Women's",
    "Men's",
    'Heritage',
    'Corporate',
    'Ready-to-Wear',
    'Custom',
    'Accessories',
    'Family',
    'Occasions',
];

export function CategoriesPage() {
    usePageMeta({
        title: 'Categories',
        description:
            'Shop Rudambek Clothing by category — dresses, kaftans, menswear, and accessories inspired by Ghanaian craftsmanship.',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [activeType, setActiveType] = useState('All');

    const productCounts = useMemo(() => {
        return PRODUCTS.reduce((counts, product) => {
            counts[product.category] =
                (counts[product.category] || 0) + 1;

            return counts;
        }, {});
    }, []);

    const visibleCategories = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return CATEGORIES.filter((category) => {
            const matchesType =
                activeType === 'All' || category.tag === activeType;

            const searchableText = [
                category.name,
                category.description,
                category.tag,
                category.shopCategory,
            ]
                .join(' ')
                .toLowerCase();

            const matchesSearch =
                query.length === 0 || searchableText.includes(query);

            return matchesType && matchesSearch;
        });
    }, [activeType, searchTerm]);

    const hasActiveFilters =
        activeType !== 'All' || searchTerm.trim().length > 0;

    const resetFilters = () => {
        setActiveType('All');
        setSearchTerm('');
    };

    return (
        <main className="min-h-screen bg-[#faf8f4] text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-900">
                <img
                    src={ankaraKaftan}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-25"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />

                <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
                    <Breadcrumbs
                        variant="dark"
                        className="mb-6"
                        items={[
                            { label: 'Home', to: '/' },
                            { label: 'Categories' },
                        ]}
                    />

                    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c9a24b]">
                                Browse by category
                            </p>

                            <h1 className="font-serif text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                                Our
                                <br />
                                <span className="italic">Collections</span>
                            </h1>

                            <div className="mt-5 h-[2px] w-12 bg-[#c9a24b]" />

                            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65">
                                Explore everything Rudambek has to offer — from
                                bold African prints to custom-made couture. A
                                piece for every identity and occasion.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-5">
                            <Link
                                to="/shop"
                                className="inline-flex min-h-11 items-center gap-3 bg-[#c9a24b] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8822f] hover:shadow-xl"
                            >
                                Shop all pieces
                                <span aria-hidden="true">→</span>
                            </Link>

                            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                                {CATEGORIES.length} collections
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section
                aria-label="Collection filters"
                className="sticky top-[156px] z-20 border-b border-black/[0.06] bg-[#faf8f4]/95 backdrop-blur-md"
            >
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    <div className="py-4">
                        {/* Horizontally scrollable filter pills */}
                        <div
                            className="flex min-w-0 gap-2 overflow-x-auto pb-2 scrollbar-none"
                            role="group"
                            aria-label="Filter collections by type"
                        >
                            {FILTER_TYPES.map((type) => {
                                const isActive = activeType === type;

                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        aria-pressed={isActive}
                                        onClick={() => setActiveType(type)}
                                        className={`min-h-10 shrink-0 cursor-pointer whitespace-nowrap border px-4 text-[10px] font-semibold uppercase tracking-[0.15em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] ${isActive
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-[#c9a24b] hover:text-[#a8822f]'
                                            }`}
                                    >
                                        {type === 'All'
                                            ? 'All collections'
                                            : type}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search and count on their own row */}
                        <div className="mt-3 flex min-w-0 flex-col gap-3 border-t border-slate-200/80 pt-3 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                                {visibleCategories.length}{' '}
                                {visibleCategories.length === 1
                                    ? 'collection'
                                    : 'collections'}
                            </span>

                            <label className="block w-full sm:max-w-xs">
                                <span className="sr-only">
                                    Search collections
                                </span>

                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search collections..."
                                    className="min-h-10 w-full rounded-none border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b]"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category grid */}
            <Reveal>
            <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
                <div className="mb-10 flex items-end justify-between gap-5">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a24b]">
                            The Rudambek edit
                        </p>

                        <h2 className="mt-2 font-serif text-3xl text-slate-900 sm:text-4xl">
                            Find your expression
                        </h2>
                    </div>

                    <span className="hidden text-xs uppercase tracking-[0.16em] text-slate-400 sm:block">
                        {visibleCategories.length}{' '}
                        {visibleCategories.length === 1
                            ? 'collection'
                            : 'collections'}
                    </span>
                </div>

                {visibleCategories.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                        {visibleCategories.map((category, index) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                featured={
                                    index === 0 &&
                                    activeType === 'All' &&
                                    !searchTerm
                                }
                                productCount={
                                    productCounts[category.shopCategory] || 0
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState onReset={resetFilters} />
                )}

                {hasActiveFilters && visibleCategories.length > 0 && (
                    <div className="mt-10 text-center">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="cursor-pointer text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-[#a8822f]"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </section>
            </Reveal>

            {/* Bottom CTA */}
            <Reveal>
            <section className="relative overflow-hidden bg-slate-900">
                <img
                    src={embroideredKaftan}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-20"
                    loading="lazy"
                    decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />

                <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24b]">
                            Continue exploring
                        </p>

                        <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                            See the full collection
                        </h2>

                        <p className="mt-3 max-w-md text-sm text-white/55">
                            Browse every piece in the Rudambek wardrobe,
                            filtered by style, occasion, or print.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">
                        <Link
                            to="/shop"
                            className="inline-flex min-h-12 items-center gap-3 bg-[#c9a24b] px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8822f] hover:shadow-xl"
                        >
                            View all pieces
                            <span aria-hidden="true">→</span>
                        </Link>

                        <Link
                            to="/"
                            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 transition hover:text-white"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
            </Reveal>
        </main>
    );
}

function CategoryCard({ category, featured, productCount }) {
    const destination =
        category.shopCategory === 'All'
            ? '/shop'
            : `/shop?category=${encodeURIComponent(
                category.shopCategory
            )}`;

    return (
        <Link
            to={destination}
            aria-label={`Shop ${category.name}`}
            className={`group block overflow-hidden bg-slate-100 shadow-md transition-all duration-300 outline-none hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2 ${featured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
        >
            <div
                className={`relative overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
            >
                <img
                    src={category.image}
                    alt={category.name}
                    loading={featured ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition duration-500 group-hover:from-black/95" />

                <div className="absolute left-4 top-4">
                    <span className="inline-block border border-white/30 bg-black/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                        {category.tag}
                    </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3
                        className={`font-serif leading-tight text-white ${featured
                                ? 'text-2xl sm:text-3xl'
                                : 'text-xl'
                            }`}
                    >
                        {category.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-6 text-white/70">
                        {category.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/20 pt-3">
                        <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e1bd6c]">
                            Shop now

                            <span
                                aria-hidden="true"
                                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </span>

                        <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                            {productCount > 0
                                ? `${productCount} ${productCount === 1
                                    ? 'piece'
                                    : 'pieces'
                                }`
                                : 'Explore edit'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="border border-slate-200 bg-white px-6 py-24 text-center">
            <p className="font-serif text-2xl text-slate-800">
                No collections found.
            </p>

            <p className="mt-2 text-sm text-slate-500">
                Try a different search or browse all collections.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-7 min-h-11 cursor-pointer border border-slate-900 px-7 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
                Reset filters
            </button>
        </div>
    );
}