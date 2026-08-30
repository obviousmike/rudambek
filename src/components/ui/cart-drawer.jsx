import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../features/cart/cart-store';
import { useAppStore } from '../../store/use-app-store';
import { ShippingProgress } from './shipping-progress';

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

export function CartDrawer() {
    const cartItems = useCartStore((state) => state.cartItems);
    const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
    const closeDrawer = useCartStore((state) => state.closeDrawer);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const getCartTotal = useCartStore((state) => state.getCartTotal);
    const formatDualPrice = useAppStore((state) => state.formatDualPrice);

    useEffect(() => {
        if (!isDrawerOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeDrawer();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isDrawerOpen, closeDrawer]);

    const totalItemsCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div
            className={`fixed inset-0 z-[70] ${
                isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            aria-hidden={!isDrawerOpen}
        >
            <button
                type="button"
                aria-label="Close cart"
                onClick={closeDrawer}
                tabIndex={isDrawerOpen ? 0 : -1}
                className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${
                    isDrawerOpen ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                className={`absolute right-0 top-0 flex h-full w-[90vw] max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                    isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
                    <span className="font-serif text-lg text-slate-900">
                        Your Cart{' '}
                        {totalItemsCount > 0 && (
                            <span className="text-sm text-slate-400">
                                ({totalItemsCount})
                            </span>
                        )}
                    </span>

                    <button
                        type="button"
                        aria-label="Close cart"
                        onClick={closeDrawer}
                        tabIndex={isDrawerOpen ? 0 : -1}
                        className="cursor-pointer text-slate-600 transition hover:text-[#C9A24B]"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                        <p className="font-serif text-xl text-slate-800">
                            Your cart is empty.
                        </p>
                        <Link
                            to="/shop"
                            onClick={closeDrawer}
                            tabIndex={isDrawerOpen ? 0 : -1}
                            className="mt-6 inline-flex items-center gap-2 bg-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C9A24B]"
                        >
                            Browse the catalog
                        </Link>
                    </div>
                ) : (
                    <>
                        <ShippingProgress className="border-b border-slate-100 px-6 py-4" />

                        <ul className="flex-1 overflow-y-auto divide-y divide-slate-100 px-6">
                            {cartItems.map((item) => (
                                <li
                                    key={item.lineId}
                                    className="flex items-center gap-4 py-5"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 shrink-0 bg-slate-50 object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-slate-800">
                                            {item.name}
                                        </p>
                                        {item.color && (
                                            <p className="text-xs text-slate-400">
                                                {item.color}
                                            </p>
                                        )}
                                        <p className="mt-0.5 text-xs text-slate-400">
                                            {formatDualPrice(item.price)}
                                        </p>

                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                type="button"
                                                tabIndex={
                                                    isDrawerOpen ? 0 : -1
                                                }
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.lineId,
                                                        -1
                                                    )
                                                }
                                                aria-label={`Decrease quantity of ${item.name}`}
                                                className="flex h-6 w-6 cursor-pointer items-center justify-center border border-slate-300 text-slate-600 transition hover:border-slate-500"
                                            >
                                                −
                                            </button>
                                            <span className="w-5 text-center text-xs font-semibold text-slate-900">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                tabIndex={
                                                    isDrawerOpen ? 0 : -1
                                                }
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.lineId,
                                                        1
                                                    )
                                                }
                                                aria-label={`Increase quantity of ${item.name}`}
                                                className="flex h-6 w-6 cursor-pointer items-center justify-center border border-slate-300 text-slate-600 transition hover:border-slate-500"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        tabIndex={isDrawerOpen ? 0 : -1}
                                        onClick={() =>
                                            removeFromCart(item.lineId)
                                        }
                                        aria-label={`Remove ${item.name}`}
                                        className="shrink-0 cursor-pointer text-xs font-medium text-slate-400 transition hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-slate-100 px-6 py-6">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-serif text-xl text-slate-900">
                                    {formatDualPrice(getCartTotal())}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                onClick={closeDrawer}
                                tabIndex={isDrawerOpen ? 0 : -1}
                                className="mt-4 flex min-h-12 w-full items-center justify-center bg-[#C9A24B] text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#A8822F]"
                            >
                                Checkout
                            </Link>

                            <Link
                                to="/cart"
                                onClick={closeDrawer}
                                tabIndex={isDrawerOpen ? 0 : -1}
                                className="mt-3 flex min-h-12 w-full items-center justify-center border border-slate-900 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:bg-slate-900 hover:text-white"
                            >
                                View full cart
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
