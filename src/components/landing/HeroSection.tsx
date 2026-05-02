"use client";

import { HeroDemoShell } from "./HeroDemo/HeroDemoShell";
import { IconArrowRight } from "@/components/icons/MarketingIcons";
import { track } from "@/lib/analytics";
import type { LandingCopy } from "@/data/landingCopy";

interface Props {
    copy: LandingCopy;
    locale: "zh" | "en";
}

export function HeroSection({ copy, locale }: Props) {
    const hero = copy.hero;
    return (
        <section
            className="lh-section s-auto relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, var(--hero-from) 0%, var(--hero-to) 100%)",
                paddingTop: 168,
            }}
        >
            <div
                aria-hidden
                className="absolute inset-0 lh-soft-glow pointer-events-none"
                style={{ opacity: 0.7 }}
            />
            <div className="lh-container relative">
                <div className="lh-hero-headline-row">
                    <h1
                        className="lh-fade-up lh-fade-up-delay-2 font-semibold tracking-tight"
                        style={{
                            fontFamily: locale === "zh" ? "var(--font-display-zh)" : "var(--font-display-en)",
                            fontSize: "var(--text-hero)",
                            lineHeight: 1.08,
                            letterSpacing: 0,
                        }}
                    >
                        {hero.title.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                    </h1>
                    <a
                        href="#product-demo"
                        className="lh-hero-side-link lh-fade-up lh-fade-up-delay-1"
                        onClick={() => track("cta_click", { id: "hero_side_demo" })}
                    >
                        <span>{hero.eyebrow}</span>
                        <IconArrowRight width={14} height={14} />
                    </a>
                </div>
                <p
                    className="lh-fade-up lh-fade-up-delay-3 mt-7 max-w-3xl text-lg opacity-80"
                    style={{ fontSize: "var(--text-lg)" }}
                >
                    {hero.subtitle}
                </p>

                <div
                    className="lh-fade-up lh-fade-up-delay-4 mt-14"
                    onMouseEnter={() => track("hero_demo_visible", {})}
                >
                    <HeroDemoShell copy={hero} soonLabel={copy.common.soonLabel} />
                </div>
            </div>
        </section>
    );
}
