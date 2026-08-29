import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            isDrawerOpen: false,

            openDrawer: () => set({ isDrawerOpen: true }),
            closeDrawer: () => set({ isDrawerOpen: false }),

            // 1. Add item to shopping cart array
            addToCart: (product) => {
                const items = get().cartItems;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    // If product exists, bump up the selection quantity counter
                    set({
                        cartItems: items.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                        isDrawerOpen: true,
                    });
                } else {
                    // Add new item object to cart array list
                    set({
                        cartItems: [...items, { ...product, quantity: 1 }],
                        isDrawerOpen: true,
                    });
                }
            },

            // 2. Remove item array entirely from cart list
            removeFromCart: (productId) => {
                set({ cartItems: get().cartItems.filter((item) => item.id !== productId) });
            },

            // 3. Increment/Decrement individual product totals safely
            updateQuantity: (productId, amount) => {
                const updatedItems = get().cartItems.map((item) => {
                    if (item.id === productId) {
                        const nextQuantity = item.quantity + amount;
                        return { ...item, quantity: Math.max(1, nextQuantity) }; // Prevents crashing under 1
                    }
                    return item;
                });
                set({ cartItems: updatedItems });
            },

            // 4. Clear completely on checkout complete
            clearCart: () => set({ cartItems: [] }),

            // 5. Instantly compute numeric totals across cart lists
            getCartTotal: () => {
                return get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'shopping-cart-cache', // Key name in LocalStorage
            partialize: (state) => ({ cartItems: state.cartItems }),
        }
    )
);
