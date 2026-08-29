import { useEffect, useState } from 'react';

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={`fixed bottom-8 right-8 z-50 group flex h-12 w-12 items-center justify-center bg-white border border-slate-200 shadow-lg transition-all duration-300 hover:bg-slate-900 hover:border-slate-900 cursor-pointer ${
                visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
        >
            {/* Arrow up */}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors"
            >
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Tooltip */}
            <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Back to top
            </span>
        </button>
    );
}
