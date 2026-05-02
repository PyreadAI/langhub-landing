"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
    const [prefers, setPrefers] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = () => setPrefers(mq.matches);
        handler();
        mq.addEventListener?.("change", handler);
        return () => {
            mq.removeEventListener?.("change", handler);
        };
    }, []);
    return prefers;
}

export function prefersReducedMotionSync(): boolean {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
