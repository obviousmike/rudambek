import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../layouts/root-layout';
import { HomePage } from '../pages/home-page';
import { RouteErrorBoundary } from '../components/ui/route-error-boundary';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'shop',
                lazy: () =>
                    import('../pages/shop-page').then((m) => ({ Component: m.ShopPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'categories',
                lazy: () =>
                    import('../pages/categories-page').then((m) => ({ Component: m.CategoriesPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'about',
                lazy: () =>
                    import('../pages/about-page').then((m) => ({ Component: m.AboutPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'as-seen-on',
                lazy: () =>
                    import('../pages/as-seen-on-page').then((m) => ({ Component: m.AsSeenOnPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'contact',
                lazy: () =>
                    import('../pages/contact-page').then((m) => ({ Component: m.ContactPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'faq',
                lazy: () =>
                    import('../pages/faq-page').then((m) => ({ Component: m.FaqPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'wishlist',
                lazy: () =>
                    import('../pages/wishlist-page').then((m) => ({ Component: m.WishlistPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'account',
                lazy: () =>
                    import('../pages/account-page').then((m) => ({ Component: m.AccountPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'product/:productId',
                lazy: () =>
                    import('../pages/product-page').then((m) => ({ Component: m.ProductPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'cart',
                lazy: () =>
                    import('../pages/cart-page').then((m) => ({ Component: m.CartPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'checkout',
                lazy: () =>
                    import('../pages/checkout-page').then((m) => ({ Component: m.CheckoutPage })),
                errorElement: <RouteErrorBoundary />,
            },
            // Convenience redirects the footer links already use
            {
                path: 'returns',
                lazy: () =>
                    import('../pages/faq-page').then((m) => ({ Component: m.FaqPage })),
                errorElement: <RouteErrorBoundary />,
            },
            {
                path: 'shipping',
                lazy: () =>
                    import('../pages/faq-page').then((m) => ({ Component: m.FaqPage })),
                errorElement: <RouteErrorBoundary />,
            },
            // Catch-all
            {
                path: '*',
                lazy: () =>
                    import('../pages/not-found-page').then((m) => ({ Component: m.NotFoundPage })),
                errorElement: <RouteErrorBoundary />,
            },
        ],
    },
]);

export function AppRoutes() {
    return <RouterProvider router={router} />;
}
