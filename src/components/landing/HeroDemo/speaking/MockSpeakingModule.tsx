"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MOCK_SPEAKING_SESSION } from "./mockSpeakingData";
import { MockConversation } from "./MockConversation";
import { MockSpeakingEvaluation } from "./MockSpeakingEvaluation";
import type { SpeakingDemoPhase } from "./mockSpeakingTypes";

interface Props {
    runId: number;
}

/**
 * Speaking demo state machine:
 *  conversation → evaluating → result
 *
 * Messages appear one-by-one with timed delays.
 * After all 6 messages, auto-transitions to evaluating skeleton, then result.
 */
export function MockSpeakingModule({ runId }: Props) {
    const [phase, setPhase] = useState<SpeakingDemoPhase>("conversation");
    const [visibleCount, setVisibleCount] = useState(0);
    const cancelRef = useRef(false);

    const session = MOCK_SPEAKING_SESSION;
    const totalMessages = session.messages.length;

    /* ── Conversation animation: reveal messages one by one ── */
    useEffect(() => {
        cancelRef.current = false;
        setPhase("conversation");
        setVisibleCount(0);

        const timers: number[] = [];
        let delay = 800; // initial delay before first message

        for (let i = 0; i < totalMessages; i++) {
            const msg = session.messages[i];
            const isAi = msg.role === "assistant";

            timers.push(window.setTimeout(() => {
                if (cancelRef.current) return;
                setVisibleCount(i + 1);
            }, delay));

            // After each message, add a pause before next
            // AI messages: show typing indicator for 1.5s before appearing
            // User messages: appear after ~2s gap
            delay += isAi ? 3500 : 2500;
        }

        // After all messages, transition to evaluating
        timers.push(window.setTimeout(() => {
            if (cancelRef.current) return;
            setPhase("evaluating");
        }, delay + 1500));

        // After skeleton, show result
        timers.push(window.setTimeout(() => {
            if (cancelRef.current) return;
            setPhase("result");
        }, delay + 4500));

        return () => {
            cancelRef.current = true;
            timers.forEach(window.clearTimeout);
        };
    }, [runId, totalMessages, session.messages]);

    const handleBackToConversation = useCallback(() => {
        setPhase("conversation");
        setVisibleCount(totalMessages);
    }, [totalMessages]);

    return (
        <div className="ms-module">
            {phase === "conversation" && (
                <MockConversation
                    session={session}
                    visibleCount={visibleCount}
                    showTyping={visibleCount < totalMessages && visibleCount > 0 && session.messages[visibleCount - 1]?.role === "user"}
                />
            )}

            {phase === "evaluating" && (
                <div className="ms-evaluating">
                    <div className="ms-eval-skel-header">
                        <div className="mw-skel-spinner" />
                        <div>
                            <h3>正在评估您的口语表现...</h3>
                            <p className="ms-eval-skel-sub">AI 正在分析发音、语法、词汇和互动能力。</p>
                        </div>
                    </div>
                    <div className="mw-skel-progress" style={{ marginTop: 16 }}>
                        <div className="mw-skel-progress-bar" style={{ width: "68%", transition: "width 3s ease" }} />
                    </div>
                    <div className="ms-eval-skel-cols">
                        <div className="lh-skeleton" style={{ height: 120 }} />
                        <div className="lh-skeleton" style={{ height: 120 }} />
                        <div className="lh-skeleton" style={{ height: 120 }} />
                    </div>
                </div>
            )}

            {phase === "result" && (
                <MockSpeakingEvaluation
                    session={session}
                    onBackToConversation={handleBackToConversation}
                />
            )}
        </div>
    );
}
