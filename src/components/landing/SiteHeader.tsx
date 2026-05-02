"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LandingCopy } from "@/data/landingCopy";
import type { Locale } from "@/lib/locale";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "@/lib/routes";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { IconLogo, IconMenu, IconClose } from "@/components/icons/MarketingIcons";

interface Props {
    locale: Locale;
    copy: LandingCopy["nav"];
}

export function SiteHeader({ locale, copy }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const navLinks = [
        { href: "#product", label: copy.product },
        { href: "#resources", label: copy.resources },
        { href: "#pricing", label: copy.pricing },
        { href: "#contact", label: copy.contact },
    ];

    const otherLocale: Locale = locale === "zh" ? "en" : "zh";

    return (
        <>
            <header className="lh-header s-light" data-scrolled={scrolled ? "true" : "false"}>
                <div className="lh-header__inner">
                    <Link href={`/${locale}`} className="lh-header__brand" aria-label="Langhub">
                        <span
                            aria-hidden
                            className="inline-flex w-7 h-7 rounded-full items-center justify-center"
                            style={{ background: "var(--primary)", color: "#FAF8F3" }}
                        >
                            <IconLogo width={16} height={16} />
                        </span>
                        Langhub
                    </Link>

                    <nav className="lh-header__nav" aria-label="primary">
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="lh-header__nav-link"
                                onClick={() => track("cta_click", { id: `nav_${l.href}` })}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 ml-auto md:ml-2">
                        <ThemeToggle label={copy.themeToggleLabel} />
                        <a
                            href={APP_LOGIN_URL}
                            className="lh-btn lh-btn-ghost lh-btn-sm hidden sm:inline-flex"
                            onClick={() => track("cta_click", { id: "header_login" })}
                        >
                            {copy.login}
                        </a>
                        <a
                            href={APP_REGISTER_URL}
                            className="lh-btn lh-btn-primary lh-btn-sm"
                            onClick={() => track("cta_click", { id: "header_register" })}
                        >
                            {copy.register}
                        </a>
                        <button
                            type="button"
                            className={cn("lh-btn lh-btn-ghost lh-btn-sm lh-mobile-toggle")}
                            aria-label={open ? copy.closeMenu : copy.openMenu}
                            aria-expanded={open}
                            aria-controls="lh-mobile-drawer"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? <IconClose width={18} height={18} /> : <IconMenu width={18} height={18} />}
                        </button>
                    </div>
                </div>
            </header>

            <div id="lh-mobile-drawer" className="lh-mobile-drawer s-light" data-open={open ? "true" : "false"} role="dialog" aria-modal={open}>
                {navLinks.map((l) => (
                    <a key={l.href} href={l.href} className="demo-nav-item" onClick={() => setOpen(false)}>
                        {l.label}
                    </a>
                ))}
                <div className="demo-nav-divider" />
                <Link href={`/${otherLocale}`} className="demo-nav-item" onClick={() => setOpen(false)}>
                    {copy.localeSwitch}
                </Link>
                <a href={APP_LOGIN_URL} className="demo-nav-item">
                    {copy.login}
                </a>
                <a href={APP_REGISTER_URL} className="demo-nav-item demo-nav-item--active">
                    {copy.register}
                </a>
            </div>
        </>
    );
}
