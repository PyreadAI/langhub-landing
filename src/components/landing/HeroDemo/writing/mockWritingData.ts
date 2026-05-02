import type { Locale } from "@/lib/locale";
import type { MockWritingPractice, MockEssayRow } from "./mockWritingTypes";

/* ═══════════════════════════════════════════════════════════════════
   Essay texts
   ═══════════════════════════════════════════════════════════════════ */

const ESSAY_TEXT = `Je pense que les réseaux sociaux est très utile pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos court et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.

Cependant, il y a aussi des problèmes. Beaucoup de contenus ne sont pas correct et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des vidéos amusants, je n'améliore pas vraiment mon niveau.

En conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne remplace pas un vrai entraînement. Il est important de pratiquer écrire et parler, pas seulement lire ou écouter.`;

/**
 * Annotated original essay for Diagnostic ColumnGroup.
 * Error highlights use data-annotation-id matching diagnosticNotes[].id.
 */
const ESSAY_ANNOTATED = `Je pense que <mark class="mw-ann mw-ann-error" data-annotation-id="d1">les réseaux sociaux est</mark> très <mark class="mw-ann mw-ann-error" data-annotation-id="d2">utile</mark> pour apprendre une langue étrangère. D'abord, on peut regarder des <mark class="mw-ann mw-ann-error" data-annotation-id="d3">vidéos court</mark> et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.

Cependant, il y a aussi des problèmes. Beaucoup de <mark class="mw-ann mw-ann-error" data-annotation-id="d4">contenus ne sont pas correct</mark> et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des <mark class="mw-ann mw-ann-error" data-annotation-id="d5">vidéos amusants</mark>, je n'améliore pas vraiment mon niveau.

En conclusion, les réseaux sociaux peuvent aider les étudiants, mais <mark class="mw-ann mw-ann-error" data-annotation-id="d6">ils ne remplace pas</mark> un vrai entraînement. Il est important de <mark class="mw-ann mw-ann-improvement" data-annotation-id="d7">pratiquer écrire et parler</mark>, pas seulement <mark class="mw-ann mw-ann-improvement" data-annotation-id="d8">lire ou écouter</mark>.`;

/** Legacy corrected essay with simple green highlights */
const CORRECTED_ESSAY = `Je pense que les réseaux sociaux <span class="mw-fix">sont</span> très <span class="mw-fix">utiles</span> pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos <span class="mw-fix">courtes</span> et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.

Cependant, il y a aussi des problèmes. Beaucoup de contenus ne sont pas <span class="mw-fix">corrects</span> et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des vidéos <span class="mw-fix">amusantes</span>, je n'améliore pas vraiment mon niveau.

En conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne <span class="mw-fix">remplacent</span> pas un vrai entraînement. Il est important de <span class="mw-fix">s'entraîner à écrire et à parler</span>, pas seulement <span class="mw-fix">à</span> lire ou <span class="mw-fix">à</span> écouter.`;

/**
 * Annotated corrected essay for Correction ColumnGroup.
 * Uses highlight (amber) for corrections, keypoint (purple) for key improvements.
 */
const CORRECTED_ESSAY_ANNOTATED = `Je pense que les réseaux sociaux <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn1">sont</mark> très <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn2">utiles</mark> pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn3">courtes</mark> et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.

Cependant, il y a aussi des problèmes. Beaucoup de contenus ne sont pas <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn4">corrects</mark> et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des vidéos <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn5">amusantes</mark>, je n'améliore pas vraiment mon niveau.

En conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn6">remplacent</mark> pas un vrai entraînement. Il est important de <mark class="mw-ann mw-ann-keypoint" data-annotation-id="cn7">s'entraîner à écrire et à parler</mark>, pas seulement <mark class="mw-ann mw-ann-highlight" data-annotation-id="cn8">à lire ou à écouter</mark>.`;

