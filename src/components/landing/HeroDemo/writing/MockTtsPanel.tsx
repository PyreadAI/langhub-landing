"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import { IconPause, IconPlay, IconSparkles, IconVolume } from "@/components/icons/MarketingIcons";

type TtsPhase = "idle" | "generating" | "ready" | "playing" | "error";

interface Props {
    autoStart: boolean;
    runId: number;
    locale: Locale;
}

export function MockTtsPanel({ autoStart, runId, locale }: Props) {
    const isZh = locale === "zh";
    const text = {
        title: isZh ? "转语音" : "Text-to-Speech",
        action: isZh ? "生成语音" : "Generate Audio",
        generating: isZh ? "正在生成音频…" : "Generating audio…",
        fallback: isZh ? "演示音频已就绪，点击播放即可试听。" : "Demo audio is ready. Click play to listen.",
        play: isZh ? "播放" : "Play",
        hint: isZh ? "将文件放置在 landing/public/audio/writing-feedback-demo.mp3" : "Place a file at landing/public/audio/writing-feedback-demo.mp3",
    };
    const [phase, setPhase] = useState<TtsPhase>("idle");
    const [progress, setProgress] = useState(0);
    const [playTime, setPlayTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Duration of fake audio (seconds)
    const FAKE_DURATION = 12;

    useEffect(() => {
        setPhase("idle");
        setProgress(0);
        setPlayTime(0);

        if (!autoStart) return;

        let cancelled = false;
        const t1 = window.setTimeout(() => {
            if (cancelled) return;
            setPhase("generating");
            // Simulate generation progress
            let p = 0;
            const genInterval = window.setInterval(() => {
                if (cancelled) { clearInterval(genInterval); return; }
                p = Math.min(100, p + 4);
                setProgress(p);
                if (p >= 100) {
                    clearInterval(genInterval);
                    window.setTimeout(() => {
                        if (!cancelled) setPhase("ready");
                    }, 200);
                }
            }, 50);
        }, 800);

        return () => { cancelled = true; clearTimeout(t1); };
    }, [autoStart, runId]);

    const handlePlay = () => {
        // Try to play the real audio file if it exists
        try {
            const audio = new Audio("/audio/writing-feedback-demo.mp3");
            audioRef.current = audio;
            audio.play().then(() => {
                setPhase("playing");
                // Track fake play time
                const ptInterval = window.setInterval(() => {
                    setPlayTime((t) => {
                        if (t >= FAKE_DURATION) { clearInterval(ptInterval); return t; }
                        return t + 0.5;
                    });
                }, 500);
                audio.onended = () => { clearInterval(ptInterval); setPhase("ready"); };
            }).catch(() => {
                // Autoplay blocked or file not found → show fallback
                setPhase("error");
            });
        } catch {
            setPhase("error");
        }
    };

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="mw-tts-panel">
            <div className="mw-tts-header">
                <span className="mw-tts-icon"><IconVolume width={14} height={14} /></span>
                <span className="mw-tts-label">{text.title}</span>
            </div>

            {phase === "idle" && (
                <button type="button" className="lh-btn lh-btn-secondary lh-btn-sm" onClick={() => setPhase("generating")}>
                    <IconSparkles width={12} height={12} />
                    {text.action}
                </button>
            )}

            {phase === "generating" && (
                <div className="mw-tts-generating">
                    <div className="mw-tts-wave">
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className="mw-tts-wave-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                        ))}
                    </div>
                    <div className="mw-skel-progress" style={{ marginTop: 8 }}>
                        <div className="mw-skel-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mw-tts-status">{text.generating} {progress}%</p>
                </div>
            )}

            {(phase === "ready" || phase === "playing") && (
                <div className="mw-tts-player">
                    <button type="button" className="mw-tts-play-btn" onClick={handlePlay}>
                        {phase === "playing" ? <IconPause width={12} height={12} /> : <IconPlay width={12} height={12} />}
                    </button>
                    <div className="mw-tts-timeline">
                        <div className="mw-tts-timeline-fill" style={{ width: `${(playTime / FAKE_DURATION) * 100}%` }} />
                    </div>
                    <span className="mw-tts-time">{formatTime(playTime)} / {formatTime(FAKE_DURATION)}</span>
                </div>
            )}

            {phase === "error" && (
                <div className="mw-tts-fallback">
                    <p>{text.fallback}</p>
                    <button type="button" className="lh-btn lh-btn-secondary lh-btn-sm" onClick={handlePlay}>
                        <IconPlay width={12} height={12} />
                        {text.play}
                    </button>
                    <p className="mw-demo-hint">{text.hint}</p>
                </div>
            )}
        </div>
    );
}
