# LangPrepHub Landing Page PRD

> Scope: public marketing homepage / landing page.  
> Version: v0.1 draft.  
> Current implementation target: Chinese homepage first, English-ready architecture.  
> Related document: `docs/landing/BRAND_GUIDE.md`.

## 1. Product Goal

The public homepage should convert unauthenticated visitors into registered users by showing what LangPrepHub actually does before asking them to create an account.

The page should make the product feel like:

- a serious AI language practice workspace;
- a practical tool for exam-oriented learners;
- a product that gives immediate feedback, not generic learning content;
- a better next step for learners who have outgrown casual language apps.

The homepage should not look like the previous investor-oriented HTML deck. It should avoid market sizing, fundraising language, dense tables, valuation claims, and internal cost models unless explicitly framed as user-facing value.

Primary conversion target:

```text
Visitor understands the product → tries the interactive demo → clicks Start Free → registers.
```

Secondary conversion target:

```text
Visitor watches writing/speaking demo videos → understands AI feedback value → registers later or returns through retargeting.
```

## 2. Design Direction

The homepage must follow `BRAND_GUIDE.md`.

Core direction:

- **Color**: muted & pastel, monochromatic muted palette.
- **Layout**: card-based design with layered product UI elements.
- **Style**: neo minimalism.
- **Design philosophy**: approachable sophistication.

Reference methods, not visual copying:

- **Linear**: product-first hero, polished app UI as the main visual, precise SaaS structure, compact navigation.
- **Apple**: one idea per section, scroll-led product storytelling, controlled motion, high polish.
- **Lushbinary**: compact floating / dynamic-island-like header state after scrolling.

## 3. Audience

### 3.1 Primary Audience

Serious language learners preparing for exams or measurable language goals.

Examples:

- DELF / DALF candidates.
- TEF / TCF candidates.
- JLPT, Goethe, TestDaF, IELTS-style exam learners in future versions.
- Learners who already use casual apps but need stronger writing, speaking, dictation, vocabulary, and grammar practice.

### 3.2 Visitor Mindset

The visitor is likely asking:

- Can this help me improve output skills, not just memorize words?
- Can I see feedback before I register?
- Is this more serious than a gamified learning app?
- Is the AI feedback useful enough to trust?
- Is the product affordable and available whenever I want to practice?

## 4. Localization Requirements

### 4.1 V1 Language Scope

V1 homepage content is Chinese-first.

Required route planning:

```text
/zh      Chinese homepage
/en      English homepage, may be placeholder or later phase
/        locale redirect based on browser language, with safe fallback to /zh
```

For SEO, `/zh` and `/en` must be stable indexable routes. Browser-language detection should only affect the root redirect, not replace explicit locale routes.

### 4.2 Copy and Mock Data Language

For Chinese homepage:

- page UI copy: Chinese;
- product module labels inside the demo: may use existing English product names if this matches the current app, but Chinese helper descriptions should be shown;
- French learning examples: French;
- AI explanations and corrections: Chinese-first, with French examples preserved.

For future English homepage:

- AI explanations and corrections should switch to English;
- mock product flows can reuse the same French examples.

## 5. Information Architecture

Homepage V1 includes:

1. Global header.
2. Hero section with animated headline and interactive product demo.
3. Apple-style pinned scroll section comparing traditional practice friction vs LangPrepHub AI practice.
4. Lightweight placeholder anchors for later sections:
   - Product
   - Resources
   - Pricing
   - Contact

V1.1 and later sections are intentionally not fully specified in this document yet.

## 6. Header Requirements

### 6.1 Desktop Header

Header should visually reference Linear-style SaaS navigation:

Left:

```text
Logo mark + Langhub
```

Right navigation, ordered left to right:

```text
Product
Resources
Pricing
Contact
[Theme Toggle]
Login
Start Free
```

Notes:

- Display name in header: `Langhub`.
- Product identity can still use `LangPrepHub` in metadata, footer, legal pages, and explanatory copy.
- `Start Free` must be visually stronger than other nav actions.
- `Login` should be visually secondary.

### 6.2 Theme Toggle

The theme toggle sits immediately left of `Login`.

Visual requirement:

- Circular button.
- Split diagonally into two halves:
  - light muted sage / paper tone;
  - dark sage / ink tone.
- Purpose: indicate the website can switch between light and dark color modes.

Behavior:

