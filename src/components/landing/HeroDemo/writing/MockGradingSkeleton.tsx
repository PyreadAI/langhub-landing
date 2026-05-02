"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

interface Props {
    /** Called when grading animation completes */
    onComplete: () => void;
    runId: number;
    locale: Locale;
}

export function MockGradingSkeleton({ onComplete, runId, locale }: Props) {
    const isZh = locale === "zh";
    const text = {
        title: isZh ? "AI 正在分析并批改你的作文…" : "AI is analyzing and reviewing your essay…",
        sub: isZh ? "通常需要 15–30 秒" : "This usually takes 15–30 seconds",
        diagnostic: isZh ? "写作诊断" : "Diagnostic",
        correction: isZh ? "批改版本" : "Correction",
        model: isZh ? "范文版本" : "Model Writing",
    };
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);
        let cancelled = false;
        const duration = 2800; // ms
        const interval = 40;
        let elapsed = 0;

        const tick = () => {
            if (cancelled) return;
            elapsed += interval;
            const pct = Math.min(100, Math.round((elapsed / duration) * 100));
            setProgress(pct);
            if (elapsed < duration) {
                window.setTimeout(tick, interval);
            } else {
                window.setTimeout(() => {
                    if (!cancelled) onComplete();
                }, 300);
            }
        };
        window.setTimeout(tick, interval);

        return () => { cancelled = true; };
    }, [onComplete, runId]);

    return (
        <div className="mw-skel-wrapper">
            <div className="mw-skel-header">
                <div className="mw-skel-spinner" />
                <div>
                    <h3>{text.title}</h3>
                    <p className="mw-skel-sub">{text.sub}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mw-skel-progress">
                <div className="mw-skel-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="mw-skel-pct">{progress}%</p>

            {/* Three-column skeleton */}
            <div className="mw-skel-columns">
                <div className="mw-skel-col">
                    <div className="mw-skel-col-title">{text.diagnostic}</div>
                    <div className="lh-skeleton mw-skel-line" style={{ width: "80%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "100%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "60%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "90%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "70%" }} />
                </div>
                <div className="mw-skel-col">
                    <div className="mw-skel-col-title">{text.correction}</div>
                    <div className="lh-skeleton mw-skel-line" style={{ width: "90%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "75%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "100%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "85%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "65%" }} />
                </div>
                <div className="mw-skel-col">
                    <div className="mw-skel-col-title">{text.model}</div>
                    <div className="lh-skeleton mw-skel-line" style={{ width: "70%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "95%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "80%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "100%" }} />
                    <div className="lh-skeleton mw-skel-line" style={{ width: "55%" }} />
                </div>
            </div>
        </div>
    );
}
