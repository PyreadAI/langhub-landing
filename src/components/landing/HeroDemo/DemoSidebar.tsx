"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { disabledDemoReason, type DemoModuleId } from "@/data/demo";
import {
    IconAiProf,
    IconChevronRight,
    IconConjugation,
    IconDashboard,
    IconDictation,
    IconExpressions,
    IconSpeaking,
    IconVocabulary,
    IconWriting,
    IconShield,
} from "@/components/icons/MarketingIcons";
import type { LandingCopy } from "@/data/landingCopy";

interface Props {
    active: DemoModuleId;
    onChange: (id: DemoModuleId) => void;
    modules: LandingCopy["hero"]["modules"];
    soonLabel: string;
}

type SidebarItem = {
    id: DemoModuleId;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children?: Array<{ id: DemoModuleId | string; label: string; module?: DemoModuleId; disabled?: boolean }>;
};

export function DemoSidebar({ active, onChange, modules }: Props) {
    const pathname = usePathname();
    const isZh = !pathname?.startsWith("/en");
    const groups: SidebarItem[] = useMemo(() => [
        { id: "dashboard", label: "Dashboard", icon: IconDashboard },
        {
            id: "writing",
            label: isZh ? "写作练习" : "Practice Writing",
            icon: IconWriting,
            children: [
                { id: "writing-management", label: isZh ? "写作管理" : "Writing Management", module: "writing" },
                { id: "writing-notes", label: isZh ? "写作学习笔记" : "Writing Study Notes", disabled: true },
            ],
        },
        {
            id: "speaking",
            label: isZh ? "口语练习" : "Practice Speaking",
            icon: IconSpeaking,
            children: [
                { id: "talk-ai", label: isZh ? "和 AI 对话" : "Talk with AI", module: "speaking" },
                { id: "dictation", label: isZh ? "听写训练" : "Dictation Training", module: "dictation" },
                { id: "speaking-notes", label: isZh ? "口语学习笔记" : "Speaking Study Notes", disabled: true },
            ],
        },
        {
            id: "conjugation",
            label: isZh ? "动词变位练习" : "Practice Conjugation",
            icon: IconConjugation,
            children: [
                { id: "conj-test", label: isZh ? "开始测试" : "Take a Test", module: "conjugation" },
                { id: "conj-datasets", label: isZh ? "我的数据集" : "My Datasets", module: "conjugation" },
                { id: "conj-create", label: isZh ? "创建数据集" : "Create Dataset", module: "conjugation" },
            ],
        },
        {
            id: "vocabulary",
            label: isZh ? "词汇练习" : "Practice Vocabulary",
            icon: IconVocabulary,
            children: [
                { id: "vocab-study", label: isZh ? "学习与测试" : "Study & Test", module: "vocabulary" },
                { id: "vocab-banks", label: isZh ? "词库管理" : "Bank Management", module: "vocabulary" },
                { id: "vocab-records", label: isZh ? "测试记录" : "Test Records", module: "vocabulary" },
            ],
        },
        {
            id: "expressions",
            label: isZh ? "表达优化" : "Polish Your Expression",
            icon: IconExpressions,
            children: [
                { id: "similar", label: isZh ? "学习近义表达" : "Learn Similar Expressions", module: "expressions" },
                { id: "opposite", label: isZh ? "学习反义表达" : "Learn Opposite Expressions", module: "expressions" },
            ],
        },
        {
            id: "aiProf",
            label: isZh ? "AI 学习助手" : "Ask AI Prof",
            icon: IconAiProf,
            children: [
                { id: "ask", label: isZh ? "提问" : "Ask a Question", module: "aiProf" },
                { id: "notes", label: isZh ? "AI 学习笔记" : "AI Study Notes", module: "aiProf" },
            ],
        },
    ], [isZh]);

    /* ── Collapsible state: default all collapsed ── */
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    /* Auto-expand the group that contains the active module */
    useEffect(() => {
        for (const g of groups) {
            if (g.id === active || g.children?.some((c) => c.module === active)) {
                setExpanded((prev) => {
                    if (prev.has(g.id)) return prev;
                    const next = new Set(prev);
                    next.add(g.id);
                    return next;
                });
                break;
            }
        }
    }, [active, groups]);

    const toggleGroup = useCallback((groupId: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(groupId)) next.delete(groupId);
            else next.add(groupId);
            return next;
        });
    }, []);

    const handleGroupClick = useCallback((item: SidebarItem) => {
        if (item.children) {
            /* Toggle expand/collapse and switch to first available child module */
            toggleGroup(item.id);
            if (!expanded.has(item.id)) {
                /* Was collapsed → now expanding → switch module */
                const firstModule = item.children.find((c) => c.module && !c.disabled)?.module;
                if (firstModule) onChange(firstModule);
            }
        } else {
            onChange(item.id);
        }
    }, [expanded, onChange, toggleGroup]);

    return (
        <aside className="demo-sidebar" aria-label="Langhub mock app navigation">
            <div className="demo-sidebar-brand">
                <span className="demo-brand-dot">L</span>
                <div>
                    <strong>LangHub</strong>
                    <span>{isZh ? "演示工作区" : "Demo workspace"}</span>
                </div>
            </div>

            <div className="demo-lang-switcher" aria-label="language switcher">
                <span>🇨🇳 中文</span>
                <span className="demo-lang-swap">⇌</span>
                <span>🇫🇷 Français</span>
            </div>

            <div className="demo-nav-list">
                {groups.map((item) => {
                    const Icon = item.icon;
                    const groupActive = active === item.id || item.children?.some((c) => c.module === active);
                    const isExpanded = expanded.has(item.id);
                    const hasChildren = !!item.children;

                    return (
                        <div key={item.id} className="demo-nav-group">
                            <button
                                type="button"
                                className={cn("demo-nav-item", groupActive && "demo-nav-item--active")}
                                onClick={() => handleGroupClick(item)}
                                aria-current={groupActive || undefined}
                                aria-expanded={hasChildren ? isExpanded : undefined}
                            >
                                <Icon width={16} height={16} />
                                <span className="truncate">{modules[item.id]?.name || item.label}</span>
                                {hasChildren && (
                                    <IconChevronRight
                                        width={12}
                                        height={12}
                                        className="demo-nav-chevron"
                                        style={{
                                            marginLeft: "auto",
                                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                                            transition: "transform 0.2s ease",
                                            opacity: 0.5,
                                            flexShrink: 0,
                                        }}
                                    />
                                )}
                            </button>
                            {hasChildren && (
                                <div
                                    className={cn("demo-nav-children", !isExpanded && "demo-nav-children--collapsed")}
                                >
                                    {item.children!.map((child) => (
                                        <button
                                            key={child.id}
                                            type="button"
                                            className={cn(
                                                "demo-nav-child",
                                                child.module === active && "demo-nav-child--active",
                                                child.disabled && "demo-nav-disabled"
                                            )}
                                            title={child.disabled ? disabledDemoReason : undefined}
                                            aria-disabled={child.disabled || undefined}
                                            onClick={() => !child.disabled && child.module && onChange(child.module)}
                                        >
                                            <span className="demo-child-dot" />
                                            <span>{child.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="demo-sidebar-bottom">
                {[
                    [isZh ? "收件箱" : "Inbox", "0"],
                    [isZh ? "个人资料" : "Profile", ""],
                    [isZh ? "设置" : "Settings", ""],
                    [isZh ? "代币" : "Tokens", "2,480"],
                    [isZh ? "退出登录" : "Logout", ""],
                ].map(([label, badge]) => (
                    <button key={label} type="button" className="demo-nav-item demo-nav-disabled" title={disabledDemoReason} aria-disabled>
                        <IconShield width={14} height={14} />
                        <span>{label}</span>
                        {badge ? <span className="lh-tag lh-tag-neutral ml-auto">{badge}</span> : null}
                    </button>
                ))}
            </div>
        </aside>
    );
}
