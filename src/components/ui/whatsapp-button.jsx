import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '233596602507';
const WHATSAPP_MESSAGE = "Hi Rudambek, I'd like to know more about your pieces.";

export function WhatsAppButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className={`whatsapp-pulse-ring fixed bottom-8 left-8 z-50 group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:bg-[#1DA851] cursor-pointer ${
                visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
        >
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative h-6 w-6 text-white"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.898.526 3.669 1.436 5.19L2 22l4.94-1.396A9.947 9.947 0 0 0 12.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.163a8.13 8.13 0 0 1-4.146-1.136l-.297-.176-3.005.849.85-2.94-.194-.303a8.12 8.12 0 0 1-1.246-4.343c0-4.49 3.653-8.142 8.142-8.142 4.49 0 8.142 3.652 8.142 8.142 0 4.49-3.653 8.05-8.142 8.05z" />
            </svg>

            <span className="absolute left-14 whitespace-nowrap bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Chat on WhatsApp
            </span>
        </a>
    );
}
