"use client";

import { useMemo, useState } from "react";
import { dictationDemo } from "@/data/demo";
import { IconCheck, IconDictation, IconHeadphone, IconPlay } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

function normalize(s: string) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9' ]/g, "").replace(/\s+/g, " ").trim();
}

export function DemoDictation(_props: DemoPanelProps) {
    const [selected, setSelected] = useState(dictationDemo.exercises[0].id);
    const exercise = dictationDemo.exercises.find((e) => e.id === selected) || dictationDemo.exercises[0];
    const [input, setInput] = useState("Je vais au marche le samedi matin.");
    const [checked, setChecked] = useState(false);
    const expected = exercise.sentences[0];
    const correct = useMemo(() => normalize(input) === normalize(expected), [input, expected]);

    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div>
                    <p className="demo-kicker">Practice Speaking / Dictation Training</p>
                    <h3>听写练习表格与前端校验</h3>
                </div>
                <span className="lh-tag lh-tag-neutral">No backend</span>
            </header>

            <section className="demo-card demo-card-elev overflow-hidden p-0">
                <table className="demo-table">
                    <thead><tr><th>Title</th><th>Level</th><th>Sentences</th><th>Source</th></tr></thead>
                    <tbody>
                        {dictationDemo.exercises.map((ex) => (
                            <tr key={ex.id} onClick={() => { setSelected(ex.id); setChecked(false); setInput(ex.id === "a2" ? "Je vais au marche le samedi matin." : "Depuis que j'ai commence a apprendre le francais."); }} className={ex.id === selected ? "active" : ""}>
                                <td>{ex.title}</td><td><span className="lh-tag lh-tag-progress">{ex.level}</span></td><td>{ex.sentences.length}</td><td>{ex.source}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="demo-dictation-practice">
                <div className="demo-card">
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold flex items-center gap-2"><IconDictation width={14} height={14} /> {exercise.title}</p>
                        <span className="lh-tag lh-tag-warning">{exercise.level}</span>
                    </div>
                    <div className="demo-audio-player">
                        <button className="lh-icon-wrap" type="button" aria-label="mock audio"><IconPlay /></button>
                        <div className="flex-1"><div className="demo-wave"><i /><i /><i /><i /><i /><i /><i /></div><small><IconHeadphone width={11} height={11} /> Static mock audio</small></div>
                    </div>
                    <ul className="demo-sentence-list">
                        {exercise.sentences.map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}
                    </ul>
                </div>
                <div className="demo-card">
                    <label className="demo-kicker block mb-2">输入你听到的第一句</label>
                    <textarea className="demo-textarea" value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
                    <button className="lh-btn lh-btn-primary lh-btn-sm mt-3" onClick={() => setChecked(true)} type="button">Check answer</button>
                    {checked ? (
                        <div className={correct ? "demo-check-result ok" : "demo-check-result bad"}>
                            <IconCheck width={13} height={13} />
                            {correct ? "Correct" : <span>Expected: <strong>{expected}</strong></span>}
                        </div>
                    ) : null}
                </div>
            </section>
        </div>
    );
}
