import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/use-page-meta';
import { Reveal } from '../components/ui/reveal';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

const GOLD = '#c9a24b';

export function ContactPage() {
    usePageMeta({
        title: 'Contact Us',
        description:
            'Get in touch with Rudambek Clothing — questions about orders, sizing, or custom pieces.',
    });

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#faf7f3]">
            {/* Header */}
            <section className="border-b border-black/[0.06] bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
                    <Breadcrumbs
                        className="mb-6"
                        items={[
                            { label: 'Home', to: '/' },
                            { label: 'Contact' },
                        ]}
                    />
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Get in touch</p>
                    <h1 className="font-serif text-4xl text-slate-900 sm:text-6xl">Contact Us</h1>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                        Whether you have a question about an order, want to discuss a custom piece, or simply want to know more about the Rudambek collection — we would love to hear from you.
                    </p>
                </div>
            </section>

            <Reveal>
            <section className="mx-auto max-w-[1400px] px-8 lg:px-12 py-16 sm:py-20">
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Contact info */}
                    <div className="space-y-10">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: GOLD }}>Our details</p>
                            <h2 className="mt-2 font-serif text-2xl text-slate-900">Reach Rudambek</h2>
                            <div className="mt-1 w-10 h-[2px]" style={{ backgroundColor: GOLD }} />
                        </div>

                        {[
                            { label: 'Email', value: 'hello@rudambek.com', href: 'mailto:hello@rudambek.com' },
                            { label: 'Phone / WhatsApp', value: '+233 59 660 2507', href: 'tel:+233596602507' },
                            { label: 'Location', value: 'Accra, Ghana', href: null },
                            { label: 'Business hours', value: 'Mon – Fri, 9am – 5pm GMT', href: null },
                        ].map((item) => (
                            <div key={item.label} className="border-b border-slate-200 pb-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                                {item.href
                                    ? <a href={item.href} className="mt-1 block text-base text-slate-800 hover:text-[#a8822f] transition-colors">{item.value}</a>
                                    : <p className="mt-1 text-base text-slate-800">{item.value}</p>
                                }
                            </div>
                        ))}

                        <div className="bg-slate-900 p-7 shadow-lg shadow-slate-900/10 transition-shadow duration-300 hover:shadow-xl">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e1bd6c]">Custom orders</p>
                            <p className="mt-3 font-serif text-xl text-white">Need something made just for you?</p>
                            <p className="mt-2 text-sm text-white/60 leading-6">Our team handles custom commissions for individuals, families, corporate events, and wholesale buyers.</p>
                            <Link to="/shop" className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A24B] hover:text-white transition-colors">
                                View the shop <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-start justify-center h-full py-10">
                                <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: GOLD }} />
                                <p className="font-serif text-3xl text-slate-900">Message received.</p>
                                <p className="mt-3 text-sm text-slate-500 leading-6">Thank you for reaching out. A member of the Rudambek team will get back to you within 1–2 business days.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 hover:text-[#a8822f] transition-colors">
                                    Send another message →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: GOLD }}>Send a message</p>
                                <h2 className="font-serif text-2xl text-slate-900">We'll get back to you shortly.</h2>

                                {[
                                    { name: 'name', label: 'Full name', type: 'text', required: true },
                                    { name: 'email', label: 'Email address', type: 'email', required: true },
                                    { name: 'subject', label: 'Subject', type: 'text', required: false },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1.5">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            required={field.required}
                                            className="w-full min-h-11 border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b]"
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1.5">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition hover:border-slate-400 focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b] resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-slate-900 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9a24b] hover:shadow-lg cursor-pointer"
                                >
                                    Send message <span>→</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
            </Reveal>
        </main>
    );
}
