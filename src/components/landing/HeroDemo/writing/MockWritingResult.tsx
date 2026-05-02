"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import { getMockPracticeByLocale } from "./mockWritingData";
import type { MockEvalMeta, MockExtraSection, MockNote, ResultTab } from "./mockWritingTypes";
import {
    IconAlert,
    IconArrowRight,
    IconBulb,
    IconChart,
    IconCheck,
    IconChevronRight,
    IconClock,
    IconClose,
    IconDocuments,
    IconExpressions,
    IconSparkles,
    IconStar,
    IconTarget,
    IconVolume,
    IconWriting,
} from "@/components/icons/MarketingIcons";
import { MockTtsModal } from "./MockTtsModal";

interface Props {
    onBackToLibrary: () => void;
    autoTts: boolean;
    runId: number;
    locale: Locale;
}

/**
 * Result page — faithfully mirrors the real LangHub `SideBySideView.tsx`:
 *
 *  Each tab = EvalMetaSection (above) + ColumnGroup (editor left | AI notes right)
 *  · Diagnostic: EvalMeta(assessment+level+rationale+strengths+warnings+tips) + ColumnGroup(annotated essay | notes)
 *  · Correction: EvalMeta(summary+rationale+strengths+tips+extras) + ColumnGroup(annotated corrected | notes)
 *  · Model Writing: EvalMeta(summary+rationale+learn+techniques+extras) + ColumnGroup(annotated model | notes)
 *  · Fullscreen: all 3 ColumnGroups side-by-side
 *  · Bidirectional highlight ↔ note linking with SVG connector
 */
