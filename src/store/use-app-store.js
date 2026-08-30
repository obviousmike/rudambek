import { create } from 'zustand';

// Exchange rates relative to the USD base prices stored on each product.
export const CURRENCY_RATES = {
    USD: 1.0,
    GHS: 11.20, // Ghanaian Cedi (current market mid-market rate)
    EUR: 0.92,  // Euro
    GBP: 0.78,  // British Pound
};

// Free delivery in Ghana on orders over GHS 800 (see the site-wide announcement bar).
export const FREE_SHIPPING_THRESHOLD_GHS = 800;
export const FREE_SHIPPING_THRESHOLD_USD =
    FREE_SHIPPING_THRESHOLD_GHS / CURRENCY_RATES.GHS;

function formatInCurrency(amountInUSD, currency) {
    return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency,
    }).format(amountInUSD * CURRENCY_RATES[currency]);
}

export const useAppStore = create(() => ({
    // Cart and checkout totals are charged in a single real currency (USD).
    formatPrice: (priceInUSD) => formatInCurrency(priceInUSD, 'USD'),

    // Product price tags show USD and GHS side by side, e.g. "US$31.25/GH₵350.00".
    formatDualPrice: (priceInUSD) =>
        `${formatInCurrency(priceInUSD, 'USD')}/${formatInCurrency(priceInUSD, 'GHS')}`,
}));
