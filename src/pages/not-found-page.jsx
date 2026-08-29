import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/use-page-meta';

const GOLD = '#c9a24b';

export function NotFoundPage() {
    usePageMeta({ title: 'Page Not Found', noIndex: true });

    return (
        <main className="min-h-[70vh] bg-[#faf7f3] flex items-center justify-center px-8">
            <div className="text-center max-w-lg">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>404</p>
                <h1 className="mt-4 font-serif text-5xl sm:text-6xl text-slate-900">Page not found.</h1>
                <div className="mt-5 mx-auto w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
                <p className="mt-6 text-sm leading-7 text-slate-500">
                    The page you are looking for doesn't exist or may have moved. Let's get you back to something beautiful.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex min-h-11 items-center gap-3 bg-slate-900 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9a24b] hover:shadow-lg"
                    >
                        Go home →
                    </Link>
                    <Link
                        to="/shop"
                        className="inline-flex min-h-11 items-center gap-3 border border-slate-300 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:shadow-md"
                    >
                        Shop the collection
                    </Link>
                </div>
            </div>
        </main>
    );
}