- Toggle `<html data-mode="soft">` and `<html data-mode="dark">`.
- Persist preference in `localStorage`.
- Respect system color preference only on first visit if no stored preference exists.
- Must not reload the page.

### 6.3 Sticky / Dynamic-Island Header

Initial state:

- Full-width or centered header near top.
- Transparent or soft glass background according to section context.

Scrolled state:

- Header remains fixed at top.
- It transitions into a compact, centered, rounded pill / dynamic-island-like container.
- Background uses `--nav-bg` with blur.
- Nav content remains usable.
- Transition should be smooth and restrained, not playful.

Behavior constraints:

- Do not hide key CTA.
- Do not cause layout shift.
- Respect `prefers-reduced-motion`.
- On mobile, use a simpler sticky compact header with hamburger/menu drawer.

### 6.4 Header Links

Temporary V1 behavior:

| Item | Target |
| --- | --- |
| Product | Scroll to hero demo or future product section |
| Resources | Scroll to placeholder resources section or disabled dropdown |
| Pricing | Scroll to pricing placeholder |
| Contact | Scroll to contact placeholder |
| Login | Existing app login route or `app.langprephub.com/login` after domain split |
| Start Free | Existing registration route or `app.langprephub.com/register` after domain split |

All destinations must be configurable through constants, not hard-coded in multiple components.

## 7. Hero Section Requirements

### 7.1 Goal

The hero should immediately show:

- this is a real product, not a pitch deck;
- users can interact before registration;
- the product is focused on AI-assisted language practice;
- the product is serious, calm, and exam-oriented.

### 7.2 Initial Animation

On first viewport load, animate elements in sequence:

1. Header appears.
2. Hero eyebrow / announcement appears.
3. Main headline appears.
4. Subtitle appears.
5. CTA row appears.
6. Product demo frame appears with subtle scale / opacity / y-axis reveal.

Animation style:

- Linear-inspired, not flashy.
- Use opacity + small translateY + subtle blur/scale if needed.
- No bounce.
- No large rotating elements.
- Must respect `prefers-reduced-motion`.

### 7.3 Hero Copy

Chinese-first recommended copy:

Eyebrow / announcement:

```text
你的定制语言学习 Agent 已上线，试试看 →
```

Primary headline:

```text
练习不再只是提交答案，而是获得下一步该怎么进步。
```

Alternative headline:

```text
把每一次写作、口语和听写练习，变成下一次进步的材料。
```

Subtitle:

```text
Langhub 把写作批改、口语对话、听写训练、词汇测试、动词变位和 AI 学习笔记放进一个安静、专注的语言备考工作台。
```

CTA row:

```text
[Start Free] [先体验演示]
```

Microcopy below CTA:

```text
无需注册即可查看交互演示。真实练习和保存学习记录需要创建账户。
```

English-ready copy:

```text
Your customized language agent is here. Try it →
Practice with feedback, not guesswork.
```

Note: fix spelling as `language`, not `langugage`.

## 8. Hero Interactive Product Demo

### 8.1 Purpose

The hero demo is the most important homepage component.

It should simulate the logged-in Langhub product without requiring registration, using frontend-only scripts and mock data.

No backend requests. No AI requests. No SSE. No TTS generation request. No file upload.

### 8.2 Visual Theme

The demo UI should not reuse the existing app’s default theme directly.

Requirements:

- Create a new light sage theme aligned with the public brand guide.
- Use muted sage, warm paper, cream, ink, and low-saturation AI violet.
- Replace existing icon style with brand-consistent outline icons.
- Avoid old W3C/free icon look if it conflicts with the new brand.
- Use card-based layered surfaces:
  - outer app shell;
  - sidebar;
  - content panel;
  - AI feedback cards;
  - skeleton loading cards;
  - reports.

### 8.3 Demo App Structure

The demo should visually replicate the real logged-in app structure closely enough for visitors to understand the product.

Left sidebar modules should match the current app information architecture, confirmed from:

- `src/App.tsx`
- `src/components/Layout.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/writing/index.tsx`
- `src/pages/speaking/index.tsx`
- `src/pages/dictation/index.tsx`
- `src/pages/Conjugation.tsx`
- `src/pages/vocabulary/index.tsx`
- `src/pages/expressions/index.tsx`
- `src/pages/ai-search/index.tsx`

The demo shell should reproduce the current logged-in app layout pattern:

