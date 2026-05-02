"use client";

import { aiProfDemo } from "@/data/demo";
import { IconAiProf, IconSearch } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

export function DemoAiProf(_props: DemoPanelProps) {
    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div><p className="demo-kicker">Ask AI Prof</p><h3>AI Study Notes</h3></div>
                <span className="lh-tag lh-tag-ai">Saved notes</span>
            </header>
            <section className="demo-card demo-search-disabled">
                <IconSearch width={16} height={16} />
                <span>演示模式中搜索暂不可用。注册后可以向 AI Prof 提问并保存学习笔记。</span>
            </section>
            <section className="grid gap-3">
                {aiProfDemo.notes.map((n) => <article key={n.id} className="demo-card demo-note-card"><div><IconAiProf width={15} height={15} /><span className="lh-tag lh-tag-neutral">{n.level}</span></div><h4>{n.title}</h4><p>{n.body}</p></article>)}
            </section>
        </div>
    );
}