export function MockWritingResult({ onBackToLibrary, autoTts, runId, locale }: Props) {
    const [tab, setTab] = useState<ResultTab>("diagnostic");
    const [fullscreen, setFullscreen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [ttsOpen, setTtsOpen] = useState(false);
    const [ttsAutoRun, setTtsAutoRun] = useState(false);

    const p = getMockPracticeByLocale(locale);
    const isZh = locale === "zh";
    const text = {
        back: isZh ? "写作" : "Writing",
        title: isZh ? "AI 批改结果" : "AI Grading Results",
        graded: isZh ? "已批改" : "Graded",
        model: isZh ? "模型" : "Model",
        disclaimer: isZh ? "AI 批改仅供参考" : "AI grading is for reference only",
        exitFs: isZh ? "退出全屏（Esc）" : "Exit fullscreen (Esc)",
        openFs: isZh ? "并排对比" : "Compare side-by-side",
        exam: isZh ? "考试" : "Exam",
        task: isZh ? "任务" : "Task",
        target: isZh ? "目标" : "Target",
        words: isZh ? "词数" : "Words",
        time: isZh ? "时间" : "Time",
        minutes30: isZh ? "30 分钟" : "30 min",
        diagnostic: isZh ? "作文诊断" : "Diagnostic",
        correction: isZh ? "批改版本" : "Correction",
        modelWriting: isZh ? "范文版本" : "Model Writing",
        wordsUnit: isZh ? "词" : "words",
        ttsBtn: isZh ? "🔊 转语音" : "🔊 Text-to-Speech",
    };

    /* ── Auto-open TTS modal when autoTts fires ── */
    useEffect(() => {
        if (!autoTts) return;
        // Delay slightly so the result page has time to render
        const t = window.setTimeout(() => {
            setTtsAutoRun(true);
            setTtsOpen(true);
        }, 800);
        return () => clearTimeout(t);
    }, [autoTts, runId]);

    useEffect(() => {
        if (!fullscreen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [fullscreen]);

    useEffect(() => { setActiveId(null); }, [tab, fullscreen]);

    const tabs: { id: ResultTab; label: string; icon: React.ReactNode }[] = [
        { id: "diagnostic", label: text.diagnostic, icon: <IconWriting width={14} height={14} /> },
        { id: "correction", label: text.correction, icon: <IconCheck width={14} height={14} /> },
        { id: "modelWriting", label: text.modelWriting, icon: <IconSparkles width={14} height={14} /> },
    ];

    const wrapperClass = `mw-result-page${fullscreen ? " mw-result-fs" : ""}`;

    return (
        <div className={wrapperClass} role={fullscreen ? "dialog" : undefined} aria-modal={fullscreen || undefined}>
            {/* ── Header ── */}
            <div className="mw-result-header">
                <div className="mw-result-header-left">
                    {!fullscreen && (
                        <button type="button" className="mw-back-link" onClick={onBackToLibrary}>
                            <IconArrowRight width={13} height={13} style={{ transform: "rotate(180deg)" }} />
                            {text.back}
                        </button>
                    )}
                    <h3 className="mw-result-title"><IconChart width={16} height={16} /> {text.title}</h3>
                    <span className="mw-status-badge mw-status-graded"><IconCheck width={12} height={12} /> {text.graded}</span>
                    <span className="lh-tag lh-tag-ai">{text.model}: {p.aiModel}</span>
                </div>
                <div className="mw-result-header-right">
                    <span className="mw-ai-disclaimer"><IconAlert width={14} height={14} /> {text.disclaimer}</span>
                    {/* TTS button — mirrors real EssayDetail header */}
                    <button
                        type="button"
                        className="mw-tts-header-btn"
                        onClick={() => { setTtsAutoRun(false); setTtsOpen(true); }}
                        title={text.ttsBtn}
                    >
                        <IconVolume width={13} height={13} />
                        {isZh ? "转语音" : "TTS"}
                    </button>
                    <button type="button" className="mw-icon-btn" title={fullscreen ? text.exitFs : text.openFs} onClick={() => setFullscreen((v) => !v)}>
                        {fullscreen ? <IconClose width={14} height={14} /> : <FullscreenIcon />}
                    </button>
                </div>
            </div>

            {/* ── Exam context bar ── */}
            <div className="mw-exam-bar">
                <span><IconDocuments width={14} height={14} /> {text.exam}: <strong>{p.examType}</strong></span>
                <span><IconWriting width={14} height={14} /> {text.task}: <strong>{p.examTask}</strong></span>
                <span><IconTarget width={14} height={14} /> {text.target}: <strong>{p.targetStandard} {p.targetLevel}</strong></span>
                <span><IconChart width={14} height={14} /> {text.words}: <strong>{p.wordCount} / {p.wordLimit}</strong></span>
                <span><IconClock width={14} height={14} /> {text.time}: <strong>{text.minutes30}</strong></span>
            </div>

            {/* ── Body ── */}
            {fullscreen ? (
                <div className="mw-fs-grid">
                    <FsColumn variant="diagnostic" headerIcon={<IconWriting width={14} height={14} />} headerLabel={text.diagnostic} wordCount={p.wordCount} wordsUnit={text.wordsUnit}>
                        <DiagnosticPane activeId={activeId} onActivate={setActiveId} locale={locale} compact />
                    </FsColumn>
                    <FsColumn variant="correction" headerIcon={<IconCheck width={14} height={14} />} headerLabel={text.correction} wordCount={p.wordCount} wordsUnit={text.wordsUnit}>
                        <CorrectionPane activeId={activeId} onActivate={setActiveId} locale={locale} compact />
                    </FsColumn>
                    <FsColumn variant="model" headerIcon={<IconSparkles width={14} height={14} />} headerLabel={text.modelWriting} wordsUnit={text.wordsUnit}>
                        <ModelPane activeId={activeId} onActivate={setActiveId} locale={locale} compact />
                    </FsColumn>
                </div>
            ) : (
                <>
                    <div className="mw-result-tabs">
                        {tabs.map((t) => (
                            <button key={t.id} type="button" className={`mw-result-tab ${tab === t.id ? "mw-result-tab--active" : ""}`} onClick={() => setTab(t.id)}>
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>
                    <div className="mw-result-body">
                        {tab === "diagnostic" && <DiagnosticPane activeId={activeId} onActivate={setActiveId} locale={locale} />}
                        {tab === "correction" && <CorrectionPane activeId={activeId} onActivate={setActiveId} locale={locale} />}
                        {tab === "modelWriting" && <ModelPane activeId={activeId} onActivate={setActiveId} locale={locale} />}
                    </div>
                </>
            )}

            {/* ── TTS Modal ── */}
            <MockTtsModal
                open={ttsOpen}
                onClose={() => { setTtsOpen(false); setTtsAutoRun(false); }}
                autoRun={ttsAutoRun}
                locale={locale}
                runId={runId}
            />
        </div>
    );
}

function FullscreenIcon() {
    return (
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 9V4h5" /><path d="M20 9V4h-5" /><path d="M4 15v5h5" /><path d="M20 15v5h-5" />
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════
   FsColumn — fullscreen column wrapper
   ════════════════════════════════════════════════════════════════════ */

function FsColumn({ variant, headerIcon, headerLabel, wordCount, wordsUnit, children }: {
    variant: "diagnostic" | "correction" | "model";
    headerIcon: React.ReactNode;
    headerLabel: string;
    wordCount?: number;
    wordsUnit: string;
    children: React.ReactNode;
}) {
    return (
        <section className={`mw-fs-col mw-fs-col--${variant}`}>
            <header className={`mw-col-header mw-col-header--${variant}`}>
                {headerIcon} {headerLabel}
                {wordCount != null && wordCount > 0 && <span className="mw-word-badge">{wordCount} {wordsUnit}</span>}
            </header>
            <div className="mw-fs-col-body">{children}</div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════════════
   EvalMetaSection — per-tab metadata above ColumnGroup
   Mirrors real: WritingLevelCard + assessmentSummary + Strengths + Warnings + Tips + ExtraSections
   ════════════════════════════════════════════════════════════════════ */

function EvalMetaSection({ meta, mode, targetLevel, diagnostic, locale }: {
    meta: MockEvalMeta;
    mode: "diagnostic" | "correction" | "polished";
    targetLevel: string;
    diagnostic?: {
        estimatedLevel?: string;
        levelRange?: string;
        rationale?: string;
        summary?: string;
        strengths?: string[];
        warnings?: string[];
        tips?: string[];
    };
    locale: Locale;
}) {
    const d = diagnostic;
    const isZh = locale === "zh";
    const infoTitle = mode === "polished" ? (isZh ? "可复用能力点" : "What You Can Learn") : (isZh ? "优势" : "Strengths");
    const tipTitle = mode === "polished" ? (isZh ? "写作技巧示例" : "Techniques Demonstrated") : (isZh ? "建议" : "Tips");
    const infoIcon = mode === "polished" ? <IconBulb width={14} height={14} /> : <IconStar width={14} height={14} />;

    /* For diagnostic mode, use diagnostic data directly */
    const levelEstimated = mode === "diagnostic" ? d?.estimatedLevel : meta.levelEstimated;
    const levelRange = mode === "diagnostic" ? d?.levelRange : meta.levelRange;
    const rationale = mode === "diagnostic" ? d?.rationale : meta.rationale;
    const summary = mode === "diagnostic" ? d?.summary : meta.summary;
    const infoItems = mode === "diagnostic" ? (d?.strengths || []) : meta.infoItems;
    const warningItems = mode === "diagnostic" ? (d?.warnings || []) : [];
    const tipItems = mode === "diagnostic" ? (d?.tips || []) : meta.tipItems;

    /* WritingLevelCard — unified full card for all three tabs */
    const renderLevelCard = () => (
        <div className="mw-level-card">
            <div className="mw-level-row">
                <div className="mw-level-item">
                    <span className="mw-level-label">{isZh ? "目标" : "Target"}</span>
                    <span className="mw-level-value">{targetLevel}</span>
                </div>
                <span className="mw-level-arrow" aria-hidden><IconArrowRight width={18} height={18} /></span>
                <div className="mw-level-item">
                    <span className="mw-level-label">{isZh ? "预估" : "Estimated"}</span>
                    <span className="mw-level-value mw-level-estimated">{levelEstimated || "—"}</span>
                </div>
                {levelRange && (
                    <div className="mw-level-item">
                        <span className="mw-level-label">{isZh ? "区间" : "Range"}</span>
                        <span className="mw-level-value mw-level-range-val">{levelRange}</span>
                    </div>
                )}
            </div>
            {rationale && <div className="mw-eval-rationale">{rationale}</div>}
        </div>
    );

    return (
        <div className="mw-eval-meta">
            {renderLevelCard()}

            {summary && <div className="mw-eval-summary">{summary}</div>}

            {infoItems.length > 0 && (
                <div className="mw-feedback-section mw-feedback-success">
                    <h4>{infoIcon} {infoTitle}</h4>
                    <ul>{infoItems.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}

            {mode === "diagnostic" && warningItems.length > 0 && (
                <div className="mw-feedback-section mw-feedback-warning">
                    <h4><IconAlert width={14} height={14} /> {isZh ? "问题提示" : "Warnings"}</h4>
                    <ul>{warningItems.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}

            {tipItems.length > 0 && (
                <div className="mw-feedback-section mw-feedback-info">
                    <h4><IconBulb width={14} height={14} /> {tipTitle}</h4>
                    <ul>{tipItems.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}

            {/* Extra sections (Topic Expressions, Task Relevance, etc.) */}
            {meta.extraSections?.map((sec, i) => (
                <ExtraSectionDisplay key={i} section={sec} />
            ))}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   ExtraSectionDisplay — non-standard callout blocks
   ════════════════════════════════════════════════════════════════════ */

function ExtraSectionDisplay({ section }: { section: MockExtraSection }) {
    const variantMap: Record<string, string> = { info: "info", tip: "info", warning: "warning" };
    const variant = variantMap[section.calloutType] || "info";

    return (
        <div className={`mw-extra-section mw-extra-section--${variant}`}>
            <h4 className="mw-extra-title">{section.title}</h4>
            <div className="mw-extra-body">
                {section.lines.map((line, i) => (
                    <div key={i} className={`mw-extra-line ${line.isBold ? "mw-extra-line--bold" : ""}`}>
                        {line.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   ColumnGroup — two-column layout: editor left | AI notes right
   ════════════════════════════════════════════════════════════════════ */

function ColumnGroup({ annotatedHtml, notes, activeId, onActivate, compact = false, locale }: {
    annotatedHtml: string;
    notes: MockNote[];
    activeId: string | null;
    onActivate: (id: string | null) => void;
    compact?: boolean;
    locale: Locale;
}) {
    const isZh = locale === "zh";
    const [notesOpen, setNotesOpen] = useState(true);
    const bodyRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const notesPanelRef = useRef<HTMLDivElement>(null);

    const handleEditorClick = useCallback((e: React.MouseEvent) => {
        const mark = (e.target as HTMLElement).closest<HTMLElement>("[data-annotation-id]");
        if (!mark) return;
        const id = mark.getAttribute("data-annotation-id");
        if (!id) return;
        onActivate(id);
        const noteEl = notesPanelRef.current?.querySelector<HTMLElement>(`[data-note-id="${id}"]`);
        if (noteEl) {
            noteEl.scrollIntoView({ behavior: "smooth", block: "center" });
            noteEl.classList.remove("mw-pulse"); void noteEl.offsetWidth; noteEl.classList.add("mw-pulse");
            noteEl.addEventListener("animationend", () => noteEl.classList.remove("mw-pulse"), { once: true });
        }
    }, [onActivate]);

    const handleNoteClick = useCallback((id: string) => {
        onActivate(id);
        const hlEl = editorRef.current?.querySelector<HTMLElement>(`[data-annotation-id="${id}"]`);
        if (hlEl) {
            hlEl.scrollIntoView({ behavior: "smooth", block: "center" });
            hlEl.classList.remove("mw-pulse"); void hlEl.offsetWidth; hlEl.classList.add("mw-pulse");
            hlEl.addEventListener("animationend", () => hlEl.classList.remove("mw-pulse"), { once: true });
        }
    }, [onActivate]);

    return (
        <div className={`mw-column-group ${compact ? "mw-column-group--compact" : ""}`} ref={bodyRef}>
            <div className="mw-col-editor" ref={editorRef} onClick={handleEditorClick} dangerouslySetInnerHTML={{ __html: annotatedHtml }} />

            {notes.length > 0 && (
                <aside className={`mw-notes-panel ${notesOpen ? "mw-notes-panel--expanded" : "mw-notes-panel--collapsed"}`} ref={notesPanelRef}>
                    <button type="button" className="mw-notes-toggle" onClick={() => setNotesOpen((v) => !v)}>
                        <IconChevronRight width={12} height={12} style={{ transform: notesOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .18s ease" }} />
                        <IconExpressions width={14} height={14} /> {isZh ? "AI 批注" : "AI Notes"} ({notes.length})
                    </button>
                    {notesOpen && (
                        <div className="mw-notes-list">
                            {notes.map((n) => {
                                const isActive = activeId === n.id;
                                return (
                                    <div key={n.id} data-note-id={n.id}
                                        className={`mw-note-item mw-note-${n.severity} ${isActive ? "mw-note-item--active" : ""}`}
                                        onClick={() => handleNoteClick(n.id)}
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNoteClick(n.id); } }}
                                        role="button" tabIndex={0} aria-pressed={isActive}
                                    >
                                        <div className="mw-note-first-line">{n.headline}</div>
                                        <div className="mw-note-detail">{n.detail}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {!compact && notesOpen && (
                        <ConnectorLine bodyRef={bodyRef} editorRef={editorRef} notesPanelRef={notesPanelRef} activeId={activeId} />
                    )}
                </aside>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   ConnectorLine — SVG curve from active annotation → active note
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
        const hl = editorRef.current.querySelector<HTMLElement>(`[data-annotation-id="${activeId}"]`);
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
   Diagnostic Pane — mirrors real product:
   EvalMetaSection (above) + ColumnGroup (annotated essay | AI notes)
   ════════════════════════════════════════════════════════════════════ */

function DiagnosticPane({ activeId, onActivate, locale, compact = false }: {
    activeId: string | null;
    onActivate: (id: string | null) => void;
    locale: Locale;
    compact?: boolean;
}) {
    const p = getMockPracticeByLocale(locale);
    const diagnosticMeta: MockEvalMeta = {
        summary: p.diagnostic.summary,
        rationale: p.diagnostic.rationale,
        levelLabel: p.diagnostic.targetLevel,
        levelEstimated: p.diagnostic.estimatedLevel,
        levelRange: p.diagnostic.levelRange,
        infoItems: p.diagnostic.strengths,
        tipItems: p.diagnostic.tips,
    };

    return (
        <div className={`mw-diagnostic-tab ${compact ? "mw-diagnostic-tab--compact" : ""}`}>
            <EvalMetaSection meta={diagnosticMeta} mode="diagnostic" targetLevel={p.targetLevel} diagnostic={p.diagnostic} locale={locale} />
            <ColumnGroup annotatedHtml={p.essayAnnotated} notes={p.diagnosticNotes} activeId={activeId} onActivate={onActivate} compact={compact} locale={locale} />
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Correction Pane — mirrors real product:
   EvalMetaSection + ColumnGroup (annotated corrected essay | notes)
   ════════════════════════════════════════════════════════════════════ */

function CorrectionPane({ activeId, onActivate, locale, compact = false }: {
    activeId: string | null;
    onActivate: (id: string | null) => void;
    locale: Locale;
    compact?: boolean;
}) {
    const p = getMockPracticeByLocale(locale);
    return (
        <div className={`mw-correction-tab ${compact ? "mw-correction-tab--compact" : ""}`}>
            <EvalMetaSection meta={p.correctionMeta} mode="correction" targetLevel={p.targetLevel} locale={locale} />
            <ColumnGroup annotatedHtml={p.correctedEssayAnnotated} notes={p.correctionNotes} activeId={activeId} onActivate={onActivate} compact={compact} locale={locale} />
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   Model Writing Pane — mirrors real product:
   EvalMetaSection + ColumnGroup (annotated model essay | notes)
   ════════════════════════════════════════════════════════════════════ */

function ModelPane({ activeId, onActivate, locale, compact = false }: {
    activeId: string | null;
    onActivate: (id: string | null) => void;
    locale: Locale;
    compact?: boolean;
}) {
    const p = getMockPracticeByLocale(locale);
    return (
        <div className={`mw-model-tab ${compact ? "mw-model-tab--compact" : ""}`}>
            <EvalMetaSection meta={p.polishedMeta} mode="polished" targetLevel={p.targetLevel} locale={locale} />
            <ColumnGroup annotatedHtml={p.modelEssayAnnotated} notes={p.polishedNotes} activeId={activeId} onActivate={onActivate} compact={compact} locale={locale} />
        </div>
    );
}
