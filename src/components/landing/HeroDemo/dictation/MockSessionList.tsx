"use client";

import { useMemo, useState } from "react";
import { IconTrash } from "@/components/icons/MarketingIcons";
import type { DictationSessionStatus, MockDictationSession } from "./mockDictationTypes";

interface Props {
    sessions: MockDictationSession[];
    onSelectSession: (session: MockDictationSession) => void;
}

const statusLabels: Record<DictationSessionStatus, string> = {
    completed: "Completed",
    in_progress: "In Progress",
    ready: "Ready",
    processing: "Processing",
    failed: "Failed",
};

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(new Date(value));
}

function sourceLabel(sourceType: string) {
    if (sourceType === "tts") return "TTS";
    if (sourceType === "upload") return "Upload";
    return sourceType;
}

export function MockSessionList({ sessions, onSelectSession }: Props) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const filteredSessions = useMemo(() => {
        return sessions.filter((session) => {
            const matchesSearch = session.title.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = status ? session.status === status : true;
            return matchesSearch && matchesStatus;
        });
    }, [search, sessions, status]);

    return (
        <div className="dt-module dt-slide-up">
            <div className="dt-session-list">
                <div className="dt-filters">
                    <input
                        className="dt-search-input"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by title..."
                        type="text"
                    />
                    <select className="dt-status-filter" value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="ready">Ready</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <span className="dt-count">{filteredSessions.length} sessions</span>
                </div>

                <table className="dt-session-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Source</th>
                            <th>Progress</th>
                            <th>Accuracy</th>
                            <th>Status</th>
                            <th aria-label="Actions" />
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSessions.map((session, index) => {
                            const progressPct = Math.round((session.completed_segments / session.segment_count) * 100);
                            const accuracy = session.completed_segments
                                ? Math.round((session.correct_segments / session.segment_count) * 100)
                                : null;
                            const canOpen = session.status === "in_progress" || session.status === "ready" || session.status === "completed";

                            return (
                                <tr key={session.id} className={canOpen ? "dt-session-row--clickable" : ""} onClick={canOpen ? () => onSelectSession(session) : undefined}>
                                    <td>{index + 1}</td>
                                    <td><span className="dt-muted-cell">{formatDate(session.created_at)}</span></td>
                                    <td><span className="dt-session-title-cell" title={session.title}>{session.title}</span></td>
                                    <td><span className="dt-source-badge">{sourceLabel(session.source_type)}</span></td>
                                    <td>
                                        <div className="dt-progress-cell">
                                            <span className="dt-progress-cell-label">{session.completed_segments}/{session.segment_count}</span>
                                            <div className="dt-mini-progress"><span className="dt-mini-progress-fill" style={{ width: `${progressPct}%` }} /></div>
                                        </div>
                                    </td>
                                    <td>
                                        {accuracy === null ? (
                                            <span className="dt-muted-cell">—</span>
                                        ) : (
                                            <span className={`dt-accuracy-badge ${accuracy >= 80 ? "dt-accuracy-badge--high" : accuracy >= 50 ? "dt-accuracy-badge--mid" : "dt-accuracy-badge--low"}`}>
                                                {accuracy}%
                                            </span>
                                        )}
                                    </td>
                                    <td><span className={`dt-status-badge dt-status-${session.status}`}>{statusLabels[session.status]}</span></td>
                                    <td>
                                        <button
                                            className="dt-delete-btn"
                                            type="button"
                                            onClick={(event) => event.stopPropagation()}
                                            aria-label="Delete session"
                                            title="Delete session"
                                        >
                                            <IconTrash width={13} height={13} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
