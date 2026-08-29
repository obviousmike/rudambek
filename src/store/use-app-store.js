import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Exchange rates relative to the USD base prices stored on each product.
export const CURRENCY_RATES = {
    USD: 1.0,
    // GHS: 15.50, // superseded — stale rate, no longer matches the market
    GHS: 11.20, // Ghanaian Cedi (current market mid-market rate)
    EUR: 0.92,  // Euro
    GBP: 0.78,  // British Pound
};

// Free delivery in Ghana on orders over GHS 500 (see the site-wide announcement bar).
export const FREE_SHIPPING_THRESHOLD_GHS = 500;
export const FREE_SHIPPING_THRESHOLD_USD =
    FREE_SHIPPING_THRESHOLD_GHS / CURRENCY_RATES.GHS;

export const useAppStore = create(
    persist(
        (set, get) => ({
            currentCurrency: 'USD',
            exchangeRate: 1.0,

            setCurrency: (currency) => {
                set({
                    currentCurrency: currency,
                    exchangeRate: CURRENCY_RATES[currency] ?? 1.0,
                });
            },

            // Helper function to calculate and format prices with correct symbols
            formatPrice: (priceInUSD) => {
                const { currentCurrency, exchangeRate } = get();
                const convertedPrice = priceInUSD * exchangeRate;

                return new Intl.NumberFormat('en-GH', {
                    style: 'currency',
                    currency: currentCurrency,
                }).format(convertedPrice);
            }
        }),
        {
            name: 'app-preferences-storage',
            partialize: (state) => ({
                currentCurrency: state.currentCurrency,
                exchangeRate: state.exchangeRate
            }),
        }
    )
);
