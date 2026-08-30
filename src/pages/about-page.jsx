import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

import editorial01 from '../assets/products/editorial-01.jpg';
import editorial02 from '../assets/products/editorial-02.jpg';
import editorial03 from '../assets/products/editorial-03.jpg';
import editorial04 from '../assets/products/editorial-04.jpg';
import editorial05 from '../assets/products/editorial-05.jpg';

const GOLD = '#c9a24b';

const VALUES = [
    {
        number: '01',
        title: 'Cultural Heritage',
        body: 'Every piece is rooted in African textile tradition — patterns, palettes, and craft techniques carried through generations.',
    },
    {
        number: '02',
        title: 'Made in Ghana',
        body: 'We design and produce locally, supporting Ghanaian artisans and placing Made-in-Ghana creativity on a global stage.',
    },
    {
        number: '03',
        title: 'Considered Craft',
        body: 'From fabric selection to final stitch, every garment is shaped with intention, patience, and attention to detail.',
    },
    {
        number: '04',
        title: 'Modern Elegance',
        body: 'Heritage meets the contemporary silhouette — refined, expressive dressing for the way people live now.',
    },
];

const CRAFTS = [
    {
        number: '01',
        title: 'Hand-selected fabrics',
        body: 'We source from trusted Ghanaian textile houses, choosing cloth with the right hand, weight, colour, and story.',
    },
    {
        number: '02',
        title: 'Skilled tailoring',
        body: 'Pattern, cut, and finish are led by experienced local ateliers who understand the movement and character of African prints.',
    },
    {
        number: '03',
        title: 'Small-batch production',
        body: 'Limited runs keep each piece considered and help reduce waste — quality over quantity, always.',
    },
];

const PRODUCT_LINES = [
    {
        name: 'African Print Dresses',
        category: 'Women Two-Piece',
    },
    {
        name: "Men's African Print Shirts",
        category: "Men's",
    },
    {
        name: "Men's Two-Piece Sets",
        category: 'Men Two-Piece',
    },
    {
        name: "Women's Boubou Dresses",
        category: 'Kaftans',
    },
    {
        name: 'Northern Ghana Fugu (Smock) Wear',
        category: 'Fugu',
    },
    {
        name: 'Corporate African Wear',
        category: 'Women Two-Piece',
    },
    {
        name: 'Ready-to-Wear Collections',
        category: 'All',
    },
    {
        name: 'Custom-Made Clothing',
        category: null,
    },
    {
        name: 'Fashion Accessories',
        category: 'All',
    },
    {
        name: 'Family and Couple Collections',
        category: 'Women Two-Piece',
    },
    {
        name: 'Event and Occasion Wear',
        category: 'Women Two-Piece',
    },
];

const SIZE_CHART = [
    { size: 'XS', bust: '78–81', waist: '61–64', hip: '86–89' },
    { size: 'S', bust: '82–85', waist: '65–68', hip: '90–93' },
    { size: 'M', bust: '86–91', waist: '69–74', hip: '94–99' },
    { size: 'L', bust: '92–97', waist: '75–80', hip: '100–105' },
    { size: 'XL', bust: '98–104', waist: '81–87', hip: '106–112' },
    { size: 'XXL', bust: '105–112', waist: '88–95', hip: '113–120' },
];

const CARE_ITEMS = [
    'Hand wash or dry clean silk, embroidered, and appliqué pieces to protect their finish.',
    'Machine wash Ankara cotton prints cold, on a gentle cycle, and inside-out to preserve colour.',
    'Air-dry away from direct sunlight — heat and UV fade printed fabrics fastest.',
    'Iron on low heat, inside-out, and avoid pressing directly over embroidery or appliqué.',
    'Store on padded hangers in a cool, dry space, away from direct sunlight and humidity.',
    'Avoid bleach and harsh detergents — they strip the vibrancy from hand-selected prints.',
];

