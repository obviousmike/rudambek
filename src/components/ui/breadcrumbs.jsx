import { Link } from 'react-router-dom';

const SITE_URL = 'https://rudambek.com';

// items: [{ label, to }], where the last item represents the current page (no `to`)
export function Breadcrumbs({ items, className = '', variant = 'light' }) {
    const isDark = variant === 'dark';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.to ? `${SITE_URL}${item.to}` : undefined,
        })),
    };

    return (
        <nav
            aria-label="Breadcrumb"
            className={`text-[11px] uppercase tracking-[0.14em] ${
                isDark ? 'text-white/50' : 'text-slate-400'
            } ${className}`}
        >
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            {item.to && !isLast ? (
                                <Link
                                    to={item.to}
                                    className={`transition-colors ${
                                        isDark
                                            ? 'hover:text-white'
                                            : 'hover:text-[#a8822f]'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={isDark ? 'text-white/85' : 'text-slate-600'}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className={isDark ? 'text-white/30' : 'text-slate-300'}
                                >
                                    /
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </nav>
    );
}
