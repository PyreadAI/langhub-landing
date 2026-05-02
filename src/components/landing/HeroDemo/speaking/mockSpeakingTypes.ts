/** Speaking demo phase state machine */
export type SpeakingDemoPhase = "conversation" | "evaluating" | "result";

/** Active evaluation tab */
export type SpeakingEvalTab = "diagnostic" | "correction" | "modelSpeech";

export interface MockSpeakingMessage {
    id: string;
    round: number;
    role: "user" | "assistant";
    text: string;
    /** Path to pre-generated audio file in landing/public/audio/speaking/ */
    audioUrl: string;
    /** Display duration in ms (for animation timing) */
    durationMs: number;
}

export interface MockSpeakingScore {
    key: string;
    label: string;
    score: number;
    maxScore: number;
    comment: string;
}

export interface MockSpeakingAnnotation {
    category: string;
    original: string;
    corrected: string;
    explanation: string;
}

export interface MockOralExpression {
    topic: string;
    vocabulary: { term: string; meaning: string }[];
    phrases: { phrase: string; usage: string }[];
    arguments: { point: string; evidence: string }[];
}

export interface MockSpeakingEvalMeta {
    summary: string;
    rationale?: string;
    targetLevel: string;
    estimatedLevel: string;
    range: string;
    strengths: string[];
    warnings: string[];
    tips: string[];
}

export interface MockSpeakingEvaluation {
    /** Diagnostic tab */
    diagnostic: MockSpeakingEvalMeta & {
        scores: MockSpeakingScore[];
        annotatedSpeech: string;
        annotations: MockSpeakingAnnotation[];
    };
    /** Correction tab */
    correction: MockSpeakingEvalMeta & {
        correctedSpeech: string;
        annotations: MockSpeakingAnnotation[];
        oralExpressions?: MockOralExpression;
    };
    /** Model Speech tab */
    modelSpeech: MockSpeakingEvalMeta & {
        polishedSpeech: string;
        annotations: MockSpeakingAnnotation[];
    };
}

export interface MockSpeakingSession {
    id: number;
    personaName: string;
    personaGender: "female" | "male";
    topic: string;
    targetLevel: string;
    targetStandard: string;
    aiModel: string;
    maxRounds: number;
    messages: MockSpeakingMessage[];
    evaluation: MockSpeakingEvaluation;
}