- left sidebar;
- brand area;
- system-language / learning-language switcher;
- primary navigation;
- nested child navigation;
- bottom user/account controls;
- main content area.

Current real app sidebar structure:

```text
Language switcher:
  System language: English / 中文
  Learning language: Français

Dashboard
Practice Writing
  - Writing Management
  - Writing Study Notes
Practice Speaking
  - Talk with AI
  - Dictation Training
  - Speaking Study Notes
Practice Conjugation
  - Take a Test
  - My Datasets
  - Create Dataset
Practice Vocabulary
  - Study & Test
  - Bank Management
  - Test Records
Polish Your Expression
  - Learn Similar Expressions
  - Learn Opposite Expressions
Ask AI Prof
  - Ask a Question
  - AI Study Notes
```

Important implementation detail:

- In the current app, Dictation Training is routed under `Practice Speaking` as `/speaking?tab=dictation`.
- In the public demo, it should remain a child under `Practice Speaking` to match the real product. If design needs to promote dictation visually, use a featured card inside the demo content, not a different sidebar IA.
- `Polish Your Expression` exists in the current product and should be visible in the mock sidebar, even if its V1 demo is lighter than the writing/speaking/vocabulary demos.
- `Documents` and `Tests` exist as protected routes but are not currently primary sidebar modules; do not make them prominent in the homepage demo unless the real app IA changes.

Disabled controls:

```text
Logout
Inbox
Profile
Settings
```

Disabled control behavior:

- visually muted;
- no navigation;
- tooltip or small helper text:

```text
演示模式中不可用。注册后可使用完整功能。
```

The token balance row may be shown as static mock account state, but it must not imply the visitor is logged in.

### 8.3.1 Product UI Replication Rules

The mock app should be visually faithful to the real app structure but must not import real app components that trigger authenticated queries or production API calls.

Rules:

- Rebuild a marketing-safe demo shell that mirrors the product IA and main UI patterns.
- Use route-like internal state instead of `react-router` navigation.
- Use static mock data and deterministic animation scripts.
- Do not mount real `Layout`, `Dashboard`, `WritingEditor`, `ConversationView`, `DictationPractice`, `Conjugation`, `Vocabulary`, `Expressions`, or `AiSearch` components directly because they depend on authenticated state, TanStack Query, and API clients.
- Recreate key visual patterns:
  - page header;
  - action cards;
  - setup step progress;
  - tables;
  - editor panel;
  - chat bubbles;
  - annotated feedback cards;
  - progress bars;
  - skeleton loading states.
- Replace emoji-heavy and pixel-theme icons with the marketing site's outline icon system from `BRAND_GUIDE.md`.
- The current app's `src/utils/icons.tsx` uses pixel SVG icons only under `data-theme="pixel"` and falls back to emoji otherwise. The marketing demo should not reuse this icon behavior.

### 8.4 Demo State Model

The demo should be script-driven.

Each module has:

```ts
type DemoModuleState =
  | 'idle'
  | 'intro'
  | 'typing'
  | 'submitting'
  | 'loading'
  | 'result'
  | 'free-explore';
```

Rules:

- First click on a module starts its default scripted animation.
- Repeat click on the same module restarts the scripted animation from a clean state.
- Switching to another module stops the current animation and clears transient data.
- After animation ends, module enters `free-explore`.
- Free exploration must never call backend APIs.

### 8.5 Performance Loading Strategy

Recommended strategy:

- Load hero shell, sidebar, dashboard summary, and module metadata immediately.
- Load each module script and mock data lazily on first click.
- Prefetch likely modules during browser idle after first paint:
  - Practice Writing;
  - Practice Speaking;
  - Practice Vocabulary.
- Audio and video assets must be lazy-loaded only when needed.
- Use static mock JSON / TS modules, not API routes.

Rationale:

- Keeps first paint fast.
- Preserves smooth experience for most likely interactions.
- Avoids shipping all audio/video upfront.

## 9. Demo Module Requirements

### 9.1 Dashboard

Dashboard should summarize mock learning progress from all modules.

Example widgets:

- Weekly practice count.
- Writing feedback summary.
- Speaking fluency trend.
- Vocabulary accuracy.
- Conjugation weak verbs.
- Recent AI study notes.

Dashboard should use mock data only and update after scripted demos if practical.

### 9.2 Practice Writing Demo

