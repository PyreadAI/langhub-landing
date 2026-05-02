import type { DemoModuleId } from "@/data/demo";

export type DemoPhase = "idle" | "loading" | "ready";

export interface DemoState {
    moduleId: DemoModuleId;
    phase: DemoPhase;
    runId: number;
}

export interface DemoPanelProps {
    runId: number;
}

export type { DemoModuleId };
