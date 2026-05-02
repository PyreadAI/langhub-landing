"use client";

import { dashboardDemo } from "@/data/demo";
import { IconAiProf, IconChart, IconCheck, IconConjugation, IconSpeaking, IconVocabulary, IconWriting } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

const icons = [IconWriting, IconSpeaking, IconVocabulary, IconAiProf];

export function DemoDashboard(_props: DemoPanelProps) {
    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div>
                    <p className="demo-kicker">Dashboard</p>
                    <h3>Welcome back, {dashboardDemo.learner}</h3>
                </div>
                <span className="lh-tag lh-tag-progress">Learning: {dashboardDemo.learningLanguage}</span>
            </header>
            <section className="demo-stats-grid">
                {dashboardDemo.stats.map((s) => <article className="demo-card" key={s.label}><span>{s.label}</span><strong>{s.value}</strong><small>{s.hint}</small></article>)}
            </section>
            <section className="demo-card demo-card-elev">
                <div className="flex items-center justify-between mb-3"><strong>Quick Actions</strong><IconChart width={14} height={14} /></div>
                <div className="demo-action-grid">
                    {dashboardDemo.quickActions.map((a, i) => {
                        const Icon = icons[i] || IconWriting;
                        return <div className="demo-action-card" key={a.id}><span className="lh-icon-wrap"><Icon /></span><div><strong>{a.title}</strong><p>{a.desc}</p></div></div>;
                    })}
                </div>
            </section>
            <section className="demo-card">
                <strong className="flex items-center gap-2 mb-3"><IconConjugation width={14} height={14} /> Weak points</strong>
                <div className="flex flex-wrap gap-2">{dashboardDemo.weakPoints.map((w) => <span key={w} className="lh-tag lh-tag-neutral"><IconCheck width={11} height={11} /> {w}</span>)}</div>
            </section>
        </div>
    );
}
