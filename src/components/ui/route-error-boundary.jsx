import { Link, useRouteError } from 'react-router-dom';

const GOLD = '#c9a24b';

export function RouteErrorBoundary() {
    const error = useRouteError();

    if (import.meta.env.DEV) {
        console.error(error);
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-[#faf7f3] px-8">
            <div className="max-w-lg text-center">
                <p
                    className="font-mono text-[10px] uppercase tracking-[0.35em]"
                    style={{ color: GOLD }}
                >
                    Something went wrong
                </p>
                <h1 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">
                    This page hit a snag.
                </h1>
                <div
                    className="mx-auto mt-5 h-[2px] w-12"
                    style={{ backgroundColor: GOLD }}
                />
                <p className="mt-6 text-sm leading-7 text-slate-500">
                    Something didn't load correctly. Try refreshing, or head
                    back to somewhere familiar.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="inline-flex min-h-11 items-center gap-3 bg-slate-900 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9a24b] hover:shadow-lg"
                    >
                        Refresh page
                    </button>
                    <Link
                        to="/"
                        className="inline-flex min-h-11 items-center gap-3 border border-slate-300 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </main>
    );
}
