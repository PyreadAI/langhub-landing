import type { MockDictationDiffItem, MockDiffResult } from "./mockDictationTypes";

interface Props {
    diff: MockDictationDiffItem[];
}

export function compareSentences(userInput: string, correctText: string): MockDiffResult {
    const normalize = (s: string) =>
        s
            .trim()
            .toLowerCase()
            .replace(/[’‘]/g, "'")
            .replace(/\s+/g, " ");

    const userWords = normalize(userInput).split(/\s+/).filter(Boolean);
    const correctWords = normalize(correctText).split(/\s+/).filter(Boolean);
    const table = Array.from({ length: correctWords.length + 1 }, () => Array(userWords.length + 1).fill(0) as number[]);

    for (let i = correctWords.length - 1; i >= 0; i--) {
        for (let j = userWords.length - 1; j >= 0; j--) {
            table[i][j] = correctWords[i] === userWords[j]
                ? table[i + 1][j + 1] + 1
                : Math.max(table[i + 1][j], table[i][j + 1]);
        }
    }

    const diff: MockDictationDiffItem[] = [];
    let i = 0;
    let j = 0;
    while (i < correctWords.length || j < userWords.length) {
        if (i < correctWords.length && j < userWords.length && correctWords[i] === userWords[j]) {
            diff.push({ type: "correct", value: correctWords[i] });
            i += 1;
            j += 1;
        } else if (i < correctWords.length && j < userWords.length && table[i + 1]?.[j] === table[i]?.[j + 1]) {
            diff.push({ type: "wrong", expected: correctWords[i], actual: userWords[j] });
            i += 1;
            j += 1;
        } else if (j < userWords.length && (i >= correctWords.length || table[i][j + 1] >= table[i + 1]?.[j])) {
            diff.push({ type: "extra", actual: userWords[j] });
            j += 1;
        } else {
            diff.push({ type: "missing", expected: correctWords[i] });
            i += 1;
        }
    }

    const maxLen = Math.max(userWords.length, correctWords.length);
    const words = Array.from({ length: maxLen }, (_, index) => {
        const userWord = userWords[index] || "";
        const word = correctWords[index] || "";
        return {
            word,
            userWord,
            correct: Boolean(word) && userWord === word,
            missing: Boolean(word) && !userWord,
            extra: Boolean(userWord) && !word,
        };
    });

    const correctCount = words.filter((item) => item.correct).length;
    const totalCount = Math.max(correctWords.length, 1);
    const accuracy = Math.round((correctCount / totalCount) * 100);

    return {
        words,
        diff,
        accuracy,
        similarityScore: accuracy / 100,
        isCorrect: accuracy === 100 && userWords.length === correctWords.length,
        correctCount,
        totalCount,
    };
}

export function MockDiffDisplay({ diff }: Props) {
    if (!diff.length) return null;

    return (
        <div className="dt-diff">
            {diff.map((item, index) => {
                if (item.type === "correct") {
                    return <span key={index} className="dt-diff-correct">{item.value} </span>;
                }

                if (item.type === "missing") {
                    return (
                        <span key={index} className="dt-diff-missing">
                            <span className="dt-diff-strikethrough">{item.expected}</span>
                            <span className="dt-diff-label">(missing)</span>{" "}
                        </span>
                    );
                }

                if (item.type === "wrong") {
                    return (
                        <span key={index} className="dt-diff-wrong">
                            <span className="dt-diff-strikethrough">{item.expected}</span>
                            <span className="dt-diff-actual">{item.actual}</span>{" "}
                        </span>
                    );
                }

                return (
                    <span key={index} className="dt-diff-extra">
                        <span className="dt-diff-extra-text">{item.actual}</span>
                        <span className="dt-diff-label">(extra)</span>{" "}
                    </span>
                );
            })}
        </div>
    );
}
