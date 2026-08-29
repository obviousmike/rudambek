import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
    getDiscountPercentage,
    getProductBadge,
    getProductById,
    getRelatedProducts,
    isProductOnSale,
} from '../features/products/product-store';
import { BADGE_TONE_CLASSES } from '../features/products/badge-styles';
import { ProductCard } from '../features/products/components/product-card';
import { useAppStore } from '../store/use-app-store';
import { useCartStore } from '../features/cart/cart-store';
import { useWishlistStore } from '../features/wishlist/wishlist-store';
import { HeartIcon } from '../components/ui/heart-icon';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';
import { TrustBadges } from '../components/ui/trust-badges';
import { RecentlyViewed } from '../components/ui/recently-viewed';
import { useRecentlyViewedStore } from '../features/products/recently-viewed-store';

export function ProductPage() {
    const { productId } = useParams();
    const product = getProductById(productId);

    usePageMeta({
        title: product?.name ?? 'Product',
        description: product?.description,
        image: product?.image,
        noIndex: !product,
    });

    const formatPrice = useAppStore((state) => state.formatPrice);
    const addToCart = useCartStore((state) => state.addToCart);
    const isWishlisted = useWishlistStore((state) =>
        product ? state.isInWishlist(product.id) : false
    );
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const addViewed = useRecentlyViewedStore((state) => state.addViewed);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [justAdded, setJustAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        if (!lightboxOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setLightboxOpen(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [lightboxOpen]);

    useEffect(() => {
        if (!justAdded) return undefined;

        const timer = window.setTimeout(() => {
            setJustAdded(false);
        }, 1800);

        return () => window.clearTimeout(timer);
    }, [justAdded]);

    useEffect(() => {
        if (product) addViewed(product.id);
    }, [product, addViewed]);

    if (!product) {
        return <Navigate to="/#catalog" replace />;
    }

    const onSale = isProductOnSale(product);
    const discountPercentage = getDiscountPercentage(product);
    const badge = getProductBadge(product);
    const inStock = product.stock > 0;
    const relatedProducts = getRelatedProducts(product);

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: new URL(product.image, window.location.origin).toString(),
        sku: product.id,
        category: product.category,
        offers: {
            '@type': 'Offer',
            url: window.location.href,
            priceCurrency: 'USD',
            price: product.price,
            availability:
                product.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
        },
        ...(product.rating && product.reviewCount
            ? {
                  aggregateRating: {
                      '@type': 'AggregateRating',
                      ratingValue: product.rating,
                      reviewCount: product.reviewCount,
                  },
              }
            : {}),
    };

    const handleAddToCart = () => {
        if (!inStock) return;

        if (product.sizes?.length > 0 && !selectedSize) {
            setSizeError(true);
            return;
        }

        addToCart({
            ...product,
            quantity,
            selectedSize,
        });

        setJustAdded(true);
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    const handleToggleWishlist = () => {
        toggleWishlist(product);
    };

    return (
        <main className="min-h-screen bg-[#faf7f3] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd),
                }}
            />

            <div className="mx-auto max-w-[1400px]">
                <Breadcrumbs
                    className="mb-5"
                    items={[
                        { label: 'Home', to: '/' },
                        { label: 'Shop', to: '/shop' },
                        {
                            label: product.category,
                            to: `/shop?category=${encodeURIComponent(product.category)}`,
                        },
                        { label: product.name },
                    ]}
                />

                <Link
                    to="/#catalog"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#a6814c]"
                >
                    ← Back to New Arrivals
                </Link>

                <section
                    aria-labelledby="product-title"
                    className="grid overflow-hidden border border-slate-100 bg-white md:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]"
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        aria-label={`Zoom in on ${product.name}`}
                        className="group relative block aspect-[4/5] min-h-[420px] w-full cursor-zoom-in bg-slate-100 md:aspect-auto"
                    >
                        <img
                            src={product.image}
                            alt={product.imageAlt || product.name}
                            className="h-full min-h-[520px] w-full object-cover"
                        />

                        {badge && (
                            <span
                                className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white ${BADGE_TONE_CLASSES[badge.tone]}`}
                            >
                                {badge.label}
                            </span>
                        )}

                        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white/90 text-slate-700 opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                            <ZoomIcon className="h-4 w-4" />
                        </span>
                    </button>

                    <div className="flex flex-col p-6 sm:p-10 lg:p-16">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a6814c]">
                            {product.category}
                        </span>

                        <h1
                            id="product-title"
                            className="mt-3 max-w-xl font-serif text-3xl leading-tight text-slate-900 sm:text-5xl"
                        >
                            {product.name}
                        </h1>

                        <ProductRating product={product} />

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <span
                                className={`text-2xl font-semibold ${onSale
                                        ? 'text-[#a33f32]'
                                        : 'text-slate-900'
                                    }`}
                            >
                                {formatPrice(product.price)}
                            </span>

                            {onSale && (
                                <>
                                    <s className="text-base text-slate-400">
                                        <span className="sr-only">
                                            Original price:
                                        </span>
                                        {formatPrice(product.compareAtPrice)}
                                    </s>

                                    <span className="bg-[#a33f32] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                                        Save {discountPercentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
                            {product.description}
                        </p>

                        {product.sizes?.length > 0 && (
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={selectedSize}
                                onSelect={handleSelectSize}
                            />
                        )}

                        {sizeError && (
                            <p className="mt-2 text-xs font-medium text-red-600">
                                Please select a size before adding to cart.
                            </p>
                        )}

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <QuantitySelector
                                quantity={quantity}
                                onDecrease={() =>
                                    setQuantity((value) =>
                                        Math.max(1, value - 1)
                                    )
                                }
                                onIncrease={() =>
                                    setQuantity((value) => value + 1)
                                }
                            />

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                                className="min-h-12 flex-1 cursor-pointer bg-slate-900 px-6 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a6814c] hover:shadow-lg active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {justAdded
                                    ? 'Added ✓'
                                    : !inStock
                                        ? 'Restocking soon'
                                        : 'Add to cart'}
                            </button>

                            <button
                                type="button"
                                onClick={handleToggleWishlist}
                                aria-label={
                                    isWishlisted
                                        ? `Remove ${product.name} from wishlist`
                                        : `Add ${product.name} to wishlist`
                                }
                                aria-pressed={isWishlisted}
                                className={`flex min-h-12 w-12 shrink-0 cursor-pointer items-center justify-center border transition ${
                                    isWishlisted
                                        ? 'border-[#a33f32] text-[#a33f32]'
                                        : 'border-slate-300 text-slate-500 hover:border-slate-500'
                                }`}
                            >
                                <HeartIcon
                                    filled={isWishlisted}
                                    className="h-5 w-5"
                                />
                            </button>
                        </div>

                        <TrustBadges className="mt-6" />
                    </div>
                </section>

                {relatedProducts.length > 0 && (
                    <Reveal>
                    <section
                        aria-labelledby="related-products-title"
                        className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-14"
                    >
                        <div className="mb-7 flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a6814c]">
                                    Continue exploring
                                </p>

                                <h2
                                    id="related-products-title"
                                    className="font-serif text-3xl text-slate-900 sm:text-4xl"
                                >
                                    You may also like
                                </h2>
                            </div>

                            <Link
                                to="/shop"
                                className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:text-[#a6814c] sm:block"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                    compact
                                />
                            ))}
                        </div>
                    </section>
                    </Reveal>
                )}

                <Reveal>
                    <RecentlyViewed
                        excludeId={product.id}
                        className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-14"
                    />
                </Reveal>
            </div>

            {lightboxOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${product.name} — enlarged image`}
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/90 p-6"
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close zoomed image"
                        className="absolute right-6 top-6 flex h-11 w-11 cursor-pointer items-center justify-center text-white/80 transition hover:text-white"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close zoomed image"
                        className="absolute inset-0 cursor-zoom-out"
                    />

                    <img
                        src={product.image}
                        alt={product.imageAlt || product.name}
                        className="relative max-h-full max-w-full object-contain shadow-2xl"
                    />
                </div>
            )}
        </main>
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

function RulerIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <rect x="2.5" y="7" width="19" height="10" rx="1.5" />
            <path
                d="M6 7v3M9.5 7v2M13 7v3M16.5 7v2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ZoomIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5 21 21M10.5 8v5M8 10.5h5" strokeLinecap="round" />
        </svg>
    );
}

