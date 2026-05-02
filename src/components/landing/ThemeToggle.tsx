"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "langhub.mode";
type Mode = "soft" | "dark";

export function ThemeToggle({ label }: { label: string }) {
    const [mode, setMode] = useState<Mode>("soft");

    useEffect(() => {
        const current = (typeof document !== "undefined" && document.documentElement.getAttribute("data-mode")) as Mode | null;
        if (current === "soft" || current === "dark") setMode(current);
    }, []);

    const toggle = () => {
        const next: Mode = mode === "soft" ? "dark" : "soft";
        setMode(next);
        document.documentElement.setAttribute("data-mode", next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* ignore */
        }
        track("theme_toggle", { mode: next });
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={mode === "dark"}
            aria-label={label}
            title={label}
            onClick={toggle}
            className="lh-theme-toggle"
        />
    );
}
