export type DictationSessionStatus = "completed" | "in_progress" | "ready" | "processing" | "failed";
export type DictationSourceType = "tts" | "upload" | "library";

export interface MockDictationSession {
    id: number;
    title: string;
    status: DictationSessionStatus;
    source_type: DictationSourceType;
    language: string;
    segment_count: number;
    completed_segments: number;
    correct_segments: number;
    audio_duration_ms: number | null;
    token_cost: number;
    created_at: string;
    updated_at: string;
    text_content?: string | null;
}

export interface MockDictationSegment {
    text: string;
    index: number;
    start_ms: number;
    end_ms: number;
    audio_file?: string;
}

export interface MockDictationDiffItem {
    type: "correct" | "missing" | "wrong" | "extra";
    value?: string;
    expected?: string;
    actual?: string;
}

export interface MockDictationAttempt {
    id: number;
    segment_index: number;
    attempt_number: number;
    user_input: string;
    is_correct: boolean;
    similarity_score: number;
    diff_json: MockDictationDiffItem[];
    created_at: string;
}

export interface MockDictationStats {
    completed_segments: number;
    correct_segments: number;
    total_segments: number;
    accuracy_percentage: number;
}

export interface MockActiveDictationSession {
    session: MockDictationSession;
    segments: MockDictationSegment[];
    attempts: Record<number, MockDictationAttempt[]>;
    stats: MockDictationStats;
}

export interface MockDiffWord {
    word: string;
    userWord: string;
    correct: boolean;
    missing: boolean;
    extra: boolean;
}

export interface MockDiffResult {
    words: MockDiffWord[];
    diff: MockDictationDiffItem[];
    accuracy: number;
    similarityScore: number;
    isCorrect: boolean;
    correctCount: number;
    totalCount: number;
}

export interface MockSegmentResult {
    segmentIndex: number;
    input: string;
    diff: MockDictationDiffItem[];
    accuracy: number;
    similarityScore: number;
    isCorrect: boolean;
}
