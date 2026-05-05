"use client";

import { IconAiProf, IconArrowRight, IconCheck, IconClose, IconDashboard, IconDocuments, IconRepeat } from "@/components/icons/MarketingIcons";
import { MockDiffDisplay } from "./MockDiffDisplay";
import type { MockActiveDictationSession, MockDictationAttempt } from "./mockDictationTypes";

interface Props {
    detail: MockActiveDictationSession;
    onBack: () => void;
    onPracticeAgain: () => void;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(new Date(value));
}

function bestAttempt(attempts: MockDictationAttempt[] | undefined) {
    if (!attempts?.length) return null;
    return attempts.reduce((best, attempt) => attempt.similarity_score > best.similarity_score ? attempt : best, attempts[0]);
}

export function MockSessionDetail({ detail, onBack, onPracticeAgain }: Props) {
    const accuracy = detail.stats.total_segments
        ? Math.round((detail.stats.correct_segments / detail.stats.total_segments) * 100)
        : 0;

    return (
        <div className="dt-detail dt-slide-up">
            <div className="dt-detail-header">
                <div className="dt-detail-header-left">
                    <button className="lh-btn lh-btn-ghost lh-btn-sm" type="button" onClick={onBack}>Back</button>
                    <div className="dt-detail-title-area">
                        <h3 className="dt-detail-title">{detail.session.title}</h3>
                        <div className="dt-detail-badges">
                            <span className="dt-status-badge dt-status-completed"><IconCheck width={12} height={12} /> Completed</span>
                            <span className="dt-source-badge">{detail.session.source_type === "tts" ? "TTS" : "Upload"}</span>
                            <span className="dt-source-badge">{formatDate(detail.session.created_at)}</span>
                        </div>
                    </div>
                </div>
                <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={onPracticeAgain}>
                    <IconRepeat width={14} height={14} /> Practice Again
                </button>
            </div>

            <div className="dt-stats-card">
                <div className="dt-stats-grid">
                    <div className="dt-stats-item"><span><IconDocuments width={18} height={18} /></span><small>Segments</small><strong>{detail.stats.total_segments}</strong></div>
                    <div className="dt-stats-item"><span><IconCheck width={18} height={18} /></span><small>Correct</small><strong>{detail.stats.correct_segments}</strong></div>
                    <div className="dt-stats-item"><span><IconDashboard width={18} height={18} /></span><small>Accuracy</small><strong>{accuracy}%</strong></div>
                    <div className="dt-stats-item"><span><IconAiProf width={18} height={18} /></span><small>Tokens</small><strong>{detail.session.token_cost}</strong></div>
                </div>
            </div>

            <section className="dt-results-section">
                <h4 className="dt-results-title">Segment Results</h4>
                <div className="dt-results-list">
                    {detail.segments.map((segment) => {
                        const attempt = bestAttempt(detail.attempts[segment.index]);
                        const rowClass = attempt?.is_correct
                            ? "dt-result-row--correct"
                            : attempt
                                ? "dt-result-row--incorrect"
                                : "";

                        return (
                            <div key={segment.index} className={`dt-result-row ${rowClass}`}>
                                <div className="dt-result-row-main">
                                    <span className="dt-result-num">{segment.index + 1}</span>
                                    <div className="dt-result-content">
                                        <div className="dt-result-expected">{segment.text}</div>
                                        <div className="dt-result-user-input">{attempt?.user_input || "No attempt"}</div>
                                    </div>
                                    <div className="dt-result-right">
                                        {attempt ? <span className="dt-similarity-label">{Math.round(attempt.similarity_score * 100)}%</span> : null}
                                        <span className="dt-result-icon">{attempt?.is_correct ? <IconCheck width={15} height={15} /> : <IconClose width={14} height={14} />}</span>
                                    </div>
                                </div>
                                {attempt && !attempt.is_correct ? (
                                    <div className="dt-result-diff-inline">
                                        <MockDiffDisplay diff={attempt.diff_json} />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="dt-detail-actions">
                <button className="lh-btn lh-btn-ghost lh-btn-sm" type="button" onClick={onBack}>Back to Sessions</button>
                <button className="lh-btn lh-btn-primary lh-btn-sm" type="button" onClick={onPracticeAgain}>
                    Practice Again <IconArrowRight width={14} height={14} />
                </button>
            </div>
        </div>
    );
}
