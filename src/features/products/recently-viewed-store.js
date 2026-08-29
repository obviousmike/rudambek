import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_ITEMS = 8;

export const useRecentlyViewedStore = create(
    persist(
        (set, get) => ({
            viewedIds: [],

            addViewed: (productId) => {
                set({
                    viewedIds: [
                        productId,
                        ...get().viewedIds.filter((id) => id !== productId),
                    ].slice(0, MAX_ITEMS),
                });
            },
        }),
        {
            name: 'recently-viewed-cache',
        }
    )
);