Trigger:

```text
User clicks Practice Writing in sidebar.
```

Scripted flow:

1. Open writing editor.
2. Show prompt.
3. Simulate student essay typing character by character.
4. Show submit action.
5. Show skeleton loading.
6. Show AI correction result.
7. Enter free-explore mode.

Prompt:

```text
DELF B1 写作练习：你认为社交媒体是否有助于学习外语？请说明你的观点并举例。
```

Mock student essay, intentionally includes B1-level errors:

```text
Je pense que les réseaux sociaux est très utile pour apprendre une langue étrangère. D'abord, on peut regarder des vidéos court et écouter des personnes qui parlent naturellement. Par exemple, je suis plusieurs comptes en français et je note les expressions que je ne connais pas.

Cependant, il y a aussi des problèmes. Beaucoup de contenus ne sont pas correct et on peut perdre beaucoup de temps. Pour moi, il faut utiliser les réseaux sociaux avec un objectif clair. Si je regarde seulement des vidéos amusants, je n'améliore pas vraiment mon niveau.

En conclusion, les réseaux sociaux peuvent aider les étudiants, mais ils ne remplace pas un vrai entraînement. Il est important de pratiquer écrire et parler, pas seulement lire ou écouter.
```

Mock correction result should include:

- Overall CEFR estimate: B1.
- Score-style breakdown:
  - task response;
  - grammar;
  - vocabulary;
  - coherence;
  - exam readiness.
- Highlighted corrections:
  - `les réseaux sociaux est` → `les réseaux sociaux sont`;
  - `vidéos court` → `vidéos courtes`;
  - `contenus ne sont pas correct` → `contenus ne sont pas corrects`;
  - `vidéos amusants` → `vidéos amusantes`;
  - `ils ne remplace pas` → `ils ne remplacent pas`;
  - `pratiquer écrire et parler` → `pratiquer l'écriture et l'oral` or `s'entraîner à écrire et à parler`.
- Improved version.
- Three next-step suggestions.

### 9.3 Practice Speaking Demo

Trigger:

```text
User clicks Practice Speaking in sidebar.
```

Scripted flow:

1. Open conversation panel with AI tutor `Marie`.
2. Show three-round mock conversation.
3. Messages appear one by one, like a messaging app.
4. Simulate submit for evaluation.
5. Show skeleton loading.
6. Show AI speaking feedback.
7. User can click mock text-to-speech button.
8. Show audio generation animation and then a mock audio result.
9. Enter free-explore mode.

Conversation theme:

```text
DELF B1 口语：描述一次旅行，并说明你遇到的问题。
```

Mock conversation:

```text
Marie: Bonjour, tu prépares le DELF B1. Peux-tu me parler de ton dernier voyage ?
Étudiant: Oui. Le mois dernier, je suis allé à Lyon avec deux amis. Nous avons visité beaucoup de musée et nous avons mangé dans un petit restaurant près de la rivière.

Marie: Très bien. Est-ce qu'il y a eu un problème pendant ce voyage ?
Étudiant: Oui, nous avons raté le train parce que nous sommes arrivé trop tard à la gare. Après, on doit acheter des nouveaux billets, et c'était un peu cher.

Marie: Qu'est-ce que tu as appris de cette expérience ?
Étudiant: J'ai appris qu'il faut préparer mieux le voyage. La prochaine fois, je vais vérifier les horaires avant partir et garder plus de temps pour aller à la gare.
```

Mock correction result should include:

- Fluency: understandable B1, but needs more natural linking.
- Grammar corrections:
  - `beaucoup de musée` → `beaucoup de musées`;
  - `nous sommes arrivé` → `nous sommes arrivés`;
  - `on doit acheter` → `on a dû acheter`;
  - `des nouveaux billets` → `de nouveaux billets`;
  - `préparer mieux` → `mieux préparer`;
  - `avant partir` → `avant de partir`.
- Suggested improved answer.
- Pronunciation notes, but keep them generic unless real audio analysis exists.

Mock TTS behavior:

- Button label:

```text
生成 Marie 的示范朗读
```

- Loading states:
  - preparing text;
  - generating audio;
  - audio ready.
- Final result:
  - show static audio player UI;
  - use pre-generated mock audio asset;
  - no backend TTS request.

### 9.4 Dictation Training Demo

Trigger:

```text
User clicks Dictation Training in sidebar.
```

