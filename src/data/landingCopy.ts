import type { Locale } from "@/lib/locale";

export interface LandingCopy {
    meta: {
        title: string;
        description: string;
    };
    nav: {
        product: string;
        resources: string;
        pricing: string;
        contact: string;
        login: string;
        register: string;
        themeToggleLabel: string;
        openMenu: string;
        closeMenu: string;
        localeSwitch: string;
    };
    hero: {
        eyebrow: string;
        title: string[];
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
        watchVideo: string;
        moduleLabel: string;
        modules: Record<string, { name: string; tagline: string }>;
    };
    pinned: {
        sectionLabel: string;
        title: string;
        subtitle: string;
        steps: Array<{
            id: string;
            kicker: string;
            title: string;
            body: string;
        }>;
    };
    placeholders: {
        product: { label: string; title: string; body: string };
        resources: { label: string; title: string; body: string };
        pricing: {
            label: string;
            title: string;
            subtitle: string;
            plans: Array<{
                id: string;
                name: string;
                price: string;
                cadence: string;
                features: string[];
                cta: string;
                highlight?: boolean;
                footnote?: string;
            }>;
            footnotes: Array<{ id: string; text: string }>;
        };
        contact: { label: string; title: string; body: string; cta: string };
    };
    footer: {
        tagline: string;
        copyrightOwner: string;
        sections: Array<{ title: string; links: Array<{ label: string; href: string; soon?: boolean }> }>;
        notesTitle: string;
        legalLinks: Array<{ label: string; href: string }>;
        rights: string;
    };
    videoModal: {
        title: string;
        unavailable: string;
        close: string;
    };
    common: {
        soon: string;
        soonLabel: string;
        free: string;
        rmb: string;
    };
}

