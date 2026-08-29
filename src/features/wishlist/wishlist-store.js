import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlistItems: [],

            isInWishlist: (productId) => {
                return get().wishlistItems.some(
                    (item) => item.id === productId
                );
            },

            addToWishlist: (product) => {
                if (get().isInWishlist(product.id)) return;
                set({ wishlistItems: [...get().wishlistItems, product] });
            },

            removeFromWishlist: (productId) => {
                set({
                    wishlistItems: get().wishlistItems.filter(
                        (item) => item.id !== productId
                    ),
                });
            },

            toggleWishlist: (product) => {
                if (get().isInWishlist(product.id)) {
                    get().removeFromWishlist(product.id);
                } else {
                    get().addToWishlist(product);
                }
            },
        }),
        {
            name: 'wishlist-cache',
        }
    )
);
