import { Link } from 'react-router-dom';
import { useCartStore } from '../features/cart/cart-store';
import { useAppStore } from '../store/use-app-store';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { getRecommendedProducts } from '../features/products/product-store';
import { ProductCard } from '../features/products/components/product-card';
import { ShippingProgress } from '../components/ui/shipping-progress';

const GOLD = '#a6814c';

export function CartPage() {
    usePageMeta({ title: 'Your Cart', noIndex: true });

    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const getCartTotal = useCartStore((state) => state.getCartTotal);
    const formatDualPrice = useAppStore((state) => state.formatDualPrice);

    const recommendedProducts = getRecommendedProducts(
        cartItems.map((item) => item.id),
        4
    );

    if (cartItems.length === 0) {
        return (
            <main className="max-w-3xl mx-auto px-6 py-16 text-center">
                <h1 className="font-serif text-3xl text-slate-900">Your Shopping Cart</h1>
                <p className="text-slate-500 mt-2">Your cart is empty right now.</p>
                <Link
                    to="/shop"
                    className="mt-8 inline-block bg-slate-900 text-white font-medium py-2.5 px-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg text-sm tracking-wide"
                >
                    Browse the catalog
                </Link>
            </main>
        );
    }

    return (
        <Reveal as="main" className="max-w-5xl mx-auto px-6 py-12 space-y-6 block">
            <h1 className="font-serif text-3xl text-slate-900">Your Shopping Cart</h1>

            <ShippingProgress className="bg-white border border-slate-100 px-5 py-4" />

            <div className="bg-white border border-slate-100 divide-y divide-slate-100">
                {cartItems.map((item) => (
                    <div key={item.lineId} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors duration-200 hover:bg-slate-50/80">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover bg-slate-50 flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-widest">{item.category}</span>
                            <h3 className="font-serif text-lg text-slate-900">{item.name}</h3>
                            {item.color && (
                                <p className="text-xs text-slate-400">{item.color}</p>
                            )}
                            <p className="text-sm text-slate-500 mt-0.5">{formatDualPrice(item.price)} each</p>
                        </div>

                        <div className="flex items-center border border-slate-300 rounded-lg self-start sm:self-center">
                            <button
                                onClick={() => updateQuantity(item.lineId, -1)}
                                aria-label="Decrease quantity"
                                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                            >
                                −
                            </button>
                            <span className="w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.lineId, 1)}
                                aria-label="Increase quantity"
                                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                            >
                                +
                            </button>
                        </div>

                        <p className="shrink-0 text-right font-semibold text-slate-900">
                            {formatDualPrice(item.price * item.quantity)}
                        </p>

                        <button
                            onClick={() => removeFromCart(item.lineId)}
                            aria-label={`Remove ${item.name}`}
                            className="text-slate-400 hover:text-red-500 transition text-sm font-medium cursor-pointer self-start sm:self-center"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <p className="font-serif text-2xl text-slate-900">{formatDualPrice(getCartTotal())}</p>
                </div>
                <Link
                    to="/checkout"
                    className="bg-slate-900 text-white font-medium py-2.5 px-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg active:scale-[0.98] text-sm text-center cursor-pointer tracking-wide"
                >
                    Proceed to Checkout
                </Link>
            </div>

            {recommendedProducts.length > 0 && (
                <div className="border-t border-slate-200 pt-10">
                    <p
                        className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
                        style={{ color: GOLD }}
                    >
                        Complete the look
                    </p>

                    <h2 className="mb-7 font-serif text-2xl text-slate-900">
                        You may also like
                    </h2>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {recommendedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                compact
                            />
                        ))}
                    </div>
                </div>
            )}
        </Reveal>
    );
}
