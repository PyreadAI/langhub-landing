import type { Metadata } from "next";
import { LANDING_COPY } from "@/data/landingCopy";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { PinnedPracticeSection } from "@/components/landing/PinnedPracticeSection";
import {
    ProductSection,
    ResourcesSection,
    PricingSection,
    ContactSection,
} from "@/components/landing/PlaceholderSections";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const metadata: Metadata = {
    title: LANDING_COPY.zh.meta.title,
    description: LANDING_COPY.zh.meta.description,
    alternates: {
        canonical: "/zh",
        languages: { "zh-CN": "/zh", "en-US": "/en" },
    },
    openGraph: {
        title: LANDING_COPY.zh.meta.title,
        description: LANDING_COPY.zh.meta.description,
        locale: "zh_CN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: LANDING_COPY.zh.meta.title,
        description: LANDING_COPY.zh.meta.description,
    },
};

export default function ZhPage() {
    const copy = LANDING_COPY.zh;
    return (
        <main>
            <SiteHeader locale="zh" copy={copy.nav} />
            <HeroSection copy={copy} locale="zh" />
            <PinnedPracticeSection copy={copy.pinned} />
            <ProductSection copy={copy} />
            <ResourcesSection copy={copy} />
            <PricingSection copy={copy} />
            <ContactSection copy={copy} />
            <SiteFooter copy={copy} locale="zh" />
        </main>
    );
}
