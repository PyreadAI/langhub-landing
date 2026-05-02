"use client";

import type { DemoPanelProps } from "./demoTypes";
import { MockWritingModule } from "./writing/MockWritingModule";

export function DemoWriting({ runId }: DemoPanelProps) {
    return <MockWritingModule runId={runId} />;
}
