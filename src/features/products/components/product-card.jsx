import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../store/use-app-store';
import { useCartStore } from '../../cart/cart-store';
import { useWishlistStore } from '../../wishlist/wishlist-store';
import { useQuickViewStore } from '../quick-view-store';
import { HeartIcon } from '../../../components/ui/heart-icon';
import { ColorSwatches } from '../../../components/ui/color-swatches';
import {
    getDiscountPercentage,
    getProductBadge,
    isProductOnSale,
} from '../product-store';
import { BADGE_TONE_CLASSES } from '../badge-styles';

const GOLD = '#c9a24b';
const GOLD_HOVER = '#a8822f';

export function ProductCard({ product, compact = false, showColorSwatches = true }) {
    const formatDualPrice = useAppStore((state) => state.formatDualPrice);
    const addToCart = useCartStore((state) => state.addToCart);
    const isWishlisted = useWishlistStore((state) =>
        state.isInWishlist(product.id)
    );
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const openQuickView = useQuickViewStore((state) => state.openQuickView);

    const [justAdded, setJustAdded] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(
        product.initialColorIndex ?? 0
    );
    const [isImageHovered, setIsImageHovered] = useState(false);

    const onSale = isProductOnSale(product);
    const discountPercentage = getDiscountPercentage(product);
    const badge = getProductBadge(product);
    const inStock = product.stock > 0;
    const productPath = `/product/${product.id}`;
    const activeColor = product.colors?.[selectedColorIndex];
    const displayImage =
        (isImageHovered && activeColor?.hoverImage) ||
        activeColor?.image ||
        product.image;

    useEffect(() => {
        if (!justAdded) return undefined;

        const timer = window.setTimeout(() => setJustAdded(false), 1800);
        return () => window.clearTimeout(timer);
    }, [justAdded]);

    const handleAddToCart = () => {
        if (!inStock) return;

        addToCart({
            ...product,
            image: displayImage,
            images: activeColor?.images ?? product.images,
            color: activeColor?.name,
            quantity: 1,
        });
        setJustAdded(true);
    };

    const handleToggleWishlist = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(product);
    };

    const handleQuickView = (event) => {
        event.preventDefault();
        event.stopPropagation();
        openQuickView(product);
    };

    return (
        <article
            className={`group relative flex min-w-0 flex-col overflow-hidden border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-900/10 ${compact ? 'h-auto' : 'h-full'
                }`}
        >
            <div
                className="relative aspect-square w-full overflow-hidden bg-slate-100"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
            >
                <Link
                    to={productPath}
                    state={{ initialColorIndex: selectedColorIndex }}
                    className="absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2"
                >
                    <img
                        src={displayImage}
                        alt={product.imageAlt || product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </Link>

                {badge && (
                    <span
                        className={`pointer-events-none absolute left-2.5 top-2.5 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-white ${BADGE_TONE_CLASSES[badge.tone]}`}
                    >
                        {badge.label}
                    </span>
                )}

                <button
                    type="button"
                    onClick={handleToggleWishlist}
                    aria-label={
                        isWishlisted
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={isWishlisted}
                    className={`absolute right-2.5 top-2.5 flex h-8 w-8 cursor-pointer items-center justify-center bg-white/90 shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] ${
                        isWishlisted ? 'text-[#a33f32]' : 'text-slate-500'
                    }`}
                >
                    <HeartIcon filled={isWishlisted} className="h-4 w-4" />
                </button>

                <button
                    type="button"
                    onClick={handleQuickView}
                    aria-label={`Quick view ${product.name}`}
                    className="absolute inset-x-0 bottom-0 flex min-h-10 translate-y-full cursor-pointer items-center justify-center bg-slate-900/90 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-slate-900 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none"
                >
                    Quick View
                </button>
            </div>

            <div
                className={`flex flex-1 flex-col ${compact ? 'p-3' : 'p-3 sm:p-4'
                    }`}
            >
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a6814c]">
                    {product.category}
                </span>

                <Link
                    to={productPath}
                    state={{ initialColorIndex: selectedColorIndex }}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
                >
                    <h2 className="mt-1 line-clamp-2 font-serif text-[15px] leading-tight text-slate-900 transition-colors group-hover:text-[#a6814c] sm:text-base">
                        {product.name}
                    </h2>
                </Link>

                {product.rating && product.reviewCount ? (
                    <div
                        className="mt-1.5 flex items-center gap-1.5"
                        aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}
                    >
                        <span
                            aria-hidden="true"
                            className="text-[10px] tracking-[0.06em] text-[#b28a4f]"
                        >
                            ★★★★★
                        </span>

                        <span className="text-[9px] text-slate-400">
                            {product.rating} ({product.reviewCount})
                        </span>
                    </div>
                ) : null}

                <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    <span
                        className={`text-sm font-semibold ${onSale ? 'text-[#a33f32]' : 'text-slate-900'
                            }`}
                    >
                        {formatDualPrice(product.price)}
                    </span>

                    {onSale && (
                        <>
                            <s className="text-[11px] text-slate-400">
                                <span className="sr-only">
                                    Original price:
                                </span>
                                {formatDualPrice(product.compareAtPrice)}
                            </s>

                            <span className="text-[9px] font-semibold text-[#a33f32]">
                                -{discountPercentage}%
                            </span>
                        </>
                    )}
                </div>

                {showColorSwatches && product.colors?.length > 1 && (
                    <div className="mt-2">
                        <ColorSwatches
                            colors={product.colors}
                            selectedIndex={selectedColorIndex}
                            onSelect={setSelectedColorIndex}
                            size="sm"
                        />
                    </div>
                )}

                {!showColorSwatches && product.colors?.length > 1 && (
                    <p className="mt-1.5 text-[10px] text-slate-400">
                        {product.colors.length} colors available
                    </p>
                )}

                <div className="flex-1" />

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="mt-3 min-h-10 w-full cursor-pointer px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                    style={{
                        backgroundColor: inStock ? GOLD : '#94a3b8',
                    }}
                    onMouseEnter={(event) => {
                        if (!inStock) return;
                        event.currentTarget.style.backgroundColor =
                            GOLD_HOVER;
                    }}
                    onMouseLeave={(event) => {
                        if (!inStock) return;
                        event.currentTarget.style.backgroundColor = GOLD;
                    }}
                >
                    {justAdded
                        ? 'Added ✓'
                        : inStock
                            ? 'Add to cart'
                            : 'Restocking soon'}
                </button>
            </div>
        </article>
    );
}