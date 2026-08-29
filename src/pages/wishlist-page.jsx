import { Link } from 'react-router-dom';
import { useAppStore } from '../store/use-app-store';
import { useCartStore } from '../features/cart/cart-store';
import { useWishlistStore } from '../features/wishlist/wishlist-store';
import { HeartIcon } from '../components/ui/heart-icon';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

const GOLD = '#c9a24b';

export function WishlistPage() {
    usePageMeta({ title: 'Wishlist', noIndex: true });

    const formatPrice = useAppStore((state) => state.formatPrice);
    const addToCart = useCartStore((state) => state.addToCart);
    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    const removeFromWishlist = useWishlistStore(
        (state) => state.removeFromWishlist
    );

    return (
        <main className="min-h-screen bg-[#faf7f3]">
            {/* Header */}
            <section className="border-b border-black/[0.06] bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                    <Breadcrumbs
                        className="mb-6"
                        items={[
                            { label: 'Home', to: '/' },
                            { label: 'Wishlist' },
                        ]}
                    />
                </div>
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Saved pieces</p>
                        <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">Your Wishlist</h1>
                    </div>
                    <Link to="/shop" className="inline-flex min-h-10 items-center gap-2 border border-slate-900 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-lg">
                        Continue shopping →
                    </Link>
                </div>
            </section>

            <Reveal>
            <section className="mx-auto max-w-[1400px] px-8 lg:px-12 py-16 sm:py-20">
                {wishlistItems.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="font-serif text-2xl text-slate-800">Your wishlist is empty.</p>
                        <p className="mt-2 text-sm text-slate-500">Save pieces you love while you browse.</p>
                        <Link to="/shop" className="mt-7 inline-flex items-center gap-2 bg-slate-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9a24b] hover:shadow-lg">
                            Browse the collection →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistItems.map((product) => (
                            <div key={product.id} className="group relative bg-white border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
                                <button
                                    type="button"
                                    onClick={() => removeFromWishlist(product.id)}
                                    aria-label={`Remove ${product.name} from wishlist`}
                                    className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center bg-white/90 text-[#a33f32] shadow-sm backdrop-blur transition-transform hover:scale-110"
                                >
                                    <HeartIcon filled className="h-4 w-4" />
                                </button>

                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="aspect-[4/5] overflow-hidden bg-slate-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </Link>
                                <div className="p-5">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{product.category}</p>
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="mt-1.5 font-serif text-lg text-slate-900 hover:text-[#a8822f] transition-colors">{product.name}</h3>
                                    </Link>
                                    <p className="mt-2 text-base font-semibold text-slate-900">{formatPrice(product.price)}</p>
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex-1 border border-slate-900 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white hover:shadow-md cursor-pointer"
                                        >
                                            Add to cart
                                        </button>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="flex-1 text-center border border-slate-200 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 hover:border-slate-400 transition-colors"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            </Reveal>
        </main>
    );
}
