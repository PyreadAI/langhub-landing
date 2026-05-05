import type { MockActiveDictationSession, MockDictationSession } from "./mockDictationTypes";
import { compareSentences } from "./MockDiffDisplay";

const activeText = "À mes yeux, il convient de souligner que les avantages de l’avancée des technologies l’emportent sur les inconvénients. Tout d’abord, l’émergence de certaines technologies, telles qu";

export const mockSessions: MockDictationSession[] = [
    {
        id: 8,
        title: "À mes yeux, il convient de souligner que les avantages de l’avancée des technologies l’emportent sur…",
        status: "in_progress",
        source_type: "tts",
        language: "fr",
        segment_count: 2,
        completed_segments: 0,
        correct_segments: 0,
        audio_duration_ms: 12879,
        token_cost: 1876,
        created_at: "2026-05-02T02:28:13.709Z",
        updated_at: "2026-05-02T02:28:23.578Z",
        text_content: activeText,
    },
    {
        id: 7,
        title: "Les jeunes d'aujourd'hui utilisent les réseaux sociaux quotidiennement.",
        status: "completed",
        source_type: "tts",
        language: "fr",
        segment_count: 2,
        completed_segments: 2,
        correct_segments: 1,
        audio_duration_ms: 9800,
        token_cost: 1040,
        created_at: "2026-04-28T10:15:00.000Z",
        updated_at: "2026-04-28T10:19:44.000Z",
        text_content: "Les jeunes d'aujourd'hui utilisent les réseaux sociaux quotidiennement. Ils communiquent, s'informent et partagent leurs opinions.",
    },
    {
        id: 6,
        title: "Apprendre une langue étrangère ouvre de nouvelles perspectives.",
        status: "ready",
        source_type: "upload",
        language: "fr",
        segment_count: 2,
        completed_segments: 0,
        correct_segments: 0,
        audio_duration_ms: 7500,
        token_cost: 820,
        created_at: "2026-04-25T16:30:00.000Z",
        updated_at: "2026-04-25T16:31:10.000Z",
        text_content: "Apprendre une langue étrangère ouvre de nouvelles perspectives. Cela permet de communiquer avec plus de personnes.",
    },
];

export const mockActiveSession: MockActiveDictationSession = {
    session: mockSessions[0],
    segments: [
        {
            text: "À mes yeux, il convient de souligner que les avantages de l’avancée des technologies l’emportent sur les inconvénients.",
            index: 0,
            start_ms: 0,
            end_ms: 7628,
            audio_file: "seg_0.mp3",
        },
        {
            text: "Tout d’abord, l’émergence de certaines technologies, telles qu",
            index: 1,
            start_ms: 7628,
            end_ms: 12879,
            audio_file: "seg_1.mp3",
        },
    ],
    attempts: {},
    stats: {
        completed_segments: 0,
        correct_segments: 0,
        total_segments: 2,
        accuracy_percentage: 0,
    },
};

const completedSegments = [
    {
        text: "Les jeunes d'aujourd'hui utilisent les réseaux sociaux quotidiennement.",
        index: 0,
        start_ms: 0,
        end_ms: 4900,
        audio_file: "session-7-seg_0.mp3",
    },
    {
        text: "Ils communiquent, s'informent et partagent leurs opinions.",
        index: 1,
        start_ms: 4900,
        end_ms: 9800,
        audio_file: "session-7-seg_1.mp3",
    },
];

const completedAttempt0 = compareSentences(completedSegments[0].text, completedSegments[0].text);
const completedAttempt1 = compareSentences(
    "Ils communique, s'informent et partage leurs opinion.",
    completedSegments[1].text,
);

export const mockCompletedSession: MockActiveDictationSession = {
    session: mockSessions[1],
    segments: completedSegments,
    attempts: {
        0: [{
            id: 701,
            segment_index: 0,
            attempt_number: 1,
            user_input: completedSegments[0].text,
            is_correct: true,
            similarity_score: 1,
            diff_json: completedAttempt0.diff,
            created_at: "2026-04-28T10:17:00.000Z",
        }],
        1: [{
            id: 702,
            segment_index: 1,
            attempt_number: 1,
            user_input: "Ils communique, s'informent et partage leurs opinion.",
            is_correct: false,
            similarity_score: completedAttempt1.similarityScore,
            diff_json: completedAttempt1.diff,
            created_at: "2026-04-28T10:18:00.000Z",
        }],
    },
    stats: {
        completed_segments: 2,
        correct_segments: 1,
        total_segments: 2,
        accuracy_percentage: 50,
    },
};

export const mockReadySession: MockActiveDictationSession = {
    session: mockSessions[2],
    segments: [
        {
            text: "Apprendre une langue étrangère ouvre de nouvelles perspectives.",
            index: 0,
            start_ms: 0,
            end_ms: 3800,
            audio_file: "session-6-seg_0.mp3",
        },
        {
            text: "Cela permet de communiquer avec plus de personnes.",
            index: 1,
            start_ms: 3800,
            end_ms: 7500,
            audio_file: "session-6-seg_1.mp3",
        },
    ],
    attempts: {},
    stats: {
        completed_segments: 0,
        correct_segments: 0,
        total_segments: 2,
        accuracy_percentage: 0,
    },
};

export const mockSessionDetails: Record<number, MockActiveDictationSession> = {
    8: mockActiveSession,
    7: mockCompletedSession,
    6: mockReadySession,
};

export const mockUserAttempts = [
    "A mes yeux, il convient de souligner que les avantage de l'avancé des technologie l'emportent sur les inconvénients.",
    "Tout d'abord, l'emergence de certaines technologies, telle qu",
];
