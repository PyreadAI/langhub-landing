import type { MockSpeakingSession } from "./mockSpeakingTypes";

export const MOCK_SPEAKING_SESSION: MockSpeakingSession = {
    id: 7,
    personaName: "Marie",
    personaGender: "female",
    topic: "Aller au travail en vélo",
    targetLevel: "B1",
    targetStandard: "CEFR",
    aiModel: "Gemini 3.1 Pro",
    maxRounds: 3,

    messages: [
        {
            id: "r1-user",
            round: 1,
            role: "user",
            text: "Bonjour, est-ce que c'est une bonne idée d'aller au travail en vélo ?",
            audioUrl: "/audio/speaking/r1-user.mp3",
            durationMs: 6800,
        },
        {
            id: "r1-ai",
            round: 1,
            role: "assistant",
            text: "Bonjour ! C'est une excellente question. Personnellement, je trouve que c'est une très bonne idée — c'est bénéfique pour la santé et écologique. En plus, ça permet souvent d'éviter les embouteillages. Et vous, qu'en pensez-vous ?",
            audioUrl: "/audio/speaking/r1-ai.mp3",
            durationMs: 14000,
        },
        {
            id: "r2-user",
            round: 2,
            role: "user",
            text: "Oui, j'envisage d'aller au travail en vélo, mais je suis débutant et je ne suis pas sûr que c'est une bonne idée pour les débutants d'aller au travail en vélo parce que le transport peut être dangereux, n'est-ce pas ?",
            audioUrl: "/audio/speaking/r2-user.mp3",
            durationMs: 22800,
        },
        {
            id: "r2-ai",
            round: 2,
            role: "assistant",
            text: "Je comprends vos appréhensions. La circulation peut être intimidante quand on débute ! Vous pourriez tester votre itinéraire le week-end quand les rues sont plus calmes. À quelle distance se trouve votre lieu de travail ?",
            audioUrl: "/audio/speaking/r2-ai.mp3",
            durationMs: 13000,
        },
        {
            id: "r3-user",
            round: 3,
            role: "user",
            text: "Mon lieu de travail est à environ cinq kilomètres de chez moi. Il y a quelques pistes cyclables sur le trajet mais pas sur toute la distance.",
            audioUrl: "/audio/speaking/r3-user.mp3",
            durationMs: 12000,
        },
        {
            id: "r3-ai",
            round: 3,
            role: "assistant",
            text: "Cinq kilomètres, c'est idéal — environ vingt minutes à vélo ! Pour les portions sans piste cyclable, repérez les rues résidentielles parallèles. Un bon équipement est indispensable : casque, lumières, gilet. Avec la pratique, vous gagnerez vite en confiance !",
            audioUrl: "/audio/speaking/r3-ai.mp3",
            durationMs: 15000,
        },
    ],

    evaluation: {
        diagnostic: {
            summary: "学生在本次对话中展现出 A2 水平的法语能力。虽然基础语法基本正确，但回答缺乏 B1 所要求的复杂性、论证能力和主动性。学生倾向于提问，而非表达自己的观点。",
            rationale: "句子语法正确，但仅限于 A2 基础结构，语言产出量不足以体现 B1 能力，如持续论证、表达细腻观点或使用复杂语法。",
            targetLevel: "B1",
            estimatedLevel: "A2",
            range: "A1-A2",
            strengths: [
                "每轮开场表达清晰、礼貌。",
                "正确使用了专业词汇 'vélos en libre-service'。",
                "基础连接词和疑问句使用得当。",
            ],
            warnings: [
                "回答过于简短，难以评估是否达到 B1 标准。",
                "学生要求考官介绍话题，而非主动引导讨论。",
                "未展示任何 B1 复杂语法结构。",
                "缺乏有论据支撑的持续论证。",
            ],
            tips: [
                "主动出击：用 'Aujourd'hui, j'aimerais vous parler de...' 自己引入话题。",
                "扩展回答：表达观点并给出理由加以支撑。",
                "使用条件式（'est-ce qu'on pourrait'）让建议听起来更自然、更礼貌。",
            ],
            scores: [
                { key: "oral_fluency", label: "Oral Fluency", score: 5, maxScore: 10, comment: "回答过短，难以评估持续流利度，但单句表达无明显停顿。" },
                { key: "task_achievement", label: "Task Achievement", score: 3, maxScore: 10, comment: "学生引入了话题，但未能提出自己的观点或论据。" },
                { key: "lexical_competence", label: "Lexical Competence", score: 6, maxScore: 10, comment: "正确使用了 'vélos en libre-service'，但整体词汇较为基础。" },
                { key: "grammatical_competence", label: "Grammar", score: 5, maxScore: 10, comment: "基础结构正确，但未展示任何 B1 复杂语法。" },
                { key: "pronunciation", label: "Pronunciation", score: 6, maxScore: 10, comment: "语音转录准确，发音清晰，但样本量过小。" },
                { key: "interaction", label: "Interaction", score: 4, maxScore: 10, comment: "学生有互动意识，但不恰当地要求考官主导发言。" },
            ],
            annotatedSpeech: `<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text"><mark class="ms-ann ms-ann-highlight" data-ann-id="d1">est-ce que vous pouvez parler de marques</mark> de vélos en libre-service ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:06</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Bonjour ! C'est une excellente question. C'est bénéfique pour la santé et écologique. Et vous, qu'en pensez-vous ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:14</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Oui, j'envisage d'aller au travail en vélo, mais <mark class="ms-ann ms-ann-improvement" data-ann-id="d2">je suis débutant et je ne suis pas sûr que c'est une bonne idée</mark> pour les débutants d'aller au travail en vélo parce que <mark class="ms-ann ms-ann-highlight" data-ann-id="d3">le transport peut être dangereux</mark>, n'est-ce pas ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:22</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Je comprends vos appréhensions. La circulation peut être intimidante quand on débute ! Vous pourriez tester votre itinéraire le week-end. À quelle distance se trouve votre lieu de travail ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:13</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Mon lieu de travail est à environ cinq kilomètres de chez moi. Il y a quelques pistes cyclables sur le trajet mais pas sur toute la distance.</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:12</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>`,
            annotations: [
                { category: "register", original: "est-ce que vous pouvez parler de marques", corrected: "j'aimerais vous parler des systèmes", explanation: "B1 口语任务中，应由自己引入话题，而非要求考官发言。" },
                { category: "grammar", original: "je ne suis pas sûr que c'est", corrected: "je ne suis pas sûr que ce soit", explanation: "'je ne suis pas sûr que' 后需使用虚拟式 'ce soit'，而非直陈式 'c'est'。" },
                { category: "vocabulary", original: "le transport peut être dangereux", corrected: "la circulation peut être dangereuse", explanation: "描述骑行路况时，'la circulation'（交通流量）比 'le transport'（交通运输）更为精准。" },
            ],
        },

        correction: {
            summary: "纠正版本修正了语法错误，提升了词汇精准度，并重构了学生的表达，以体现 B1 水平的主动性和论证能力。",
            rationale: "应用纠正后，文本在语法、词汇和话语结构上均达到稳定的 B1 水平。",
            targetLevel: "B1",
            estimatedLevel: "B1",
            range: "A2-B1",
            strengths: [
                "结构清晰，有明确的开场和个人立场。",
                "论点充分展开，与话题高度相关。",
            ],
            warnings: [],
            tips: [
                "使用条件式（'est-ce qu'on pourrait'）让语气更礼貌、更自然。",
                "在陈述中加入 'why'，丰富开场内容。",
            ],
            correctedSpeech: `<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Bonjour, je m'appelle Kevin. Euh, <mark class="ms-ann ms-ann-highlight" data-ann-id="c1">est-ce qu'on pourrait parler des systèmes de vélos en libre-service</mark> ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:06</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Bonjour ! C'est une excellente question. C'est bénéfique pour la santé et écologique. Et vous, qu'en pensez-vous ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:14</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Oui, j'envisage d'aller au travail en vélo, mais je suis débutant et <mark class="ms-ann ms-ann-highlight" data-ann-id="c2">je ne suis pas sûr que ce soit une bonne idée</mark> pour les débutants parce que <mark class="ms-ann ms-ann-highlight" data-ann-id="c3">la circulation peut être dangereuse</mark>, n'est-ce pas ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:22</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Je comprends vos appréhensions. Vous pourriez tester votre itinéraire le week-end quand les rues sont plus calmes. À quelle distance se trouve votre lieu de travail ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:13</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Mon lieu de travail est à environ cinq kilomètres de chez moi. Il y a quelques pistes cyclables sur le trajet mais pas sur toute la distance.</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:12</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>`,
            annotations: [
                { category: "vocabulary", original: "est-ce que vous pouvez parler de marques de vélos", corrected: "est-ce qu'on pourrait parler des systèmes de vélos", explanation: "使用条件式 'est-ce qu'on pourrait' 更自然、更礼貌；'systèmes' 比 'marques' 更准确地描述共享单车体系。" },
                { category: "grammar", original: "je ne suis pas sûr que c'est", corrected: "je ne suis pas sûr que ce soit", explanation: "表达怀疑的句式后需使用虚拟式。" },
                { category: "vocabulary", original: "le transport peut être dangereux", corrected: "la circulation peut être dangereuse", explanation: "'la circulation' 特指道路交通流量，在骑行语境中更为精准。" },
            ],
            oralExpressions: {
                topic: "Commuting by bike (Aller au travail en vélo)",
                vocabulary: [
                    { term: "le vélotaf", meaning: "骑车上班" },
                    { term: "une piste cyclable", meaning: "自行车道" },
                    { term: "les heures de pointe", meaning: "高峰时段" },
                    { term: "un trajet domicile-travail", meaning: "上下班通勤路程" },
                ],
                phrases: [
                    { phrase: "se faufiler dans la circulation", usage: "描述骑车穿梭于拥堵车流中。" },
                    { phrase: "prendre un Vélib'", usage: "使用共享单车（巴黎系统，常泛指共享单车）。" },
                    { phrase: "ça évite de s'entasser dans le métro", usage: "解释骑车相比拥挤公共交通的优势。" },
                ],
                arguments: [
                    { point: "Health and Environment", evidence: "C'est super écolo et en plus, ça permet de faire un peu de sport avant de commencer la journée." },
                    { point: "Time efficiency", evidence: "En ville, on va souvent plus vite en vélo qu'en voiture parce qu'on n'est pas bloqué dans les bouchons." },
                ],
            },
        },

        modelSpeech: {
            summary: "范文直接回应了 AI 的问题，明确表达了个人偏好并给出实际理由。通过对比两种情况并使用自然的口语连接词，展示了 B1 水平的表达能力。",
            rationale: "范文运用了让步结构（'C'est vrai que... mais...'）、自然的口语缩略形式和精准词汇——这些都是 B1 口语自信表达的典型特征。",
            targetLevel: "B1",
            estimatedLevel: "B1",
            range: "A2-B1",
            strengths: [
                "注意范文如何使用让步结构，先承认优点再解释个人偏好。",
                "词汇精准且贴合话题（'trajet ponctuel'、'station d'arrivée'、'réglé à ma taille'）。",
            ],
            warnings: [],
            tips: [
                "使用自然的口语缩略：'y'a'（il y a）、't'arrives'（tu arrives）、'dispos'（disponibles）。",
                "用 'Du coup' 在口语中自然表达因果关系。",
            ],
            polishedSpeech: `<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Bonjour Marie, aujourd'hui j'aimerais vous parler du vélo comme moyen de transport pour aller au travail. C'est un sujet qui m'intéresse beaucoup.</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:08</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Bonjour ! C'est une excellente question. C'est bénéfique pour la santé et écologique. Et vous, qu'en pensez-vous ?</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:14</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Alors, personnellement, <mark class="ms-ann ms-ann-keypoint" data-ann-id="p1">j'utilise plutôt mon propre vélo</mark> pour aller au travail. <mark class="ms-ann ms-ann-keypoint" data-ann-id="p2">C'est vrai que les vélos en libre-service, comme le Vélib', c'est super pratique</mark> quand on est de passage ou pour un trajet ponctuel. Mais au quotidien, je trouve ça un peu stressant. <mark class="ms-ann ms-ann-keypoint" data-ann-id="p3">Des fois, t'arrives à la station et y'a plus de vélos dispos</mark>, ou alors la station d'arrivée est pleine. <mark class="ms-ann ms-ann-keypoint" data-ann-id="p4">Du coup</mark>, avec mon propre vélo, je suis sûr de pouvoir partir et arriver quand je veux. Et puis, c'est plus confortable parce qu'il est <mark class="ms-ann ms-ann-keypoint" data-ann-id="p5">réglé à ma taille</mark>.</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:28</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>\n\n<div class="ms-bubble-row ms-bubble-row--ai"><span class="ms-avatar ms-avatar--ai">M</span><div class="ms-bubble ms-bubble--ai"><div class="ms-bubble-text"><strong>Marie:</strong> Cinq kilomètres, c'est idéal ! Pour les portions sans piste cyclable, repérez les rues résidentielles parallèles.</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:10</span></div></div></div>\n\n<div class="ms-bubble-row ms-bubble-row--user"><div class="ms-bubble ms-bubble--user"><div class="ms-bubble-text">Oui, vous avez raison. En fait, j'ai déjà repéré un itinéraire qui passe par des petites rues tranquilles. Le seul problème, c'est qu'il pleut souvent ici. Mais bon, avec un bon imperméable et des garde-boue, ça devrait aller !</div><div class="ms-audio-inline"><button type="button" class="ms-audio-play"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button><div class="ms-audio-bar"><div class="ms-audio-bar-fill" style="width:0%"></div></div><span class="ms-audio-time">0:15</span></div></div><span class="ms-avatar ms-avatar--user">K</span></div>`,
            annotations: [
                { category: "structure", original: "C'est vrai que... c'est super pratique", corrected: "C'est vrai que... c'est super pratique", explanation: "使用 'C'est vrai que...' 引入让步——这是 B1 的关键技能，体现了多角度思考的能力。" },
                { category: "register", original: "Des fois, t'arrives à la station et y'a plus de vélos dispos", corrected: "Des fois, t'arrives à la station et y'a plus de vélos dispos", explanation: "地道的法语口语：'Des fois' 代替 'Parfois'，'t'arrives'、'y'a plus'、'dispos'——真实的口语语体。" },
                { category: "coherence", original: "Du coup", corrected: "Du coup", explanation: "常见的口语连接词，表达因果关系（类似于 'so'）。" },
                { category: "language", original: "réglé à ma taille", corrected: "réglé à ma taille", explanation: "描述调整自行车的专业词汇，体现了良好的话题知识储备。" },
                { category: "language", original: "un trajet ponctuel", corrected: "un trajet ponctuel", explanation: "精准的 B1 词汇，表示偶尔或一次性的出行。" },
            ],
        },
    },
};
