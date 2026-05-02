"use client";

import { useCallback, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { DemoModuleId, DemoState } from "./demoTypes";

const TRANSITION_MS = 180;

export function useDemoController(initial: DemoModuleId = "dashboard") {
    const runIdRef = useRef(0);
    const [state, setState] = useState<DemoState>({
        moduleId: initial,
        phase: "idle",
        runId: 0,
    });

    const setModule = useCallback((next: DemoModuleId) => {
        runIdRef.current += 1;
        const myRun = runIdRef.current;
        setState({ moduleId: next, phase: "loading", runId: myRun });
        track("hero_demo_module_change", { module: next });
        window.setTimeout(() => {
            if (runIdRef.current !== myRun) return;
            setState({ moduleId: next, phase: "ready", runId: myRun });
        }, TRANSITION_MS);
    }, []);

    return { state, setModule };
}
