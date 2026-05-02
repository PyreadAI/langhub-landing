"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";
import type { WritingDemoPhase } from "./mockWritingTypes";
import { MockEssayLibrary } from "./MockEssayLibrary";
import { MockWritingEditor } from "./MockWritingEditor";
import { MockGradingSkeleton } from "./MockGradingSkeleton";
import { MockWritingResult } from "./MockWritingResult";

interface Props {
    runId: number;
}

/**
 * Top-level state machine for the Writing demo.
 * Starts at "editorTyping" by default, auto-progresses through the demo,
 * then enters "freeExplore" where the user can click around freely.
 */
export function MockWritingModule({ runId }: Props) {
    const pathname = usePathname();
    const locale: Locale = pathname?.startsWith("/en") ? "en" : "zh";
    const [phase, setPhase] = useState<WritingDemoPhase>("editorTyping");
    const [autoTts, setAutoTts] = useState(false);
    const internalRunRef = useRef(0);

    // Reset on new runId (e.g. user clicks sidebar again)
    useEffect(() => {
        internalRunRef.current += 1;
        setPhase("editorTyping");
        setAutoTts(false);
    }, [runId]);

    const handleEditorSubmit = useCallback(() => {
        setPhase("submitting");
        window.setTimeout(() => setPhase("grading"), 500);
    }, []);

    const handleGradingComplete = useCallback(() => {
        setPhase("result");
        setAutoTts(true);
    }, []);

    const handleBackToLibrary = useCallback(() => {
        setPhase("library");
    }, []);

    const handleSelectEssay = useCallback(() => {
        // Clicking any row in the library → show the graded result directly
        setPhase("result");
        setAutoTts(false);
    }, []);

    return (
        <div className="mw-module">
            {phase === "library" && (
                <MockEssayLibrary onSelectEssay={handleSelectEssay} locale={locale} />
            )}

            {(phase === "editorTyping" || phase === "submitting") && (
                <MockWritingEditor
                    onSubmit={handleEditorSubmit}
                    runId={runId}
                    locale={locale}
                />
            )}

            {phase === "grading" && (
                <MockGradingSkeleton
                    onComplete={handleGradingComplete}
                    runId={runId}
                    locale={locale}
                />
            )}

            {(phase === "result" || phase === "ttsGenerating" || phase === "ttsReady" || phase === "freeExplore") && (
                <MockWritingResult
                    onBackToLibrary={handleBackToLibrary}
                    autoTts={autoTts}
                    runId={runId}
                    locale={locale}
                />
            )}
        </div>
    );
}
