"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconPause, IconPlay, IconRepeat, IconVolume } from "@/components/icons/MarketingIcons";
import type { MockDictationSegment } from "./mockDictationTypes";

interface Props {
    segment: MockDictationSegment;
    compact?: boolean;
    visualPlaying?: boolean;
}

function formatTime(ms: number) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function audioSrcForSegment(segment: MockDictationSegment) {
    return `/mock-audio/dictation/${segment.audio_file || `seg_${segment.index}.mp3`}`;
}

export function MockDictationPlayer({ segment, compact = false, visualPlaying = false }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMs, setCurrentMs] = useState(0);
    const [hasAudioFile, setHasAudioFile] = useState(true);
    const [loop, setLoop] = useState(false);

    const durationMs = useMemo(() => segment.end_ms - segment.start_ms, [segment.end_ms, segment.start_ms]);
    const audioSrc = useMemo(() => audioSrcForSegment(segment), [segment]);
    const progress = Math.min(100, Math.round((currentMs / durationMs) * 100));

    useEffect(() => {
        setIsPlaying(false);
        setCurrentMs(0);
        setHasAudioFile(true);
        if (timerRef.current) window.clearInterval(timerRef.current);
        audioRef.current?.pause();
    }, [segment]);

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (visualPlaying) {
            setCurrentMs(0);
            setIsPlaying(true);
            startVisualSimulation(0);
            return;
        }
        if (!audioRef.current || audioRef.current.paused) {
            stopSimulation();
            setIsPlaying(false);
            setCurrentMs(0);
        }
    }, [visualPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

    function stopSimulation() {
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    function startVisualSimulation(startAtMs = currentMs) {
        stopSimulation();
        let startedAt = Date.now() - startAtMs;
        timerRef.current = window.setInterval(() => {
            const elapsed = Date.now() - startedAt;
            if (elapsed >= durationMs) {
                if (loop) {
                    startedAt = Date.now();
                    setCurrentMs(0);
                    return;
                }
                setCurrentMs(durationMs);
                setIsPlaying(false);
                stopSimulation();
                window.setTimeout(() => setCurrentMs(0), 450);
                return;
            }
            setCurrentMs(elapsed);
        }, 80);
    }

    async function togglePlayback() {
        if (isPlaying) {
            audioRef.current?.pause();
            stopSimulation();
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        startVisualSimulation();

        if (hasAudioFile && audioRef.current) {
            try {
                audioRef.current.currentTime = Math.max(0, currentMs / 1000);
                await audioRef.current.play();
            } catch {
                setHasAudioFile(false);
            }
        }
    }

    return (
        <div className={`dt-player-bar ${compact ? "dt-player-bar--compact" : ""}`}>
            <audio
                ref={audioRef}
                src={audioSrc}
                loop={loop}
                preload="metadata"
                onEnded={() => {
                    stopSimulation();
                    setIsPlaying(false);
                    setCurrentMs(0);
                }}
                onError={() => setHasAudioFile(false)}
            />
            <button className="dt-player-btn" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause dictation audio" : "Play dictation audio"}>
                {isPlaying ? <IconPause width={16} height={16} /> : <IconPlay width={16} height={16} />}
            </button>
            <div className="dt-player-main">
                <div className={`dt-player-wave ${isPlaying || visualPlaying ? "dt-player-wave--active" : ""}`} aria-hidden>
                    {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ animationDelay: `${index * 55}ms` }} />)}
                </div>
                <div className="dt-player-progress" aria-hidden>
                    <span style={{ width: `${progress}%` }} />
                </div>
            </div>
            <span className="dt-player-time">{formatTime(currentMs)} / {formatTime(durationMs)}</span>
            <button
                className={`dt-player-chip dt-player-chip-btn ${loop ? "dt-player-chip-btn--active" : ""}`}
                type="button"
                onClick={() => setLoop((value) => !value)}
                aria-label="Toggle loop playback"
            >
                <IconRepeat width={12} height={12} />
            </button>
            <span className="dt-player-chip" title={hasAudioFile ? "Static audio file" : "Visual fallback"}>
                <IconVolume width={12} height={12} /> 1.0x
            </span>
        </div>
    );
}
