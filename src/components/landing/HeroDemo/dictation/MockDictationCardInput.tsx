"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { compareSentences, MockDiffDisplay } from "./MockDiffDisplay";
import type { MockDictationSegment, MockSegmentResult } from "./mockDictationTypes";

interface Props {
    segment: MockDictationSegment;
    segmentIndex: number;
    totalSegments: number;
    result?: MockSegmentResult;
    inputValue: string;
    isChecking: boolean;
    onInputChange: (value: string) => void;
    onSubmit: (result: MockSegmentResult) => void;
}

interface TextToken {
    type: "word" | "punct";
    leading: string;
    word: string;
    trailing: string;
    wordIndex: number;
    raw: string;
}

const LEADING_PUNCT = /^[""''«([\[{¡¿‹]+/;
const TRAILING_PUNCT = /[""''»)\]};:,.!?…—–\-]+$/;

function parseTextTokens(text: string) {
    const rawTokens = text.split(/\s+/).filter(Boolean);
    const tokens: TextToken[] = [];
    const expectedWords: string[] = [];
    let wordIndex = 0;

    for (const raw of rawTokens) {
        let leading = "";
        let trailing = "";
        let core = raw;
        const leadingMatch = core.match(LEADING_PUNCT);
        if (leadingMatch) {
            leading = leadingMatch[0];
            core = core.slice(leading.length);
        }
        const trailingMatch = core.match(TRAILING_PUNCT);
        if (trailingMatch) {
            trailing = trailingMatch[0];
            core = core.slice(0, -trailing.length);
        }
        if (core) {
            tokens.push({ type: "word", leading, word: core, trailing, wordIndex, raw });
            expectedWords.push(core);
            wordIndex += 1;
        } else {
            tokens.push({ type: "punct", leading: "", word: "", trailing: raw, wordIndex: -1, raw });
        }
    }

    return { tokens, expectedWords };
}

function stripTokenPunct(value: string) {
    let clean = value;
    const leadingMatch = clean.match(LEADING_PUNCT);
    if (leadingMatch) clean = clean.slice(leadingMatch[0].length);
    const trailingMatch = clean.match(TRAILING_PUNCT);
    if (trailingMatch) clean = clean.slice(0, -trailingMatch[0].length);
    return clean;
}

function normalizeWord(value: string) {
    return value.trim().toLowerCase().replace(/[’‘]/g, "'");
}

export function MockDictationCardInput({
    segment,
    segmentIndex,
    totalSegments,
    result,
    inputValue,
    isChecking,
    onInputChange,
    onSubmit,
}: Props) {
    const { tokens, expectedWords } = useMemo(() => parseTextTokens(segment.text), [segment.text]);
    const [wordInputs, setWordInputs] = useState<string[]>(() => expectedWords.map(() => ""));
    const [activeWordIdx, setActiveWordIdx] = useState(0);
    const [reEditingSet, setReEditingSet] = useState<Set<number>>(new Set());
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const rawParts = inputValue.split(/\s+/).filter(Boolean).map(stripTokenPunct);
        setWordInputs(expectedWords.map((_, index) => rawParts[index] || ""));
        setActiveWordIdx(0);
        setReEditingSet(new Set());
        const timer = window.setTimeout(() => inputRefs.current[0]?.focus(), 120);
        return () => window.clearTimeout(timer);
    }, [expectedWords, inputValue, segment.index]);

    function buildSentence(words: string[]) {
        return tokens
            .map((token) => {
                if (token.type === "punct") return token.raw;
                const userWord = (words[token.wordIndex] || "").trim();
                if (!userWord) return null;
                return `${token.leading}${userWord}${token.trailing}`;
            })
            .filter((item): item is string => item !== null)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function syncWords(words: string[]) {
        onInputChange(buildSentence(words));
    }

    function handleWordChange(index: number, value: string) {
        const hasSpace = value.includes(" ");
        const clean = value.replace(/\s/g, "");
        const next = [...wordInputs];
        next[index] = clean;
        setWordInputs(next);
        syncWords(next);

        if ((hasSpace || normalizeWord(clean) === normalizeWord(expectedWords[index])) && index < expectedWords.length - 1) {
            window.setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
                setActiveWordIdx(index + 1);
            }, 35);
        }
    }

    function handleSlotClick(index: number) {
        if (!result) return;
        const diffItem = result.diff[index];
        if (diffItem?.type === "correct" || reEditingSet.has(index)) return;
        const next = [...wordInputs];
        next[index] = "";
        setWordInputs(next);
        syncWords(next);
        setReEditingSet((current) => new Set(current).add(index));
        window.setTimeout(() => {
            inputRefs.current[index]?.focus();
            setActiveWordIdx(index);
        }, 35);
    }

    function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitCurrent();
            return;
        }
        if (event.key === "Backspace" && !wordInputs[index] && index > 0) {
            event.preventDefault();
            inputRefs.current[index - 1]?.focus();
            setActiveWordIdx(index - 1);
        }
        if (event.key === "ArrowLeft" && event.currentTarget.selectionStart === 0 && index > 0) {
            event.preventDefault();
            inputRefs.current[index - 1]?.focus();
            setActiveWordIdx(index - 1);
        }
        if (event.key === "ArrowRight" && event.currentTarget.selectionStart === event.currentTarget.value.length && index < expectedWords.length - 1) {
            event.preventDefault();
            inputRefs.current[index + 1]?.focus();
            setActiveWordIdx(index + 1);
        }
    }

    function submitCurrent() {
        const userInput = buildSentence(wordInputs);
        if (!userInput || isChecking) return;
        const checked = compareSentences(userInput, segment.text);
        setReEditingSet(new Set());
        onSubmit({
            segmentIndex,
            input: userInput,
            diff: checked.diff,
            accuracy: checked.accuracy,
            similarityScore: checked.similarityScore,
            isCorrect: checked.isCorrect,
        });
    }

    const wordStatuses = useMemo(() => {
        if (!result || reEditingSet.size > 0) return expectedWords.map(() => "unchecked" as const);
        return expectedWords.map((expected, index) => {
            const actual = wordInputs[index] || "";
            return normalizeWord(actual) === normalizeWord(expected) ? "correct" as const : "incorrect" as const;
        });
    }, [expectedWords, result, reEditingSet.size, wordInputs]);

    const hasAnyInput = wordInputs.some((word) => word.trim());
    const showResult = Boolean(result) && reEditingSet.size === 0;
    const showSubmit = hasAnyInput && !isChecking && (!result || reEditingSet.size > 0);
    const incorrectCount = result?.diff.filter((item) => item.type !== "correct").length || 0;

    return (
        <div className="dt-card-input">
            <div className="dt-card-input__label">Segment {segmentIndex + 1} / {totalSegments}</div>
            <div className={`dt-word-flow${showResult ? " dt-word-flow--has-results" : ""}`}>
                {tokens.map((token, tokenIndex) => {
                    if (token.type === "punct") {
                        return (
                            <Fragment key={`p-${tokenIndex}`}>
                                <span className="dt-word-punct">{token.trailing}</span>{" "}
                            </Fragment>
                        );
                    }

                    const index = token.wordIndex;
                    const isCorrect = showResult && wordStatuses[index] === "correct";
                    const isIncorrect = showResult && wordStatuses[index] === "incorrect" && !reEditingSet.has(index);
                    const isEditable = !isCorrect && !isIncorrect;
                    let slotClass = "dt-word-slot";
                    if (activeWordIdx === index && isEditable) slotClass += " dt-word-slot--active";
                    if (isCorrect) slotClass += " dt-word-slot--correct";
                    if (isIncorrect) slotClass += " dt-word-slot--incorrect";

                    return (
                        <Fragment key={`t-${tokenIndex}`}>
                            <span className="dt-word-token">
                                {token.leading ? <span className="dt-word-punct">{token.leading}</span> : null}
                                <span className={slotClass} onClick={() => handleSlotClick(index)} title={isIncorrect ? "Click to retry" : undefined}>
                                    <span className="dt-word-measure" aria-hidden>{token.word}</span>
                                    <input
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        className="dt-word-input"
                                        value={wordInputs[index] || ""}
                                        onChange={(event) => handleWordChange(index, event.target.value)}
                                        onFocus={() => setActiveWordIdx(index)}
                                        onKeyDown={(event) => handleKeyDown(index, event)}
                                        readOnly={!isEditable}
                                        disabled={isChecking}
                                        autoComplete="off"
                                        spellCheck={false}
                                        aria-label={`Word ${index + 1}`}
                                    />
                                    {isIncorrect ? <span className="dt-word-correct-hint">{token.word}</span> : null}
                                </span>
                                {token.trailing ? <span className="dt-word-punct">{token.trailing}</span> : null}
                            </span>{" "}
                        </Fragment>
                    );
                })}
            </div>
            <div className="dt-card-input__actions">
                {isChecking ? (
                    <div className="dt-card-input__checking"><div className="dt-spinner dt-spinner--sm" /> <span>Checking…</span></div>
                ) : null}
                {showSubmit ? (
                    <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={submitCurrent}>
                        {reEditingSet.size > 0 ? "Re-check" : "Submit"}
                    </button>
                ) : null}
                {showResult && result ? (
                    <div className={`dt-card-input__result ${result.isCorrect ? "dt-card-input__result--correct" : "dt-card-input__result--incorrect"}`}>
                        {result.isCorrect ? "Correct!" : `${Math.round(result.similarityScore * 100)}% match`}
                    </div>
                ) : null}
            </div>
            {showResult && incorrectCount > 0 ? (
                <div className="dt-word-retry-hint">Click any red word to retry ({incorrectCount} incorrect)</div>
            ) : null}
            {showResult && result && !result.isCorrect ? (
                <div className="dt-card-input__diff">
                    <MockDiffDisplay diff={result.diff} />
                    <div className="dt-card-input__similarity">{Math.round(result.similarityScore * 100)}% similarity</div>
                </div>
            ) : null}
        </div>
    );
}
