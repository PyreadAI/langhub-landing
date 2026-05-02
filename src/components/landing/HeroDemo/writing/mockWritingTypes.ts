/** Writing demo phase state machine */
export type WritingDemoPhase =
    | "library"
    | "editorTyping"
    | "submitting"
    | "grading"
    | "result"
    | "ttsGenerating"
    | "ttsReady"
    | "freeExplore";

/** Active tab on the result page */
export type ResultTab = "diagnostic" | "correction" | "modelWriting";

/**
 * Annotation severity — drives highlight + note border color.
 * Maps to the real product's colorHighlight attrs.type values:
 *   error   → #EF4444 red  (grammar / spelling errors)
 *   highlight → #F59E0B amber (corrections shown in correction tab)
 *   keypoint  → #8B5CF6 purple (key techniques in model writing)
 *   improvement → #10B981 green (style improvements)
 *   general   → #9CA3AF gray (neutral notes)
 */
export type NoteSeverity = "error" | "highlight" | "keypoint" | "improvement" | "general";

export interface MockCorrection {
    id: string;
    original: string;
    corrected: string;
    category: string;
    note: string;
    severity?: NoteSeverity;
}

export interface MockDiagnostic {
    targetLevel: string;
    estimatedLevel: string;
    levelRange: string;
    /** AI rationale explaining why this level was estimated */
    rationale: string;
    summary: string;
    strengths: string[];
    warnings: string[];
    tips: string[];
}

/**
 * AI note attached to an annotation in the correction/polished document.
 * Mirrors `DocumentComment` in the real product.
 */
export interface MockNote {
    id: string;
    headline: string;
    detail: string;
    severity: NoteSeverity;
}

/**
 * Extra section — non-standard callout blocks (e.g. "Topic Expressions for Your Level").
 * Mirrors `ExtraSection` in the real product's extractDocMetadata.
 */
export interface MockExtraSection {
    title: string;
    calloutType: "info" | "tip" | "warning";
    lines: { text: string; isBold?: boolean }[];
}

/**
 * Metadata shown above the ColumnGroup for a tab — mirrors EvalMetaSection.
 */
export interface MockEvalMeta {
    summary: string;
    rationale?: string;
    levelLabel?: string;
    levelEstimated?: string;
    levelRange?: string;
    infoItems: string[];
    tipItems: string[];
    /** Non-standard callout blocks (Topic Expressions, Task Relevance, etc.) */
    extraSections?: MockExtraSection[];
}

export interface MockEssayRow {
    id: number;
    title: string;
    examType: string;
    status: "graded" | "draft" | "in_progress";
    wordCount: number;
    createdAt: string;
}

export interface MockWritingPractice {
    id: number;
    title: string;
    examType: string;
    targetStandard: string;
    targetLevel: string;
    examTask: string;
    wordLimit: number;
    writingPrompt: string;
    aiModel: string;
    status: string;
    wordCount: number;
    essay: string;
    /** Annotated original essay HTML with data-annotation-id for Diagnostic ColumnGroup */
    essayAnnotated: string;
    corrections: MockCorrection[];
    diagnostic: MockDiagnostic;
    /** Diagnostic tab AI notes (right panel) */
    diagnosticNotes: MockNote[];
    correctedEssay: string;
    correctedEssayAnnotated: string;
    modelEssay: string;
    modelEssayAnnotated: string;
    modelEssayLevel: string;
    modelTips: string[];
    nextSteps: string[];
    ttsTitle: string;
    correctionMeta: MockEvalMeta;
    correctionNotes: MockNote[];
    polishedMeta: MockEvalMeta;
    polishedNotes: MockNote[];
}
