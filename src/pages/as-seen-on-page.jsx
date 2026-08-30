import { FaInstagram } from 'react-icons/fa';
import { usePageMeta } from '../hooks/use-page-meta';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

import pFuguDesign from '../assets/products/P-FUGU Design GHS - 400.PNG';
import pFuguPatches from '../assets/products/P-FUGU Patches ghs - 450.PNG';
import pFuguPatchesForest from '../assets/products/P-FUGU Patches 01.PNG';
import pFuguPatchesKente from '../assets/products/P-FUGU Patches 02.PNG';
import tdPDesign from '../assets/products/TD-P Design GHS -  350.PNG';
import tdFuguDesign from '../assets/products/TD-FUGU Design 111 - GHS450.PNG';
import tdFuguBatik from '../assets/products/TD-FUGU 01.PNG';
import tdFuguChartreuse from '../assets/products/TD-FUGU 02.PNG';
import tdFuguPlum from '../assets/products/TD-FUGU 03.PNG';
import tdFuguCocoa from '../assets/products/TD-FUGU 04.png';

const GOLD = '#C9A24B';

const INSTAGRAM_URL = 'https://www.instagram.com/rudambek.style/';

const GALLERY_ITEMS = [
    { id: 1, img: pFuguDesign, title: 'P-FUGU Design' },
    { id: 2, img: pFuguPatches, title: 'P-FUGU Patches — Navy Patchwork' },
    { id: 3, img: tdPDesign, title: 'TD-P Design' },
    { id: 4, img: tdFuguDesign, title: 'TD-FUGU Design 111 — Gold & Green' },
    { id: 5, img: tdFuguBatik, title: 'TD-FUGU Design 111 — Maroon Batik' },
    { id: 6, img: tdFuguChartreuse, title: 'TD-FUGU Design 111 — Chartreuse Tie-Dye' },
    { id: 7, img: tdFuguPlum, title: 'TD-FUGU Design 111 — Plum Tie-Dye' },
    { id: 8, img: tdFuguCocoa, title: 'TD-FUGU Design 111 — Cocoa Tie-Dye' },
    { id: 9, img: pFuguPatchesForest, title: 'P-FUGU Patches — Forest Patchwork' },
    { id: 10, img: pFuguPatchesKente, title: 'P-FUGU Patches — Kente Patchwork' },
];

function GalleryCard({ item, duplicate = false, eager = false }) {
    return (
        <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-[190px] shrink-0 sm:w-[210px]"
            aria-hidden={duplicate ? 'true' : undefined}
            tabIndex={duplicate ? -1 : 0}
        >
            <div className="relative aspect-[3/5] overflow-hidden bg-[#efe8dc]">
                <img
                    src={item.img}
                    alt={duplicate ? '' : item.title}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <FaInstagram aria-hidden="true" className="h-6 w-6" />
                    <span className="text-[11px] font-medium tracking-[0.08em]">
                        @rudambek.style
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-slate-700 transition group-hover:text-[#A8822F]">
                    {item.title}
                </span>
                <span aria-hidden="true" className="text-slate-400">
                    ↗
                </span>
            </div>
        </a>
    );
}

export function AsSeenOnSection({ headingTag: HeadingTag = 'h2' }) {
    return (
        <section
            aria-labelledby="aso-title"
            className="bg-[#faf7f3] py-24 sm:py-28"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-8 border-b border-slate-200/80 pb-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <p
                            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em]"
                            style={{ color: GOLD }}
                        >
                            As seen on
                        </p>

                        <HeadingTag
                            id="aso-title"
                            className="font-display font-normal text-4xl leading-tight text-slate-900 sm:text-5xl"
                        >
                            Rudambek in the wild
                        </HeadingTag>

                        <div
                            className="mt-5 h-px w-12"
                            style={{ backgroundColor: GOLD }}
                        />

                        <p className="mt-5 max-w-lg text-sm leading-6 text-slate-500">
                            Discover how our community wears Rudambek with
                            confidence, character, and individuality. Tag{' '}
                            <span className="font-medium text-slate-700">
                                @rudambek.style
                            </span>{' '}
                            for a chance to be featured.
                        </p>
                    </div>

                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border border-slate-900 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2"
                    >
                        Follow us
                        <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            ↗
                        </span>
                    </a>
                </div>

                <div
                    className="aso-marquee-wrap mt-14 overflow-hidden"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
                    }}
                >
                    <div className="aso-track flex w-max gap-5">
                        <div className="flex gap-5">
                            {GALLERY_ITEMS.map((item, index) => (
                                <GalleryCard
                                    key={`first-${item.id}`}
                                    item={item}
                                    eager={index < 2}
                                />
                            ))}
                        </div>

                        <div className="flex gap-5" aria-hidden="true">
                            {GALLERY_ITEMS.map((item) => (
                                <GalleryCard
                                    key={`second-${item.id}`}
                                    item={item}
                                    duplicate
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function AsSeenOnPage() {
    usePageMeta({
        title: 'As Seen On',
        description:
            'See Rudambek Clothing styles as featured on Instagram — real looks from @rudambek.style.',
    });

    return (
        <main className="bg-[#faf7f3]">
            <div className="mx-auto max-w-[1400px] px-5 pt-8 sm:px-8 lg:px-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', to: '/' },
                        { label: 'As Seen On' },
                    ]}
                />
            </div>
            <AsSeenOnSection headingTag="h1" />
        </main>
    );
}
