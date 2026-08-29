import { useRecentlyViewedStore } from '../../features/products/recently-viewed-store';
import { getProductById } from '../../features/products/product-store';
import { ProductCard } from '../../features/products/components/product-card';

const GOLD = '#a6814c';

export function RecentlyViewed({ excludeId, limit = 4, className = '' }) {
    const viewedIds = useRecentlyViewedStore((state) => state.viewedIds);

    const products = viewedIds
        .filter((id) => id !== excludeId)
        .map((id) => getProductById(id))
        .filter(Boolean)
        .slice(0, limit);

    if (products.length === 0) return null;

    return (
        <section
            aria-labelledby="recently-viewed-title"
            className={className}
        >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                Pick up where you left off
            </p>

            <h2
                id="recently-viewed-title"
                className="mb-7 font-serif text-2xl text-slate-900 sm:text-3xl"
            >
                Recently Viewed
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} compact />
                ))}
            </div>
        </section>
    );
}
