"use client";

import { useEffect, useState } from "react";
import { vocabularyDemo } from "@/data/demo";
import { IconCheck, IconSparkles, IconVocabulary } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

type View = "test" | "banks" | "create";

export function DemoVocabulary({ runId }: DemoPanelProps) {
    const [view, setView] = useState<View>("test");
    const [idx, setIdx] = useState(0);
    const [done, setDone] = useState(false);
    const [createStep, setCreateStep] = useState(0);

    useEffect(() => {
        const timers: number[] = [];
        setView("test");
        setIdx(0);
        setDone(false);
        vocabularyDemo.words.forEach((_, i) => timers.push(window.setTimeout(() => setIdx(i), 450 + i * 760)));
        timers.push(window.setTimeout(() => setDone(true), 450 + vocabularyDemo.words.length * 760));
        return () => timers.forEach(window.clearTimeout);
    }, [runId]);

    const startCreate = () => {
        setView("create");
        setCreateStep(0);
        [1, 2, 3, 4].forEach((n, i) => window.setTimeout(() => setCreateStep(n), 260 + i * 620));
    };

    const q = vocabularyDemo.words[idx];
    const correct = vocabularyDemo.words.filter((w) => w.ok).length;

    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div>
                    <p className="demo-kicker">Practice Vocabulary</p>
                    <h3>{view === "test" ? "Study & Test" : view === "banks" ? "Bank Management" : "Create Bank"}</h3>
                </div>
                <div className="flex gap-2">
                    <button className="lh-btn lh-btn-secondary lh-btn-sm" onClick={() => setView("test")}>Study & Test</button>
                    <button className="lh-btn lh-btn-secondary lh-btn-sm" onClick={() => setView("banks")}>Bank Management</button>
                </div>
            </header>

            {view === "test" ? (
                done ? (
                    <section className="demo-card demo-report-card">
                        <strong>Test Complete</strong>
                        <div className="demo-report-score">{Math.round((correct / vocabularyDemo.words.length) * 100)}%</div>
                        <p>{correct} correct · {vocabularyDemo.words.length - correct} need review</p>
                        <div className="demo-next-steps"><p><IconSparkles width={12} height={12} /> Prioritize Previous Errors 会优先推送 enjeu / confiance。</p></div>
                    </section>
                ) : (
                    <section className="demo-card demo-card-elev">
                        <div className="demo-vocab-progress"><span style={{ width: `${((idx + 1) / vocabularyDemo.words.length) * 100}%` }} /></div>
                        <p className="demo-kicker mb-2">{idx + 1} / {vocabularyDemo.words.length} · {q.type}</p>
                        <h4 className="demo-vocab-prompt">{q.prompt}</h4>
                        <div className="demo-vocab-answer">
                            <span>用户输入：{q.user}</span>
                            <strong className={q.ok ? "ok" : "bad"}>{q.ok ? "Correct" : "Needs correction"}</strong>
                        </div>
                        {!q.ok ? <p className="demo-check-result bad">正确答案：{q.answer}</p> : null}
                    </section>
                )
            ) : view === "banks" ? (
                <section className="demo-card demo-card-elev p-0 overflow-hidden">
                    <div className="demo-table-actions"><strong>Browse Public Banks</strong><button className="lh-btn lh-btn-primary lh-btn-sm" onClick={startCreate}>+ Create Bank</button></div>
                    <table className="demo-table"><thead><tr><th>Name</th><th>Exam</th><th>Words</th><th>Type</th></tr></thead><tbody>{vocabularyDemo.banks.map((b) => <tr key={b.name}><td>{b.name}</td><td>{b.exam}</td><td>{b.words}</td><td>{b.type}</td></tr>)}</tbody></table>
                </section>
            ) : (
                <section className="demo-card demo-card-elev">
                    <div className="demo-wizard">
                        <div className={createStep >= 1 ? "active" : ""}><span>1</span><strong>Name</strong><p>{createStep >= 1 ? vocabularyDemo.createBank.name : "Waiting…"}</p></div>
                        <div className={createStep >= 2 ? "active" : ""}><span>2</span><strong>Add words</strong><p>{createStep >= 2 ? vocabularyDemo.createBank.typed.join(", ") : "Waiting…"}</p></div>
                        <div className={createStep >= 3 ? "active" : ""}><span>3</span><strong>AI definitions</strong><p>{createStep >= 3 ? "indepandant → indépendant" : "Waiting…"}</p></div>
                    </div>
                    {createStep >= 4 ? <div className="demo-created-result"><p><IconVocabulary width={14} height={14} /> Bank created</p>{vocabularyDemo.createBank.definitionsZh.map((d) => <small key={d}>{d}</small>)}</div> : null}
                </section>
            )}
        </div>
    );
}
