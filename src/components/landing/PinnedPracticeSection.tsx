"use client";

import { useEffect, useRef, useState } from "react";
import type { LandingCopy } from "@/data/landingCopy";
import { usePrefersReducedMotion } from "@/lib/reducedMotion";
import { IconClose, IconPlay, IconSpeaking, IconWriting } from "@/components/icons/MarketingIcons";

interface Props {
    copy: LandingCopy["pinned"];
}

type VideoKind = "writing" | "speaking" | null;

function VideoCard({ kind, onOpen }: { kind: "writing" | "speaking"; onOpen: () => void }) {
    const Icon = kind === "writing" ? IconWriting : IconSpeaking;
    return (
        <button type="button" className={`pin-video-card pin-video-card-${kind}`} data-video-card={kind} onClick={onOpen}>
            <span className="pin-video-icon"><Icon width={20} height={20} /></span>
            <span className="pin-video-window">
                <span className="pin-window-dots"><i /><i /><i /></span>
                <span className="pin-video-lines">
                    <i /><i /><i /><i /><i />
                </span>
                <span className="pin-play"><IconPlay width={22} height={22} /></span>
            </span>
            <strong>{kind === "writing" ? "AI 写作批改" : "AI 口语对话"}</strong>
        </button>
    );
}

export function PinnedPracticeSection(_props: Props) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const reducedMotion = usePrefersReducedMotion();
    const [modal, setModal] = useState<VideoKind>(null);

    useEffect(() => {
        if (reducedMotion || !sectionRef.current || window.innerWidth < 768) return;
        let ctx: { revert: () => void } | null = null;
        let cancelled = false;
        (async () => {
            const gsapMod: any = await import("gsap");
            const stMod: any = await import("gsap/ScrollTrigger");
            if (cancelled || !sectionRef.current) return;
            const gsap = gsapMod.gsap || gsapMod.default || gsapMod;
            const ScrollTrigger = stMod.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const oldLines = sectionRef.current!.querySelectorAll<HTMLElement>("[data-old-line]");
                const strikes = sectionRef.current!.querySelectorAll<HTMLElement>("[data-strike]");
                const chars = sectionRef.current!.querySelectorAll<HTMLElement>("[data-new-char]");
                const left = sectionRef.current!.querySelector<HTMLElement>('[data-video-card="writing"]');
                const right = sectionRef.current!.querySelector<HTMLElement>('[data-video-card="speaking"]');

                gsap.set(oldLines, { autoAlpha: 0, y: 70, scale: 1 });
                gsap.set(strikes, { scaleX: 0, transformOrigin: "left center" });
                gsap.set(chars, { autoAlpha: 0, y: 10 });
                gsap.set(left, { autoAlpha: 0, x: 0, y: 35, scale: 0.55, rotate: -4 });
                gsap.set(right, { autoAlpha: 0, x: 0, y: 35, scale: 0.55, rotate: 4 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=3200",
                        scrub: 0.65,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                tl.to(oldLines, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 })
                    .to(strikes, { scaleX: 1, duration: 0.8, stagger: 0.08 }, "+=0.15")
                    .to(oldLines, { autoAlpha: 0, y: -36, scale: 0.72, duration: 0.85, stagger: 0.08 }, "<0.15")
                    .to(chars, { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.012 }, "<0.2")
                    .to(left, { autoAlpha: 1, x: -250, y: 30, scale: 1, rotate: -10, duration: 1.05 }, "<0.15")
                    .to(right, { autoAlpha: 1, x: 250, y: 30, scale: 1, rotate: 10, duration: 1.05 }, "<")
                    .to({}, { duration: 0.5 })
                    .to(left, { x: -560, y: -180, autoAlpha: 0, scale: 0.78, rotate: -16, duration: 1 })
                    .to(right, { x: 560, y: -180, autoAlpha: 0, scale: 0.78, rotate: 16, duration: 1 }, "<");
            }, sectionRef);
        })();
        return () => {
            cancelled = true;
            ctx?.revert();
        };
    }, [reducedMotion]);

    const line1 = "AI 写作 / 口语练习：随时随地";
    const line2 = "AI 价格：约 ¥0.03 / 篇作文批改，约 ¥1.8 / 小时 AI 对话";

    return (
        <section ref={sectionRef} id="workflow" className="pin-section s-light">
            <div className="pin-scene">
                <div className="pin-old-copy" aria-hidden>
                    <p data-old-line><span>1 对 1 私教：预约慢？</span><i data-strike /></p>
                    <p data-old-line><span>人工纠错：花费高？</span><i data-strike /></p>
                </div>

                <div className="pin-new-copy">
                    <p>{line1.split("").map((c, i) => <span key={`a-${i}`} data-new-char>{c}</span>)}</p>
                    <p>{line2.split("").map((c, i) => <span key={`b-${i}`} data-new-char>{c}</span>)}</p>
                    <small>价格为演示估算口径，正式付费方案以 Pricing 页面为准。</small>
                </div>

                <div className="pin-video-layer" aria-label="feature videos">
                    <VideoCard kind="writing" onOpen={() => setModal("writing")} />
                    <VideoCard kind="speaking" onOpen={() => setModal("speaking")} />
                </div>
            </div>

            {modal ? (
                <div className="pin-modal" role="dialog" aria-modal="true" onClick={(e) => e.currentTarget === e.target && setModal(null)}>
                    <div className="pin-modal-panel">
                        <button className="pin-modal-close" onClick={() => setModal(null)} aria-label="Close"><IconClose width={18} height={18} /></button>
                        <div className="pin-modal-video">
                            <IconPlay width={36} height={36} />
                            <p>{modal === "writing" ? "AI 写作批改演示视频占位" : "AI 口语对话演示视频占位"}</p>
                            <small>替换为真实 screen recording 后，这里会播放对应视频。</small>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