const MODEL_ESSAY = `De nos jours, les réseaux sociaux occupent une place importante dans notre vie quotidienne, et beaucoup de personnes les utilisent pour apprendre une langue étrangère. Mais sont-ils vraiment efficaces pour progresser en français ?

D'une part, les réseaux sociaux offrent un accès facile à des contenus authentiques. On peut regarder des vidéos courtes, écouter des podcasts et lire des publications de locuteurs natifs. De plus, les interactions spontanées — par exemple, commenter un post ou répondre à un message — permettent de pratiquer la langue dans un contexte réel.

D'autre part, il existe certains risques. Les contenus ne sont pas toujours fiables sur le plan linguistique, et le temps passé sur les réseaux peut facilement devenir improductif si l'on n'a pas d'objectif précis.

En conclusion, les réseaux sociaux peuvent constituer un complément utile à l'apprentissage du français, à condition de les utiliser de manière ciblée et de ne pas négliger un entraînement structuré, notamment à l'écrit et à l'oral.`;

/**
 * Annotated model essay for Model Writing ColumnGroup.
 * Keypoint (purple) for rhetorical/structural techniques.
 */
const MODEL_ESSAY_ANNOTATED = `<mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn1">De nos jours</mark>, les réseaux sociaux occupent une place importante dans notre vie quotidienne, et beaucoup de personnes les utilisent pour apprendre une langue étrangère. <mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn2">Mais sont-ils vraiment efficaces</mark> pour progresser en français ?

<mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn3">D'une part</mark>, les réseaux sociaux offrent un accès facile à des <mark class="mw-ann mw-ann-improvement" data-annotation-id="pn4">contenus authentiques</mark>. On peut regarder des vidéos courtes, écouter des podcasts et lire des publications de locuteurs natifs. De plus, <mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn5">les interactions spontanées</mark> — par exemple, commenter un post ou répondre à un message — permettent de <mark class="mw-ann mw-ann-improvement" data-annotation-id="pn6">pratiquer la langue dans un contexte réel</mark>.

<mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn7">D'autre part</mark>, il existe certains risques. Les contenus ne sont pas toujours <mark class="mw-ann mw-ann-improvement" data-annotation-id="pn8">fiables sur le plan linguistique</mark>, et le temps passé sur les réseaux peut facilement devenir improductif si l'on n'a pas d'objectif précis.

En conclusion, les réseaux sociaux peuvent constituer un <mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn9">complément utile à l'apprentissage</mark> du français, <mark class="mw-ann mw-ann-keypoint" data-annotation-id="pn10">à condition de les utiliser de manière ciblée</mark> et de ne pas négliger un entraînement structuré, notamment à l'écrit et à l'oral.`;

/* ═══════════════════════════════════════════════════════════════════
   Main mock data
   ═══════════════════════════════════════════════════════════════════ */

