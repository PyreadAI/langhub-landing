"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IconArrowRight, IconCheck, IconClose, IconRepeat } from "@/components/icons/MarketingIcons";
import { MockDictationCardInput } from "./MockDictationCardInput";
import { compareSentences } from "./MockDiffDisplay";
import { MockDictationPlayer } from "./MockDictationPlayer";
import { mockUserAttempts } from "./mockDictationData";
import type { MockActiveDictationSession, MockSegmentResult } from "./mockDictationTypes";

interface Props {
    activeSession: MockActiveDictationSession;
    onBack: () => void;
    autoRunId?: number;
}

function wait(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function MockDictationPractice({ activeSession, onBack, autoRunId = 0 }: Props) {
    const segments = activeSession.segments;
    const initialResults = useMemo(() => {
        const next: Record<number, MockSegmentResult> = {};
        Object.entries(activeSession.attempts).forEach(([index, attempts]) => {
            const last = attempts[attempts.length - 1];
            if (!last) return;
            next[Number(index)] = {
                segmentIndex: last.segment_index,
                input: last.user_input,
                diff: last.diff_json,
                accuracy: Math.round(last.similarity_score * 100),
                similarityScore: last.similarity_score,
                isCorrect: last.is_correct,
            };
        });
        return next;
    }, [activeSession.attempts]);
    const initialInputs = useMemo(() => {
        const next: Record<number, string> = {};
        Object.values(initialResults).forEach((result) => {
            next[result.segmentIndex] = result.input;
        });
        return next;
    }, [initialResults]);
    const firstUnchecked = useMemo(() => {
        const index = segments.findIndex((segment) => !initialResults[segment.index]);
        return index >= 0 ? index : 0;
    }, [initialResults, segments]);
    const [activeSegmentIndex, setActiveSegmentIndex] = useState(firstUnchecked);
    const [segmentResults, setSegmentResults] = useState<Record<number, MockSegmentResult>>(initialResults);
    const [inputValues, setInputValues] = useState<Record<number, string>>(initialInputs);
    const [checkingSegmentIndex, setCheckingSegmentIndex] = useState<number | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
    const [startedAt, setStartedAt] = useState(Date.now());
    const [autoAudioIndex, setAutoAudioIndex] = useState<number | null>(null);

    useEffect(() => {
        setActiveSegmentIndex(firstUnchecked);
        setSegmentResults(initialResults);
        setInputValues(initialInputs);
        setCheckingSegmentIndex(null);
        setIsFlipped(false);
        setShowCompletionOverlay(false);
        setStartedAt(Date.now());
    }, [activeSession.session.id, firstUnchecked, initialInputs, initialResults]);

    useEffect(() => {
        if (!autoRunId) return;
        let cancelled = false;

        async function runDemo() {
            setActiveSegmentIndex(0);
            setSegmentResults({});
            setInputValues({});
            setCheckingSegmentIndex(null);
            setIsFlipped(false);
            setShowCompletionOverlay(false);
            setStartedAt(Date.now());

            const nextResults: Record<number, MockSegmentResult> = {};
            const nextInputs: Record<number, string> = {};

            for (let index = 0; index < segments.length; index++) {
                if (cancelled) return;
                const segment = segments[index];
                setActiveSegmentIndex(index);
                setIsFlipped(false);
                setAutoAudioIndex(index);
                await wait(1200);
                if (cancelled) return;
                setAutoAudioIndex(null);

                const words = segment.text.split(/\s+/).filter(Boolean);
                let draft = "";
                for (const word of words) {
                    if (cancelled) return;
                    draft = `${draft} ${word}`.trim();
                    nextInputs[index] = draft;
                    setInputValues({ ...nextInputs });
                    await wait(90);
                }

                const checked = compareSentences(segment.text, segment.text);
                const result: MockSegmentResult = {
                    segmentIndex: index,
                    input: segment.text,
                    diff: checked.diff,
                    accuracy: checked.accuracy,
                    similarityScore: checked.similarityScore,
                    isCorrect: checked.isCorrect,
                };

                setCheckingSegmentIndex(index);
                await wait(460);
                if (cancelled) return;
                nextResults[index] = result;
                nextInputs[index] = segment.text;
                setInputValues({ ...nextInputs });
                setSegmentResults({ ...nextResults });
                setCheckingSegmentIndex(null);
                await wait(620);
            }

            if (!cancelled) {
                setShowCompletionOverlay(true);
            }
        }

        runDemo();
        return () => {
            cancelled = true;
        };
    }, [autoRunId, segments]);

    const currentSegment = segments[activeSegmentIndex];
    const completedCount = Object.keys(segmentResults).length;
    const correctCount = Object.values(segmentResults).filter((result) => result.isCorrect).length;
    const progressPct = Math.round((completedCount / segments.length) * 100);
    const accuracy = completedCount ? Math.round((correctCount / completedCount) * 100) : 0;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));

    const currentResult = segmentResults[activeSegmentIndex];
    const currentInput = inputValues[activeSegmentIndex] || "";

    const completionStats = useMemo(() => {
        const values = Object.values(segmentResults);
        const average = values.length
            ? Math.round(values.reduce((sum, item) => sum + item.accuracy, 0) / values.length)
            : 0;
        return { average };
    }, [segmentResults]);

    const goToPrev = useCallback(() => {
        setActiveSegmentIndex((index) => Math.max(0, index - 1));
    }, []);

    const goToNext = useCallback(() => {
        setActiveSegmentIndex((index) => Math.min(segments.length - 1, index + 1));
    }, [segments.length]);

    useEffect(() => {
        setIsFlipped(false);
    }, [activeSegmentIndex]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const tag = (document.activeElement as HTMLElement | null)?.tagName || "";
            if (tag === "INPUT" || tag === "TEXTAREA") return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goToPrev();
            }
            if (event.key === "ArrowRight") {
                event.preventDefault();
                goToNext();
            }
            if (event.key === " ") {
                event.preventDefault();
                setIsFlipped((value) => !value);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToNext, goToPrev]);

    function handleCardClick(event: React.MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.closest("input, button, textarea, a, .dt-word-flow, .dt-card-input__diff, .dt-player-bar")) return;
        setIsFlipped((value) => !value);
    }

    function handleSubmit(result: MockSegmentResult) {
        setCheckingSegmentIndex(result.segmentIndex);
        window.setTimeout(() => {
            setSegmentResults((current) => ({ ...current, [result.segmentIndex]: result }));
            setCheckingSegmentIndex(null);
            if (Object.keys({ ...segmentResults, [result.segmentIndex]: result }).length >= segments.length) {
                setShowCompletionOverlay(true);
            }
        }, 420);
    }

    function handleInputChange(value: string) {
        setInputValues((current) => ({ ...current, [activeSegmentIndex]: value }));
    }

    function loadDemoAttempt() {
        setInputValues((current) => ({ ...current, [activeSegmentIndex]: mockUserAttempts[activeSegmentIndex] || "" }));
    }

    function handleTryAgain() {
        setActiveSegmentIndex(0);
        setSegmentResults({});
        setInputValues({});
        setCheckingSegmentIndex(null);
        setIsFlipped(false);
        setShowCompletionOverlay(false);
        setStartedAt(Date.now());
    }

    return (
        <div className="dt-practice-shell">
            <div className="dt-practice-topbar">
                <div className="dt-practice-topbar-left">
                    <button className="dt-close-btn" type="button" onClick={onBack} aria-label="Exit practice">
                        <IconClose width={14} height={14} /> Exit
                    </button>
                </div>
                <div className="dt-practice-topbar-center">
                    <span className="dt-practice-topbar-counter">
                        {activeSegmentIndex + 1} / {segments.length}
                        {completedCount === segments.length ? <span className="dt-topbar-complete-badge"><IconCheck width={11} height={11} /></span> : null}
                    </span>
                    <div className="dt-topbar-progress">
                        <div className="dt-topbar-progress-fill" style={{ width: `${progressPct}%` }} />
                    </div>
                </div>
                <div className="dt-practice-topbar-right">{activeSession.session.title}</div>
            </div>

            <div className="dt-practice-main">
                {showCompletionOverlay ? (
                    <div className="dt-completion-overlay dt-slide-up">
                        <div className="dt-completion-overlay-card">
                            <div className="dt-completion-overlay-icon"><IconCheck width={22} height={22} /></div>
                            <h3 className="dt-completion-overlay-title">Dictation Complete</h3>
                            <p className="dt-completion-overlay-stats">
                                {correctCount}/{segments.length} correct · {accuracy}% accuracy · {elapsedSeconds}s
                            </p>
                            <div className="dt-completion-results">
                                {segments.map((segment) => {
                                    const result = segmentResults[segment.index];
                                    return (
                                        <div key={segment.index} className="dt-completion-result-row">
                                            <span>{segment.index + 1}</span>
                                            <p>{segment.text}</p>
                                            <strong>{result ? `${result.accuracy}%` : "Pending"}</strong>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="dt-completion-overlay-actions">
                                <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={() => setShowCompletionOverlay(false)}>
                                    Review cards <IconArrowRight width={14} height={14} />
                                </button>
                                <button className="lh-btn lh-btn-ghost lh-btn-sm" type="button" onClick={handleTryAgain}>
                                    Try again
                                </button>
                                <button className="lh-btn lh-btn-ghost lh-btn-sm" type="button" onClick={onBack}>
                                    Back to Sessions
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="dt-card-container dt-card-animate">
                            <div className={`dt-card ${isFlipped ? "dt-card--flipped" : ""}`}>
                                <section className="dt-card__front" onClick={handleCardClick}>
                                    <div className="dt-card__face-header">
                                        <span className="dt-card__face-indicator">Dictation</span>
                                        {currentResult ? (
                                            <span className={`dt-card__status-pill ${currentResult.isCorrect ? "dt-card__status-pill--correct" : "dt-card__status-pill--incorrect"}`}>
                                                {currentResult.isCorrect ? <IconCheck width={12} height={12} /> : <IconClose width={12} height={12} />}
                                            </span>
                                        ) : null}
                                        <button
                                            className="dt-card__flip-btn"
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setIsFlipped((value) => !value);
                                            }}
                                            aria-label="Flip to answer"
                                            title="Flip to answer"
                                        >
                                            <IconRepeat width={14} height={14} />
                                        </button>
                                    </div>
                                    <div className="dt-card__body">
                                        <MockDictationCardInput
                                            key={currentSegment.index}
                                            segment={currentSegment}
                                            segmentIndex={activeSegmentIndex}
                                            totalSegments={segments.length}
                                            result={currentResult}
                                            inputValue={currentInput}
                                            isChecking={checkingSegmentIndex === activeSegmentIndex}
                                            onInputChange={handleInputChange}
                                            onSubmit={handleSubmit}
                                        />
                                        {!currentInput && !currentResult ? (
                                            <button className="dt-demo-fill-btn" type="button" onClick={loadDemoAttempt}>
                                                Load demo attempt
                                            </button>
                                        ) : null}
                                    </div>
                                </section>

                                <section className="dt-card__back" onClick={handleCardClick}>
                                    <div className="dt-card__face-header">
                                        <span className="dt-card__face-indicator dt-card__face-indicator--back">Answer</span>
                                        <button
                                            className="dt-card__flip-btn"
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setIsFlipped((value) => !value);
                                            }}
                                            aria-label="Flip back"
                                            title="Flip back"
                                        >
                                            <IconRepeat width={14} height={14} />
                                        </button>
                                    </div>
                                    <div className="dt-card__body">
                                        <p className="dt-card__answer-text">{currentSegment.text}</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <p className="dt-card__flip-hint">
                            {isFlipped ? "Click card or press Space to return" : "Click card or press Space to reveal answer"}
                        </p>
                    </>
                )}
            </div>

            <div className="dt-practice-bottombar">
                <button className="dt-card-nav-btn" type="button" onClick={goToPrev} disabled={activeSegmentIndex <= 0}>
                    Prev
                </button>
                <div className="dt-practice-bottombar-center">
                    <MockDictationPlayer segment={currentSegment} compact visualPlaying={autoAudioIndex === activeSegmentIndex} />
                </div>
                <button className="dt-card-nav-btn" type="button" onClick={goToNext} disabled={activeSegmentIndex >= segments.length - 1}>
                    Next <IconArrowRight width={13} height={13} />
                </button>
            </div>
            <div className="dt-practice-mini-stats" aria-hidden>
                <span><IconCheck width={12} height={12} /> {completedCount}/{segments.length}</span>
                <span>{completionStats.average}% avg</span>
            </div>
        </div>
    );
}