const zh: LandingCopy = {
    meta: {
        title: "Langhub · 你的法语全能私教，从今天开始用对方法",
        description:
            "Langhub 是一站式法语 AI 学习平台：写作、口语、听写、动词变位、词汇、表达短语，统统覆盖。AI 即时批改与陪练，让每一次练习都算数。",
    },
    nav: {
        product: "Product",
        resources: "Resources",
        pricing: "Pricing",
        contact: "Contact",
        login: "Login",
        register: "Start Free",
        themeToggleLabel: "切换浅色/深色主题",
        openMenu: "打开导航",
        closeMenu: "关闭导航",
        localeSwitch: "EN",
    },
    hero: {
        eyebrow: "",
        title: ["下一代 AI 驱动的", "语言学习与考试备考工具，", "为你定制。"],
        subtitle:
            "Langhub 安静、专注、一站式语言学习+备考工作台。",
        ctaPrimary: "Start Free",
        ctaSecondary: "先体验演示",
        watchVideo: "观看功能演示",
        moduleLabel: "实时演示",
        modules: {
            dashboard: { name: "学习总览", tagline: "根据 mock 数据展示今日练习和薄弱点" },
            writing: { name: "写作练习", tagline: "模拟真实编辑、提交与 AI 批改流程" },
            speaking: { name: "口语练习", tagline: "Marie 三轮对话、评估与示范朗读" },
            dictation: { name: "听写训练", tagline: "在真实 IA 中属于口语模块子功能" },
            conjugation: { name: "动词变位练习", tagline: "不规则动词测试与数据集创建" },
            vocabulary: { name: "词汇练习", tagline: "五种题型与词库管理演示" },
            aiProf: { name: "AI 学习助手", tagline: "禁用搜索，展示三篇学习笔记示例" },
            expressions: { name: "表达优化", tagline: "近义与反义表达轻量演示" },
        },
    },
    pinned: {
        sectionLabel: "Workflow",
        title: "一次练习，闭环掌握",
        subtitle: "看看 Langhub 如何用 AI 把「练 → 改 → 复习 → 再练」串成一个完整的学习循环。",
        steps: [
            {
                id: "step-1",
                kicker: "01 · 写下来",
                title: "在熟悉的写作环境中产出",
                body: "选择 DELF / TCF / 自由写作题目，按真实考试时间做答。所见即所得的编辑器，光标停下来 AI 就准备好了。",
            },
            {
                id: "step-2",
                kicker: "02 · AI 批改",
                title: "像真考官一样给到 4 个维度评分",
                body: "Langhub 的 AI 模仿 DELF 评分官，给出语法、语义、词汇、连贯性 4 维分数，并在原文上逐句标注修改建议。",
            },
            {
                id: "step-3",
                kicker: "03 · 抽成卡片",
                title: "把每一个错误，沉淀成你的私人题库",
                body: "AI 会把高频问题自动整理成学习卡片，分话题归档；下一次写作时再次出现，你已经知道该怎么写。",
            },
            {
                id: "step-4",
                kicker: "04 · 间隔复习",
                title: "用 SM-2 让记忆牢牢扎根",
                body: "卡片自动进入间隔复习队列，按掌握度推给你。听写、词汇、表达短语共享同一个进度算法，一通百通。",
            },
        ],
    },
    placeholders: {
        product: {
            label: "Product",
            title: "完整产品介绍即将上线",
            body: "我们正在打磨写作、口语、听写、动词变位、词汇、表达短语等模块的深度页面，敬请期待。",
        },
        resources: {
            label: "Resources",
            title: "学习资源中心建设中",
            body: "考试备考指南、AI 学习方法、语料库与公开课，会陆续在这里发布。",
        },
        pricing: {
            label: "Pricing",
            title: "选适合你的方案",
            subtitle: "全部方案都包含核心 AI 批改与陪练能力，按使用规模收费。",
            plans: [
                {
                    id: "free",
                    name: "免费",
                    price: "¥0",
                    cadence: "永久",
                    features: [
                        "基础动词变位 / 词汇 / 表达短语 练习",
                        "每月 1 次 AI 写作批改",
                        "每月 1 次 AI 口语陪练",
                        "公开词库与公共素材",
                    ],
                    cta: "免费试用",
                    footnote: "*²",
                },
                {
                    id: "pro",
                    name: "Pro",
                    price: "¥58",
                    cadence: "/ 月",
                    features: [
                        "无限次 AI 写作批改*¹",
                        "无限次 AI 口语陪练*¹",
                        "听写 AI 生成与音频上传",
                        "学习卡片 · 间隔复习算法",
                        "考试模式 · 倒计时与导出",
                    ],
                    cta: "升级 Pro",
                    highlight: true,
                    footnote: "*¹",
                },
                {
                    id: "team",
                    name: "Team / 教培",
                    price: "¥298",
                    cadence: "/ 月起",
                    features: [
                        "5 个学员席位起，按需扩容*³",
                        "教师后台：批量布置作业、查看作答",
                        "共享词库、共享听写、共享卡片",
                        "导出 DELF/TCF 风格批改报告",
                        "专属客服支持",
                    ],
                    cta: "联系销售",
                    footnote: "*³",
                },
            ],
            footnotes: [
                {
                    id: "*¹",
                    text: "「无限次」指在合理使用范围内（公平使用政策），单账号常规练习不限次数；如检测到自动化或滥用会进行限流。",
                },
                {
                    id: "*²",
                    text: "免费档位的 AI 批改使用基础模型，回复时间和详细程度可能与 Pro 档位略有差异。",
                },
                {
                    id: "*³",
                    text: "Team 起价为 5 席位 / 月，超出席位按 ¥58 / 席 · 月线性计费，年付可优惠，详情请联系销售。",
                },
            ],
        },
        contact: {
            label: "Contact",
            title: "想了解更多 / 谈合作？",
            body: "学校、机构、出海团队，都欢迎与我们聊聊。我们会在两个工作日内回复。",
            cta: "写邮件给我们",
        },
    },
    footer: {
        tagline: "把语言学习还给「练习」本身。",
        copyrightOwner: "Langhub",
        sections: [
            {
                title: "产品",
                links: [
                    { label: "写作", href: "#product" },
                    { label: "口语", href: "#product" },
                    { label: "听写", href: "#product" },
                    { label: "动词变位", href: "#product" },
                    { label: "词汇", href: "#product" },
                    { label: "表达短语", href: "#product" },
                ],
            },
            {
                title: "资源",
                links: [
                    { label: "DELF 备考", href: "#resources", soon: true },
                    { label: "TCF 备考", href: "#resources", soon: true },
                    { label: "AI 学习方法", href: "#resources", soon: true },
                    { label: "更新日志", href: "#resources", soon: true },
                ],
            },
            {
                title: "公司",
                links: [
                    { label: "定价", href: "#pricing" },
                    { label: "联系我们", href: "#contact" },
                    { label: "隐私协议", href: "#privacy" },
                    { label: "服务条款", href: "#terms" },
                ],
            },
        ],
        notesTitle: "脚注说明",
        legalLinks: [
            { label: "隐私协议", href: "#privacy" },
            { label: "服务条款", href: "#terms" },
        ],
        rights: "保留所有权利。",
    },
    videoModal: {
        title: "Langhub 90 秒演示",
        unavailable: "演示视频还在录制中，敬请期待。同时你可以直接点击「免费开始练习」体验真实产品。",
        close: "关闭",
    },
    common: {
        soon: "即将上线",
        soonLabel: "Soon",
        free: "免费",
        rmb: "¥",
    },
};