Default view:

- Show a table/list of dictation exercises.
- Include two example dictations:
  - A2;
  - B1.

Both must be clearly marked as example data.

Example table:

| Title | Level | Sentences | Source |
| --- | --- | --- | --- |
| Exemple A2 — Une matinée simple | A2 | 5 | Example data |
| Exemple B1 — Changer ses habitudes | B1 | 5 | Example data |

A2 original text:

```text
Je vais au marché le samedi matin.
Ma sœur achète du pain et des fruits.
Nous prenons le bus pour rentrer à la maison.
Après le déjeuner, je lis un livre dans ma chambre.
Le soir, nous préparons une soupe ensemble.
```

B1 original text:

```text
Depuis que j'ai commencé à apprendre le français, j'écoute un court podcast chaque matin.
Au début, je comprenais seulement quelques mots, mais je notais les expressions importantes.
Cette habitude m'aide à reconnaître les sons et à mémoriser du vocabulaire.
Quand une phrase est difficile, je la répète plusieurs fois à voix haute.
Après quelques semaines, j'ai senti que je suivais mieux les conversations simples.
```

Practice behavior:

- User can open an exercise.
- Mock audio can play from static asset.
- User types answer.
- Frontend-only validation compares normalized text.
- Show correct/incorrect diff.
- No backend request.

### 9.5 Practice Conjugation Demo

Trigger:

```text
User clicks Practice Conjugation in sidebar.
```

Default scripted flow:

1. Open conjugation practice page.
2. Use a predefined dataset with three French verbs.
3. Simulate user answering several forms.
4. Show immediate correctness feedback.
5. Show short practice report.
6. Enter free-explore mode.

Default dataset:

```text
acquérir
transmettre
apercevoir
```

Recommended practice forms:

- présent;
- passé composé;
- futur simple;
- subjonctif présent, optional if UI supports it.

#### Create Datasets Sub-demo

Trigger:

```text
User clicks Create Datasets.
```

Scripted flow:

1. Step 1: create dataset name.
2. Step 2: add verbs.
3. Step 3: AI validation / correction.
4. Final result table appears.
5. Enter free-explore mode.

Dataset name:

```text
Verbes utiles pour DELF B1
```

User-entered verbs:

```text
acquérir
transmettre
appercevoir
```

Correction:

```text
appercevoir → apercevoir
```

Final result should show:

- accepted verbs;
- corrected typo;
- short explanation:

```text
系统已识别一个拼写错误，并将其修正为 apercevoir。你可以继续编辑后再开始练习。
```

### 9.6 Practice Vocabulary Demo

Trigger:

```text
User clicks Practice Vocabulary in sidebar.
```

Default scripted flow:

1. Enter vocabulary test view.
2. Show five B1-level questions.
3. Simulate user answers.
4. Include at least one wrong answer.
5. Show final test report.
6. Enter free-explore mode.

Question types to demonstrate:

1. Recall.
2. Multiple Choice.
3. Fill in the Blank.
4. Noun Gender.
5. Prioritize Previous Errors.

Example B1 vocabulary:

| Word / Expression | Type | Chinese meaning |
| --- | --- | --- |
| s'habituer à | verb expression | 习惯于 |
| un enjeu | noun | 重要问题 / 关键议题 |
| améliorer | verb | 改善，提高 |
| malgré | preposition | 尽管 |
| la confiance | noun | 信任，自信 |

Example test mapping:

- Recall: `s'habituer à`.
- Multiple Choice: choose meaning of `un enjeu`.
- Fill in the Blank: `Il veut ______ son niveau de français.`
- Noun Gender: `confiance`.
- Prioritize Previous Errors: re-test `malgré` because user previously confused it with `parce que`.

Report should show:

- accuracy;
- weak items;
- recommended next review date;
- explanation of why previous-error prioritization matters.

#### Bank Management Sub-demo

Trigger:

```text
User clicks Bank Management.
```

Default view:

Show two public example banks:

```text
DELF B1 Example Data Bank — not an official vocabulary list
TEF A1 Example Data Bank — not an official vocabulary list
```

Important:

- Names must clearly tell users these are example data banks.
- Do not imply official exam affiliation or official vocabulary coverage.

Create bank flow:

1. User clicks `+ Create Bank`.
2. Simulate bank name input:

```text
Mon français quotidien
```

