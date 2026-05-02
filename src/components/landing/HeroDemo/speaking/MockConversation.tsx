"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MockSpeakingMessage, MockSpeakingSession } from "./mockSpeakingTypes";
import { IconSpeaking } from "@/components/icons/MarketingIcons";

interface Props {
    session: MockSpeakingSession;
    visibleCount: number;
    showTyping: boolean;
}

/**
 * Conversation view — mirrors real ConversationView.tsx layout:
 *  Header bar (persona + round + topic + level)
 *  Scrollable chat area with bubbles
 *  Each bubble has inline audio player
 */
export function MockConversation({ session, visibleCount, showTyping }: Props) {
    const chatEndRef = useRef<HTMLDivElement>(null);
    const visibleMessages = session.messages.slice(0, visibleCount);
    const currentRound = visibleMessages.length > 0 ? visibleMessages[visibleMessages.length - 1].round : 0;

    useEffect(() => {
        // Scroll within chat area only (not page-level)
        const el = chatEndRef.current;
        if (el?.parentElement) {
            el.parentElement.scrollTop = el.parentElement.scrollHeight;
        }
    }, [visibleCount, showTyping]);

    return (
        <div className="ms-conversation">
            {/* ── Header bar ── */}
            <div className="ms-conv-header">
                <div className="ms-conv-header-left">
                    <span className="ms-persona-avatar ms-persona-avatar--female">M</span>
                    <span className="ms-persona-name">{session.personaName}</span>
                </div>
                <div className="ms-conv-header-center">
                    <span className="ms-round-badge">Round {currentRound}/{session.maxRounds}</span>
                    <span className="ms-conv-topic">{session.topic}</span>
                </div>
                <div className="ms-conv-header-right">
                    <span className="lh-tag lh-tag-ai">{session.targetStandard} {session.targetLevel}</span>
                </div>
            </div>

            {/* ── Chat area ── */}
            <div className="ms-chat-area" role="log" aria-live="polite">
                {visibleMessages.length === 0 && (
                    <div className="ms-chat-empty">
                        <IconSpeaking width={32} height={32} />
                        <p>对话即将开始...</p>
                        <p className="ms-chat-empty-topic">{session.topic}</p>
                    </div>
                )}

                {visibleMessages.map((msg, idx) => (
                    <ChatBubble key={msg.id} message={msg} isLatest={idx === visibleMessages.length - 1} />
                ))}

                {/* AI typing indicator */}
                {showTyping && (
                    <div className="ms-bubble-row ms-bubble-row--ai">
                        <span className="ms-avatar ms-avatar--ai">M</span>
                        <div className="ms-bubble ms-bubble--ai ms-typing">
                            <span className="ms-typing-dot" />
                            <span className="ms-typing-dot" />
                            <span className="ms-typing-dot" />
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* ── Input area (decorative) ── */}
            <div className="ms-input-area">
                <div className="ms-mic-btn" title="Recording...">
                    <IconSpeaking width={18} height={18} />
                </div>
                <span className="ms-input-hint">按下录音</span>
            </div>
        </div>
    );
}

/* ── Individual chat bubble with inline audio player ── */

function ChatBubble({ message, isLatest }: { message: MockSpeakingMessage; isLatest: boolean }) {
    const isUser = message.role === "user";
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const intervalRef = useRef<number>(0);

    // Deterministic fluency score (8-10) based on message id hash
    const fluencyScore = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < message.id.length; i++) {
            hash = ((hash << 5) - hash) + message.id.charCodeAt(i);
            hash |= 0;
        }
        return 8 + (Math.abs(hash) % 3); // 8, 9, or 10
    }, [message.id]);

    // Auto-play latest message audio
    useEffect(() => {
        if (!isLatest) return;
        const timer = window.setTimeout(() => {
            handlePlay();
        }, 400);
        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLatest]);

    const handlePlay = useCallback(() => {
        if (playing) {
            setPlaying(false);
            window.clearInterval(intervalRef.current);
            return;
        }
        // Silent progress animation only — no real audio playback
        setPlaying(true);
        setProgress(0);
        let p = 0;
        const fakeDur = message.durationMs || 5000;
        const step = 200;
        intervalRef.current = window.setInterval(() => {
            p += (step / fakeDur) * 100;
            if (p >= 100) {
                setPlaying(false);
                setProgress(100);
                window.clearInterval(intervalRef.current);
                return;
            }
            setProgress(p);
        }, step);
    }, [playing, message.durationMs]);

    useEffect(() => {
        return () => {
            audioRef.current?.pause();
            window.clearInterval(intervalRef.current);
        };
    }, []);

    const durationStr = `${Math.floor((message.durationMs / 1000) / 60)}:${Math.floor((message.durationMs / 1000) % 60).toString().padStart(2, "0")}`;

    return (
        <div className={`ms-bubble-row ${isUser ? "ms-bubble-row--user" : "ms-bubble-row--ai"}`}>
            {!isUser && <span className="ms-avatar ms-avatar--ai">M</span>}
            <div className={`ms-bubble ${isUser ? "ms-bubble--user" : "ms-bubble--ai"}`}>
                <div className="ms-bubble-text">{message.text}</div>

                {/* Fluency badge for user messages */}
                {isUser && <span className="ms-fluency-badge">流利度：{fluencyScore}/10</span>}

                {/* Inline audio player */}
                <div className="ms-audio-inline">
                    <button type="button" className="ms-audio-play" onClick={handlePlay} aria-label={playing ? "Pause" : "Play"}>
                        {playing ? (
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                        ) : (
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>
                    <div className="ms-audio-bar">
                        <div className="ms-audio-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="ms-audio-time">{durationStr}</span>
                </div>

                {isUser && (
                    <div className="ms-bubble-meta">
                        <span className="ms-transcribed-tag">已转录</span>
                    </div>
                )}
            </div>
            {isUser && <span className="ms-avatar ms-avatar--user">K</span>}
        </div>
    );
}
