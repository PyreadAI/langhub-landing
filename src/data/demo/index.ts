/**
 * Frontend-only marketing demo data.
 * Mirrors the real app IA from src/components/Layout.tsx, but never calls APIs.
 */

export type DemoModuleId =
    | "dashboard"
    | "writing"
    | "speaking"
    | "dictation"
    | "conjugation"
    | "vocabulary"
    | "aiProf"
    | "expressions";

export const DEMO_MODULE_ORDER: DemoModuleId[] = [
    "dashboard",
    "writing",
    "speaking",
    "dictation",
    "conjugation",
    "vocabulary",
    "expressions",
    "aiProf",
];

export const disabledDemoReason = "演示模式中不可用。注册后可使用完整功能。";

export const dashboardDemo = {
    learner: "Camille",
    learningLanguage: "Français",
    aiTokens: "2,480",
    stats: [
        { label: "本周练习", value: "7", hint: "次完整输出练习" },
        { label: "写作反馈", value: "18", hint: "条可复习错误" },
        { label: "口语流利度", value: "+12%", hint: "近 4 次对话" },
        { label: "词汇正确率", value: "84%", hint: "B1 高频词" },
    ],
    quickActions: [
        { id: "writing", title: "Writing Practice", desc: "完成一篇 DELF B1 作文并获得 AI 批改" },
        { id: "speaking", title: "Talk with AI", desc: "和 Marie 进行三轮 B1 口语对话" },
        { id: "vocabulary", title: "Vocabulary", desc: "复习上一轮出错的 B1 单词" },
        { id: "aiProf", title: "Ask AI Prof", desc: "阅读 3 篇保存的 AI 学习笔记" },
    ],
    weakPoints: ["主谓一致", "介词 à / de", "passé composé vs imparfait", "不规则动词 acquérir"],
};

export const writingDemo = {
    topic: "DELF B1 · Essai d’opinion",
    prompt: "DELF B1 写作练习：你认为社交媒体是否有助于学习外语？请说明你的观点并举例。",
    essay: `Je pense que les réseaux sociaux est très utile pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos court et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.\n\nCependant, il y a aussi des problèmes. Beaucoup de contenus ne sont pas correct et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des vidéos amusants, je n'améliore pas vraiment mon niveau.\n\nEn conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne remplace pas un vrai entraînement. Il est important de pratiquer écrire et parler, pas seulement lire ou écouter.`,
    corrections: [
        { original: "les réseaux sociaux est", corrected: "les réseaux sociaux sont", category: "accord sujet-verbe", note: "主语为复数，être 应为 sont。" },
        { original: "vidéos court", corrected: "vidéos courtes", category: "accord adjectif", note: "vidéos 为阴性复数。" },
        { original: "contenus ne sont pas correct", corrected: "contenus ne sont pas corrects", category: "accord adjectif", note: "correct 需要与 contenus 配合。" },
        { original: "vidéos amusants", corrected: "vidéos amusantes", category: "accord adjectif", note: "amusant 应为阴性复数。" },
        { original: "ils ne remplace pas", corrected: "ils ne remplacent pas", category: "conjugaison", note: "ils 对应第三人称复数。" },
        { original: "pratiquer écrire et parler", corrected: "s'entraîner à écrire et à parler", category: "structure", note: "更自然的表达是 s'entraîner à + infinitif。" },
    ],
    scores: [
        { key: "任务回应", value: 82 },
        { key: "语法", value: 68 },
        { key: "词汇", value: 76 },
        { key: "连贯", value: 80 },
        { key: "考试准备度", value: 74 },
    ],
    improved: `Je pense que les réseaux sociaux sont très utiles pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos courtes et écouter des personnes qui parlent naturellement.\n\nCependant, beaucoup de contenus ne sont pas toujours corrects, et on peut perdre beaucoup de temps. À mon avis, il faut utiliser les réseaux sociaux avec un objectif clair.\n\nEn conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne remplacent pas un vrai entraînement. Il est important de s'entraîner à écrire et à parler, pas seulement à lire ou à écouter.`,
    nextSteps: ["复习形容词阴阳性和单复数配合", "把 mais / cependant / en conclusion 用在更正式的位置", "下一次写作中尝试多使用 s'entraîner à + infinitif"],
};

export const speakingDemo = {
    topic: "DELF B1 口语：描述一次旅行，并说明你遇到的问题。",
    persona: "Marie",
    messages: [
        { role: "ai" as const, text: "Bonjour, tu prépares le DELF B1. Peux-tu me parler de ton dernier voyage ?" },
        { role: "user" as const, text: "Oui. Le mois dernier, je suis allé à Lyon avec deux amis. Nous avons visité beaucoup de musée et nous avons mangé dans un petit restaurant près de la rivière." },
        { role: "ai" as const, text: "Très bien. Est-ce qu'il y a eu un problème pendant ce voyage ?" },
        { role: "user" as const, text: "Oui, nous avons raté le train parce que nous sommes arrivé trop tard à la gare. Après, on doit acheter des nouveaux billets, et c'était un peu cher." },
        { role: "ai" as const, text: "Qu'est-ce que tu as appris de cette expérience ?" },
        { role: "user" as const, text: "J'ai appris qu'il faut préparer mieux le voyage. La prochaine fois, je vais vérifier les horaires avant partir et garder plus de temps pour aller à la gare." },
    ],
    corrections: [
        { original: "beaucoup de musée", corrected: "beaucoup de musées" },
        { original: "nous sommes arrivé", corrected: "nous sommes arrivés" },
        { original: "on doit acheter", corrected: "on a dû acheter" },
        { original: "des nouveaux billets", corrected: "de nouveaux billets" },
        { original: "préparer mieux", corrected: "mieux préparer" },
        { original: "avant partir", corrected: "avant de partir" },
    ],
    scores: [
        { key: "流利度", value: 78 },
        { key: "语法准确度", value: 70 },
        { key: "词汇", value: 74 },
        { key: "互动回应", value: 82 },
    ],
    modelAnswer: "La prochaine fois, je vais mieux préparer le voyage, vérifier les horaires avant de partir et arriver plus tôt à la gare.",
};

