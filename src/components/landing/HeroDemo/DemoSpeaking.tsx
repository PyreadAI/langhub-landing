"use client";

import type { DemoPanelProps } from "./demoTypes";
import { MockSpeakingModule } from "./speaking/MockSpeakingModule";

export function DemoSpeaking({ runId }: DemoPanelProps) {
    return <MockSpeakingModule runId={runId} />;
}
