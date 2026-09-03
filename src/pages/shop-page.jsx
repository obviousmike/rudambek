import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../features/products/components/product-card';
import { PRODUCTS, isProductOnSale } from '../features/products/product-store';
import { usePageMeta } from '../hooks/use-page-meta';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PAGE_SIZE = 12;

const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'sale', label: 'On Sale' },
];

export function ShopPage() {
    usePageMeta({
        title: 'Shop',
        description:
            'Browse the full Rudambek Clothing catalog — African print dresses, kaftans, resort shirts, and more, designed and made in Ghana.',
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategory = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('search') || '';
    const activeSort = searchParams.get('sort') || 'featured';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const activeSizes = useMemo(
        () =>
            (searchParams.get('sizes') || '')
                .split(',')
                .filter(Boolean),
        [searchParams]
    );
    const activeGroups = useMemo(
        () =>
            (searchParams.get('groups') || '')
                .split(',')
                .filter(Boolean),
        [searchParams]
    );

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (!isFilterOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsFilterOpen(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isFilterOpen]);

    const categories = useMemo(
        () => [
            'All',
            ...Array.from(
                new Set([
                    ...PRODUCTS.map((product) => product.category),
                    // Kept visible even with no products listed yet, so the
                    // category exists ready for future inventory.
                    'Men Two-Piece',
                ])
            ),
        ],
        []
    );

    const availableSizes = useMemo(() => {
        const sizes = new Set(PRODUCTS.flatMap((product) => product.sizes || []));
        return SIZE_ORDER.filter((size) => sizes.has(size));
    }, []);

    const availableGroups = useMemo(
        () =>
            PRODUCTS.map((product) => ({
                id: product.id,
                name: product.name,
            })).sort((a, b) => a.name.localeCompare(b.name)),
        []
    );

    const priceBounds = useMemo(() => {
        const prices = PRODUCTS.map((product) => product.price);
        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
        };
    }, []);

    const activeFilterCount =
        (minPrice ? 1 : 0) +
        (maxPrice ? 1 : 0) +
        (activeSizes.length > 0 ? 1 : 0) +
        (activeGroups.length > 0 ? 1 : 0);

    const filteredProducts = useMemo(() => {
        let results = PRODUCTS;

        if (activeCategory !== 'All') {
            results = results.filter(
                (product) => product.category === activeCategory
            );
        }

        const query = searchQuery.trim().toLowerCase();

        if (query) {
            results = results.filter((product) =>
                [product.name, product.category, product.description]
                    .join(' ')
                    .toLowerCase()
                    .includes(query)
            );
        }

        const numericMinPrice = minPrice ? Number(minPrice) : null;
        const numericMaxPrice = maxPrice ? Number(maxPrice) : null;

        if (numericMinPrice !== null) {
            results = results.filter(
                (product) => product.price >= numericMinPrice
            );
        }

        if (numericMaxPrice !== null) {
            results = results.filter(
                (product) => product.price <= numericMaxPrice
            );
        }

        if (activeSizes.length > 0) {
            results = results.filter((product) =>
                (product.sizes || []).some((size) =>
                    activeSizes.includes(size)
                )
            );
        }

        if (activeGroups.length > 0) {
            results = results.filter((product) =>
                activeGroups.includes(product.id)
            );
        }

        if (activeSort === 'sale') {
            results = results.filter(isProductOnSale);
        } else if (activeSort === 'newest') {
            results = [...results].sort(
                (a, b) => Number(b.isNew) - Number(a.isNew)
            );
        } else if (activeSort === 'price-asc') {
            results = [...results].sort((a, b) => a.price - b.price);
        } else if (activeSort === 'price-desc') {
            results = [...results].sort((a, b) => b.price - a.price);
        }

        // When filtering by a specific design/Group Name, show every color
        // variant as its own card instead of one card with a swatch picker.
        if (activeGroups.length > 0) {
            results = results.flatMap((product) => {
                if (!product.colors || product.colors.length < 2) {
                    return [product];
                }

                return product.colors.map((color, index) => ({
                    ...product,
                    name: `${product.name} — ${color.name}`,
                    image: color.image,
                    images: color.images,
                    imageAlt: `${product.name} — ${color.name}`,
                    initialColorIndex: index,
                    variantKey: `${product.id}::${color.name}`,
                }));
            });
        }

        return results;
    }, [activeCategory, searchQuery, activeSort, minPrice, maxPrice, activeSizes, activeGroups]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const requestedPage = Number(searchParams.get('page')) || 1;
    const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handlePageChange = (page) => {
        const nextParams = new URLSearchParams(searchParams);

        if (page <= 1) {
            nextParams.delete('page');
        } else {
            nextParams.set('page', String(page));
        }

        setSearchParams(nextParams);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    // Self-correct a stale/out-of-range page param — e.g. a bookmarked
    // ?page=3 link, or switching filters while on a later page than the
    // new result set has.
    useEffect(() => {
        if (requestedPage > totalPages) {
            const nextParams = new URLSearchParams(searchParams);

            if (totalPages <= 1) {
                nextParams.delete('page');
            } else {
                nextParams.set('page', String(totalPages));
            }

            setSearchParams(nextParams, { replace: true });
        }
    }, [requestedPage, totalPages, searchParams, setSearchParams]);

    const handleCategoryChange = (category) => {
        const nextParams = new URLSearchParams(searchParams);

        if (category === 'All') {
            nextParams.delete('category');
        } else {
            nextParams.set('category', category);
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const clearSearch = () => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('search');
        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const handleSortChange = (sort) => {
        const nextParams = new URLSearchParams(searchParams);

        if (sort === 'featured') {
            nextParams.delete('sort');
        } else {
            nextParams.set('sort', sort);
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const handlePriceChange = (field, value) => {
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set(field, value);
        } else {
            nextParams.delete(field);
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const handleSizeToggle = (size) => {
        const nextParams = new URLSearchParams(searchParams);
        const nextSizes = activeSizes.includes(size)
            ? activeSizes.filter((value) => value !== size)
            : [...activeSizes, size];

        if (nextSizes.length > 0) {
            nextParams.set('sizes', nextSizes.join(','));
        } else {
            nextParams.delete('sizes');
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const handleGroupToggle = (groupId) => {
        const nextParams = new URLSearchParams(searchParams);
        const nextGroups = activeGroups.includes(groupId)
            ? activeGroups.filter((value) => value !== groupId)
            : [...activeGroups, groupId];

        if (nextGroups.length > 0) {
            nextParams.set('groups', nextGroups.join(','));
        } else {
            nextParams.delete('groups');
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
    };

    const handleClearFilters = () => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('minPrice');
        nextParams.delete('maxPrice');
        nextParams.delete('sizes');
        nextParams.delete('page');
        nextParams.delete('groups');
        setSearchParams(nextParams);
    };

    return (
        <main className="min-h-screen bg-[#faf7f3]">
            {/* Page header */}
            <section className="border-b border-black/[0.06] bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    <Breadcrumbs
                        className="mb-6"
                        items={[
                            { label: 'Home', to: '/' },
                            { label: 'Shop' },
                        ]}
                    />

                    <div className="max-w-2xl">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a6814c]">
                            Rudambek collection
                        </p>

                        <h1 className="font-serif text-4xl leading-tight text-slate-900 sm:text-6xl">
                            All Pieces
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                            Browse the complete Rudambek wardrobe — from
                            fluid kaftans and expressive dresses to relaxed
                            resort shirts and couture sets.
                        </p>

                        {searchQuery && (
                            <p className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                Showing results for{' '}
                                <span className="font-semibold text-slate-900">
                                    "{searchQuery}"
                                </span>
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-[#a6814c] underline-offset-4 transition hover:underline"
                                >
                                    Clear search
                                </button>
                            </p>
                        )}
                    </div>

                    {/* Category filter */}
                    <div
                        className="mt-10 flex items-center gap-7 overflow-x-auto border-t border-slate-200 pt-6 scrollbar-none"
                        aria-label="Filter products by category"
                    >
                        {categories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() =>
                                        handleCategoryChange(category)
                                    }
                                    className={`relative shrink-0 cursor-pointer whitespace-nowrap pb-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${isActive
                                            ? 'text-slate-900'
                                            : 'text-slate-400 hover:text-slate-700'
                                        }`}
                                >
                                    {category}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -bottom-px left-0 h-[2px] w-full origin-left bg-[#c9a24b] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Toolbar */}
            <section className="sticky top-[156px] z-30 border-b border-black/[0.06] bg-[#faf7f3]/95 backdrop-blur-md">
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsFilterOpen(true)}
                                className="relative flex min-h-10 shrink-0 cursor-pointer items-center gap-2 border border-slate-300 bg-white px-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                            >
                                <FilterIcon className="h-4 w-4" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a24b] text-[9px] font-bold text-white">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            {activeCategory !== 'All' && (
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                                    {activeCategory}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-5 lg:justify-end">
                            <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                {filteredProducts.length}{' '}
                                {filteredProducts.length === 1
                                    ? 'piece'
                                    : 'pieces'}
                            </span>

                            <SortSelect
                                id="shop-sort"
                                value={activeSort}
                                onChange={handleSortChange}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Product grid */}
            <section
                aria-label="Product collection"
                className="py-14 sm:py-20"
            >
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                    {paginatedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-7">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.variantKey || product.id}
                                    product={product}
                                    showColorSwatches={activeGroups.length === 0}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyCategory
                            searchQuery={searchQuery}
                            onReset={() => setSearchParams({})}
                        />
                    )}

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <div className="mt-20 border-t border-slate-200 pt-10 text-center">
                        <Link
                            to="/#catalog"
                            className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition hover:text-[#a6814c]"
                        >
                            ← Back to new arrivals
                        </Link>
                    </div>
                </div>
            </section>

            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                priceBounds={priceBounds}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
                availableSizes={availableSizes}
                activeSizes={activeSizes}
                onSizeToggle={handleSizeToggle}
                availableGroups={availableGroups}
                activeGroups={activeGroups}
                onGroupToggle={handleGroupToggle}
                onClear={handleClearFilters}
                resultCount={filteredProducts.length}
            />
        </main>
    );
}

function FilterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <line x1="4" y1="6" x2="7" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="11" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="9" cy="6" r="1.8" fill="currentColor" />

            <line x1="4" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="17" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="15" cy="12" r="1.8" fill="currentColor" />

            <line x1="4" y1="18" x2="9" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="13" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="11" cy="18" r="1.8" fill="currentColor" />
        </svg>
    );
}

function CloseIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
    );
}

function FilterDrawer({
    isOpen,
    onClose,
    priceBounds,
    minPrice,
    maxPrice,
    onPriceChange,
    availableSizes,
    activeSizes,
    onSizeToggle,
    availableGroups,
    activeGroups,
    onGroupToggle,
    onClear,
    resultCount,
}) {
    return (
        <div
            className={`fixed inset-0 z-[70] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            aria-hidden={!isOpen}
        >
            <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Filter products"
                className={`absolute right-0 top-0 flex h-full w-[90vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
                    <span className="font-serif text-lg text-slate-900">
                        Filters
                    </span>

                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={onClose}
                        tabIndex={isOpen ? 0 : -1}
                        className="cursor-pointer text-slate-600 transition hover:text-[#C9A24B]"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Price range
                        </h3>

                        <div className="mt-4 flex items-center gap-3">
                            <label className="flex-1">
                                <span className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                    Min
                                </span>
                                <input
                                    type="number"
                                    min={priceBounds.min}
                                    max={priceBounds.max}
                                    tabIndex={isOpen ? 0 : -1}
                                    placeholder={String(priceBounds.min)}
                                    value={minPrice}
                                    onChange={(event) =>
                                        onPriceChange(
                                            'minPrice',
                                            event.target.value
                                        )
                                    }
                                    className="min-h-11 w-full border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
                                />
                            </label>

                            <span className="mt-5 text-slate-300">—</span>

                            <label className="flex-1">
                                <span className="mb-1.5 block text-[10px] uppercase tracking-[0.1em] text-slate-400">
                                    Max
                                </span>
                                <input
                                    type="number"
                                    min={priceBounds.min}
                                    max={priceBounds.max}
                                    tabIndex={isOpen ? 0 : -1}
                                    placeholder={String(priceBounds.max)}
                                    value={maxPrice}
                                    onChange={(event) =>
                                        onPriceChange(
                                            'maxPrice',
                                            event.target.value
                                        )
                                    }
                                    className="min-h-11 w-full border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Size
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {availableSizes.map((size) => {
                                const isSelected = activeSizes.includes(size);

                                return (
                                    <button
                                        key={size}
                                        type="button"
                                        aria-pressed={isSelected}
                                        tabIndex={isOpen ? 0 : -1}
                                        onClick={() => onSizeToggle(size)}
                                        className={`min-h-11 min-w-11 cursor-pointer border px-3 text-sm font-medium transition ${isSelected
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-300 text-slate-700 hover:border-slate-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Group Names
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {availableGroups.map((group) => {
                                const isSelected = activeGroups.includes(
                                    group.id
                                );

                                return (
                                    <button
                                        key={group.id}
                                        type="button"
                                        aria-pressed={isSelected}
                                        tabIndex={isOpen ? 0 : -1}
                                        onClick={() =>
                                            onGroupToggle(group.id)
                                        }
                                        className={`min-h-11 cursor-pointer border px-3 text-sm font-medium transition ${isSelected
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-slate-300 text-slate-700 hover:border-slate-900'
                                            }`}
                                    >
                                        {group.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-6">
                    <p className="mb-4 text-center text-xs text-slate-400">
                        {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}{' '}
                        match your filters
                    </p>

                    <button
                        type="button"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={onClose}
                        className="flex min-h-12 w-full items-center justify-center bg-[#C9A24B] text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#A8822F]"
                    >
                        Show results
                    </button>

                    <button
                        type="button"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={onClear}
                        className="mt-3 flex min-h-12 w-full items-center justify-center border border-slate-900 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                    >
                        Clear filters
                    </button>
                </div>
            </div>
        </div>
    );
}

function SortSelect({ id, value, onChange }) {
    return (
        <div className="flex shrink-0 items-center gap-2">
            <label
                htmlFor={id}
                className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
                Sort
            </label>

            <select
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-10 cursor-pointer rounded-none border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition hover:border-slate-400 focus:border-[#a6814c] focus:ring-1 focus:ring-[#a6814c]"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}


function getPaginationRange(currentPage, totalPages) {
    const delta = 1;
    const pages = [];

    for (let page = 1; page <= totalPages; page += 1) {
        if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - delta && page <= currentPage + delta)
        ) {
            pages.push(page);
        }
    }

    const withEllipsis = [];
    let previousPage = null;

    pages.forEach((page) => {
        if (previousPage !== null && page - previousPage > 1) {
            withEllipsis.push(`ellipsis-${page}`);
        }

        withEllipsis.push(page);
        previousPage = page;
    });

    return withEllipsis;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageItems = getPaginationRange(currentPage, totalPages);

    return (
        <nav
            aria-label="Product pages"
            className="mt-14 flex items-center justify-center gap-2"
        >
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-slate-300 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
            >
                ←
            </button>

            {pageItems.map((item) =>
                typeof item === 'number' ? (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item)}
                        aria-current={item === currentPage ? 'page' : undefined}
                        className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-xs font-semibold transition ${
                            item === currentPage
                                ? 'bg-slate-900 text-white'
                                : 'border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900'
                        }`}
                    >
                        {item}
                    </button>
                ) : (
                    <span
                        key={item}
                        aria-hidden="true"
                        className="flex h-10 w-6 shrink-0 items-center justify-center text-slate-400"
                    >
                        …
                    </span>
                )
            )}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-slate-300 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
            >
                →
            </button>
        </nav>
    );
}

function EmptyCategory({ onReset, searchQuery }) {
    return (
        <div className="py-24 text-center">
            <p className="font-serif text-2xl text-slate-700">
                {searchQuery
                    ? `No pieces match "${searchQuery}".`
                    : 'No pieces in this category yet.'}
            </p>

            <p className="mt-2 text-sm text-slate-500">
                Explore the complete collection instead.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-7 min-h-11 cursor-pointer border border-slate-900 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-lg"
            >
                View all pieces
            </button>
        </div>
    );
}