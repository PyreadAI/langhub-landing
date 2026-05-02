"use client";

import Link from "next/link";
import type { LandingCopy } from "@/data/landingCopy";
import { APP_REGISTER_URL } from "@/lib/routes";
import { track } from "@/lib/analytics";
import {
    IconCheck,
    IconArrowRight,
    IconSparkles,
    IconBook,
    IconHeadphone,
    IconConjugation,
    IconVocabulary,
    IconExpressions,
    IconWriting,
    IconSpeaking,
} from "@/components/icons/MarketingIcons";

const PRODUCT_FEATURES = [
    { icon: IconWriting, key: "writing" },
    { icon: IconSpeaking, key: "speaking" },
    { icon: IconHeadphone, key: "dictation" },
    { icon: IconConjugation, key: "conjugation" },
    { icon: IconVocabulary, key: "vocabulary" },
    { icon: IconExpressions, key: "expressions" },
] as const;

interface SectionProps {
    copy: LandingCopy;
}

/* =================== Product Section =================== */
export function ProductSection({ copy }: SectionProps) {
    const c = copy.placeholders.product;
    const modules = copy.hero.modules;
    return (
        <section id="product" className="lh-section s-light" style={{ background: "var(--lt-bg)" }}>
            <div className="lh-container">
                <p className="lh-section-label">{c.label}</p>
                <h2
                    className="mt-3 font-semibold"
                    style={{
                        fontFamily: "var(--font-display-zh)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {c.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base opacity-80">{c.body}</p>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {PRODUCT_FEATURES.map(({ icon: Icon, key }) => {
                        const m = modules[key];
                        if (!m) return null;
                        return (
                            <article key={key} className="lh-card lh-card-hover p-6">
                                <div className="lh-icon-wrap">
                                    <Icon />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
                                <p className="mt-2 text-sm opacity-80 leading-relaxed">{m.tagline}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* =================== Resources Section =================== */
export function ResourcesSection({ copy }: SectionProps) {
    const c = copy.placeholders.resources;
    return (
        <section id="resources" className="lh-section s-light" style={{ background: "var(--lt-surface-2)" }}>
            <div className="lh-container">
                <p className="lh-section-label">{c.label}</p>
                <h2
                    className="mt-3 font-semibold"
                    style={{
                        fontFamily: "var(--font-display-zh)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.2,
                    }}
                >
                    {c.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base opacity-80">{c.body}</p>

                <div className="mt-10 flex flex-wrap gap-3">
                    {["DELF", "TCF", "AI Method", "Changelog"].map((tag) => (
                        <span key={tag} className="lh-tag lh-tag-neutral" style={{ padding: "8px 14px", fontSize: 12 }}>
                            <IconBook width={14} height={14} style={{ marginRight: 6 }} />
                            {tag} · {copy.common.soonLabel}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =================== Pricing Section =================== */
export function PricingSection({ copy }: SectionProps) {
    const c = copy.placeholders.pricing;
    return (
        <section id="pricing" className="lh-section s-light" style={{ background: "var(--lt-bg)" }}>
            <div className="lh-container">
                <p className="lh-section-label">{c.label}</p>
                <h2
                    className="mt-3 font-semibold"
                    style={{
                        fontFamily: "var(--font-display-zh)",
                        fontSize: "var(--text-2xl)",
                        lineHeight: 1.2,
                    }}
                >
                    {c.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base opacity-80">{c.subtitle}</p>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {c.plans.map((plan) => (
                        <article
                            key={plan.id}
                            className="lh-card p-7 relative flex flex-col"
                            style={
                                plan.highlight
                                    ? {
                                        borderColor: "color-mix(in srgb, var(--primary) 60%, var(--lt-line))",
                                        boxShadow: "0 14px 40px rgba(90, 140, 126, 0.18)",
                                    }
                                    : undefined
                            }
                        >
                            {plan.highlight && (
                                <span
                                    className="lh-tag absolute"
                                    style={{
                                        top: -12,
                                        right: 20,
                                        background: "var(--primary)",
                                        color: "#FAF8F3",
                                        padding: "5px 12px",
                                    }}
                                >
                                    <IconSparkles width={12} height={12} style={{ marginRight: 4 }} />
                                    {copy.common.soonLabel === "Soon" ? "Most popular" : "推荐"}
                                </span>
                            )}
                            <h3 className="text-lg font-semibold">{plan.name}</h3>
                            <div className="mt-3 flex items-baseline gap-1">
                                <span
                                    className="font-semibold"
                                    style={{
                                        fontFamily: "var(--font-display-en)",
                                        fontSize: 44,
                                        lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {plan.price}
                                </span>
                                <span className="text-sm opacity-60">{plan.cadence}</span>
                                {plan.footnote && (
                                    <sup className="text-xs opacity-60 ml-1">{plan.footnote}</sup>
                                )}
                            </div>
                            <ul className="mt-5 space-y-2.5 flex-1">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <IconCheck width={16} height={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 3 }} />
                                        <span className="opacity-90 leading-relaxed">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={plan.id === "team" ? "#contact" : APP_REGISTER_URL}
                                className={`lh-btn mt-6 ${plan.highlight ? "lh-btn-primary" : "lh-btn-secondary"}`}
                                onClick={() =>
                                    track("cta_click", { source: "pricing", plan: plan.id })
                                }
                            >
                                {plan.cta}
                                <IconArrowRight width={14} height={14} />
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Footnotes */}
                <div className="mt-10 max-w-3xl">
                    <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                        {copy.footer.notesTitle}
                    </p>
                    <ul className="space-y-1.5">
                        {c.footnotes.map((fn) => (
                            <li key={fn.id} className="text-xs opacity-70 leading-relaxed">
                                <span className="font-semibold mr-1">{fn.id}</span>
                                {fn.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* =================== Contact Section =================== */
export function ContactSection({ copy }: SectionProps) {
    const c = copy.placeholders.contact;
    return (
        <section id="contact" className="lh-section s-light" style={{ background: "var(--lt-surface-2)" }}>
            <div className="lh-container">
                <div
                    className="lh-card p-10 md:p-14 text-center"
                    style={{ borderRadius: "var(--r-lg)" }}
                >
                    <p className="lh-section-label">{c.label}</p>
                    <h2
                        className="mt-3 font-semibold"
                        style={{
                            fontFamily: "var(--font-display-zh)",
                            fontSize: "var(--text-2xl)",
                            lineHeight: 1.2,
                        }}
                    >
                        {c.title}
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-base opacity-80">{c.body}</p>
                    <div className="mt-7 flex justify-center">
                        <a
                            href="mailto:hello@langprephub.com"
                            className="lh-btn lh-btn-primary lh-btn-lg"
                            onClick={() => track("contact_click", { source: "contact_section" })}
                        >
                            {c.cta}
                            <IconArrowRight width={14} height={14} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
