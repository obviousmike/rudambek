import { ShieldIcon, ReturnIcon, PinIcon } from './trust-icons';

const GOLD = '#c9a24b';

const DEFAULT_ITEMS = [
    { icon: ShieldIcon, label: 'Secure checkout' },
    { icon: ReturnIcon, label: '14-day returns' },
    { icon: PinIcon, label: 'Made in Ghana' },
];

export function TrustBadges({ items = DEFAULT_ITEMS, className = '' }) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}
        >
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.label}
                        className="flex items-center gap-2 text-xs text-slate-500"
                    >
                        <Icon
                            className="h-4 w-4 shrink-0"
                            style={{ color: GOLD }}
                        />
                        <span>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