function ProductRating({ product }) {
    if (!product.rating || !product.reviewCount) {
        return null;
    }

    return (
        <div
            className="mt-5 flex items-center gap-2"
            aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}
        >
            <span
                aria-hidden="true"
                className="text-sm tracking-[0.1em] text-[#b28a4f]"
            >
                ★★★★★
            </span>

            <span className="text-xs text-slate-500">
                {product.rating} · {product.reviewCount} reviews
            </span>
        </div>
    );
}

function SizeSelector({ sizes, selectedSize, onSelect }) {
    return (
        <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Size
                </span>

                <div className="flex items-center gap-3">
                    {selectedSize && (
                        <span className="text-xs font-medium text-[#a6814c]">
                            {selectedSize} selected
                        </span>
                    )}

                    <Link
                        to="/about#sizing"
                        className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-[#a6814c]"
                    >
                        <RulerIcon className="h-3.5 w-3.5" />
                        Sizing guide
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                    const isSelected = selectedSize === size;

                    return (
                        <button
                            key={size}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => onSelect(size)}
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
    );
}

function QuantitySelector({ quantity, onDecrease, onIncrease }) {
    return (
        <div className="flex h-12 items-center border border-slate-300">
            <button
                type="button"
                onClick={onDecrease}
                aria-label="Decrease quantity"
                className="flex h-full w-12 cursor-pointer items-center justify-center text-lg text-slate-600 transition hover:bg-slate-50"
            >
                −
            </button>

            <span
                aria-live="polite"
                className="w-10 text-center text-sm font-semibold text-slate-900"
            >
                {quantity}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                aria-label="Increase quantity"
                className="flex h-full w-12 cursor-pointer items-center justify-center text-lg text-slate-600 transition hover:bg-slate-50"
            >
                +
            </button>
        </div>
    );
}