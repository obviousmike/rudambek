import { useEffect, useRef, useState } from 'react';
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useNavigationType,
} from 'react-router-dom';

import { useCartStore } from '../features/cart/cart-store';
import logo from '../assets/rudambek-logo.png';
import logoFooter from '../assets/logo-footer.png';
import { BackToTop } from '../components/ui/back-to-top';
import { CartDrawer } from '../components/ui/cart-drawer';
import { QuickViewDrawer } from '../components/ui/quick-view-drawer';

const ANNOUNCEMENT_HEIGHT = 36;
const HEADER_HEIGHT = 100 + ANNOUNCEMENT_HEIGHT;

// Scroll position per history entry, so back/forward navigation can restore
// where the user was instead of always landing at the top of the page.
const scrollPositions = new Map();

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

function SearchIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
    );
}

function CartIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path
                d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 8H6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

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

function MenuIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <path
                d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"
                strokeLinecap="round"
            />
        </svg>
    );
}

function UserIcon(props) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            {...props}
        >
            <circle cx="12" cy="8" r="4" />
            <path
                d="M4 20c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const mobileNavLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
    { to: '/shop?sort=sale', label: 'Sale' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const linkClass =
    'nav-underline font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800 transition-colors duration-200 hover:text-[#C9A24B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-4';

const iconClass =
    'text-slate-700 transition-colors duration-200 hover:text-[#C9A24B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-4';

export function RootLayout() {
    const location = useLocation();
    const navigationType = useNavigationType();
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.cartItems);
    const isCartDrawerOpen = useCartStore((state) => state.isDrawerOpen);
    const openCartDrawer = useCartStore((state) => state.openDrawer);
    const closeCartDrawer = useCartStore((state) => state.closeDrawer);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const searchInputRef = useRef(null);

    // Close the mobile menu/search panel/cart drawer whenever the user
    // actually navigates. Adjusted directly during render (React's
    // recommended pattern for "reset state when an identity changes")
    // rather than in an effect, so it takes effect before paint instead of
    // one tick after.
    const [prevLocationKey, setPrevLocationKey] = useState(location.key);
    if (location.key !== prevLocationKey) {
        setPrevLocationKey(location.key);
        setMobileMenuOpen(false);
        setSearchOpen(false);
        closeCartDrawer();
    }

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // Track scroll position continuously while on this page, keyed to
        // its own history entry. This has to happen live, not read
        // reactively after navigating away — by the time a location-change
        // effect runs, the destination page's DOM has already replaced this
        // one, and if it's shorter the browser will have already clamped
        // scrollY to fit it, corrupting a "read it after the fact" capture.
        const key = location.key;

        const recordScroll = () => {
            scrollPositions.set(key, window.scrollY);
        };

        // No immediate call here — only record real scroll activity.
        // Recording once on mount would capture whatever scrollY happens to
        // still be leftover from the page just left, overwriting this
        // page's own already-saved position before the restore effect
        // (declared below) gets a chance to read and apply it.
        window.addEventListener('scroll', recordScroll, { passive: true });
        return () => window.removeEventListener('scroll', recordScroll);
    }, [location.key]);

    const totalItemsCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    useEffect(() => {
        document.body.style.overflow =
            mobileMenuOpen || isCartDrawerOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen, isCartDrawerOpen]);

    useEffect(() => {
        if (searchOpen) {
            searchInputRef.current?.focus();
        }
    }, [searchOpen]);

    useEffect(() => {
        if (!searchOpen && !mobileMenuOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSearchOpen(false);
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [searchOpen, mobileMenuOpen]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const query = searchQuery.trim();
        const destination = query
            ? `/shop?search=${encodeURIComponent(query)}`
            : '/shop';

        navigate(destination);
        setSearchOpen(false);
        setSearchQuery('');
    };

    useEffect(() => {
        const targetId = location.hash.replace(/^#/, '');

        const restoredScrollTop =
            navigationType === 'POP' ? scrollPositions.get(location.key) : undefined;

        if (!targetId && restoredScrollTop !== undefined) {
            const applyRestoredScroll = () => {
                // 'auto' defers to the page's CSS `scroll-behavior: smooth`,
                // which would animate this instead of jumping instantly —
                // 'instant' is the explicit override for a hard jump.
                window.scrollTo({
                    top: restoredScrollTop,
                    left: 0,
                    behavior: 'instant',
                });
            };

            // The page may not have laid out to its full height yet (images
            // still loading, etc.), which would clamp the scroll short of
            // the target — reapply a few times as content settles in.
            applyRestoredScroll();
            const retryTimers = [50, 150, 350].map((delay) =>
                window.setTimeout(applyRestoredScroll, delay)
            );

            return () => {
                retryTimers.forEach((timer) => window.clearTimeout(timer));
            };
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });

        if (!targetId) return undefined;

        let attempts = 0;
        let timer;

        const scrollToTarget = () => {
            const target = document.getElementById(
                decodeURIComponent(targetId)
            );

            if (target) {
                const targetTop =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    HEADER_HEIGHT;

                window.scrollTo({
                    top: Math.max(0, targetTop),
                    left: 0,
                    behavior: 'smooth',
                });

                return;
            }

            if (attempts < 20) {
                attempts += 1;
                timer = window.setTimeout(scrollToTarget, 50);
            }
        };

        timer = window.setTimeout(scrollToTarget, 0);

        return () => {
            window.clearTimeout(timer);
        };
    }, [location.pathname, location.search, location.hash, location.key, navigationType]);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#FAF8F4]">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-slate-900 focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-white focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2"
            >
                Skip to content
            </a>

            <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-slate-900 px-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                <p className="truncate sm:hidden">
                    Free delivery in Ghana over ₵500
                </p>
                <p className="hidden truncate sm:block">
                    Complimentary delivery in Ghana on orders over ₵500 —
                    ships within 3–5 business days
                </p>
            </div>

            <header
                className={`fixed left-0 right-0 top-9 z-50 border-b transition-all duration-500 ${
                    scrolled
                        ? 'border-slate-200/70 bg-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md'
                        : 'border-slate-100 bg-white shadow-[0_1px_20px_rgba(0,0,0,0.05)]'
                }`}
            >
                <div className="mx-auto grid h-[100px] max-w-[1400px] grid-cols-3 items-center px-5 sm:px-8 lg:px-12">
                    <nav className="flex items-center gap-6 sm:gap-8 lg:gap-10">
                        <button
                            type="button"
                            aria-label={
                                mobileMenuOpen ? 'Close menu' : 'Open menu'
                            }
                            aria-expanded={mobileMenuOpen}
                            onClick={() =>
                                setMobileMenuOpen((open) => !open)
                            }
                            className={`cursor-pointer md:hidden ${iconClass}`}
                        >
                            <MenuIcon className="h-[19px] w-[19px]" />
                        </button>

                        <button
                            type="button"
                            aria-label={searchOpen ? 'Close search' : 'Search'}
                            aria-expanded={searchOpen}
                            onClick={() => setSearchOpen((open) => !open)}
                            className={`cursor-pointer ${iconClass}`}
                        >
                            <SearchIcon className="h-[17px] w-[17px]" />
                        </button>

                        <Link to="/shop" className={linkClass}>
                            Shop
                        </Link>

                        <Link
                            to="/categories"
                            className={`hidden md:inline ${linkClass}`}
                        >
                            Categories
                        </Link>

                        <Link
                            to="/shop?sort=sale"
                            className={`hidden md:inline ${linkClass}`}
                        >
                            Sale
                        </Link>
                    </nav>

                    <Link
                        to="/"
                        aria-label="Rudambek home"
                        className="justify-self-center"
                    >
                        <img
                            src={logo}
                            alt="Rudambek Clothing"
                            className="h-[88px] w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center justify-self-end gap-6 sm:gap-8 lg:gap-10">
                        <Link
                            to="/wishlist"
                            className={`hidden md:inline ${linkClass}`}
                        >
                            Wishlist
                        </Link>

                        <Link
                            to="/about"
                            className={`hidden md:inline ${linkClass}`}
                        >
                            About
                        </Link>

                        <button
                            type="button"
                            onClick={openCartDrawer}
                            aria-label="Cart"
                            title="Cart"
                            className={`relative cursor-pointer ${iconClass}`}
                        >
                            <CartIcon className="h-[19px] w-[19px]" />

                            {totalItemsCount > 0 && (
                                <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A24B] text-[9px] font-bold leading-none text-white">
                                    {totalItemsCount}
                                </span>
                            )}
                        </button>

                        <Link
                            to="/account"
                            aria-label="Account"
                            className={`hidden md:inline-flex ${iconClass}`}
                        >
                            <UserIcon className="h-[19px] w-[19px]" />
                        </Link>
                    </div>
                </div>

                <div
                    className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300 ease-out ${
                        searchOpen ? 'max-h-24' : 'max-h-0'
                    }`}
                >
                    <form
                        onSubmit={handleSearchSubmit}
                        role="search"
                        aria-label="Site search"
                        className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-5 sm:px-8 lg:px-12"
                    >
                        <SearchIcon className="h-[18px] w-[18px] shrink-0 text-slate-400" />

                        <input
                            ref={searchInputRef}
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search for dresses, kaftans, shirts…"
                            aria-label="Search products"
                            tabIndex={searchOpen ? 0 : -1}
                            className="min-w-0 flex-1 border-none bg-transparent font-serif text-lg text-slate-900 outline-none placeholder:text-slate-400 sm:text-xl"
                        />

                        <button
                            type="submit"
                            className="min-h-10 shrink-0 cursor-pointer bg-slate-900 px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C9A24B]"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            aria-label="Close search"
                            onClick={() => setSearchOpen(false)}
                            tabIndex={searchOpen ? 0 : -1}
                            className={`shrink-0 cursor-pointer ${iconClass}`}
                        >
                            <CloseIcon className="h-[18px] w-[18px]" />
                        </button>
                    </form>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[60] md:hidden ${
                    mobileMenuOpen
                        ? 'pointer-events-auto'
                        : 'pointer-events-none'
                }`}
            >
                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMobileMenu}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-300 ${
                        mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                <div
                    className={`absolute right-0 top-0 flex h-full w-[85vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-6">
                        <span className="font-serif text-lg text-slate-900">
                            Menu
                        </span>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={closeMobileMenu}
                            tabIndex={mobileMenuOpen ? 0 : -1}
                            className={`cursor-pointer ${iconClass}`}
                        >
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex flex-col divide-y divide-slate-100 overflow-y-auto px-6">
                        {mobileNavLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                tabIndex={mobileMenuOpen ? 0 : -1}
                                className="py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:text-[#C9A24B]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <Link
                        to="/account"
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className="mt-auto flex items-center gap-3 border-t border-slate-100 px-6 py-6 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:text-[#C9A24B]"
                    >
                        <UserIcon className="h-[18px] w-[18px]" />
                        Account
                    </Link>
                </div>
            </div>

            <div
                id="main-content"
                tabIndex={-1}
                key={location.pathname}
                className="page-transition w-full flex-1 pt-[136px] focus:outline-none"
            >
                <Outlet />
            </div>

            <footer className="relative bg-slate-900 pb-8 pt-16 text-white before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#C9A24B] before:to-transparent">
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Link
                                to="/"
                                aria-label="Rudambek home"
                                className="mb-4 inline-block bg-white p-3 shadow-lg"
                            >
                                <img
                                    src={logoFooter}
                                    alt="Rudambek"
                                    className="h-28 w-auto object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </Link>

                            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                                Wear your identity. Live your style. Curated
                                fashion for the bold and expressive.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
                                Shop
                            </h3>

                            <ul className="space-y-3 text-sm text-slate-400">
                                <li>
                                    <Link
                                        to="/#catalog"
                                        className="transition-colors hover:text-white"
                                    >
                                        New Arrivals
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/shop?category=Dresses"
                                        className="transition-colors hover:text-white"
                                    >
                                        Dresses
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/shop?category=Kaftans"
                                        className="transition-colors hover:text-white"
                                    >
                                        Kaftans
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to={`/shop?category=${encodeURIComponent("Men's")}`}
                                        className="transition-colors hover:text-white"
                                    >
                                        Men's Collection
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/shop?sort=sale"
                                        className="transition-colors hover:text-white"
                                    >
                                        Sale
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
                                Info
                            </h3>

                            <ul className="space-y-3 text-sm text-slate-400">
                                <li>
                                    <Link
                                        to="/about"
                                        className="transition-colors hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/about#sizing"
                                        className="transition-colors hover:text-white"
                                    >
                                        Sizing Guide
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/about#care"
                                        className="transition-colors hover:text-white"
                                    >
                                        Care Instructions
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/about#sustainability"
                                        className="transition-colors hover:text-white"
                                    >
                                        Sustainability
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/as-seen-on"
                                        className="transition-colors hover:text-white"
                                    >
                                        As Seen On
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
                                Contact
                            </h3>

                            <ul className="space-y-3 text-sm text-slate-400">
                                <li>
                                    <Link
                                        to="/contact"
                                        className="transition-colors hover:text-white"
                                    >
                                        Contact Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/faq#returns-&-exchanges"
                                        className="transition-colors hover:text-white"
                                    >
                                        Returns & Exchanges
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/faq#shipping-&-delivery"
                                        className="transition-colors hover:text-white"
                                    >
                                        Shipping Info
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/faq"
                                        className="transition-colors hover:text-white"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
                        <p>
                            &copy; {new Date().getFullYear()} Rudambek
                            Clothing. All rights reserved.
                        </p>

                        <p className="font-serif text-sm italic text-slate-600">
                            Wear your identity. Live your style.
                        </p>
                    </div>
                </div>
            </footer>

            <BackToTop />
            <CartDrawer />
            <QuickViewDrawer />
        </div>
    );
}