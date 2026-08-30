import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../features/cart/cart-store';
import { useAppStore, CURRENCY_RATES } from '../store/use-app-store';
import { usePageMeta } from '../hooks/use-page-meta';
import { TrustBadges } from '../components/ui/trust-badges';

const PAYSTACK_SCRIPT_SRC = 'https://js.paystack.co/v1/inline.js';
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const GOLD = '#C9A24B';
const ERROR_COLOR = '#a33f32';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: 'Ghana',
};

const FIELD_LABELS = {
    fullName: 'your full name',
    phone: 'a phone number',
    email: 'your email',
    address: 'your street address',
    city: 'your city',
    region: 'your region',
    country: 'your country',
};

function validateForm(form) {
    const errors = {};

    Object.keys(FIELD_LABELS).forEach((field) => {
        if (!form[field].trim()) {
            errors[field] = `Enter ${FIELD_LABELS[field]}.`;
        }
    });

    if (!errors.email && !EMAIL_PATTERN.test(form.email.trim())) {
        errors.email = 'Enter a valid email address.';
    }

    return errors;
}

function usePaystackScript() {
    const [ready, setReady] = useState(
        typeof window !== 'undefined' && Boolean(window.PaystackPop)
    );

    useEffect(() => {
        if (ready) return undefined;

        const existing = document.querySelector(
            `script[src="${PAYSTACK_SCRIPT_SRC}"]`
        );

        if (existing) {
            existing.addEventListener('load', () => setReady(true));
            return undefined;
        }

        const script = document.createElement('script');
        script.src = PAYSTACK_SCRIPT_SRC;
        script.async = true;
        script.onload = () => setReady(true);
        document.body.appendChild(script);

        return undefined;
    }, [ready]);

    return ready;
}

