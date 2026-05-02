"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import {
    IconArrowRight,
    IconChart,
    IconClock,
    IconExpand,
    IconSave,
    IconSettings,
    IconTarget,
    IconTrash,
    IconUser,
    IconWriting,
} from "@/components/icons/MarketingIcons";
import { getMockPracticeByLocale } from "./mockWritingData";

interface Props {
    onSubmit: () => void;
    runId: number;
    locale: Locale;
}

export function MockWritingEditor({ onSubmit, runId, locale }: Props) {
    const practice = getMockPracticeByLocale(locale);
    const isZh = locale === "zh";
    const text = {
        back: isZh ? "写作" : "Writing",
        draft: isZh ? "草稿" : "Draft",
        editable: isZh ? "可继续编辑" : "Still Editable",
        abort: isZh ? "放弃" : "Abort",
        submit: isZh ? "提交作文" : "Submit Essay",
        submitting: isZh ? "提交中…" : "Submitting…",
        prompt: isZh ? "写作题目" : "Writing Prompt",
        target: isZh ? "目标词数" : "Target",
        task: isZh ? "任务" : "Task",
        draftName: isZh ? "作文草稿" : "Essay Draft",
        owner: isZh ? "所有者" : "Owner",
        saving: isZh ? "保存中…" : "Saving…",
        saved: isZh ? "已保存" : "Saved",
        fullscreen: isZh ? "全屏" : "Fullscreen",
        save: isZh ? "保存" : "Save",
        words: isZh ? "词" : "words",
        demoHint: isZh ? "演示脚本自动输入，不会保存数据" : "Scripted demo input. No real data is saved.",
    };
    const essay = practice.essay;
    const [shown, setShown] = useState("");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [submitted, setSubmitted] = useState(false);
    const timerRef = useRef(false);

    const wordCount = Math.max(0, shown.split(/\s+/).filter(Boolean).length);
    const typingDone = shown.length >= essay.length;

    // Countdown display (mock: starts at 30:00, ticks down visually)
    const [countdown, setCountdown] = useState("30:00");

    useEffect(() => {
        timerRef.current = false;
        setShown("");
        setSaveStatus("idle");
        setSubmitted(false);
        setCountdown("30:00");

        let cancelled = false;
        const timers: number[] = [];
        let charIdx = 0;

        // Countdown ticker
        let seconds = 1800;
        const cdInterval = window.setInterval(() => {
            if (cancelled) return;
            seconds = Math.max(0, seconds - 1);
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            setCountdown(`${m}:${s.toString().padStart(2, "0")}`);
        }, 200); // Speed up for demo effect

        // Typing animation
        const tick = () => {
            if (cancelled) return;
            charIdx = Math.min(essay.length, charIdx + 5);
            setShown(essay.slice(0, charIdx));

            // Simulate autosave every ~80 chars
            if (charIdx % 80 < 6) {
                setSaveStatus("saving");
                timers.push(window.setTimeout(() => {
                    if (!cancelled) setSaveStatus("saved");
                }, 600));
            }

            if (charIdx < essay.length) {
                timers.push(window.setTimeout(tick, 12));
            } else {
                // Typing done → auto submit after brief pause
                timers.push(window.setTimeout(() => {
                    if (!cancelled) {
                        setSubmitted(true);
                        onSubmit();
                    }
                }, 600));
            }
        };
        timers.push(window.setTimeout(tick, 300));

        return () => {
            cancelled = true;
            clearInterval(cdInterval);
            timers.forEach(window.clearTimeout);
        };
    }, [essay, onSubmit, runId]);

    return (
        <div className="mw-editor-page">
            {/* Editor Header — mimics real WritingEditor.tsx */}
            <div className="mw-editor-header">
                <div className="mw-editor-header-left">
                    <span className="mw-back-link"><IconArrowRight width={13} height={13} style={{ transform: "rotate(180deg)" }} /> {text.back}</span>
                    <span className="mw-editor-title">{practice.title}</span>
                    <span className="mw-status-badge mw-status-draft"><IconWriting width={12} height={12} /> {text.draft}</span>
                    <span className="mw-editable-badge"><IconSettings width={12} height={12} /> {text.editable}</span>
                    <span className="lh-tag lh-tag-progress">{practice.examType}</span>
                </div>
                <div className="mw-editor-header-right">
                    <button type="button" className="lh-btn lh-btn-secondary lh-btn-sm" disabled>
                        <IconTrash width={12} height={12} />
                        {text.abort}
                    </button>
                    <button
                        type="button"
                        className="lh-btn lh-btn-primary lh-btn-sm"
                        disabled={!typingDone || submitted}
                    >
                        {submitted ? text.submitting : text.submit}
                    </button>
                </div>
            </div>

            {/* Writing Prompt Callout */}
            <div className="mw-prompt-callout">
                <div className="mw-prompt-label"><IconWriting width={14} height={14} /> {text.prompt}</div>
                <div className="mw-prompt-meta">
                    <span><IconTarget width={12} height={12} /> {text.target}: {practice.wordLimit} {text.words}</span>
                    <span><IconChart width={12} height={12} /> {text.task}: {practice.examTask}</span>
                </div>
                <p className="mw-prompt-text">{practice.writingPrompt}</p>
            </div>

            {/* Mock Document Editor */}
            <div className="mw-doc-wrapper">
                {/* Doc header */}
                <div className="mw-doc-header">
                    <div className="mw-doc-header-left">
                        <span className="mw-doc-title">{text.draftName}</span>
                        <span className="mw-access-badge"><IconUser width={12} height={12} /> {text.owner}</span>
                        <span className="mw-autosave">
                            {saveStatus === "saving" ? `${text.saving}` : saveStatus === "saved" ? `${text.saved}` : ""}
                        </span>
                    </div>
                    <div className="mw-doc-header-right">
                        <span className="mw-countdown"><IconClock width={12} height={12} /> {countdown}</span>
                        <button type="button" className="mw-icon-btn" title={text.fullscreen}><IconExpand width={14} height={14} /></button>
                        <button type="button" className="mw-icon-btn" title={text.save}><IconSave width={14} height={14} /></button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="mw-doc-toolbar">
                    {["B", "I", "U", "H₁", "H₂", "¶", "·", "1.", "Q"].map((btn) => (
                        <button key={btn} type="button" className="mw-toolbar-btn" disabled>
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Editor body */}
                <div className="mw-doc-body">
                    <div className="mw-doc-toc">
                        <div className="mw-toc-placeholder" />
                    </div>
                    <div className="mw-doc-editor" aria-live="polite">
                        <div className="mw-editor-text">
                            {shown}
                            {!typingDone && <span className="mw-caret" />}
                        </div>
                    </div>
                    <div className="mw-doc-annotations">
                        <div className="mw-annot-placeholder" />
                    </div>
                </div>

                {/* Footer */}
                <div className="mw-doc-footer">
                    <span>{wordCount} / {practice.wordLimit} {text.words}</span>
                    <span className="mw-demo-hint">{text.demoHint}</span>
                </div>
            </div>
        </div>
    );
}