const QUALITY_ITEMS = [
    'Premium fabrics',
    'Skilled craftsmanship',
    'Precision stitching',
    'Superior finishing',
    'Comfort and durability',
    'Customer satisfaction',
];

const SUSTAINABILITY_ITEMS = [
    'Supporting local textile manufacturers',
    'Promoting Ghanaian fabrics',
    'Responsible sourcing of materials',
    'Reducing production waste',
    'Encouraging sustainable fashion consumption',
    'Creating employment opportunities for skilled artisans',
];

const TARGET_MARKETS = [
    'Fashion-conscious individuals',
    'Corporate organizations',
    'Retail boutiques',
    'Department stores',
    'International wholesalers',
    'African diaspora communities',
    'Fashion exhibitions and trade fairs',
    'Export distributors',
];

const WHY_RUDAMBEK = [
    'Premium Made-in-Ghana products',
    'Authentic African designs',
    'High-quality craftsmanship',
    'Ethical production practices',
    'Reliable delivery',
    'Customized fashion solutions',
    'Export-ready collections',
    'Commitment to customer satisfaction',
];

const USP_ITEMS = [
    'Authentic Made-in-Ghana production',
    'Premium-quality craftsmanship',
    'Contemporary African aesthetics',
    'Custom design services',
    'Ethical and responsible production',
    'Attention to detail and finishing',
    'Durable and comfortable garments',
    'Competitive pricing for international markets',
];

export function AboutPage() {
    usePageMeta({
        title: 'About Us',
        description:
            'Rudambek Clothing is a Ghanaian fashion house under the Rudambek Group, founded by Ruth Abanga, celebrating culture, craftsmanship, and the Made-in-Ghana agenda.',
    });

    return (
        <main className="min-h-screen bg-[#faf7f3] text-slate-900">
            <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8 lg:px-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', to: '/' },
                        { label: 'About' },
                    ]}
                />
            </div>
            <HeroSection />
            <ProofStrip />
            <Reveal><StorySection /></Reveal>
            <Reveal><FounderSection /></Reveal>
            <Reveal><ValuesSection /></Reveal>
            <Reveal><VisionMissionSection /></Reveal>
            <Reveal><ProductsSection /></Reveal>
            <Reveal><UniqueSellingPropositionSection /></Reveal>
            <Reveal><CraftsmanshipSection /></Reveal>
            <Reveal><SizingGuideSection /></Reveal>
            <Reveal><CareInstructionsSection /></Reveal>
            <Reveal><QualitySustainabilitySection /></Reveal>
            <Reveal><MarketsAdvantageSection /></Reveal>
            <Reveal><ReassuranceSection /></Reveal>
            <ClosingCta />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div className="relative aspect-[4/5] w-full sm:aspect-[18/5]">
                <img
                    src={editorial01}
                    alt="Rudambek editorial study in African print and considered tailoring"
                    className="h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

                <div className="absolute inset-0 flex items-end">
                    <div className="mx-auto w-full max-w-[1400px] px-5 pb-10 sm:px-8 sm:pb-14 lg:px-10 lg:pb-20">
                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e1bd6c]">
                            The House of Rudambek
                        </p>

                        <h1 className="max-w-3xl font-serif text-4xl leading-[1.04] text-white sm:text-5xl lg:text-7xl">
                            Wear your identity.
                            <br />
                            <span className="italic">Live your style.</span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                            Premium African-inspired apparel, designed in Ghana
                            and made for a global wardrobe.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <GoldButton to="/shop">
                                Shop the collection
                            </GoldButton>

                            <SecondaryButton to="/categories">
                                Explore categories
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProofStrip() {
    return (
        <section className="bg-white">
            <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4 sm:px-8 lg:px-10">
                <ProofItem
                    value="Made in Ghana"
                    label="Designed and produced locally"
                />

                <ProofItem
                    value="Small batch"
                    label="Considered production"
                />

                <ProofItem
                    value="Custom made"
                    label="Created around your vision"
                />

                <ProofItem
                    value="Global reach"
                    label="Made for a worldwide wardrobe"
                />
            </div>
        </section>
    );
}