export const MOCK_PRACTICE_EN: MockWritingPractice = {
    id: 42,
    title: "DELF B1 · Essai d'opinion",
    examType: "DELF B1",
    targetStandard: "CEFR",
    targetLevel: "B1",
    examTask: "Essai d'opinion",
    wordLimit: 180,
    writingPrompt:
        "Vous pensez que les réseaux sociaux sont utiles pour apprendre une langue étrangère ? Exprimez votre opinion en donnant des exemples concrets. (160–180 mots)",
    aiModel: "DeepSeek V3.2",
    status: "graded",
    wordCount: 156,
    essay: ESSAY_TEXT,
    essayAnnotated: ESSAY_ANNOTATED,
    corrections: [
        { id: "c1", original: "les réseaux sociaux est", corrected: "les réseaux sociaux sont", category: "Subject-verb agreement", note: "The subject 'les réseaux sociaux' is plural; use 'sont' instead of 'est'.", severity: "error" },
        { id: "c2", original: "vidéos court", corrected: "vidéos courtes", category: "Adjective agreement", note: "'vidéos' is feminine plural; the adjective must be 'courtes'.", severity: "error" },
        { id: "c3", original: "contenus ne sont pas correct", corrected: "contenus ne sont pas corrects", category: "Adjective agreement", note: "'correct' must agree with the masculine plural 'contenus'.", severity: "error" },
        { id: "c4", original: "vidéos amusants", corrected: "vidéos amusantes", category: "Adjective agreement", note: "'amusant' should be feminine plural 'amusantes' to match 'vidéos'.", severity: "error" },
        { id: "c5", original: "ils ne remplace pas", corrected: "ils ne remplacent pas", category: "Conjugation", note: "'ils' requires the third-person plural form 'remplacent'.", severity: "error" },
        { id: "c6", original: "pratiquer écrire et parler", corrected: "s'entraîner à écrire et à parler", category: "Expression", note: "Use 's'entraîner à + infinitive' for more natural phrasing.", severity: "improvement" },
    ],

    /* ── Diagnostic tab ── */
    diagnostic: {
        targetLevel: "B1",
        estimatedLevel: "B1−",
        levelRange: "A2+ – B1",
        rationale: "The text demonstrates a solid grasp of basic argumentative structure with appropriate connectors (D'abord, Cependant, En conclusion). However, frequent adjective agreement errors and a subject-verb mismatch place the overall performance at the lower end of B1.",
        summary:
            "The essay addresses the prompt clearly, presenting a structured opinion with supporting examples. The main weaknesses lie in adjective gender/number agreement and one subject-verb mismatch. Vocabulary is adequate but lacks the variety expected for a strong B1.",
        strengths: [
            "Clear opinion stated from the opening sentence.",
            "Logical paragraph structure (introduction → argument → counterargument → conclusion).",
            "Good use of connectors: D'abord, Cependant, En conclusion.",
            "Personal experience cited as supporting evidence.",
        ],
        warnings: [
            "Frequent adjective agreement errors (court → courtes, correct → corrects, amusants → amusantes).",
            "Subject-verb mismatch: 'les réseaux sociaux est' → 'sont'.",
            "Missing conjugation: 'ils ne remplace' → 'remplacent'.",
            "Unnatural expression: 'pratiquer écrire' → 's'entraîner à écrire'.",
        ],
        tips: [
            "Review demonstrative and indefinite pronouns (celles-ci, d'autres).",
            "Pay attention to gender and number agreement, especially with complex noun phrases.",
            "After finishing your essay, do a dedicated pass checking every adjective against its noun.",
            "Build richer connector vocabulary: en revanche, par ailleurs, toutefois.",
        ],
    },
    diagnosticNotes: [
        { id: "d1", headline: "Subject-verb agreement", detail: "'les réseaux sociaux est' → 'sont'. The plural subject requires a plural verb.", severity: "error" },
        { id: "d2", headline: "Adjective agreement", detail: "'utile' should be 'utiles' to agree with the plural subject 'les réseaux sociaux'.", severity: "error" },
        { id: "d3", headline: "Adjective agreement", detail: "'court' → 'courtes'. 'vidéos' is feminine plural.", severity: "error" },
        { id: "d4", headline: "Adjective agreement", detail: "'correct' → 'corrects'. 'contenus' is masculine plural.", severity: "error" },
        { id: "d5", headline: "Adjective agreement", detail: "'amusants' → 'amusantes'. Must match the feminine plural 'vidéos'.", severity: "error" },
        { id: "d6", headline: "Conjugation error", detail: "'remplace' → 'remplacent'. Third-person plural conjugation required.", severity: "error" },
        { id: "d7", headline: "Style improvement", detail: "'pratiquer écrire et parler' is awkward. Use 's'entraîner à écrire et à parler' for more natural phrasing.", severity: "improvement" },
        { id: "d8", headline: "Missing preposition", detail: "Add 'à' before 'lire ou écouter' to complete the parallel structure with 's'entraîner à'.", severity: "improvement" },
    ],

    correctedEssay: CORRECTED_ESSAY,
    correctedEssayAnnotated: CORRECTED_ESSAY_ANNOTATED,
    modelEssay: MODEL_ESSAY,
    modelEssayAnnotated: MODEL_ESSAY_ANNOTATED,
    modelEssayLevel: "B1 / B1+",
    modelTips: [
        "Use a formal opening: De nos jours…",
        "Replace D'abord / Cependant with D'une part / D'autre part for clearer structure.",
        "Add a conditional conclusion: à condition de…",
        "Enrich vocabulary: fiables, improductif, ciblée, structuré.",
    ],
    nextSteps: [
        "Review feminine/masculine adjective agreement rules.",
        "Practice using mais / cependant / en conclusion in more formal positions.",
        "Try using s'entraîner à + infinitive in your next essay.",
    ],
    ttsTitle: "Read corrected version aloud",

    /* ── Correction tab — EvalMetaSection + AI Notes ── */
    correctionMeta: {
        summary:
            "The corrected version resolves all grammar errors while preserving the original argument structure. Adjective agreements and the subject-verb mismatch have been fixed, and the closing expression uses a more natural construction.",
        rationale: "With corrections applied, the text now demonstrates consistent B1-level accuracy in grammar and expression.",
        levelLabel: "B1",
        levelEstimated: "B1",
        levelRange: "A2+ – B1",
        infoItems: [
            "Good structure with a clear introduction and personal stance.",
            "Arguments are well-developed and relevant to the prompt.",
        ],
        tipItems: [
            "Pay attention to the correct usage of indefinite pronouns like 'd'autres'.",
            "Ensure correct prepositions in fixed expressions (e.g., 'sur le plan' instead of 'selon le plan').",
        ],
        extraSections: [
            {
                title: "Topic Expressions for Your Level",
                calloutType: "tip",
                lines: [
                    { text: "Topic: Social media and language learning", isBold: true },
                    { text: "Vocabulary", isBold: true },
                    { text: "• l'apprentissage en autonomie — self-directed learning" },
                    { text: "• les contenus authentiques — authentic content" },
                    { text: "• la maîtrise de la langue — language proficiency" },
                    { text: "Useful Phrases", isBold: true },
                    { text: "• Il est indéniable que… — It is undeniable that…" },
                    { text: "• Trouver un juste milieu — To find a happy medium" },
                    { text: "• Être une arme à double tranchant — To be a double-edged sword" },
                ],
            },
        ],
    },
    correctionNotes: [
        { id: "cn1", headline: "Subject-verb fixed", detail: "'est' → 'sont'. Plural subject requires plural verb form.", severity: "highlight" },
        { id: "cn2", headline: "Adjective agreement fixed", detail: "'utile' → 'utiles'. Now agrees with the plural subject.", severity: "highlight" },
        { id: "cn3", headline: "Adjective agreement fixed", detail: "'court' → 'courtes'. Matches feminine plural 'vidéos'.", severity: "highlight" },
        { id: "cn4", headline: "Adjective agreement fixed", detail: "'correct' → 'corrects'. Matches masculine plural 'contenus'.", severity: "highlight" },
        { id: "cn5", headline: "Adjective agreement fixed", detail: "'amusants' → 'amusantes'. Matches feminine plural 'vidéos'.", severity: "highlight" },
        { id: "cn6", headline: "Conjugation fixed", detail: "'remplace' → 'remplacent'. Third-person plural form restored.", severity: "highlight" },
        { id: "cn7", headline: "Expression refined", detail: "'pratiquer écrire' → 's'entraîner à écrire et à parler'. More natural B1-level construction.", severity: "keypoint" },
        { id: "cn8", headline: "Preposition added", detail: "Added 'à' before 'lire ou écouter' for parallel structure consistency.", severity: "highlight" },
    ],

    /* ── Model Writing tab — EvalMetaSection + AI Notes ── */
    polishedMeta: {
        summary:
            "This model essay demonstrates how to address the same topic with stronger rhetorical structure, richer vocabulary, and more sophisticated argumentation at a B1+ level.",
        rationale: "The model version employs balanced D'une part / D'autre part structure, a rhetorical question, and a nuanced conditional conclusion — all hallmarks of confident B1+ writing.",
        levelLabel: "B1+",
        levelEstimated: "B1+",
        levelRange: "B1 – B1+",
        infoItems: [
            "Formal opening 'De nos jours' sets an academic tone.",
            "D'une part / D'autre part creates balanced contrast.",
            "Rhetorical question engages the reader.",
            "Richer vocabulary: fiables, improductif, ciblée, structuré.",
        ],
        tipItems: [
            "Use structured connectors like 'D'une part' and 'D'autre part' to contrast ideas clearly.",
            "When responding to specific documents, reference the themes presented before expanding on your opinion.",
            "'À condition de' adds nuance to a conditional conclusion.",
            "Nominalization (l'apprentissage instead of apprendre) elevates register.",
        ],
        extraSections: [
            {
                title: "TASK RELEVANCE",
                calloutType: "info",
                lines: [
                    { text: "The model essay directly addresses the prompt by presenting a clear personal opinion with balanced arguments. The student's original essay had a clear stance but could improve its referencing of the prompt topic and use more varied argumentation strategies." },
                ],
            },
        ],
    },
    polishedNotes: [
        { id: "pn1", headline: "Formal opening", detail: "'De nos jours' is a standard formal opener for opinion essays — sets an academic register.", severity: "keypoint" },
        { id: "pn2", headline: "Rhetorical question", detail: "'Mais sont-ils vraiment efficaces?' draws the reader in and introduces the essay's central debate.", severity: "keypoint" },
        { id: "pn3", headline: "Structural connector", detail: "'D'une part' introduces the first argument; pairs with 'D'autre part' for balanced structure.", severity: "keypoint" },
        { id: "pn4", headline: "Enriched vocabulary", detail: "'contenus authentiques' is more precise and academic than 'contenus corrects'.", severity: "improvement" },
        { id: "pn5", headline: "Advanced expression", detail: "'les interactions spontanées' demonstrates confident nominalization — a B1+ feature.", severity: "keypoint" },
        { id: "pn6", headline: "Contextualization", detail: "'pratiquer la langue dans un contexte réel' — concrete, specific phrasing strengthens the argument.", severity: "improvement" },
        { id: "pn7", headline: "Balancing connector", detail: "'D'autre part' introduces the counterargument, maintaining logical coherence.", severity: "keypoint" },
        { id: "pn8", headline: "Register elevation", detail: "'fiables sur le plan linguistique' — formal register appropriate for B1+ opinion essays.", severity: "improvement" },
        { id: "pn9", headline: "Synthetic conclusion", detail: "'complément utile à l'apprentissage' effectively summarizes the main thesis.", severity: "keypoint" },
        { id: "pn10", headline: "Conditional nuance", detail: "'à condition de les utiliser de manière ciblée' — adds a thoughtful condition to the conclusion.", severity: "keypoint" },
    ],
};

