"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import {
    IconClose,
    IconCoins,
    IconDownload,
    IconPause,
    IconPlay,
    IconRefresh,
    IconVolume,
    IconWallet,
    IconWand,
} from "@/components/icons/MarketingIcons";

/* ─────────────────────────────────────────────────────────────
   MockTtsModal — mirrors the real TtsGenerateModal interaction:
   Stage 1: configure  (token cost card + generate button)
   Stage 2: generating (spinner + progress bar)
   Stage 3: preview    (audio player + actions)
   ───────────────────────────────────────────────────────────── */

type TtsStage = "configure" | "generating" | "preview";

interface Props {
    /** Whether the modal is open */
    open: boolean;
    /** Called when user closes the modal */
    onClose: () => void;
    /**
     * When true the modal auto-advances through configure → generating → preview
     * (used after grading animation completes).
     */
    autoRun: boolean;
    /** Locale for i18n */
    locale: Locale;
    /** Reset key — changing this resets the modal state */
    runId: number;
}

const FAKE_DURATION = 14; // seconds

export function MockTtsModal({ open, onClose, autoRun, locale, runId }: Props) {
    const isZh = locale === "zh";
    const t = {
        title: isZh ? "语音生成" : "Text-to-Speech",
        subtitle: isZh ? "原始作文" : "Original Essay",
        costLabel: isZh ? "预估消耗 Tokens" : "Estimated Token Cost",
        costValue: "~380",
        costDetail: isZh ? "1,247 字符 · 3 个片段" : "1,247 chars · 3 chunks",
        balanceLabel: isZh ? "当前余额:" : "Balance:",
        balanceValue: "12,500 Tokens",
        cancel: isZh ? "取消" : "Cancel",
        generate: isZh ? "生成语音" : "Generate Audio",
        generatingText: isZh ? "正在生成语音…" : "Generating audio…",
        generatingHint: isZh ? "大文本可能需要较长时间，请耐心等候" : "Large texts may take a moment",
        audioTitle: isZh ? "法语作文 — 城市与乡村生活" : "French Essay — City vs Rural Life",
        regenerate: isZh ? "重新生成" : "Regenerate",
        download: isZh ? "下载" : "Download",
        close: isZh ? "关闭" : "Close",
        createdAt: isZh ? "刚刚生成" : "Just generated",
    };

    const [stage, setStage] = useState<TtsStage>("configure");
    const [genProgress, setGenProgress] = useState(0);
    const [playTime, setPlayTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* ── Reset on open / runId change ── */
    useEffect(() => {
        if (!open) return;
        setStage("configure");
        setGenProgress(0);
        setPlayTime(0);
        setIsPlaying(false);
        stopAudio();
    }, [open, runId]);

    /* ── Auto-run: configure → generating → preview ── */
    useEffect(() => {
        if (!open || !autoRun || stage !== "configure") return;
        let cancelled = false;

        // Short pause on configure, then auto-generate
        const t1 = window.setTimeout(() => {
            if (cancelled) return;
            startGenerating(cancelled);
        }, 1200);

        return () => { cancelled = true; clearTimeout(t1); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, autoRun, stage]);

    function startGenerating(cancelled = false) {
        setStage("generating");
        setGenProgress(0);
        let p = 0;
        const interval = window.setInterval(() => {
            if (cancelled) { clearInterval(interval); return; }
            p = Math.min(100, p + 3);
            setGenProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                window.setTimeout(() => {
                    if (!cancelled) setStage("preview");
                }, 300);
            }
        }, 55);
    }

    function stopAudio() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        if (playIntervalRef.current) {
            clearInterval(playIntervalRef.current);
            playIntervalRef.current = null;
        }
        setIsPlaying(false);
    }

    function handlePlay() {
        if (isPlaying) {
            stopAudio();
            return;
        }
        // Try real audio file first
        try {
            const audio = new Audio("/audio/writing-tts-demo.mp3");
            audioRef.current = audio;
            audio.play().then(() => {
                setIsPlaying(true);
                playIntervalRef.current = setInterval(() => {
                    setPlayTime((t) => {
                        if (t >= FAKE_DURATION) {
                            stopAudio();
                            return 0;
                        }
                        return t + 0.25;
                    });
                }, 250);
                audio.onended = () => {
                    stopAudio();
                    setPlayTime(0);
                };
            }).catch(() => {
                // Fallback: simulate playback without real audio
                simulatePlayback();
            });
        } catch {
            simulatePlayback();
        }
    }

    function simulatePlayback() {
        setIsPlaying(true);
        playIntervalRef.current = setInterval(() => {
            setPlayTime((t) => {
                if (t >= FAKE_DURATION) {
                    if (playIntervalRef.current) clearInterval(playIntervalRef.current);
                    setIsPlaying(false);
                    return 0;
                }
                return t + 0.25;
            });
        }, 250);
    }

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    const handleClose = () => {
        stopAudio();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="mtts-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
            <div className="mtts-modal" role="dialog" aria-modal="true" aria-label={t.title}>
                {/* ── Header ── */}
                <div className="mtts-header">
                    <div className="mtts-header-left">
                        <span className="mtts-header-icon"><IconVolume width={16} height={16} /></span>
                        <div>
                            <div className="mtts-header-title">{t.title} — {t.subtitle}</div>
                        </div>
                    </div>
                    <button type="button" className="mtts-close-btn" onClick={handleClose} aria-label="Close">
                        <IconClose width={14} height={14} />
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="mtts-body">

                    {/* ═══ Stage 1: Configure ═══ */}
                    {stage === "configure" && (
                        <div className="mtts-configure">
                            {/* Token cost card */}
                            <div className="mtts-cost-card">
                                <div className="mtts-cost-label">{t.costLabel}</div>
                                <div className="mtts-cost-value">{t.costValue}</div>
                                <div className="mtts-cost-detail">{t.costDetail}</div>
                            </div>

                            {/* Balance row */}
                            <div className="mtts-balance-row">
                                <span>{t.balanceLabel}</span>
                                <strong>{t.balanceValue}</strong>
                            </div>

                            {/* Actions */}
                            <div className="mtts-actions">
                                <button type="button" className="lh-btn lh-btn-ghost lh-btn-sm" onClick={handleClose}>
                                    {t.cancel}
                                </button>
                                <button type="button" className="lh-btn lh-btn-primary lh-btn-sm" onClick={() => startGenerating()}>
                                    <IconVolume width={13} height={13} />
                                    {t.generate}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ═══ Stage 2: Generating ═══ */}
                    {stage === "generating" && (
                        <div className="mtts-generating">
                            <div className="mtts-spinner" />
                            <p className="mtts-gen-text">{t.generatingText}</p>
                            <p className="mtts-gen-hint">{t.generatingHint}</p>
                            <div className="mtts-progress-track">
                                <div className="mtts-progress-fill" style={{ width: `${genProgress}%` }} />
                            </div>
                            <p className="mtts-gen-pct">{genProgress}%</p>
                            <div className="mtts-actions">
                                <button type="button" className="lh-btn lh-btn-ghost lh-btn-sm" onClick={handleClose}>
                                    {t.cancel}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ═══ Stage 3: Preview ═══ */}
                    {stage === "preview" && (
                        <div className="mtts-preview">
                            {/* Editable title (decorative) */}
                            <div className="mtts-audio-title">{t.audioTitle}</div>
                            <p className="mtts-created-at">{t.createdAt}</p>

                            {/* Audio player */}
                            <div className="mtts-player">
                                <button
                                    type="button"
                                    className="mtts-play-btn"
                                    onClick={handlePlay}
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying
                                        ? <IconPause width={14} height={14} />
                                        : <IconPlay width={14} height={14} />
                                    }
                                </button>

                                <div className="mtts-player-center">
                                    {/* Waveform bars (decorative, animated when playing) */}
                                    <div className={`mtts-waveform ${isPlaying ? "mtts-waveform--playing" : ""}`}>
                                        {[...Array(20)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="mtts-wave-bar"
                                                style={{ animationDelay: `${(i * 0.07) % 0.8}s` }}
                                            />
                                        ))}
                                    </div>
                                    {/* Progress track */}
                                    <div className="mtts-progress-track mtts-progress-track--player">
                                        <div
                                            className="mtts-progress-fill"
                                            style={{ width: `${(playTime / FAKE_DURATION) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <span className="mtts-time">
                                    {formatTime(playTime)} / {formatTime(FAKE_DURATION)}
                                </span>
                            </div>

                            {/* Speed selector (decorative) */}
                            <div className="mtts-speed-row">
                                {["0.75×", "1×", "1.25×", "1.5×"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`mtts-speed-btn ${s === "1×" ? "mtts-speed-btn--active" : ""}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="mtts-actions">
                                <button type="button" className="lh-btn lh-btn-ghost lh-btn-sm">
                                    <IconRefresh width={13} height={13} />
                                    {t.regenerate}
                                </button>
                                <button type="button" className="lh-btn lh-btn-ghost lh-btn-sm">
                                    <IconDownload width={13} height={13} />
                                    {t.download}
                                </button>
                                <button type="button" className="lh-btn lh-btn-primary lh-btn-sm" onClick={handleClose}>
                                    {t.close}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