export const dictationDemo = {
    exercises: [
        {
            id: "a2",
            title: "Exemple A2 — Une matinée simple",
            level: "A2",
            source: "Example data",
            sentences: [
                "Je vais au marché le samedi matin.",
                "Ma sœur achète du pain et des fruits.",
                "Nous prenons le bus pour rentrer à la maison.",
                "Après le déjeuner, je lis un livre dans ma chambre.",
                "Le soir, nous préparons une soupe ensemble.",
            ],
        },
        {
            id: "b1",
            title: "Exemple B1 — Changer ses habitudes",
            level: "B1",
            source: "Example data",
            sentences: [
                "Depuis que j'ai commencé à apprendre le français, j'écoute un court podcast chaque matin.",
                "Au début, je comprenais seulement quelques mots, mais je notais les expressions importantes.",
                "Cette habitude m'aide à reconnaître les sons et à mémoriser du vocabulaire.",
                "Quand une phrase est difficile, je la répète plusieurs fois à voix haute.",
                "Après quelques semaines, j'ai senti que je suivais mieux les conversations simples.",
            ],
        },
    ],
};

export const conjugationDemo = {
    datasetName: "Irregular French Verbs · Example Dataset",
    verbs: [
        { verb: "acquérir", tense: "présent", prompt: "nous", answer: "acquérons", user: "acquerons", fixed: "acquérons" },
        { verb: "transmettre", tense: "passé composé", prompt: "ils", answer: "ont transmis", user: "ont transmetté", fixed: "ont transmis" },
        { verb: "apercevoir", tense: "futur simple", prompt: "je", answer: "apercevrai", user: "apercevoirai", fixed: "apercevrai" },
    ],
    createDataset: {
        name: "Verbes utiles pour DELF B1",
        typed: ["acquérir", "transmettre", "appercevoir"],
        corrected: ["acquérir", "transmettre", "apercevoir"],
        note: "系统已识别一个拼写错误，并将 apppercevoir/appercevoir 修正为 apercevoir。你可以继续编辑后再开始练习。",
    },
};

export const vocabularyDemo = {
    words: [
        { type: "Recall", prompt: "习惯于", answer: "s'habituer à", user: "s'habituer à", ok: true },
        { type: "Multiple Choice", prompt: "un enjeu", answer: "重要问题 / 关键议题", user: "工作机会", ok: false },
        { type: "Fill in the Blank", prompt: "Il veut ______ son niveau de français.", answer: "améliorer", user: "améliorer", ok: true },
        { type: "Noun Gender", prompt: "confiance", answer: "la confiance", user: "le confiance", ok: false },
        { type: "Prioritize Previous Errors", prompt: "malgré", answer: "尽管", user: "尽管", ok: true },
    ],
    banks: [
        { name: "DELF B1 Example Data Bank — not an official vocabulary list", exam: "DELF B1", words: 120, type: "Public example" },
        { name: "TEF A1 Example Data Bank — not an official vocabulary list", exam: "TEF A1", words: 80, type: "Public example" },
    ],
    createBank: {
        name: "Mon français quotidien",
        typed: ["s'améliorer", "un logement", "indepandant"],
        corrected: ["s'améliorer", "un logement", "indépendant"],
        definitionsZh: [
            "s'améliorer：变得更好，提高自己。",
            "un logement：住房，住所。",
            "indépendant：独立的，自主的。",
        ],
    },
};

export const aiProfDemo = {
    notes: [
        {
            id: "a-de",
            title: "形容词后什么时候接 à，什么时候接 de + infinitif？",
            body: "很多形容词后面可以接不定式，但介词选择并不随机。一般来说，de 常用于表达主观判断或评价，例如 Il est important de réviser。à 常用于表达某事的性质、难度或使用方式，例如 Ce texte est difficile à comprendre。",
            level: "B1/B2",
        },
        {
            id: "penser",
            title: "penser à 和 penser de 为什么不是一个意思？",
            body: "penser à quelqu'un / quelque chose 表示想到、考虑到某人或某事；penser de quelque chose 表示对某事的看法。Je pense à cet examen 和 Qu'est-ce que tu penses de cet examen ? 不是同一个问题。",
            level: "A2/B1",
        },
        {
            id: "pc-imp",
            title: "passé composé 和 imparfait：不只是“短动作”和“长动作”",
            body: "passé composé 更常用于推动事件发展，imparfait 更常用于背景、状态、习惯或描述。理解它们的叙事功能，比只记“短动作/长动作”更可靠。",
            level: "B1",
        },
    ],
};

export const expressionsDemo = {
    similar: [
        { phrase: "améliorer", meaning: "最通用，表示改善、提高。" },
        { phrase: "perfectionner", meaning: "强调进一步完善，常用于技能。" },
        { phrase: "renforcer", meaning: "强调加强已有能力或信心。" },
        { phrase: "faire des progrès", meaning: "强调取得进步，适合描述学习过程。" },
    ],
    opposite: ["augmenter ↔ diminuer", "réussir ↔ échouer", "accepter ↔ refuser"],
};
