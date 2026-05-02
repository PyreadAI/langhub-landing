"use client";

import { useEffect, useRef } from "react";
import type { LandingCopy } from "@/data/landingCopy";
import { HERO_VIDEO_MP4, HERO_VIDEO_WEBM, HERO_VIDEO_POSTER_LIGHT } from "@/lib/assets";
import { track } from "@/lib/analytics";
import { IconClose } from "@/components/icons/MarketingIcons";

interface Props {
    open: boolean;
    onClose: () => void;
    copy: LandingCopy["videoModal"];
}

export function VideoModal({ open, onClose, copy }: Props) {
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const lastFocus = document.activeElement as HTMLElement | null;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        closeBtnRef.current?.focus();
        track("hero_video_open");
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            lastFocus?.focus?.();
            track("hero_video_close");
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="lh-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lh-video-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="lh-modal">
                <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--lt-line)" }}>
                    <h2 id="lh-video-title" className="text-base font-semibold">
                        {copy.title}
                    </h2>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        className="lh-btn lh-btn-ghost lh-btn-sm"
                        onClick={onClose}
                        aria-label={copy.close}
                    >
                        <IconClose width={18} height={18} />
                    </button>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center text-white text-sm px-6 text-center">
                    <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={HERO_VIDEO_POSTER_LIGHT}
                        className="w-full h-full bg-black"
                        onError={(e) => {
                            const t = e.currentTarget;
                            t.style.display = "none";
                            const fb = t.parentElement?.querySelector(".lh-video-fallback") as HTMLElement | null;
                            if (fb) fb.style.display = "flex";
                        }}
                    >
                        <source src={HERO_VIDEO_MP4} type="video/mp4" />
                        <source src={HERO_VIDEO_WEBM} type="video/webm" />
                    </video>
                    <div className="lh-video-fallback hidden absolute inset-0 items-center justify-center px-8 text-center" style={{ display: "none" }}>
                        {copy.unavailable}
                    </div>
                </div>
            </div>
        </div>
    );
}
