"use client";

import type { DemoPanelProps } from "./demoTypes";
import { MockDictationModule } from "./dictation/MockDictationModule";

export function DemoDictation({ runId }: DemoPanelProps) {
    return <MockDictationModule runId={runId} />;
}
