"use client";

import { useEffect, useState } from "react";
import { IconDictation, IconPlus } from "@/components/icons/MarketingIcons";
import { mockActiveSession, mockSessionDetails, mockSessions } from "./mockDictationData";
import { MockDictationPractice } from "./MockDictationPractice";
import { MockSessionList } from "./MockSessionList";
import { MockSessionDetail } from "./MockSessionDetail";
import { MockSourceSelector } from "./MockSourceSelector";
import type { MockDictationSession } from "./mockDictationTypes";

interface Props {
    runId: number;
}

export function MockDictationModule({ runId }: Props) {
    const [view, setView] = useState<"sessions" | "practice" | "detail">("practice");
    const [selectedSessionId, setSelectedSessionId] = useState(8);
    const [showSourceSelector, setShowSourceSelector] = useState(false);

    useEffect(() => {
        setView("practice");
        setSelectedSessionId(8);
        setShowSourceSelector(false);
    }, [runId]);

    function handleSelectSession(session: MockDictationSession) {
        setSelectedSessionId(session.id);
        setView(session.status === "completed" ? "detail" : "practice");
    }

    function handleStartNewSession() {
        setShowSourceSelector(false);
        setSelectedSessionId(8);
        setView("practice");
    }

    const detail = mockSessionDetails[selectedSessionId] || mockActiveSession;

    if (view === "practice") {
        return (
            <div className="dt-root">
                <div className="dt-header">
                    <h2 className="dt-header-title"><IconDictation width={18} height={18} /> Dictation Training</h2>
                    <div className="dt-header-actions">
                        <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={() => setShowSourceSelector(true)}>
                            <IconPlus width={14} height={14} /> New Session
                        </button>
                    </div>
                </div>
                <MockDictationPractice activeSession={detail} onBack={() => setView("sessions")} autoRunId={runId} />
                {showSourceSelector ? (
                    <MockSourceSelector
                        onClose={() => setShowSourceSelector(false)}
                        onStartTts={handleStartNewSession}
                    />
                ) : null}
            </div>
        );
    }

    if (view === "detail") {
        return (
            <div className="dt-root">
                <div className="dt-header">
                    <h2 className="dt-header-title"><IconDictation width={18} height={18} /> Dictation Training</h2>
                    <div className="dt-header-actions">
                        <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={() => setShowSourceSelector(true)}>
                            <IconPlus width={14} height={14} /> New Session
                        </button>
                    </div>
                </div>
                <MockSessionDetail
                    detail={detail}
                    onBack={() => setView("sessions")}
                    onPracticeAgain={() => setView("practice")}
                />
                {showSourceSelector ? (
                    <MockSourceSelector
                        onClose={() => setShowSourceSelector(false)}
                        onStartTts={handleStartNewSession}
                    />
                ) : null}
            </div>
        );
    }

    return (
        <div className="dt-root">
            <div className="dt-header">
                <h2 className="dt-header-title"><IconDictation width={18} height={18} /> Dictation Training</h2>
                <div className="dt-header-actions">
                    <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={() => setShowSourceSelector(true)}>
                        <IconPlus width={14} height={14} /> New Session
                    </button>
                </div>
            </div>
            <MockSessionList
                sessions={mockSessions}
                onSelectSession={handleSelectSession}
            />
            {showSourceSelector ? (
                <MockSourceSelector
                    onClose={() => setShowSourceSelector(false)}
                    onStartTts={handleStartNewSession}
                />
            ) : null}
        </div>
    );
}
