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
    title: LANDING_COPY.en.meta.title,
    description: LANDING_COPY.en.meta.description,
    alternates: {
        canonical: "/en",
        languages: { "zh-CN": "/zh", "en-US": "/en" },
    },
    openGraph: {
        title: LANDING_COPY.en.meta.title,
        description: LANDING_COPY.en.meta.description,
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: LANDING_COPY.en.meta.title,
        description: LANDING_COPY.en.meta.description,
    },
};

export default function EnPage() {
    const copy = LANDING_COPY.en;
    return (
        <main>
            <SiteHeader locale="en" copy={copy.nav} />
            <HeroSection copy={copy} locale="en" />
            <PinnedPracticeSection copy={copy.pinned} />
            <ProductSection copy={copy} />
            <ResourcesSection copy={copy} />
            <PricingSection copy={copy} />
            <ContactSection copy={copy} />
            <SiteFooter copy={copy} locale="en" />
        </main>
    );
}