3. Add three words:

```text
s'améliorer
un logement
indepandant
```

4. Show spelling correction:

```text
indepandant → indépendant
```

5. Show mock AI-generated definitions in current website language.

Chinese definitions:

```text
s'améliorer：变得更好，提高自己。
un logement：住房，住所。
indépendant：独立的，自主的。
```

6. Show created bank summary.
7. Enter free-explore mode.

### 9.7 Ask AI Prof Demo

Trigger:

```text
User clicks Ask AI Prof.
```

Search behavior:

- Search input is visible but disabled in demo mode.
- Placeholder:

```text
演示模式中搜索暂不可用。注册后可以向 AI Prof 提问并保存学习笔记。
```

AI Study Notes:

Show three prewritten notes about confusing French topics that are common but often underexplained.

Note 1:

```text
形容词后什么时候接 à，什么时候接 de + infinitif？
```

Summary:

```text
很多形容词后面可以接不定式，但介词选择并不随机。一般来说，de 常用于表达主观判断或评价，例如 Il est important de réviser。à 常用于表达某事的性质、难度或使用方式，例如 Ce texte est difficile à comprendre。
```

Note 2:

```text
penser à 和 penser de 为什么不是一个意思？
```

Summary:

```text
penser à quelqu'un / quelque chose 表示想到、考虑到某人或某事；penser de quelque chose 表示对某事的看法。Je pense à cet examen 和 Qu'est-ce que tu penses de cet examen ? 不是同一个问题。
```

Note 3:

```text
passé composé 和 imparfait：不只是“短动作”和“长动作”
```

Summary:

```text
passé composé 更常用于推动事件发展，imparfait 更常用于背景、状态、习惯或描述。理解它们的叙事功能，比只记“短动作/长动作”更可靠。
```

### 9.8 Polish Your Expression Demo

This module exists in the current app and should appear in the mock sidebar.

Current app structure:

```text
Polish Your Expression
  - Learn Similar Expressions
  - Learn Opposite Expressions
```

V1 homepage priority:

- lower than Writing, Speaking, Dictation, Conjugation, Vocabulary, and Ask AI Prof;
- should be visible for product completeness;
- may use a lighter static or short scripted demo.

Recommended V1 mock behavior:

1. User clicks `Polish Your Expression`.
2. Show two module cards:
   - `Learn Similar Expressions`;
   - `Learn Opposite Expressions`.
3. Default to `Learn Similar Expressions`.
4. Show one example expression cluster:

```text
améliorer
perfectionner
renforcer
faire des progrès
```

5. Explain differences in Chinese:

```text
améliorer：最通用，表示改善、提高。
perfectionner：强调进一步完善，常用于技能。
renforcer：强调加强已有能力或信心。
faire des progrès：强调取得进步，适合描述学习过程。
```

6. User can switch to `Learn Opposite Expressions`.
7. Show one example contrast:

```text
augmenter ↔ diminuer
réussir ↔ échouer
accepter ↔ refuser
```

No API requests. No AI generation.

## 10. Pinned Scroll Section: Traditional Practice vs AI Practice

### 10.1 Goal

This section should communicate:

- traditional 1-on-1 tutoring is slow to schedule;
- human correction is expensive and hard to access frequently;
- AI writing and speaking practice is available anytime;
- AI-assisted practice makes frequent feedback economically possible.

This section is the main Apple-inspired storytelling moment.

### 10.2 Content

Initial handwritten-style text:

```text
1 对 1 私教：预约慢？
人工纠错：花费高？
```

Transformation text:

```text
AI 写作 / 口语练习：随时随地
AI 价格：约 ¥0.03 / 篇作文批改，约 ¥1.8 / 小时 AI 对话
```

Production caution:

- The numeric price copy must be verified before public release.
- If these numbers refer to internal model-processing cost, the UI must label them as examples or estimates.
- Avoid implying this is the final user subscription price unless pricing is finalized.

Safer alternative copy:

```text
AI 写作 / 口语练习：随时随地
让高频反馈变得更低门槛
```

### 10.3 Animation Behavior

Section background:

- solid muted color according to brand guide;
- no busy texture;
- enough vertical scroll distance to understand the full animation.

Pinned scroll behavior:

1. As the section reaches viewport center, the section pins.
2. The page stops normal downward progression only within this section.
3. Scrolling controls animation progress frame by frame.
4. When animation completes, normal page scroll resumes.
5. Reverse scroll restores the sequence.