function ProofItem({ value, label }) {
    return (
        <div className="px-4 py-7 sm:px-6 sm:py-8">
            <p className="font-serif text-lg text-slate-900 sm:text-xl">
                {value}
            </p>

            <p className="mt-2 text-[10px] uppercase leading-5 tracking-[0.14em] text-slate-400">
                {label}
            </p>
        </div>
    );
}

function StorySection() {
    return (
        <section className="py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-4xl">
                    <SectionLabel>Why Rudambek exists</SectionLabel>

                    <h2 className="mt-3 font-serif text-4xl leading-tight text-slate-900 sm:text-5xl">
                        Ghanaian creativity, made visible.
                    </h2>

                    <GoldRule />

                    <div className="mt-8 space-y-5 text-base leading-7 text-slate-600">
                        <p>
                            <RudambekMark /> Fashion is a Ghanaian fashion
                            brand dedicated to designing and producing
                            premium African-inspired apparel that celebrates
                            culture, craftsmanship, and contemporary
                            elegance. As a division of the{' '}
                            <RudambekMark /> Group, the brand specializes in
                            creating high-quality garments that combine
                            traditional African textiles and craftsmanship
                            with modern fashion trends for local and
                            international markets.
                        </p>

                        <p>
                            Established with a vision to showcase Ghanaian
                            creativity on the global stage,{' '}
                            <RudambekMark /> Fashion promotes the
                            Made-in-Ghana agenda by producing authentic,
                            stylish, and ethically made clothing while
                            supporting local artisans and textile producers.
                            The brand is part of the broader{' '}
                            <RudambekMark /> enterprise led by entrepreneur
                            Ruth Abanga, whose work spans fashion, beauty,
                            skills development, and entrepreneurship.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FounderSection() {
    return (
        <section className="bg-white py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="relative lg:col-span-6">
                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                            <img
                                src={editorial02}
                                alt="Editorial portrait in a hand-finished Rudambek garment"
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <div
                            className="absolute -bottom-5 -right-5 hidden h-24 w-24 sm:block"
                            style={{
                                backgroundColor: GOLD,
                                opacity: 0.18,
                            }}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <SectionLabel>A note from the founder</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Built around people, pattern, and patience.
                        </h2>

                        <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
                            <p>
                                Rudambek began with a simple belief: the
                                richness of African textile tradition deserves
                                a place in the modern wardrobe — not as a
                                costume, but as a living language of style.
                            </p>

                            <p>
                                That belief now shapes a house that invests in
                                local artisans, small-batch production, and
                                considered design. Our pieces are made to be
                                worn often, kept long, and recognised.
                            </p>
                        </div>

                        <div className="mt-8 border-t border-slate-200 pt-5">
                            <p className="font-serif text-lg text-slate-900">
                                Ruth Abanga
                            </p>

                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Founder, Rudambek Group
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ValuesSection() {
    return (
        <section className="py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <SectionLabel>What we stand for</SectionLabel>

                <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                    Four principles, every collection.
                </h2>

                <GoldRule />

                <div className="mt-14 grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map((value) => (
                        <div
                            key={value.title}
                            className="group relative bg-[#faf7f3] p-8 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10"
                        >
                            <p
                                className="font-mono text-xs tracking-[0.12em]"
                                style={{ color: GOLD }}
                            >
                                {value.number}
                            </p>

                            <h3 className="mt-5 font-serif text-xl leading-tight text-slate-900">
                                {value.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {value.body}
                            </p>

                            <div
                                className="mt-6 h-px w-8 transition-all duration-300 group-hover:w-14"
                                style={{ backgroundColor: GOLD }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function VisionMissionSection() {
    return (
        <section className="bg-white py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-px bg-slate-200 lg:grid-cols-2">
                    <InfoPanel eyebrow="Our vision">
                        To become a globally recognized African fashion brand renowned for innovative designs, exceptional craftsmanship, and sustainable production while promoting Ghanaian fashion and culture.
                    </InfoPanel>

                    <InfoPanel eyebrow="Our mission">
                        To create high-quality African fashion that reflects excellence, cultural heritage, and innovation, while empowering local artisans, creating employment opportunities, and delivering products that meet international standards.
                    </InfoPanel>
                </div>
            </div>
        </section>
    );
}

function ProductsSection() {
    return (
        <section className="py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-4">
                        <SectionLabel>Our products</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Designed for every expression.
                        </h2>

                        <GoldRule />

                        <p className="mt-6 text-sm leading-7 text-slate-500">
                            From ready-to-wear pieces to custom commissions,
                            our product range brings together everyday style,
                            occasion dressing, and cultural expression.
                        </p>
                    </div>

                    <div className="min-w-0 lg:col-span-7 lg:col-start-6">
                        <div className="grid gap-x-8 sm:grid-cols-2">
                            {PRODUCT_LINES.map((product, index) => {
                                const destination = product.category
                                    ? product.category === 'All'
                                        ? '/shop'
                                        : `/shop?category=${encodeURIComponent(
                                            product.category
                                        )}`
                                    : '/contact';

                                return (
                                    <Link
                                        key={product.name}
                                        to={destination}
                                        className="group flex items-center gap-4 border-b border-slate-200 py-4 outline-none transition focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
                                    >
                                        <span
                                            className="font-mono text-[10px]"
                                            style={{ color: GOLD }}
                                        >
                                            {String(index + 1).padStart(
                                                2,
                                                '0'
                                            )}
                                        </span>

                                        <span className="flex-1 text-sm text-slate-700 transition group-hover:text-[#a8822f]">
                                            {product.name}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#a8822f]"
                                        >
                                            →
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function UniqueSellingPropositionSection() {
    return (
        <section className="border-b border-black/[0.04] bg-white py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-4">
                        <SectionLabel>Unique Selling Proposition</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            <RudambekMark /> Fashion distinguishes itself by:
                        </h2>

                        <GoldRule />
                    </div>

                    <div className="min-w-0 lg:col-span-7 lg:col-start-6">
                        <ul className="space-y-4">
                            {USP_ITEMS.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-4 border-b border-slate-200 pb-4 text-sm leading-6 text-slate-600"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: GOLD }}
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CraftsmanshipSection() {
    return (
        <section className="bg-white py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionLabel>Craftsmanship</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            From fabric to finished piece — slowly, on purpose.
                        </h2>

                        <GoldRule />

                        <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
                            A Rudambek garment is the result of many hands and
                            many decisions. We work in small batches and with
                            trusted ateliers because the work deserves that
                            pace.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                                <img
                                    src={editorial03}
                                    alt="Rudambek editorial study of print and silhouette"
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                                <img
                                    src={editorial04}
                                    alt="Rudambek editorial study of colour and texture"
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>

                    <ol className="space-y-10 lg:col-span-6 lg:col-start-7">
                        {CRAFTS.map((craft) => (
                            <li
                                key={craft.title}
                                className="border-t border-slate-200 pt-6"
                            >
                                <div className="flex items-start gap-6">
                                    <span
                                        className="font-mono text-xs tracking-[0.12em]"
                                        style={{ color: GOLD }}
                                    >
                                        {craft.number}
                                    </span>

                                    <div>
                                        <h3 className="font-serif text-2xl leading-tight text-slate-900">
                                            {craft.title}
                                        </h3>

                                        <p className="mt-3 text-base leading-7 text-slate-600">
                                            {craft.body}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

function SizingGuideSection() {
    return (
        <section
            id="sizing"
            className="scroll-mt-[156px] py-24 sm:py-32 lg:py-36"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-4">
                        <SectionLabel>Sizing guide</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Find your fit.
                        </h2>

                        <GoldRule />

                        <p className="mt-6 text-sm leading-7 text-slate-500">
                            General body measurements to help you choose a
                            size. If you're between sizes, we recommend
                            sizing up for a more relaxed fit.
                        </p>

                        <Link
                            to="/contact"
                            className="group mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:text-[#a8822f]"
                        >
                            Ask about custom sizing
                            <span
                                aria-hidden="true"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                →
                            </span>
                        </Link>
                    </div>

                    <div className="min-w-0 lg:col-span-7 lg:col-start-6">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-300">
                                        <th
                                            scope="col"
                                            className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em]"
                                            style={{ color: GOLD }}
                                        >
                                            Size
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
                                        >
                                            Bust (cm)
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
                                        >
                                            Waist (cm)
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
                                        >
                                            Hip (cm)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {SIZE_CHART.map((row) => (
                                        <tr
                                            key={row.size}
                                            className="border-b border-slate-200"
                                        >
                                            <td className="py-3 pr-4 font-serif text-lg text-slate-900">
                                                {row.size}
                                            </td>
                                            <td className="py-3 pr-4 text-slate-600">
                                                {row.bust}
                                            </td>
                                            <td className="py-3 pr-4 text-slate-600">
                                                {row.waist}
                                            </td>
                                            <td className="py-3 text-slate-600">
                                                {row.hip}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-5 text-xs leading-6 text-slate-400">
                            Measurements are a general guide across our
                            ready-to-wear pieces. Fit varies slightly by
                            garment — check the individual product page for
                            style-specific notes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CareInstructionsSection() {
    return (
        <section
            id="care"
            className="scroll-mt-[156px] bg-white py-24 sm:py-32 lg:py-36"
        >
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="min-w-0 lg:col-span-4">
                        <SectionLabel>Care instructions</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Made to last, with the right care.
                        </h2>

                        <GoldRule />

                        <p className="mt-6 text-sm leading-7 text-slate-500">
                            Every Rudambek piece is finished by hand. A
                            little care keeps the print, embroidery, and
                            fabric looking their best for years.
                        </p>
                    </div>

                    <div className="min-w-0 lg:col-span-7 lg:col-start-6">
                        <ul className="space-y-4">
                            {CARE_ITEMS.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-4 border-b border-slate-200 pb-4 text-sm leading-6 text-slate-600"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: GOLD }}
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function QualitySustainabilitySection() {
    return (
        <section className="py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-6 lg:grid-cols-3">
                    <ListPanel
                        eyebrow="Quality assurance"
                        title="The Rudambek standard"
                        items={QUALITY_ITEMS}
                    />

                    <ListPanel
                        id="sustainability"
                        eyebrow="Sustainability commitment"
                        title="Creating value with care"
                        items={SUSTAINABILITY_ITEMS}
                        tone="white"
                    />

                    <ListPanel
                        eyebrow="Why Rudambek"
                        title="What sets us apart"
                        items={WHY_RUDAMBEK}
                    />
                </div>
            </div>
        </section>
    );
}

function MarketsAdvantageSection() {
    return (
        <section className="bg-white py-24 sm:py-32 lg:py-36">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <SectionLabel>Target markets</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Made for a global wardrobe.
                        </h2>

                        <GoldRule />

                        <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
                            {TARGET_MARKETS.map((market) => (
                                <div
                                    key={market}
                                    className="border-b border-slate-200 py-3 text-sm text-slate-600"
                                >
                                    {market}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#faf7f3] p-7 sm:p-10">
                        <SectionLabel>Competitive advantage</SectionLabel>

                        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                            Heritage, made relevant.
                        </h2>

                        <p className="mt-6 text-base leading-7 text-slate-600">
                            RUDAMBEK Fashion combines traditional African
                            craftsmanship with modern design to produce
                            garments that are elegant, comfortable, culturally
                            authentic, and globally appealing.
                        </p>

                        <p className="mt-5 text-base leading-7 text-slate-600">
                            Our collections are designed for customers seeking
                            distinctive African fashion with premium quality,
                            practical wearability, and a clear sense of place.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReassuranceSection() {
    return (
        <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <SectionLabel>Continue your journey</SectionLabel>

                    <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                        Everything you need to move forward.
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <ReassuranceCard
                        title="Need a custom piece?"
                        body="Speak with our team about a garment designed around your occasion, fit, and vision."
                        href="/contact"
                        action="Start a conversation"
                    />

                    <ReassuranceCard
                        title="Shopping from abroad?"
                        body="Explore the collection for international orders and wholesale enquiries."
                        href="/shop"
                        action="Shop the collection"
                    />

                    <ReassuranceCard
                        title="Need help choosing?"
                        body="Our team can help you find the right silhouette, size, and occasionwear direction."
                        href="/contact"
                        action="Get in touch"
                    />

                    <ReassuranceCard
                        title="Want to know more?"
                        body="Find answers about sizing, delivery, returns, and caring for your garment."
                        href="/faq"
                        action="Read FAQs"
                    />
                </div>
            </div>
        </section>
    );
}

function ReassuranceCard({ title, body, href, action }) {
    return (
        <div className="border-t border-slate-300 pt-5 transition-colors duration-300 hover:border-[#c9a24b]">
            <h3 className="font-serif text-xl text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                {body}
            </p>

            <Link
                to={href}
                className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:text-[#a8822f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b]"
            >
                {action}

                <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                >
                    →
                </span>
            </Link>
        </div>
    );
}

function ClosingCta() {
    return (
        <section className="relative overflow-hidden bg-slate-900 py-24 text-white sm:py-32 lg:py-36">
            <img
                src={editorial05}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
                loading="lazy"
                decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/75 to-slate-900/95" />

            <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-10">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e1bd6c]">
                    Step inside
                </p>

                <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                    Experience the Rudambek difference.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                    Discover premium African-inspired apparel ethically
                    crafted in Ghana, with heritage and heart.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <GoldButton to="/shop">
                        Shop the collection
                    </GoldButton>

                    <SecondaryButton to="/categories">
                        Explore categories
                    </SecondaryButton>
                </div>
            </div>
        </section>
    );
}

function SectionLabel({ children }) {
    return (
        <p
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
        >
            {children}
        </p>
    );
}

function GoldRule() {
    return (
        <div
            className="mt-6 h-px w-12"
            style={{ backgroundColor: GOLD }}
        />
    );
}

function RudambekMark() {
    return (
        <span className="tracking-wide" style={{ color: GOLD }}>
            RUDAMBEK
        </span>
    );
}

function InfoPanel({ eyebrow, title, children }) {
    return (
        <div className="bg-[#faf7f3] p-8 sm:p-12 lg:p-14">
            <SectionLabel>{eyebrow}</SectionLabel>

            {title && (
                <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                    {title}
                </h2>
            )}

            <GoldRule />

            <p
                className={
                    title
                        ? 'mt-6 text-base leading-7 text-slate-600'
                        : 'mt-6 font-serif text-xl leading-8 text-slate-800 sm:text-2xl'
                }
            >
                {children}
            </p>
        </div>
    );
}

function ListPanel({ id, eyebrow, title, items, tone = 'cream' }) {
    return (
        <div
            id={id}
            className={`scroll-mt-[156px] p-7 sm:p-10 ${tone === 'white' ? 'bg-white' : 'bg-[#faf7f3]'
                }`}
        >
            <SectionLabel>{eyebrow}</SectionLabel>

            <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                {title}
            </h2>

            <GoldRule />

            <ul className="mt-8 space-y-3">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                        <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: GOLD }}
                        />

                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function GoldButton({ to, children }) {
    return (
        <Link
            to={to}
            className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a24b] px-9 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8822f] hover:shadow-xl hover:shadow-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
            {children}

            <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
            >
                →
            </span>
        </Link>
    );
}

function SecondaryButton({ to, children }) {
    return (
        <Link
            to={to}
            className="inline-flex min-h-12 items-center justify-center border border-white/50 px-9 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24b] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
            {children}
        </Link>
    );
}