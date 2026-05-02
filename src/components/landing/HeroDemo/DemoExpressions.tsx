"use client";

import { useState } from "react";
import { expressionsDemo } from "@/data/demo";
import { IconExpressions } from "@/components/icons/MarketingIcons";
import type { DemoPanelProps } from "./demoTypes";

export function DemoExpressions(_props: DemoPanelProps) {
    const [tab, setTab] = useState<"similar" | "opposite">("similar");
    return (
        <div className="demo-script-layout">
            <header className="demo-module-header">
                <div><p className="demo-kicker">Polish Your Expression</p><h3>{tab === "similar" ? "Learn Similar Expressions" : "Learn Opposite Expressions"}</h3></div>
                <div className="flex gap-2"><button className="lh-btn lh-btn-secondary lh-btn-sm" onClick={() => setTab("similar")}>Similar</button><button className="lh-btn lh-btn-secondary lh-btn-sm" onClick={() => setTab("opposite")}>Opposite</button></div>
            </header>
            {tab === "similar" ? <section className="grid md:grid-cols-2 gap-3">{expressionsDemo.similar.map((e) => <article className="demo-card" key={e.phrase}><strong><IconExpressions width={14} height={14} /> {e.phrase}</strong><p>{e.meaning}</p></article>)}</section> : <section className="demo-card demo-card-elev"><div className="demo-opposite-list">{expressionsDemo.opposite.map((e) => <span key={e}>{e}</span>)}</div></section>}
        </div>
    );
}
