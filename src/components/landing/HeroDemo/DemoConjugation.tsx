"use client";

import { useEffect, useState } from "react";
import { conjugationDemo } from "@/data/demo";
import { IconCheck, IconConjugation, IconSparkles } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

type Mode = "test" | "create";

export function DemoConjugation({ runId }: DemoPanelProps) {
    const [mode, setMode] = useState<Mode>("test");
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers: number[] = [];
        setMode("test");
        setStep(0);
        conjugationDemo.verbs.forEach((_, i) => timers.push(window.setTimeout(() => setStep(i + 1), 420 + i * 760)));
        timers.push(window.setTimeout(() => setStep(conjugationDemo.verbs.length + 1), 3200));
        return () => timers.forEach(window.clearTimeout);
    }, [runId]);

    const startCreate = () => {
        setMode("create");
        setStep(0);
        [1, 2, 3, 4].forEach((n, i) => window.setTimeout(() => setStep(n), 260 + i * 650));
    };

    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div>
                    <p className="demo-kicker">Practice Conjugation</p>
                    <h3>{mode === "test" ? conjugationDemo.datasetName : "Create Dataset"}</h3>
                </div>
                <button className="lh-btn lh-btn-secondary lh-btn-sm" type="button" onClick={startCreate}>Create Dataset</button>
            </header>

            {mode === "test" ? (
                <>
                    <section className="demo-card demo-card-elev">
                        <p className="demo-kicker mb-3">Dataset · 3 irregular verbs</p>
                        <div className="flex flex-wrap gap-2">
                            {conjugationDemo.verbs.map((v) => <span key={v.verb} className="lh-tag lh-tag-neutral">{v.verb}</span>)}
                        </div>
                    </section>
                    <section className="demo-card">
                        <div className="demo-conj-list">
                            {conjugationDemo.verbs.map((v, i) => {
                                const visible = step > i;
                                return (
                                    <div key={v.verb} className={visible ? "demo-conj-row visible" : "demo-conj-row"}>
                                        <div><strong>{v.verb}</strong><small>{v.tense} · {v.prompt}</small></div>
                                        {visible ? <><span className="lh-diff-del">{v.user}</span><span>→</span><span className="lh-diff-add">{v.fixed}</span></> : <span className="lh-skeleton h-5 w-28" />}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    {step > conjugationDemo.verbs.length ? <section className="demo-card lh-soft-glow"><IconCheck width={14} height={14} /> 练习完成：3 个不规则动词错误已进入复习队列。</section> : null}
                </>
            ) : (
                <section className="demo-card demo-card-elev">
                    <div className="demo-wizard">
                        <div className={step >= 1 ? "active" : ""}><span>1</span><strong>Name</strong><p>{step >= 1 ? conjugationDemo.createDataset.name : "Waiting…"}</p></div>
                        <div className={step >= 2 ? "active" : ""}><span>2</span><strong>Add verbs</strong><p>{step >= 2 ? conjugationDemo.createDataset.typed.join(", ") : "Waiting…"}</p></div>
                        <div className={step >= 3 ? "active" : ""}><span>3</span><strong>AI validation</strong><p>{step >= 3 ? "appercevoir → apercevoir" : "Waiting…"}</p></div>
                    </div>
                    {step >= 4 ? (
                        <div className="demo-created-result">
                            <p><IconSparkles width={14} height={14} /> Dataset ready</p>
                            {conjugationDemo.createDataset.corrected.map((v) => <span key={v} className="lh-tag lh-tag-progress">{v}</span>)}
                            <small>{conjugationDemo.createDataset.note}</small>
                        </div>
                    ) : null}
                </section>
            )}
        </div>
    );
}
