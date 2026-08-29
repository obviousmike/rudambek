import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

const GOLD = '#c9a24b';

const FAQS = [
    {
        section: 'Orders & Shopping',
        items: [
            { q: 'How do I place an order?', a: 'Browse the shop, select your size, and add items to your cart. Proceed to checkout and complete your payment details. You will receive a confirmation email once your order is placed.' },
            { q: 'Can I modify or cancel my order after placing it?', a: 'Please contact us within 24 hours of placing your order. After production has started on custom items, modifications may not be possible.' },
            { q: 'Do you offer custom-made clothing?', a: 'Yes — custom commissions are a core part of what we do. Contact us with your requirements and we will guide you through the process from fabric selection to final fitting.' },
            { q: 'What currencies do you accept?', a: 'We accept GHS (Ghanaian Cedi), USD, EUR, and GBP. You can switch your display currency using the selector on any product page.' },
        ],
    },
    {
        section: 'Sizing & Fit',
        items: [
            { q: 'How do I find my size?', a: 'We recommend taking your bust, waist, and hip measurements and comparing them against our size guide. If you are between sizes, size up for a more relaxed fit.' },
            { q: 'Do your garments run true to size?', a: 'Most Rudambek pieces are cut to standard sizing. Custom pieces are made to your exact measurements.' },
            { q: 'Can I request alterations?', a: 'Alterations are available on select pieces. Contact us before placing your order to discuss what is possible.' },
        ],
    },
    {
        section: 'Shipping & Delivery',
        items: [
            { q: 'Do you ship internationally?', a: 'Yes — we ship to most countries worldwide. Shipping times and costs vary by destination and are calculated at checkout.' },
            { q: 'How long does delivery take?', a: 'Standard delivery within Ghana takes 3–5 business days. International orders typically arrive in 7–14 business days, depending on location and customs.' },
            { q: 'How do I track my order?', a: 'Once your order is dispatched, you will receive a tracking number by email. Use this to follow your delivery in real time.' },
        ],
    },
    {
        section: 'Returns & Exchanges',
        items: [
            { q: 'What is your returns policy?', a: 'We accept returns within 14 days of delivery for ready-to-wear pieces in unworn, original condition with tags attached. Custom-made items are non-returnable.' },
            { q: 'How do I start a return?', a: 'Email us at hello@rudambek.com with your order number and reason for return. We will guide you through the process.' },
            { q: 'Do you offer exchanges?', a: 'Yes — exchanges for a different size or style are welcome, subject to stock availability.' },
        ],
    },
    {
        section: 'Care & Quality',
        items: [
            { q: 'How should I care for my Rudambek garment?', a: 'Most pieces should be hand-washed or dry-cleaned. Care instructions are included on the garment label. Avoid direct sunlight when drying printed fabrics to preserve colour.' },
            { q: 'Are your fabrics authentic?', a: 'Yes — we source our fabrics from trusted Ghanaian textile houses. Authenticity of print and material is central to what we make.' },
        ],
    },
];

export function FaqPage() {
    usePageMeta({
        title: 'FAQ',
        description:
            'Answers to common Rudambek Clothing questions — orders, sizing, shipping, returns, and custom pieces.',
    });

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (key) => setOpenIndex((prev) => (prev === key ? null : key));

    return (
        <main className="min-h-screen bg-[#faf7f3]">
            {/* Header */}
            <section className="border-b border-black/[0.06] bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                    <Breadcrumbs
                        className="mb-6"
                        items={[
                            { label: 'Home', to: '/' },
                            { label: 'FAQ' },
                        ]}
                    />
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Help centre</p>
                    <h1 className="font-serif text-4xl text-slate-900 sm:text-6xl">Frequently Asked<br /><span className="italic">Questions</span></h1>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                        Everything you need to know about ordering, sizing, shipping, and caring for your Rudambek pieces.
                    </p>
                </div>
            </section>

            {/* FAQ accordion */}
            <Reveal>
            <section className="mx-auto max-w-[1400px] px-8 lg:px-12 py-16 sm:py-20">
                <div className="grid gap-14 lg:grid-cols-[280px_1fr] lg:gap-20">
                    {/* Sidebar nav */}
                    <nav className="hidden lg:block">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">Jump to section</p>
                        <ul className="space-y-2">
                            {FAQS.map((section) => (
                                <li key={section.section}>
                                    <a
                                        href={`#${section.section.replace(/\s+/g, '-').toLowerCase()}`}
                                        className="text-sm text-slate-600 hover:text-[#a8822f] transition-colors"
                                    >
                                        {section.section}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 border-t border-slate-200 pt-8">
                            <p className="font-serif text-lg text-slate-900">Still have questions?</p>
                            <p className="mt-2 text-sm text-slate-500">Our team is happy to help.</p>
                            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 hover:text-[#a8822f] transition-colors">
                                Contact us →
                            </Link>
                        </div>
                    </nav>

                    {/* Accordion */}
                    <div className="space-y-12">
                        {FAQS.map((section) => (
                            <div key={section.section} id={section.section.replace(/\s+/g, '-').toLowerCase()}>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: GOLD }}>{section.section}</p>
                                <div className="divide-y divide-slate-200 border-y border-slate-200">
                                    {section.items.map((item, i) => {
                                        const key = `${section.section}-${i}`;
                                        const isOpen = openIndex === key;
                                        return (
                                            <div key={key}>
                                                <button
                                                    onClick={() => toggle(key)}
                                                    className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer group"
                                                    aria-expanded={isOpen}
                                                >
                                                    <span className="font-serif text-base text-slate-900 group-hover:text-[#a8822f] transition-colors">{item.q}</span>
                                                    <span className={`text-lg text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                                                </button>
                                                {isOpen && (
                                                    <p className="fade-in-down pb-5 text-sm leading-7 text-slate-500">{item.a}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </Reveal>

            {/* Bottom CTA */}
            <section className="bg-slate-900 py-14">
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e1bd6c]">Ready to shop?</p>
                        <p className="mt-2 font-serif text-2xl text-white">Explore the full Rudambek collection.</p>
                    </div>
                    <Link to="/shop" className="inline-flex min-h-11 items-center gap-3 bg-[#C9A24B] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a8822f] hover:shadow-xl">
                        Shop now →
                    </Link>
                </div>
            </section>
        </main>
    );
}