/* ═══════════════════════════════════════════════════════════════════
   Essay library rows
   ═══════════════════════════════════════════════════════════════════ */

export const MOCK_ESSAY_ROWS: MockEssayRow[] = [
    { id: 42, title: "Les réseaux sociaux et l'apprentissage", examType: "DELF B1", status: "graded", wordCount: 156, createdAt: "2026-04-25" },
    { id: 41, title: "Mon expérience de voyage à Lyon", examType: "DELF B1", status: "graded", wordCount: 172, createdAt: "2026-04-22" },
    { id: 40, title: "L'importance de la lecture", examType: "DELF B2", status: "draft", wordCount: 89, createdAt: "2026-04-20" },
    { id: 39, title: "Le rôle de la technologie dans l'éducation", examType: "TEF", status: "in_progress", wordCount: 134, createdAt: "2026-04-18" },
    { id: 38, title: "Ma routine quotidienne", examType: "DELF A2", status: "graded", wordCount: 110, createdAt: "2026-04-15" },
];

export const MOCK_PRACTICE_ZH: MockWritingPractice = {
    ...MOCK_PRACTICE_EN,
    title: "DELF B1 · 观点写作",
    examTask: "观点写作",
    writingPrompt:
        "你认为社交媒体有助于学习外语吗？请结合具体例子表达你的观点。（160–180 词）",
    corrections: [
        { id: "c1", original: "les réseaux sociaux est", corrected: "les réseaux sociaux sont", category: "主谓一致", note: "主语 'les réseaux sociaux' 为复数，动词应使用 'sont'。", severity: "error" },
        { id: "c2", original: "vidéos court", corrected: "vidéos courtes", category: "形容词配合", note: "'vidéos' 为阴性复数，形容词应为 'courtes'。", severity: "error" },
        { id: "c3", original: "contenus ne sont pas correct", corrected: "contenus ne sont pas corrects", category: "形容词配合", note: "'correct' 需要与阳性复数 'contenus' 保持一致。", severity: "error" },
        { id: "c4", original: "vidéos amusants", corrected: "vidéos amusantes", category: "形容词配合", note: "'amusant' 应与阴性复数 'vidéos' 一致为 'amusantes'。", severity: "error" },
        { id: "c5", original: "ils ne remplace pas", corrected: "ils ne remplacent pas", category: "动词变位", note: "'ils' 对应第三人称复数变位 'remplacent'。", severity: "error" },
        { id: "c6", original: "pratiquer écrire et parler", corrected: "s'entraîner à écrire et à parler", category: "表达自然度", note: "更自然表达是 's'entraîner à + 不定式'。", severity: "improvement" },
    ],
    diagnostic: {
        targetLevel: "B1",
        estimatedLevel: "B1−",
        levelRange: "A2+ – B1",
        rationale:
            "文章结构完整，能够表达清晰观点并使用基础连接词（D'abord, Cependant, En conclusion）。但形容词配合错误较多，且存在主谓一致问题，因此综合水平位于 B1 低段。",
        summary:
            "这篇文章较好回应了题目，观点明确且有例证支撑。主要短板在于阴阳性/单复数配合和个别动词变位，词汇可用但多样性不足。",
        strengths: [
            "开头明确表达个人立场。",
            "段落结构清晰（开场 → 论证 → 反面因素 → 结论）。",
            "连接词使用合理：D'abord、Cependant、En conclusion。",
            "能结合个人经验支撑观点。",
        ],
        warnings: [
            "形容词配合错误频繁（court → courtes, correct → corrects, amusants → amusantes）。",
            "主谓一致错误：'les réseaux sociaux est' 应为 'sont'。",
            "动词变位错误：'ils ne remplace' 应为 'remplacent'。",
            "表达不够自然：'pratiquer écrire' 建议改为 's'entraîner à écrire'。",
        ],
        tips: [
            "复习形容词阴阳性与单复数配合规则。",
            "写完后单独进行一轮“形容词检查”。",
            "扩展更正式的连接词：en revanche、par ailleurs、toutefois。",
            "练习固定搭配：s'entraîner à + infinitif。",
        ],
    },
    diagnosticNotes: [
        { id: "d1", headline: "主谓一致", detail: "'les réseaux sociaux est' 应改为 'sont'，复数主语要配复数动词。", severity: "error" },
        { id: "d2", headline: "形容词配合", detail: "'utile' 应改为 'utiles'，与复数主语保持一致。", severity: "error" },
        { id: "d3", headline: "形容词配合", detail: "'court' 应改为 'courtes'，'vidéos' 为阴性复数。", severity: "error" },
        { id: "d4", headline: "形容词配合", detail: "'correct' 应改为 'corrects'，与阳性复数 'contenus' 一致。", severity: "error" },
        { id: "d5", headline: "形容词配合", detail: "'amusants' 应改为 'amusantes'，与 'vidéos' 配合。", severity: "error" },
        { id: "d6", headline: "动词变位", detail: "'remplace' 应改为 'remplacent'，第三人称复数。", severity: "error" },
        { id: "d7", headline: "表达优化", detail: "'pratiquer écrire et parler' 不够自然，建议 's'entraîner à écrire et à parler'。", severity: "improvement" },
        { id: "d8", headline: "介词补充", detail: "在 'lire ou écouter' 前补充 'à'，保持并列结构一致。", severity: "improvement" },
    ],
    modelEssayLevel: "B1 / B1+",
    modelTips: [
        "使用更正式的开场：De nos jours…",
        "使用 D'une part / D'autre part 提升结构清晰度。",
        "结尾加入条件表达：à condition de…",
        "扩展词汇：fiables、improductif、ciblée、structuré。",
    ],
    nextSteps: [
        "集中复习阴阳性与单复数配合。",
        "训练更正式的连接词位置与句法。",
        "下一篇作文中主动使用 s'entraîner à + infinitif。",
    ],
    ttsTitle: "朗读批改后版本",
    correctionMeta: {
        summary:
            "批改版本在保留原有观点结构的同时修复了主要语法问题，形容词配合和主谓一致均已纠正，结尾表达也更自然。",
        rationale: "修正后文本整体准确度稳定在 B1 水平。",
        levelLabel: "B1",
        levelEstimated: "B1",
        levelRange: "A2+ – B1",
        infoItems: [
            "文章结构完整，立场明确。",
            "论据与题目相关，表达基本连贯。",
        ],
        tipItems: [
            "继续巩固代词与形容词配合。",
            "注意固定搭配中的介词位置。",
        ],
        extraSections: [
            {
                title: "本题可复用表达",
                calloutType: "tip",
                lines: [
                    { text: "主题：社交媒体与语言学习", isBold: true },
                    { text: "词汇建议", isBold: true },
                    { text: "• l'apprentissage en autonomie — 自主学习" },
                    { text: "• les contenus authentiques — 真实语料" },
                    { text: "• la maîtrise de la langue — 语言掌握度" },
                    { text: "句型建议", isBold: true },
                    { text: "• Il est indéniable que… — 不可否认的是…" },
                    { text: "• Trouver un juste milieu — 找到平衡点" },
                    { text: "• Être une arme à double tranchant — 是一把双刃剑" },
                ],
            },
        ],
    },
    correctionNotes: [
        { id: "cn1", headline: "主谓一致已修正", detail: "'est' → 'sont'，复数主语使用复数动词。", severity: "highlight" },
        { id: "cn2", headline: "配合已修正", detail: "'utile' → 'utiles'，与复数主语一致。", severity: "highlight" },
        { id: "cn3", headline: "配合已修正", detail: "'court' → 'courtes'，匹配阴性复数。", severity: "highlight" },
        { id: "cn4", headline: "配合已修正", detail: "'correct' → 'corrects'，匹配阳性复数。", severity: "highlight" },
        { id: "cn5", headline: "配合已修正", detail: "'amusants' → 'amusantes'，匹配阴性复数。", severity: "highlight" },
        { id: "cn6", headline: "变位已修正", detail: "'remplace' → 'remplacent'，第三人称复数。", severity: "highlight" },
        { id: "cn7", headline: "表达更自然", detail: "将原表达改为 's'entraîner à écrire et à parler'，更符合 B1 写作语感。", severity: "keypoint" },
        { id: "cn8", headline: "结构更完整", detail: "补充介词 'à'，并列结构更一致。", severity: "highlight" },
    ],
    polishedMeta: {
        summary:
            "范文版本展示了更强的论证结构与更高密度的有效表达，适合作为 B1+ 写作参考。",
        rationale:
            "该版本使用了 D'une part / D'autre part 平衡结构、反问句和条件结论，体现了更成熟的写作组织能力。",
        levelLabel: "B1+",
        levelEstimated: "B1+",
        levelRange: "B1 – B1+",
        infoItems: [
            "正式开场（De nos jours）提升文本语域。",
            "对比结构（D'une part / D'autre part）更清晰。",
            "词汇更精准：fiables、improductif、ciblée、structuré。",
        ],
        tipItems: [
            "用平衡连接词组织观点对比。",
            "在结论中使用条件句增强深度（à condition de）。",
            "适度名词化表达可提升文本正式度。",
        ],
        extraSections: [
            {
                title: "任务相关性",
                calloutType: "info",
                lines: [
                    { text: "范文保持了对题目核心问题的直接回应，并通过正反论证形成完整闭环。你的原文立场明确，但论证层次与表达密度仍有提升空间。" },
                ],
            },
        ],
    },
    polishedNotes: [
        { id: "pn1", headline: "正式开场", detail: "'De nos jours' 是观点写作常用的正式开场。", severity: "keypoint" },
        { id: "pn2", headline: "反问引入", detail: "反问句用于引出核心争议点，提升读者参与感。", severity: "keypoint" },
        { id: "pn3", headline: "结构连接", detail: "'D'une part' 与 'D'autre part' 形成平衡对照结构。", severity: "keypoint" },
        { id: "pn4", headline: "词汇升级", detail: "'contenus authentiques' 比原表达更准确、更学术。", severity: "improvement" },
        { id: "pn5", headline: "表达升级", detail: "'les interactions spontanées' 体现更高层级的名词化表达。", severity: "keypoint" },
        { id: "pn6", headline: "语境化表达", detail: "将练习场景具体化，论证更有说服力。", severity: "improvement" },
        { id: "pn7", headline: "反向论证", detail: "通过 'D'autre part' 引入风险，结构更完整。", severity: "keypoint" },
        { id: "pn8", headline: "语域提升", detail: "'fiables sur le plan linguistique' 语域更正式。", severity: "improvement" },
        { id: "pn9", headline: "结论凝练", detail: "结论句对核心观点进行了有效收束。", severity: "keypoint" },
        { id: "pn10", headline: "条件表达", detail: "使用 'à condition de' 增加结论的层次与谨慎性。", severity: "keypoint" },
    ],
};

export function getMockPracticeByLocale(locale: Locale): MockWritingPractice {
    return locale === "en" ? MOCK_PRACTICE_EN : MOCK_PRACTICE_ZH;
}
