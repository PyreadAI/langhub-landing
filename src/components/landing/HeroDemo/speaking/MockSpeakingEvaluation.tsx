"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MockSpeakingSession, SpeakingEvalTab, MockSpeakingScore, MockSpeakingAnnotation, MockSpeakingEvalMeta } from "./mockSpeakingTypes";
import {
    IconAlert,
    IconArrowRight,
    IconBulb,
    IconChart,
    IconCheck,
    IconSparkles,
    IconStar,
    IconWriting,
} from "@/components/icons/MarketingIcons";

interface Props {
    session: MockSpeakingSession;
    onBackToConversation: () => void;
}

export function MockSpeakingEvaluation({ session, onBackToConversation }: Props) {
    const [tab, setTab] = useState<SpeakingEvalTab>("diagnostic");
    const ev = session.evaluation;

    const tabs: { id: SpeakingEvalTab; label: string; icon: React.ReactNode }[] = [
        { id: "diagnostic", label: "口语诊断", icon: <IconWriting width={14} height={14} /> },
        { id: "correction", label: "批改版本", icon: <IconCheck width={14} height={14} /> },
        { id: "modelSpeech", label: "范文版本", icon: <IconSparkles width={14} height={14} /> },
    ];

    return (
        <div className="ms-evaluation">
            {/* ── Header ── */}
            <div className="ms-eval-header">
                <div className="ms-eval-header-left">
                    <button type="button" className="mw-back-link" onClick={onBackToConversation}>← 对话</button>
                    <h3 className="ms-eval-title"><IconChart width={16} height={16} /> AI 口语评估</h3>
                    <span className="mw-status-badge mw-status-graded"><IconCheck width={12} height={12} /> 已评估</span>
                    <span className="lh-tag lh-tag-ai">Model: {session.aiModel}</span>
                </div>
                <div className="ms-eval-header-right">
                    <span className="mw-ai-disclaimer"><IconAlert width={14} height={14} /> AI 评估仅供参考</span>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="mw-result-tabs">
                {tabs.map((t) => (
                    <button key={t.id} type="button" className={`mw-result-tab ${tab === t.id ? "mw-result-tab--active" : ""}`} onClick={() => setTab(t.id)}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {/* ── Tab content ── */}
            <div className="ms-eval-body">
                {tab === "diagnostic" && <DiagnosticPanel meta={ev.diagnostic} targetLevel={session.targetLevel} />}
                {tab === "correction" && <CorrectionPanel meta={ev.correction} targetLevel={session.targetLevel} />}
                {tab === "modelSpeech" && <ModelSpeechPanel meta={ev.modelSpeech} targetLevel={session.targetLevel} />}
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Level Card — reusable for all tabs
   ════════════════════════════════════════════════════════════════════ */

function LevelCard({ meta, targetLevel }: { meta: MockSpeakingEvalMeta; targetLevel: string }) {
    return (
        <div className="mw-level-card">
            <div className="mw-level-row">
                <div className="mw-level-item">
                    <span className="mw-level-label">Target</span>
                    <span className="mw-level-value">{targetLevel}</span>
                </div>
                <span className="mw-level-arrow" aria-hidden><IconArrowRight width={18} height={18} /></span>
                <div className="mw-level-item">
                    <span className="mw-level-label">Estimated</span>
                    <span className="mw-level-value mw-level-estimated">{meta.estimatedLevel}</span>
                </div>
                {meta.range && (
                    <div className="mw-level-item">
                        <span className="mw-level-label">Range</span>
                        <span className="mw-level-value mw-level-range-val">{meta.range}</span>
                    </div>
                )}
            </div>
            {meta.rationale && <div className="mw-eval-rationale">{meta.rationale}</div>}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Scores Grid — 6-dimension radar for Diagnostic
   ════════════════════════════════════════════════════════════════════ */

function ScoresGrid({ scores }: { scores: MockSpeakingScore[] }) {
    return (
        <div className="ms-scores-grid">
            {scores.map((s) => {
                const pct = (s.score / s.maxScore) * 100;
                const color = pct >= 70 ? "var(--progress)" : pct >= 50 ? "var(--warning)" : "var(--error)";
                return (
                    <div key={s.key} className="ms-score-card">
                        <div className="ms-score-header">
                            <span className="ms-score-label">{s.label}</span>
                            <span className="ms-score-value" style={{ color }}>{s.score}/{s.maxScore}</span>
                        </div>
                        <div className="ms-score-bar">
                            <div className="ms-score-bar-fill" style={{ width: `${pct}%`, background: color }} />
                        </div>
                        <p className="ms-score-comment">{s.comment}</p>
                    </div>
                );
            })}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Feedback Sections — Strengths / Warnings / Tips
   ════════════════════════════════════════════════════════════════════ */

function FeedbackSections({ meta, mode }: { meta: MockSpeakingEvalMeta; mode: "diagnostic" | "correction" | "model" }) {
    const infoTitle = mode === "model" ? "学习要点" : "优点";
    const tipTitle = mode === "model" ? "技巧示范" : "建议";

    return (
        <>
            {meta.strengths.length > 0 && (
                <div className="mw-feedback-section mw-feedback-success">
                    <h4><IconStar width={14} height={14} /> {infoTitle}</h4>
                    <ul>{meta.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}
            {mode === "diagnostic" && meta.warnings.length > 0 && (
                <div className="mw-feedback-section mw-feedback-warning">
                    <h4><IconAlert width={14} height={14} /> 注意</h4>
                    <ul>{meta.warnings.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}
            {meta.tips.length > 0 && (
                <div className="mw-feedback-section mw-feedback-info">
                    <h4><IconBulb width={14} height={14} /> {tipTitle}</h4>
                    <ul>{meta.tips.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}
        </>
    );
}

/* ════════════════════════════════════════════════════════════════════
   ConnectorLine — SVG curve from active annotation → active note
   (Adapted from writing module's MockWritingResult.tsx)
   ════════════════════════════════════════════════════════════════════ */

function ConnectorLine({ bodyRef, editorRef, notesPanelRef, activeId }: {
    bodyRef: React.RefObject<HTMLDivElement | null>;
    editorRef: React.RefObject<HTMLDivElement | null>;
    notesPanelRef: React.RefObject<HTMLDivElement | null>;
    activeId: string | null;
}) {
    const [path, setPath] = useState<string | null>(null);

    const calculate = useCallback(() => {
        if (!activeId || !bodyRef.current || !editorRef.current || !notesPanelRef.current) { setPath(null); return; }
        const hl = editorRef.current.querySelector<HTMLElement>(`[data-ann-id="${activeId}"]`);
        const note = notesPanelRef.current.querySelector<HTMLElement>(`[data-note-id="${activeId}"]`);
        if (!hl || !note) { setPath(null); return; }
        const bodyRect = bodyRef.current.getBoundingClientRect();
        const hlRect = hl.getBoundingClientRect();
        const noteRect = note.getBoundingClientRect();
        const x1 = hlRect.right - bodyRect.left;
        const y1 = hlRect.top + hlRect.height / 2 - bodyRect.top;
        const x2 = noteRect.left - bodyRect.left;
        const y2 = noteRect.top + noteRect.height / 2 - bodyRect.top;
        const mx = (x1 + x2) / 2;
        setPath(`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`);
    }, [activeId, bodyRef, editorRef, notesPanelRef]);

    useEffect(() => {
        const id = requestAnimationFrame(calculate);
        const t1 = setTimeout(calculate, 320);
        const onResize = () => calculate();
        window.addEventListener("resize", onResize, { passive: true });
        const scrollers = [bodyRef.current, editorRef.current, notesPanelRef.current].filter(Boolean) as HTMLElement[];
        scrollers.forEach((s) => s.addEventListener("scroll", onResize, { passive: true }));
        return () => { cancelAnimationFrame(id); clearTimeout(t1); window.removeEventListener("resize", onResize); scrollers.forEach((s) => s.removeEventListener("scroll", onResize)); };
    }, [calculate, bodyRef, editorRef, notesPanelRef]);

    if (!path) return null;
    return (
        <svg className="mw-connector-svg" aria-hidden="true">
            <path d={path} className="mw-connector-path" />
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Annotated Speech ColumnGroup — two-column: text left | notes right
   Mirrors writing module's ColumnGroup with bidirectional highlight ↔ note linking
   + ConnectorLine SVG + inline audio play buttons
   ════════════════════════════════════════════════════════════════════ */

function AnnotatedSpeechPanel({ html, annotations, annIdPrefix }: { html: string; annotations: MockSpeakingAnnotation[]; annIdPrefix?: string }) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const notesPanelRef = useRef<HTMLDivElement>(null);

    // Extract annotation IDs from HTML to match notes with highlights
    // The HTML uses data-ann-id="d1", "d2", etc. We need notes to use the same IDs.
    const annIds = (() => {
        const ids: string[] = [];
        const regex = /data-ann-id="([^"]+)"/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            if (!ids.includes(match[1])) ids.push(match[1]);
        }
        return ids;
    })();

    const handleEditorClick = useCallback((e: React.MouseEvent) => {
        const mark = (e.target as HTMLElement).closest<HTMLElement>("[data-ann-id]");
        if (!mark) return;
        const id = mark.getAttribute("data-ann-id");
        if (!id) return;
        setActiveId(id);
        const noteEl = notesPanelRef.current?.querySelector<HTMLElement>(`[data-note-id="${id}"]`);
        if (noteEl) {
            noteEl.scrollIntoView({ behavior: "smooth", block: "center" });
            noteEl.classList.remove("mw-pulse"); void noteEl.offsetWidth; noteEl.classList.add("mw-pulse");
            noteEl.addEventListener("animationend", () => noteEl.classList.remove("mw-pulse"), { once: true });
        }
    }, []);

    const handleNoteClick = useCallback((id: string) => {
        setActiveId(id);
        const hlEl = editorRef.current?.querySelector<HTMLElement>(`[data-ann-id="${id}"]`);
        if (hlEl) {
            hlEl.scrollIntoView({ behavior: "smooth", block: "center" });
            hlEl.classList.remove("mw-pulse"); void hlEl.offsetWidth; hlEl.classList.add("mw-pulse");
            hlEl.addEventListener("animationend", () => hlEl.classList.remove("mw-pulse"), { once: true });
        }
    }, []);

    return (
        <div className="mw-column-group" ref={bodyRef}>
            {/* Left: Annotated speech as chat bubbles */}
            <div className="mw-col-editor ms-eval-chat" ref={editorRef} onClick={handleEditorClick} dangerouslySetInnerHTML={{ __html: html }} />

            {/* Right: Notes panel */}
            {annotations.length > 0 && (
                <aside className="mw-notes-panel mw-notes-panel--expanded" ref={notesPanelRef}>
                    <div className="mw-notes-toggle">AI 批注 ({annotations.length})</div>
                    <div className="mw-notes-list">
                        {annotations.map((a, i) => {
                            // Use the actual annotation ID from HTML to ensure connector line works
                            const id = annIds[i] || `ann-${i}`;
                            const isActive = activeId === id;
                            return (
                                <div key={i} data-note-id={id}
                                    className={`mw-note-item mw-note-highlight ${isActive ? "mw-note-item--active" : ""}`}
                                    onClick={() => handleNoteClick(id)}
                                    role="button" tabIndex={0}
                                >
                                    <span className="ms-annotation-cat">{a.category}</span>
                                    <div className="ms-annotation-diff">
                                        <span className="lh-diff-del">{a.original}</span>
                                        <IconArrowRight width={10} height={10} />
                                        <span className="lh-diff-add">{a.corrected}</span>
                                    </div>
                                    <p className="ms-annotation-explain">{a.explanation}</p>
                                </div>
                            );
                        })}
                    </div>
                    {/* SVG Connector Line */}
                    <ConnectorLine bodyRef={bodyRef} editorRef={editorRef} notesPanelRef={notesPanelRef} activeId={activeId} />
                </aside>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Tab Panels
   ════════════════════════════════════════════════════════════════════ */

function DiagnosticPanel({ meta, targetLevel }: { meta: typeof import("./mockSpeakingData").MOCK_SPEAKING_SESSION.evaluation.diagnostic; targetLevel: string }) {
    return (
        <div className="ms-tab-panel">
            <LevelCard meta={meta} targetLevel={targetLevel} />
            {meta.summary && <div className="mw-eval-summary">{meta.summary}</div>}
            <ScoresGrid scores={meta.scores} />
            <FeedbackSections meta={meta} mode="diagnostic" />
            <AnnotatedSpeechPanel html={meta.annotatedSpeech} annotations={meta.annotations} />
        </div>
    );
}

function CorrectionPanel({ meta, targetLevel }: { meta: typeof import("./mockSpeakingData").MOCK_SPEAKING_SESSION.evaluation.correction; targetLevel: string }) {
    return (
        <div className="ms-tab-panel">
            <LevelCard meta={meta} targetLevel={targetLevel} />
            {meta.summary && <div className="mw-eval-summary">{meta.summary}</div>}
            <FeedbackSections meta={meta} mode="correction" />
            <AnnotatedSpeechPanel html={meta.correctedSpeech} annotations={meta.annotations} />

            {/* Oral Expressions */}
            {meta.oralExpressions && (
                <div className="mw-extra-section mw-extra-section--info">
                    <h4 className="mw-extra-title">话题表达：{meta.oralExpressions.topic}</h4>
                    <div className="mw-extra-body">
                        <div className="mw-extra-line--bold">词汇</div>
                        {meta.oralExpressions.vocabulary.map((v, i) => (
                            <div key={i} className="mw-extra-line">{v.term} — {v.meaning}</div>
                        ))}
                        <div className="mw-extra-line--bold">实用短语</div>
                        {meta.oralExpressions.phrases.map((p, i) => (
                            <div key={i} className="mw-extra-line">{p.phrase} — {p.usage}</div>
                        ))}
                        <div className="mw-extra-line--bold">论点与论据</div>
                        {meta.oralExpressions.arguments.map((a, i) => (
                            <div key={i} className="mw-extra-line"><strong>{a.point}:</strong> {a.evidence}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ModelSpeechPanel({ meta, targetLevel }: { meta: typeof import("./mockSpeakingData").MOCK_SPEAKING_SESSION.evaluation.modelSpeech; targetLevel: string }) {
    return (
        <div className="ms-tab-panel">
            <LevelCard meta={meta} targetLevel={targetLevel} />
            {meta.summary && <div className="mw-eval-summary">{meta.summary}</div>}
            <FeedbackSections meta={meta} mode="model" />
            <AnnotatedSpeechPanel html={meta.polishedSpeech} annotations={meta.annotations} />
        </div>
    );
}
