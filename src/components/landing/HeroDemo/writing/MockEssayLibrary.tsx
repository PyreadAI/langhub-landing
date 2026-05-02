"use client";

import type { Locale } from "@/lib/locale";
import { IconCheck, IconClock, IconPlus, IconSettings, IconWriting } from "@/components/icons/MarketingIcons";
import { MOCK_ESSAY_ROWS } from "./mockWritingData";

const STATUS_LABELS: Record<Locale, Record<string, { label: string; cls: string; icon: JSX.Element }>> = {
    zh: {
        graded: { label: "已批改", cls: "mw-status-graded", icon: <IconCheck width={12} height={12} /> },
        draft: { label: "草稿", cls: "mw-status-draft", icon: <IconWriting width={12} height={12} /> },
        in_progress: { label: "进行中", cls: "mw-status-draft", icon: <IconClock width={12} height={12} /> },
    },
    en: {
        graded: { label: "Graded", cls: "mw-status-graded", icon: <IconCheck width={12} height={12} /> },
        draft: { label: "Draft", cls: "mw-status-draft", icon: <IconWriting width={12} height={12} /> },
        in_progress: { label: "In Progress", cls: "mw-status-draft", icon: <IconClock width={12} height={12} /> },
    },
};

interface Props {
    onSelectEssay: (id: number) => void;
    locale: Locale;
}

export function MockEssayLibrary({ onSelectEssay, locale }: Props) {
    const isZh = locale === "zh";
    const labels = {
        title: isZh ? "写作练习" : "Writing Practice",
        settings: isZh ? "设置" : "Settings",
        quickPractice: isZh ? "快速练习" : "Quick Practice",
        quickPracticeHint: isZh ? "演示模式：官网不支持新建真实练习。" : "Demo mode: practice creation is disabled on the landing page.",
        search: isZh ? "搜索作文..." : "Search essays…",
        allStatus: isZh ? "全部状态" : "All Status",
        allExam: isZh ? "全部考试类型" : "All Exam Types",
        colTitle: isZh ? "标题" : "Title",
        colExam: isZh ? "考试" : "Exam",
        colStatus: isZh ? "状态" : "Status",
        colWords: isZh ? "词数" : "Words",
        colDate: isZh ? "日期" : "Date",
    };

    return (
        <div className="mw-library">
            {/* Header */}
            <div className="mw-library-header">
                <h3 className="mw-library-title">
                    <IconWriting width={18} height={18} />
                    {labels.title}
                </h3>
                <div className="mw-library-actions">
                    <button type="button" className="mw-icon-btn" title={labels.settings}>
                        <IconSettings width={14} height={14} />
                    </button>
                    <button type="button" className="lh-btn lh-btn-primary lh-btn-sm" title={labels.quickPracticeHint}>
                        <IconPlus width={12} height={12} />
                        {labels.quickPractice}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="mw-library-filters">
                <input
                    type="text"
                    className="mw-search-input"
                    placeholder={labels.search}
                    readOnly
                />
                <select className="mw-filter-select" disabled>
                    <option>{labels.allStatus}</option>
                </select>
                <select className="mw-filter-select" disabled>
                    <option>{labels.allExam}</option>
                </select>
            </div>

            {/* Table */}
            <div className="mw-library-table">
                <div className="mw-table-head">
                    <span className="mw-col-title">{labels.colTitle}</span>
                    <span className="mw-col-exam">{labels.colExam}</span>
                    <span className="mw-col-status">{labels.colStatus}</span>
                    <span className="mw-col-words">{labels.colWords}</span>
                    <span className="mw-col-date">{labels.colDate}</span>
                </div>
                {MOCK_ESSAY_ROWS.map((row) => {
                    const s = STATUS_LABELS[locale][row.status] ?? STATUS_LABELS[locale].draft;
                    return (
                        <button
                            key={row.id}
                            type="button"
                            className="mw-table-row"
                            onClick={() => onSelectEssay(row.id)}
                        >
                            <span className="mw-col-title mw-row-title">{row.title}</span>
                            <span className="mw-col-exam">
                                <span className="lh-tag lh-tag-progress">{row.examType}</span>
                            </span>
                            <span className="mw-col-status">
                                <span className={`mw-status-badge ${s.cls}`}>
                                    {s.icon}
                                    {s.label}
                                </span>
                            </span>
                            <span className="mw-col-words">{row.wordCount}</span>
                            <span className="mw-col-date">{row.createdAt}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