const en: LandingCopy = {
    meta: {
        title: "Langhub · The full-stack French tutor that practices with you",
        description:
            "Langhub is the all-in-one French AI learning platform: writing, speaking, dictation, conjugation, vocabulary, expressions. AI grading and live practice that make every session count.",
    },
    nav: {
        product: "Product",
        resources: "Resources",
        pricing: "Pricing",
        contact: "Contact",
        login: "Log in",
        register: "Try free",
        themeToggleLabel: "Toggle light/dark theme",
        openMenu: "Open navigation",
        closeMenu: "Close navigation",
        localeSwitch: "中",
    },
    hero: {
        eyebrow: "Your customized language learning agent is here",
        title: ["Next-gen AI-powered", "language learning & exam", "preparation tools, just for you."],
        subtitle:
            "Writing, speaking, dictation, conjugation, vocabulary, and expressions in one workspace. AI grades, corrects, and talks back, so every session moves the needle.",
        ctaPrimary: "Start practicing free",
        ctaSecondary: "See pricing",
        watchVideo: "Watch 90s demo",
        moduleLabel: "Live demo",
        modules: {
            dashboard: { name: "Dashboard", tagline: "See exactly what to practice today" },
            writing: { name: "Writing", tagline: "Graded like a real DELF examiner" },
            speaking: { name: "Speaking", tagline: "Talk anytime, the AI talks back" },
            dictation: { name: "Dictation", tagline: "Listen · Type · Diff in seconds" },
            conjugation: { name: "Conjugation", tagline: "Every B1/B2 tense, drilled" },
            vocabulary: { name: "Vocabulary", tagline: "SM-2 spaced review, sticks" },
            aiProf: { name: "AI Tutor", tagline: "One topic, fully explained" },
            expressions: { name: "Expressions", tagline: "Sound native, not textbook" },
        },
    },
    pinned: {
        sectionLabel: "Workflow",
        title: "One loop. Practice that compounds.",
        subtitle: "How Langhub turns practice → correction → review → re-practice into a closed loop powered by AI.",
        steps: [
            {
                id: "step-1",
                kicker: "01 · Write",
                title: "Produce in a real writing environment",
                body: "Pick DELF / TCF / freeform topics and write under exam-like timing. The moment your cursor pauses, the AI is ready.",
            },
            {
                id: "step-2",
                kicker: "02 · AI grading",
                title: "Examiner-style 4-axis feedback",
                body: "Langhub’s AI scores grammar, semantics, vocabulary and coherence and annotates your text line by line.",
            },
            {
                id: "step-3",
                kicker: "03 · Capture cards",
                title: "Turn every mistake into your private deck",
                body: "Frequent issues are auto-extracted into study cards, grouped by topic. Next time the same trap shows up, you’ll already know.",
            },
            {
                id: "step-4",
                kicker: "04 · Spaced review",
                title: "SM-2 scheduling locks it in",
                body: "Cards flow into a spaced-review queue. Dictation, vocabulary, and expressions share the same progress engine — learn one, you learn them all.",
            },
        ],
    },
    placeholders: {
        product: {
            label: "Product",
            title: "Full product tour coming soon",
            body: "Deep dives for writing, speaking, dictation, conjugation, vocabulary, and expressions are on the way.",
        },
        resources: {
            label: "Resources",
            title: "Resource hub in the works",
            body: "Exam prep guides, AI study methods, corpora and open lessons will land here.",
        },
        pricing: {
            label: "Pricing",
            title: "Pick what fits you",
            subtitle: "Every plan ships with the core AI grading and practice. You only pay for scale.",
            plans: [
                {
                    id: "free",
                    name: "Free",
                    price: "¥0",
                    cadence: "forever",
                    features: [
                        "Core conjugation / vocabulary / expressions practice",
                        "1 AI essay grading per month",
                        "1 AI speaking session per month",
                        "Public decks and shared materials",
                    ],
                    cta: "Get started free",
                    footnote: "*²",
                },
                {
                    id: "pro",
                    name: "Pro",
                    price: "¥58",
                    cadence: "/ month",
                    features: [
                        "Unlimited AI essay grading*¹",
                        "Unlimited AI speaking sessions*¹",
                        "Dictation AI generation + audio upload",
                        "Study cards with SM-2 spaced review",
                        "Exam mode with countdown and exports",
                    ],
                    cta: "Upgrade to Pro",
                    highlight: true,
                    footnote: "*¹",
                },
                {
                    id: "team",
                    name: "Team / Edu",
                    price: "¥298",
                    cadence: "/ mo from",
                    features: [
                        "Starts at 5 seats, scales as you grow*³",
                        "Teacher console: assign, review, export",
                        "Shared decks, dictations, study cards",
                        "DELF/TCF-style grading reports",
                        "Priority support",
                    ],
                    cta: "Talk to sales",
                    footnote: "*³",
                },
            ],
            footnotes: [
                { id: "*¹", text: "Unlimited follows fair-use policy: real practice is uncapped; automated abuse may be rate-limited." },
                { id: "*²", text: "Free tier uses our base AI model; response time and detail differ slightly from Pro." },
                { id: "*³", text: "Team starts at 5 seats / month. Extra seats are ¥58 / seat · month, with annual discounts available." },
            ],
        },
        contact: {
            label: "Contact",
            title: "Want a deeper look or partnership?",
            body: "Schools, institutes, global teams — we’d love to chat. We respond within two business days.",
            cta: "Email us",
        },
    },
    footer: {
        tagline: "Bring language learning back to practice itself.",
        copyrightOwner: "Langhub",
        sections: [
            {
                title: "Product",
                links: [
                    { label: "Writing", href: "#product" },
                    { label: "Speaking", href: "#product" },
                    { label: "Dictation", href: "#product" },
                    { label: "Conjugation", href: "#product" },
                    { label: "Vocabulary", href: "#product" },
                    { label: "Expressions", href: "#product" },
                ],
            },
            {
                title: "Resources",
                links: [
                    { label: "DELF prep", href: "#resources", soon: true },
                    { label: "TCF prep", href: "#resources", soon: true },
                    { label: "AI study methods", href: "#resources", soon: true },
                    { label: "Changelog", href: "#resources", soon: true },
                ],
            },
            {
                title: "Company",
                links: [
                    { label: "Pricing", href: "#pricing" },
                    { label: "Contact", href: "#contact" },
                    { label: "Privacy", href: "#privacy" },
                    { label: "Terms", href: "#terms" },
                ],
            },
        ],
        notesTitle: "Footnotes",
        legalLinks: [
            { label: "Privacy", href: "#privacy" },
            { label: "Terms", href: "#terms" },
        ],
        rights: "All rights reserved.",
    },
    videoModal: {
        title: "Langhub 90s demo",
        unavailable: "The demo video is still in production. Meanwhile try the real product with Start practicing free.",
        close: "Close",
    },
    common: {
        soon: "Coming soon",
        soonLabel: "Soon",
        free: "Free",
        rmb: "¥",
    },
};

export const LANDING_COPY: Record<Locale, LandingCopy> = { zh, en };