Animation sequence:

1. Two handwritten lines rise from below into center.
2. As user scrolls, both lines are crossed out with horizontal strokes.
3. Crossed-out lines shrink and fade.
4. New two-line text appears from the center.
5. New text reveals character by character.
6. From behind the text, two tilted video thumbnail cards emerge:
   - left: writing correction video;
   - right: speaking conversation video.
7. Cards move diagonally outward from center:
   - left card moves left;
   - right card moves right.
8. Cards scale up until they lock into final symmetric positions.
9. Each card shows:
   - feature icon;
   - video thumbnail;
   - centered play button.
10. User can click a video card to open modal playback.
11. After user continues scrolling, cards move out:
   - left card exits toward left/top;
   - right card exits toward right/top.

Visual reference for cards:

- use tilted product-window thumbnail style similar to the provided screenshot;
- do not copy Apple iconography;
- writing card icon should use brand-consistent outline pen/document symbol;
- speaking card icon should use brand-consistent outline waveform/chat symbol;
- both cards must have equal size and mirrored transforms.

### 10.4 Video Modal

Clicking a card opens video modal:

- background darkens;
- centered video player;
- close button;
- `Esc` closes modal;
- clicking backdrop closes modal;
- focus trap required for accessibility;
- video does not autoplay with sound;
- video assets lazy-loaded.

### 10.5 Mobile Behavior

Pinned scroll animations can feel poor on mobile.

Mobile fallback:

- no complex pinning by default under `768px`;
- show the same narrative as stacked cards:
  1. crossed-out old problems;
  2. AI practice benefit text;
  3. two tap-to-play video cards.
- If a pinned effect is used on mobile, it must be short and not block scrolling.

### 10.6 Reduced Motion Behavior

If `prefers-reduced-motion: reduce`:

- no pinning;
- no character-by-character reveal;
- no diagonal flying cards;
- show final static layout directly.

## 11. Future Sections Placeholder

The following sections are not fully specified in this PRD and should be designed later:

### 11.1 Product Modules

Likely Linear-style modular sections:

- AI Writing Correction.
- Speaking Evaluation.
- Dictation Training.
- Vocabulary Workspace.
- Conjugation Trainer.
- AI Study Notes.

### 11.2 Exam Readiness

Explain how Langhub helps serious learners prepare:

- structured practice;
- feedback history;
- weak-point review;
- CEFR-oriented examples.

Avoid claiming official scoring equivalence unless validated.

### 11.3 Pricing

Pricing section will be added after product pricing is finalized.

Until then:

- header link can scroll to a placeholder;
- do not invent final user-facing prices.

### 11.4 Resources

Potential future content:

- learning guides;
- exam writing examples;
- pronunciation tips;
- grammar notes;
- release notes.

## 12. Technical Requirements

### 12.1 Frontend

Preferred marketing site stack:

- Next.js App Router.
- TypeScript.
- TailwindCSS or CSS modules with tokens from `BRAND_GUIDE.md`.
- GSAP + ScrollTrigger for pinned scroll section.
- Optional Lenis for smooth scrolling if it does not introduce scroll-jacking.

### 12.2 API Boundary

The homepage V1 must not call production AI APIs.

Forbidden in V1 demo:

- anonymous AI generation;
- anonymous TTS generation;
- anonymous audio upload;
- anonymous long-running SSE requests;
- direct calls to Node port `3000`.

Allowed:

- static JSON/TS mock data;
- static audio files;
- static video files;
- frontend-only validation.

### 12.2.1 Existing App API Risk Areas

The current app pages use TanStack Query and API clients extensively. The marketing demo must avoid accidental imports from these API-connected components.

Observed API-connected areas:

| Product area | Existing route/component pattern | API dependency risk |
| --- | --- | --- |
| Dashboard | `src/pages/Dashboard.tsx` | fetches AI search history and auth/onboarding state |
| Writing | `src/pages/writing/*` | writing practice, grading, polling, document editor, AI grading |
| Speaking | `src/pages/speaking/*` | audio recording, message sending, evaluation, TTS regeneration |
| Dictation | `src/pages/dictation/*` | session creation, audio source selection, segment checking |
| Conjugation | `src/pages/Conjugation.tsx` | datasets, verb validation, test records |
| Vocabulary | `src/pages/vocabulary/*` | banks, public bank browsing, test sessions, answer submission |
| Expressions | `src/pages/expressions/*` | datasets, imports, tests, answer submission |
| Ask AI Prof | `src/pages/ai-search/*` | model list, AI search generation, history |

