import { useState } from 'react';
import { usePageMeta } from '../hooks/use-page-meta';

const GOLD = '#C9A24B';

export function AccountPage() {
    usePageMeta({ title: 'Account', noIndex: true });

    const [activeTab, setActiveTab] = useState('sign-in');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#faf7f3]">
            <section className="mx-auto max-w-md px-6 py-16 sm:py-20">
                <p
                    className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: GOLD }}
                >
                    My account
                </p>

                <h1 className="text-center font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                    {activeTab === 'sign-in'
                        ? 'Welcome back'
                        : 'Create your account'}
                </h1>

                <div className="mt-8 flex border-b border-slate-200">
                    <TabButton
                        active={activeTab === 'sign-in'}
                        onClick={() => {
                            setActiveTab('sign-in');
                            setSubmitted(false);
                        }}
                    >
                        Sign In
                    </TabButton>
                    <TabButton
                        active={activeTab === 'create-account'}
                        onClick={() => {
                            setActiveTab('create-account');
                            setSubmitted(false);
                        }}
                    >
                        Create Account
                    </TabButton>
                </div>

                {submitted && (
                    <p className="fade-in-down mt-6 border border-[#C9A24B]/40 bg-[#F5F0E8] px-4 py-3 text-sm text-slate-700">
                        Account sign-in isn't connected yet — this is a
                        preview of what's coming. Nothing was saved or sent
                        anywhere.
                    </p>
                )}

                {activeTab === 'sign-in' ? (
                    <form
                        key="sign-in"
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >
                        <Field
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                        <Field
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            className="block text-left text-xs font-medium text-[#a6814c] hover:underline"
                        >
                            Forgot your password?
                        </button>

                        <button
                            type="submit"
                            className="min-h-12 w-full cursor-pointer bg-slate-900 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A24B] hover:shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>
                ) : (
                    <form
                        key="create-account"
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >
                        <Field
                            label="Full name"
                            autoComplete="name"
                            required
                        />
                        <Field
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                        <Field
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            required
                        />
                        <Field
                            label="Confirm password"
                            type="password"
                            autoComplete="new-password"
                            required
                        />

                        <button
                            type="submit"
                            className="min-h-12 w-full cursor-pointer bg-[#C9A24B] text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A8822F] hover:shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`-mb-px flex-1 cursor-pointer border-b-2 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                active
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
        >
            {children}
        </button>
    );
}

function Field({ label, ...inputProps }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">
                {label}
            </span>
            <input
                {...inputProps}
                className="min-h-11 w-full border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
            />
        </label>
    );
}