function generateReference() {
    return `RDB-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

export function CheckoutPage() {
    usePageMeta({ title: 'Checkout', noIndex: true });

    const cartItems = useCartStore((state) => state.cartItems);
    const getCartTotal = useCartStore((state) => state.getCartTotal);
    const clearCart = useCartStore((state) => state.clearCart);
    const formatDualPrice = useAppStore((state) => state.formatDualPrice);

    const paystackReady = usePaystackScript();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isPaying, setIsPaying] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    const fieldRefs = useRef({});

    const subtotalUSD = getCartTotal();
    const totalGHS = subtotalUSD * CURRENCY_RATES.GHS;
    const totalPesewas = Math.round(totalGHS * 100);

    const handleFieldChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPaymentError('');

        const validationErrors = validateForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            fieldRefs.current[Object.keys(validationErrors)[0]]?.focus();
            return;
        }

        setErrors({});

        if (!PAYSTACK_PUBLIC_KEY) {
            setPaymentError(
                'Payments are not configured yet. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file.'
            );
            return;
        }

        if (!paystackReady || !window.PaystackPop) {
            setPaymentError(
                'Payment provider is still loading. Please try again in a moment.'
            );
            return;
        }

        const reference = generateReference();

        setIsPaying(true);

        const handler = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: form.email,
            amount: totalPesewas,
            currency: 'GHS',
            ref: reference,
            metadata: {
                custom_fields: [
                    { display_name: 'Full Name', variable_name: 'full_name', value: form.fullName },
                    { display_name: 'Phone', variable_name: 'phone', value: form.phone },
                    {
                        display_name: 'Shipping Address',
                        variable_name: 'shipping_address',
                        value: `${form.address}, ${form.city}, ${form.region}, ${form.country}`,
                    },
                ],
            },
            callback: () => {
                setIsPaying(false);
                setConfirmedOrder({ reference, totalGHS });
                clearCart();
            },
            onClose: () => {
                setIsPaying(false);
            },
        });

        handler.openIframe();
    };

    if (confirmedOrder) {
        return (
            <main className="mx-auto max-w-2xl px-6 py-20 text-center">
                <div
                    className="mx-auto mb-4 h-px w-12"
                    style={{ backgroundColor: GOLD }}
                />
                <h1 className="font-serif text-3xl text-slate-900">
                    Thank you — your order is confirmed.
                </h1>
                <p className="mt-3 text-slate-500">
                    We've received your payment of{' '}
                    <span className="font-semibold text-slate-800">
                        GHS {confirmedOrder.totalGHS.toFixed(2)}
                    </span>
                    . A confirmation has been sent to your email.
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                    Reference: {confirmedOrder.reference}
                </p>
                <Link
                    to="/shop"
                    className="mt-8 inline-block bg-slate-900 px-8 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8822F] hover:shadow-lg"
                >
                    Continue shopping
                </Link>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="mx-auto max-w-3xl px-6 py-16 text-center">
                <h1 className="font-serif text-3xl text-slate-900">
                    Checkout
                </h1>
                <p className="mt-2 text-slate-500">
                    Your cart is empty — add something before checking out.
                </p>
                <Link
                    to="/shop"
                    className="mt-8 inline-block bg-slate-900 px-8 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8822F] hover:shadow-lg"
                >
                    Browse the catalog
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <h1 className="font-serif text-3xl text-slate-900">
                Checkout Securely
            </h1>
            <p className="mt-2 text-slate-500">
                Complete your details below, then pay with Paystack.
            </p>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
            >
                <div className="space-y-8">
                    <fieldset className="space-y-4">
                        <legend className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Contact
                        </legend>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Full name"
                                value={form.fullName}
                                onChange={handleFieldChange('fullName')}
                                autoComplete="name"
                                error={errors.fullName}
                                inputRef={(el) => (fieldRefs.current.fullName = el)}
                                required
                            />
                            <Field
                                label="Phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleFieldChange('phone')}
                                autoComplete="tel"
                                error={errors.phone}
                                inputRef={(el) => (fieldRefs.current.phone = el)}
                                required
                            />
                        </div>

                        <Field
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={handleFieldChange('email')}
                            autoComplete="email"
                            error={errors.email}
                            inputRef={(el) => (fieldRefs.current.email = el)}
                            required
                        />
                    </fieldset>

                    <fieldset className="space-y-4">
                        <legend className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Shipping address
                        </legend>

                        <Field
                            label="Street address"
                            value={form.address}
                            onChange={handleFieldChange('address')}
                            autoComplete="street-address"
                            error={errors.address}
                            inputRef={(el) => (fieldRefs.current.address = el)}
                            required
                        />

                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field
                                label="City"
                                value={form.city}
                                onChange={handleFieldChange('city')}
                                autoComplete="address-level2"
                                error={errors.city}
                                inputRef={(el) => (fieldRefs.current.city = el)}
                                required
                            />
                            <Field
                                label="Region"
                                value={form.region}
                                onChange={handleFieldChange('region')}
                                autoComplete="address-level1"
                                error={errors.region}
                                inputRef={(el) => (fieldRefs.current.region = el)}
                                required
                            />
                            <Field
                                label="Country"
                                value={form.country}
                                onChange={handleFieldChange('country')}
                                autoComplete="country-name"
                                error={errors.country}
                                inputRef={(el) => (fieldRefs.current.country = el)}
                                required
                            />
                        </div>
                    </fieldset>
                </div>

                <div className="h-fit space-y-5 border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5">
                    <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Order summary
                    </h2>

                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li
                                key={item.lineId}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 shrink-0 bg-slate-50 object-cover"
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
                                    <p className="text-xs text-slate-400">
                                        Qty {item.quantity}
                                    </p>
                                </div>
                                <p className="shrink-0 text-sm font-semibold text-slate-900">
                                    {formatDualPrice(item.price * item.quantity)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>{formatDualPrice(subtotalUSD)}</span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Total charged (Paystack)
                            </span>
                            <span className="font-serif text-xl text-slate-900">
                                GHS {totalGHS.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {paymentError && (
                        <p className="text-xs" style={{ color: ERROR_COLOR }}>
                            {paymentError}
                        </p>
                    )}

                    <TrustBadges className="border-t border-slate-100 pt-4" />

                    <button
                        type="submit"
                        disabled={isPaying}
                        className="min-h-12 w-full cursor-pointer bg-[#C9A24B] text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8822F] hover:shadow-xl disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                    >
                        {isPaying ? 'Waiting for payment…' : 'Pay with Paystack'}
                    </button>

                    <p className="text-center text-[10px] text-slate-400">
                        Payments are processed securely by Paystack.
                    </p>
                </div>
            </form>
        </main>
    );
}

function Field({ label, error, inputRef, ...inputProps }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">
                {label}
            </span>
            <input
                ref={inputRef}
                {...inputProps}
                aria-invalid={error ? 'true' : undefined}
                className={`min-h-11 w-full border bg-white px-3 text-sm text-slate-800 outline-none transition focus:ring-1 ${
                    error
                        ? 'border-[#a33f32] focus:border-[#a33f32] focus:ring-[#a33f32]'
                        : 'border-slate-300 focus:border-[#C9A24B] focus:ring-[#C9A24B]'
                }`}
            />
            {error && (
                <span
                    className="mt-1.5 block text-xs"
                    style={{ color: ERROR_COLOR }}
                >
                    {error}
                </span>
            )}
        </label>
    );
}