Therefore:

- build separate marketing demo components;
- copy only interaction patterns and visual structure;
- do not import API clients;
- do not use production query keys;
- do not assume authenticated `useAuthStore` state.

### 12.3 Domain Assumptions

Planned future split:

```text
langprephub.com       public marketing site
app.langprephub.com   existing logged-in learning product
```

CTA links must be environment-configurable:

```ts
MARKETING_SITE_URL
APP_LOGIN_URL
APP_REGISTER_URL
```

Do not hard-code production domains throughout components.

### 12.4 China / Global Future Compatibility

The homepage should be deployable for both:

- global site;
- future China ICP-approved site.

Planning constraints:

- public homepage copy should not depend on a specific AI provider;
- avoid saying “powered by ChatGPT / Claude / Gemini” in generic homepage copy;
- provider-specific text should be configured by deployment region if needed;
- video and demo assets should be CDN-configurable.

## 13. Analytics Requirements

Track the following events:

```text
landing_view
hero_demo_visible
hero_demo_module_click
hero_demo_module_completed
theme_toggle_click
start_free_click
login_click
video_card_click
video_modal_open
video_play_start
pricing_link_click
contact_link_click
```

Event payload examples:

```ts
{
  locale: 'zh',
  theme: 'soft',
  module: 'practice_writing',
  source: 'hero_demo'
}
```

No personal data should be collected from anonymous visitors in the demo.

## 14. SEO Requirements

Chinese homepage metadata:

```text
Title: Langhub — AI 语言备考与练习工作台
Description: 用 AI 练习写作、口语、听写、词汇和动词变位。无需注册即可查看 Langhub 交互演示，创建账户后保存学习记录并获得持续反馈。
```

Required:

- indexable `/zh`;
- canonical URL;
- Open Graph metadata;
- Twitter/X card metadata;
- structured headings;
- descriptive alt text for product demo videos/thumbnails;
- no important text rendered only inside canvas/video.

## 15. Accessibility Requirements

Required:

- keyboard-accessible header links;
- keyboard-accessible theme toggle;
- visible focus states;
- video modal focus trap;
- `Esc` closes modal;
- reduced-motion fallback;
- sufficient text contrast in both soft and dark modes;
- disabled demo buttons must communicate disabled reason;
- animations must not be required to understand page content.

## 16. Acceptance Criteria

Homepage V1 is acceptable when:

- `/zh` renders the Chinese homepage.
- Header includes Logo/Langhub, Product, Resources, Pricing, Contact, theme toggle, Login, Start Free.
- Header transitions to compact sticky state after scrolling.
- Hero elements animate in sequence on first load.
- Hero includes interactive mock product demo above the fold on desktop.
- Demo supports all specified sidebar modules.
- Demo uses frontend-only scripts and mock data.
- Writing demo types text, submits, skeleton-loads, and shows correction.
- Speaking demo plays three-round conversation, submits, skeleton-loads, shows feedback, and demonstrates mock audio generation.
- Dictation demo provides A2 and B1 examples with frontend-only checking.
- Conjugation demo includes default practice and create-dataset correction flow.
- Vocabulary demo includes five question types and bank creation flow.
- Ask AI Prof demo shows disabled search and three study notes.
- Polish Your Expression appears in the sidebar and has at least a lightweight static/short scripted demo.
- Pinned scroll section works on desktop and has safe mobile/reduced-motion fallback.
- Video modal works and lazy-loads assets.
- No backend AI/TTS/SSE/upload request occurs from the homepage demo.
- Mobile layout is usable at common breakpoints.
- CTA URLs are configurable.

## 17. Open Decisions

These should be finalized before implementation or during the implementation plan:

1. Exact app login/register URLs before subdomain split.
2. Whether `Langhub` or `LangPrepHub` is the final public-facing product name in the homepage header.
3. Whether numeric AI price examples should be public-facing or replaced with safer benefit copy.
4. Whether video assets will be screen recordings, animated mock videos, or CSS/React-rendered sequences.
5. Whether the English homepage should ship as a full page in V1 or as a lightweight placeholder.
