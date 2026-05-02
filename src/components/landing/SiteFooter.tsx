"use client";

import Link from "next/link";
import type { LandingCopy } from "@/data/landingCopy";
import type { Locale } from "@/lib/locale";
import { IconLogo } from "@/components/icons/MarketingIcons";
import { track } from "@/lib/analytics";

interface Props {
    copy: LandingCopy;
    locale: Locale;
}

export function SiteFooter({ copy, locale }: Props) {
    const f = copy.footer;
    const year = new Date().getFullYear();
    return (
        <footer
            className="s-dark relative"
            style={{
                background: "var(--footer-bg)",
                color: "var(--dk-text)",
                paddingTop: 72,
                paddingBottom: 40,
            }}
        >
            <div className="lh-container">
                {/* Top: brand + sections */}
                <div className="grid gap-10 md:grid-cols-[1.4fr_2.6fr]">
                    <div>
                        <div className="flex items-center gap-2">
                            <IconLogo width={22} height={22} />
                            <span className="font-semibold text-lg" style={{ fontFamily: "var(--font-display-en)" }}>
                                {f.copyrightOwner}
                            </span>
                        </div>
                        <p className="mt-4 text-sm opacity-70 max-w-sm leading-relaxed">{f.tagline}</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        {f.sections.map((sec) => (
                            <div key={sec.title}>
                                <p className="text-xs font-semibold tracking-widest uppercase opacity-60 mb-3">
                                    {sec.title}
                                </p>
                                <ul className="space-y-2">
                                    {sec.links.map((l) => (
                                        <li key={`${sec.title}-${l.label}`}>
                                            <Link
                                                href={l.href}
                                                className="text-sm opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
                                                onClick={() =>
                                                    track("footer_link_click", {
                                                        section: sec.title,
                                                        label: l.label,
                                                    })
                                                }
                                            >
                                                {l.label}
                                                {l.soon && (
                                                    <span
                                                        className="lh-tag"
                                                        style={{
                                                            background: "rgba(255,255,255,0.08)",
                                                            color: "rgba(255,255,255,0.6)",
                                                            fontSize: 10,
                                                            padding: "2px 6px",
                                                        }}
                                                    >
                                                        {copy.common.soonLabel}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footnotes echo */}
                <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--dk-line)" }}>
                    <p className="text-xs uppercase tracking-widest opacity-50 mb-2">{f.notesTitle}</p>
                    <ul className="space-y-1.5 max-w-3xl">
                        {copy.placeholders.pricing.footnotes.map((fn) => (
                            <li key={fn.id} className="text-xs opacity-60 leading-relaxed">
                                <span className="font-semibold mr-1">{fn.id}</span>
                                {fn.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal row */}
                <div
                    className="mt-10 pt-6 border-t flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
                    style={{ borderColor: "var(--dk-line)" }}
                >
                    <p className="text-xs opacity-60">
                        © {year} {f.copyrightOwner}. {f.rights}
                    </p>
                    <div className="flex gap-5">
                        {f.legalLinks.map((l) => (
                            <Link
                                key={l.label}
                                href={l.href}
                                className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <span className="text-xs opacity-60">{locale.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
