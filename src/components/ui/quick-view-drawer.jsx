import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { useCartStore } from '../../features/cart/cart-store';
import { useWishlistStore } from '../../features/wishlist/wishlist-store';
import { useQuickViewStore } from '../../features/products/quick-view-store';
import {
    getDiscountPercentage,
    getProductBadge,
    isProductOnSale,
} from '../../features/products/product-store';
import { BADGE_TONE_CLASSES } from '../../features/products/badge-styles';
import { HeartIcon } from './heart-icon';
import { TruckIcon, ReturnIcon, ShieldIcon } from './trust-icons';

const ASSURANCES = [
    { icon: TruckIcon, label: 'Free delivery in Ghana' },
    { icon: ReturnIcon, label: '14-day returns' },
    { icon: ShieldIcon, label: 'Secure checkout' },
];

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

export function QuickViewDrawer() {
    const product = useQuickViewStore((state) => state.product);
    const isOpen = useQuickViewStore((state) => state.isOpen);
    const closeQuickView = useQuickViewStore((state) => state.closeQuickView);

    const formatPrice = useAppStore((state) => state.formatPrice);
    const addToCart = useCartStore((state) => state.addToCart);
    const isWishlisted = useWishlistStore((state) =>
        product ? state.isInWishlist(product.id) : false
    );
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);

    // Reset the form whenever a different product is shown, adjusted
    // directly during render (React's recommended pattern for "reset state
    // when an identity changes") rather than in an effect.
    const [prevProduct, setPrevProduct] = useState(product);
    if (product && product !== prevProduct) {
        setPrevProduct(product);
        setSelectedSize(product.sizes?.length === 1 ? product.sizes[0] : null);
        setQuantity(1);
        setAdded(false);
        setSizeError(false);
    }

    useEffect(() => {
        if (!isOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeQuickView();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, closeQuickView]);

    if (!product) return null;

    const onSale = isProductOnSale(product);
    const discountPercentage = getDiscountPercentage(product);
    const badge = getProductBadge(product);
    const hasSizes = product.sizes?.length > 0;
    const inStock = product.stock > 0;

    const handleAddToCart = () => {
        if (hasSizes && !selectedSize) {
            setSizeError(true);
            return;
        }

        if (!inStock) return;

        addToCart({
            ...product,
            quantity,
            selectedSize,
        });

        setAdded(true);
        window.setTimeout(() => closeQuickView(), 700);
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    return (
        <div
            className={`fixed inset-0 z-[72] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            aria-hidden={!isOpen}
        >
            <button
                type="button"
                aria-label="Close quick view"
                onClick={closeQuickView}
                tabIndex={isOpen ? 0 : -1}
                className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label={`Quick view — ${product.name}`}
                className={`absolute right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <button
                    type="button"
                    aria-label="Close quick view"
                    onClick={closeQuickView}
                    tabIndex={isOpen ? 0 : -1}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:text-[#c9a24b]"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>

                <div className="grid flex-1 sm:grid-cols-2">
                    <div className="relative aspect-square bg-slate-100 sm:aspect-auto sm:min-h-full">
                        <img
                            src={product.image}
                            alt={product.imageAlt || product.name}
                            className="h-full w-full object-cover"
                        />

                        {badge && (
                            <span
                                className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white ${BADGE_TONE_CLASSES[badge.tone]}`}
                            >
                                {badge.label}
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            aria-pressed={isWishlisted}
                            tabIndex={isOpen ? 0 : -1}
                            aria-label={
                                isWishlisted
                                    ? `Remove ${product.name} from wishlist`
                                    : `Add ${product.name} to wishlist`
                            }
                            className={`absolute bottom-4 left-4 flex h-10 w-10 cursor-pointer items-center justify-center bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 ${isWishlisted
                                    ? 'text-[#a33f32]'
                                    : 'text-slate-600'
                                }`}
                        >
                            <HeartIcon filled={isWishlisted} className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex flex-col p-6 sm:p-8">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a6814c]">
                            {product.category}
                        </span>

                        <h2 className="mt-2 max-w-sm font-serif text-2xl leading-tight text-slate-900 sm:text-3xl">
                            {product.name}
                        </h2>

                        {product.rating && product.reviewCount ? (
                            <div className="mt-3 flex items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    className="text-sm tracking-[0.1em] text-[#b28a4f]"
                                >
                                    ★★★★★
                                </span>
                                <span className="text-xs text-slate-500">
                                    {product.rating} · {product.reviewCount}{' '}
                                    reviews
                                </span>
                            </div>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span
                                className={`text-xl font-semibold ${onSale
                                        ? 'text-[#a33f32]'
                                        : 'text-slate-900'
                                    }`}
                            >
                                {formatPrice(product.price)}
                            </span>

                            {onSale && (
                                <>
                                    <s className="text-sm text-slate-400">
                                        {formatPrice(product.compareAtPrice)}
                                    </s>
                                    <span className="bg-[#a33f32] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                                        Save {discountPercentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-500">
                            {product.description}
                        </p>

                        {hasSizes && (
                            <div className="mt-6">
                                <div className="mb-2 flex items-center justify-between gap-3">
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
                                            onClick={closeQuickView}
                                            tabIndex={isOpen ? 0 : -1}
                                            className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-[#a6814c]"
                                        >
                                            <RulerIcon className="h-3.5 w-3.5" />
                                            Sizing guide
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => {
                                        const isSelected =
                                            selectedSize === size;

                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                aria-pressed={isSelected}
                                                tabIndex={isOpen ? 0 : -1}
                                                onClick={() =>
                                                    handleSelectSize(size)
                                                }
                                                className={`min-h-10 min-w-10 cursor-pointer border px-3 text-sm font-medium transition ${isSelected
                                                        ? 'border-slate-900 bg-slate-900 text-white'
                                                        : 'border-slate-300 text-slate-700 hover:border-slate-900'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>

                                {sizeError && (
                                    <p className="mt-2 text-xs font-medium text-red-600">
                                        Please select a size before adding to
                                        cart.
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex h-11 shrink-0 items-center border border-slate-300">
                                <button
                                    type="button"
                                    tabIndex={isOpen ? 0 : -1}
                                    onClick={() =>
                                        setQuantity((value) =>
                                            Math.max(1, value - 1)
                                        )
                                    }
                                    aria-label="Decrease quantity"
                                    className="flex h-full w-9 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-50"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center text-sm font-semibold text-slate-900">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    tabIndex={isOpen ? 0 : -1}
                                    onClick={() =>
                                        setQuantity((value) => value + 1)
                                    }
                                    aria-label="Increase quantity"
                                    className="flex h-full w-9 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-50"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                tabIndex={isOpen ? 0 : -1}
                                onClick={handleAddToCart}
                                disabled={!inStock}
                                className="min-h-11 flex-1 cursor-pointer bg-slate-900 px-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a6814c] hover:shadow-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {added
                                    ? 'Added ✓'
                                    : !inStock
                                        ? 'Restocking soon'
                                        : hasSizes && !selectedSize
                                            ? 'Select a size'
                                            : `Add to cart — ${formatPrice(
                                                product.price * quantity
                                            )}`}
                            </button>
                        </div>

                        <Link
                            to={`/product/${product.id}`}
                            onClick={closeQuickView}
                            tabIndex={isOpen ? 0 : -1}
                            className="mt-4 self-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:text-[#a6814c]"
                        >
                            View full details →
                        </Link>

                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-200 pt-6">
                            {ASSURANCES.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="text-center"
                                    >
                                        <Icon className="mx-auto h-4 w-4 text-slate-400" />
                                        <p className="mt-1.5 text-[10px] leading-tight text-slate-500">
                                            {item.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
