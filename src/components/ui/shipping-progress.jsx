import {
    useAppStore,
    FREE_SHIPPING_THRESHOLD_USD,
} from '../../store/use-app-store';
import { useCartStore } from '../../features/cart/cart-store';
import { TruckIcon } from './trust-icons';

export function ShippingProgress({ className = '' }) {
    const subtotal = useCartStore((state) => state.getCartTotal());
    const formatDualPrice = useAppStore((state) => state.formatDualPrice);

    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotal);
    const progress = Math.min(
        100,
        (subtotal / FREE_SHIPPING_THRESHOLD_USD) * 100
    );
    const qualifies = remaining <= 0;

    return (
        <div className={className}>
            <div className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                <TruckIcon
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: '#c9a24b' }}
                />

                {qualifies ? (
                    <span>
                        You've unlocked{' '}
                        <strong className="font-semibold text-slate-900">
                            free delivery
                        </strong>{' '}
                        in Ghana.
                    </span>
                ) : (
                    <span>
                        Add{' '}
                        <strong className="font-semibold text-slate-900">
                            {formatDualPrice(remaining)}
                        </strong>{' '}
                        more for free delivery in Ghana.
                    </span>
                )}
            </div>

            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-[#c9a24b] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
