import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Different colors of the same product are distinct cart lines.
function getLineId(item) {
    return item.color ? `${item.id}::${item.color}` : item.id;
}

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            isDrawerOpen: false,

            openDrawer: () => set({ isDrawerOpen: true }),
            closeDrawer: () => set({ isDrawerOpen: false }),

            // 1. Add item to shopping cart array
            addToCart: (product) => {
                const lineId = getLineId(product);
                const items = get().cartItems;
                const existingItem = items.find((item) => item.lineId === lineId);

                if (existingItem) {
                    // If product exists, bump up the selection quantity counter
                    set({
                        cartItems: items.map((item) =>
                            item.lineId === lineId ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                        isDrawerOpen: true,
                    });
                } else {
                    // Add new item object to cart array list
                    set({
                        cartItems: [...items, { ...product, lineId, quantity: 1 }],
                        isDrawerOpen: true,
                    });
                }
            },

            // 2. Remove item array entirely from cart list
            removeFromCart: (lineId) => {
                set({ cartItems: get().cartItems.filter((item) => item.lineId !== lineId) });
            },

            // 3. Increment/Decrement individual product totals safely
            updateQuantity: (lineId, amount) => {
                const updatedItems = get().cartItems.map((item) => {
                    if (item.lineId === lineId) {
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
