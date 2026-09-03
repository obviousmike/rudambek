import { useEffect, useState, useCallback } from 'react';
import carousel1 from '../../assets/products/carousel 1.jpg';
import carousel2 from '../../assets/products/carousel 2.jpg';
import carousel3 from '../../assets/products/carousel 3.jpg';

// focus controls where the crop anchors on portrait images.
// Format: 'X% Y%' — e.g. '50% 20%' keeps the top-center in frame.
// Adjust per slide until each photo looks right.
const SLIDES = [
    {
        id: 1,
        image: carousel1,
        focus: '50% 18%',       // shows face/upper body
        eyebrow: 'New Arrivals',
        titleLine1: 'WEAR YOUR',
        titleLine2Italic: 'IDENTITY.',
        titleLine3: 'LIVE YOUR',
        titleLine4: 'STYLE',
        ctaLabel: 'Shop Now',
    },
    {
        id: 2,
        image: carousel2,
        focus: '50% 18%',       // shows face/upper body
        eyebrow: 'Signature Prints',
        titleLine1: 'BOLD COLOR,',
        titleLine2Italic: 'BOLDER',
        titleLine3: 'CONFIDENCE',
        titleLine4: '',
        ctaLabel: 'Explore Prints',
    },
    {
        id: 3,
        image: carousel3,
        focus: '50% 18%',       // shows face/upper body
        eyebrow: "Men's Edit",
        titleLine1: 'TAILORED',
        titleLine2Italic: 'FOR THE',
        titleLine3: 'MODERN MAN',
        titleLine4: '',
        ctaLabel: 'Shop Menswear',
    },
];

const AUTO_ADVANCE_MS = 6000;

export function HeroCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    // Only the slides a visitor has actually reached (plus the upcoming one,
    // pre-fetched ahead of its transition) get their <img> mounted — the rest
    // stay unmounted so the browser never downloads hero photos nobody saw.
    const [loadedIndices, setLoadedIndices] = useState(() => new Set([0, 1 % SLIDES.length]));

    const goTo = useCallback((index) => {
        const normalized = (index + SLIDES.length) % SLIDES.length;
        const upcoming = (normalized + 1) % SLIDES.length;

        setActiveIndex(normalized);
        setLoadedIndices((prev) => {
            if (prev.has(normalized) && prev.has(upcoming)) return prev;
            return new Set(prev).add(normalized).add(upcoming);
        });
    }, []);

    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        const timer = setInterval(goNext, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [goNext]);

    return (
        <div className="relative h-[calc(100svh-88px)] min-h-[560px] overflow-hidden">
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-out"
                    style={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 1 : 0 }}
                    aria-hidden={index !== activeIndex}
                >
                    {loadedIndices.has(index) && (
                        <img
                            src={slide.image}
                            alt=""
                            className="kenburns w-full h-full object-cover"
                            style={{ objectPosition: slide.focus }}
                            fetchPriority={index === 0 ? 'high' : undefined}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-[1400px] w-full mx-auto px-8 lg:px-12">
                            <div className="max-w-lg">
                                <span className="block text-[#C9A24B] text-[10px] font-semibold tracking-[0.35em] uppercase mb-5">
                                    {slide.eyebrow}
                                </span>
                                <h1 className="hero-display font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.02] font-normal drop-shadow-sm">
                                    <span className="block">{slide.titleLine1}</span>
                                    {slide.titleLine2Italic && (
                                        <span className="block italic">{slide.titleLine2Italic}</span>
                                    )}
                                    {slide.titleLine3 && (
                                        <span className="block">{slide.titleLine3}</span>
                                    )}
                                    {slide.titleLine4 && (
                                        <span className="block">{slide.titleLine4}</span>
                                    )}
                                </h1>
                                <a
                                    href="#catalog"
                                    className="mt-10 inline-flex items-center gap-3 bg-[#C9A24B] hover:bg-[#A8822F] text-white font-semibold text-xs px-7 py-3.5 tracking-[0.15em] uppercase shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
                                >
                                    {slide.ctaLabel}
                                    <span aria-hidden="true" className="text-base leading-none">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Prev / Next */}
            <button onClick={goPrev} aria-label="Previous slide"
                className="absolute z-10 bottom-8 right-16 text-white/70 hover:text-white transition cursor-pointer text-2xl leading-none">
                ←
            </button>
            <button onClick={goNext} aria-label="Next slide"
                className="absolute z-10 bottom-8 right-8 text-white/70 hover:text-white transition cursor-pointer text-2xl leading-none">
                →
            </button>

            {/* Slide counter + dots */}
            <div className="absolute z-10 bottom-9 left-8 lg:left-12 flex items-center gap-3">
                {SLIDES.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-[2px] rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex
                            ? 'w-8 bg-[#C9A24B]'
                            : 'w-3 bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
                <span className="text-white/50 text-[10px] tracking-widest ml-1">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
}
