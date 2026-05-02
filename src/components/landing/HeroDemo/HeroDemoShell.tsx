"use client";

import type React from "react";
import { useDemoController } from "./useDemoController";
import { DemoSidebar } from "./DemoSidebar";
import { DemoDashboard } from "./DemoDashboard";
import { DemoWriting } from "./DemoWriting";
import { DemoSpeaking } from "./DemoSpeaking";
import { DemoDictation } from "./DemoDictation";
import { DemoConjugation } from "./DemoConjugation";
import { DemoVocabulary } from "./DemoVocabulary";
import { DemoAiProf } from "./DemoAiProf";
import { DemoExpressions } from "./DemoExpressions";
import type { DemoModuleId } from "@/data/demo";
import type { LandingCopy } from "@/data/landingCopy";
import type { DemoPanelProps } from "./demoTypes";

const PANELS: Record<DemoModuleId, React.ComponentType<DemoPanelProps>> = {
    dashboard: DemoDashboard,
    writing: DemoWriting,
    speaking: DemoSpeaking,
    dictation: DemoDictation,
    conjugation: DemoConjugation,
    vocabulary: DemoVocabulary,
    aiProf: DemoAiProf,
    expressions: DemoExpressions,
};

interface Props {
    copy: LandingCopy["hero"];
    soonLabel: string;
}

export function HeroDemoShell({ copy, soonLabel }: Props) {
    const { state, setModule } = useDemoController("dashboard");
    const Panel = PANELS[state.moduleId];

    return (
        <div id="product-demo" className="demo-stage" role="region" aria-label={copy.moduleLabel}>
            <div className="demo-frame">
                <DemoSidebar
                    active={state.moduleId}
                    onChange={setModule}
                    modules={copy.modules}
                    soonLabel={soonLabel}
                />
                <div className="demo-content">
                    <div key={`${state.moduleId}-${state.runId}`} className="demo-panel-wrap">
                        {state.phase === "idle" ? (
                            /* Initial load: show Dashboard without triggering any animations */
                            <DemoDashboard runId={0} />
                        ) : state.phase === "loading" ? (
                            <div className="flex flex-col gap-3" aria-busy="true">
                                <div className="lh-skeleton h-8 w-1/3" />
                                <div className="lh-skeleton h-24 w-full" />
                                <div className="lh-skeleton h-32 w-full" />
                            </div>
                        ) : (
                            <Panel runId={state.runId} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
