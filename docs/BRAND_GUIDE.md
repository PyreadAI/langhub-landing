# LangPrepHub Brand Guide

> Scope: public marketing website / landing page.
> Audience: serious language learners, exam candidates, and users who have outgrown casual language apps.
> Product positioning: an AI practice workspace for writing, speaking, dictation, vocabulary, expressions, conjugation, and study notes.

## 1. Brand Positioning

LangPrepHub is not a casual gamified language app and should not visually compete with products such as Duolingo. It can coexist with casual learning tools by serving the next step: learners who want structured feedback, exam readiness, stronger output skills, and long-term learning records.

The brand should feel like a focused AI language coach and a polished study workspace. It should be calm enough for long sessions, credible enough for exam preparation, and warm enough to reduce friction for first-time users.

Core brand keywords:

- Precise
- Calm
- Focused
- Intelligent
- Exam-ready
- Warm but not childish
- Sophisticated but approachable

Primary brand idea:

```text
Practice with feedback, not guesswork.
```

Chinese expression:

```text
每一次练习，都变成下一次进步的材料。
```

## 2. Design Philosophy

### 2.1 Core Style

The visual direction is **Soft Neo-Minimal Learning Workspace**.

It combines:

- Linear-like product-first presentation: the product interface is the hero, not an abstract illustration.
- Apple-like scroll storytelling: each section reveals one product value with controlled motion.
- Muted pastel warmth: sage, warm paper, ink, low-saturation violet, soft green, muted amber, muted rose.
- Monochromatic muted palette: most surfaces should stay within sage, paper, cream, and ink variations; accent colors should appear only where they clarify product state.
- Layered interface cards: gentle depth, stacked product panels, clear foreground/background hierarchy.
- Approachable sophistication: premium but not cold, friendly but not playful.

### 2.1.1 Execution Principles

These rules translate the visual direction into implementation decisions:

- Muted and pastel by default: use low-saturation colors, soft contrast, and warm neutrals.
- Monochromatic first: build the page from sage, paper, cream, and ink before adding accent colors.
- Product UI as decoration: layered cards should come from real or realistic product states, not from generic abstract shapes.
- Neo-minimalism over minimal emptiness: keep layouts simple, but preserve enough detail to show product value.
- Approachable sophistication: make the page feel premium and calm while still inviting first-time users to start practicing.
- Conversion clarity: every major visual block should support registration, demo viewing, or product understanding.

### 2.2 What To Avoid

Do not use:

- Duolingo-style mascots, childish rewards, cartoon-heavy illustration, or game-like tone.
- Investor-deck language such as market size, TAM/SAM/SOM, valuation, fundraising, founder biography, or competitor funding tables.
- Overstated claims such as "global first", "no competitors", "revolutionary", or "disruptive".
- Dense data tables on the public website.
- Pure black backgrounds for large sections.
- High-saturation gradients or neon AI effects.
- Decorative particle systems, excessive 3D, or scroll-jacking.

### 2.3 Visual References

Use these references as method-level inspiration, not as templates to copy:

- Linear: product UI as primary visual, elegant dark surfaces, fast tool-like clarity.
- Apple: one idea per section, generous spacing, scroll-based reveal, product storytelling.
- Claude / Anthropic: warm restraint, editorial calm, low-saturation palette.
- Notion / Arc: quiet interactivity and functional micro-motion.

## 3. Color System

The landing page should support two marketing modes:

- `soft`: default public website mode, muted sage and warm paper.
- `dark`: optional high-contrast mode for hero sections, footer, or future dark theme.

Use `<html data-mode="soft">` or `<html data-mode="dark">`.

### 3.1 Shared Light Tokens

Use these tokens for `.s-light` sections.

```css
:root {
  --lt-bg: #F4EFE6;
  --lt-bg-soft: #EEF1EA;
  --lt-surface: #FFFFFF;
  --lt-surface-2: #FAF8F3;
  --lt-ink: #1F2420;
  --lt-muted: #71796F;
  --lt-line: #DDD8CD;
  --lt-icon-bg: #D5DED0;
  --lt-icon-stroke: #887A66;
}
```

Token meanings:

- `--lt-bg`: warm paper background for large light sections.
- `--lt-bg-soft`: muted sage-tinted page background.
- `--lt-surface`: card and product panel surface.
- `--lt-surface-2`: secondary card background.
- `--lt-ink`: primary text, deep green-black rather than pure black.
- `--lt-muted`: secondary text.
- `--lt-line`: borders and dividers.
- `--lt-icon-bg`: icon container background.
- `--lt-icon-stroke`: icon stroke color.

### 3.2 Brand Tokens

```css
:root {
  --primary: #5A8C7E;
  --primary-hover: #4A7A6E;
  --primary-soft: #C7DDB5;
  --primary-glow: rgba(90, 140, 126, 0.25);

  --accent: #B8A472;
  --ai: #8B85B8;
  --ai-bright: #A9A1D4;
  --progress: #6F9A82;
  --warning: #C9A25D;
  --error: #B87575;
}
```

Usage rules:

- `--primary`: main CTA, active states, key links.
- `--primary-soft`: selected states, correct answers, soft progress fills.
- `--accent`: warm highlights and advice markers.
- `--ai`: AI features, model indicators, intelligent analysis.
- `--progress`: mastery, completion, improvement.
- `--warning`: focus points or suggestions.
- `--error`: corrections and mistakes.

### 3.3 Soft Mode Dark Tokens

Use these tokens when `<html data-mode="soft">`.

```css
[data-mode="soft"] {
  --dk-bg: #3D5248;
  --dk-surface: #486054;
  --dk-text: #E8E4DB;
  --dk-muted: rgba(255, 255, 255, 0.62);
  --dk-line: rgba(255, 255, 255, 0.12);
  --dk-icon-bg: rgba(232, 228, 219, 0.09);
  --dk-icon-stroke: #C8BC9E;
  --dk-primary: #8CC4B2;
  --nav-bg: rgba(61, 82, 72, 0.9);
  --hero-from: #2A3C35;
  --hero-to: #4A6058;
  --footer-bg: #2B3B34;
}
```

### 3.4 Dark Mode Tokens

Use these tokens when `<html data-mode="dark">`.

```css
[data-mode="dark"] {
  --dk-bg: #15201B;
  --dk-surface: #1C2822;
  --dk-text: #E8E4DB;
  --dk-muted: rgba(255, 255, 255, 0.52);
  --dk-line: rgba(255, 255, 255, 0.08);
  --dk-icon-bg: rgba(110, 170, 156, 0.08);
  --dk-icon-stroke: #C4B99A;
  --dk-primary: #6EAA9A;
  --nav-bg: rgba(21, 32, 27, 0.92);
  --hero-from: #0E1814;
  --hero-to: #1A2C25;
  --footer-bg: #0D1410;
}
```

### 3.5 Section Context Tokens

Sections must use `.s-light` or `.s-dark`. Components should consume only `--s-*` semantic variables.

```css
.s-light {
  --s-bg: var(--lt-bg);
  --s-surface: var(--lt-surface);
  --s-surface-2: var(--lt-surface-2);
  --s-text: var(--lt-ink);
  --s-muted: var(--lt-muted);
  --s-line: var(--lt-line);
  --s-icon-bg: var(--lt-icon-bg);
  --s-icon-stroke: var(--lt-icon-stroke);
  --s-primary: var(--primary);
  --s-title: var(--lt-ink);
  --s-shadow: rgba(31, 36, 32, 0.07);
  --s-shadow-hover: rgba(31, 36, 32, 0.13);
}

.s-dark {
  --s-bg: var(--dk-bg);
  --s-surface: var(--dk-surface);
  --s-surface-2: rgba(255, 255, 255, 0.05);
  --s-text: var(--dk-text);
  --s-muted: var(--dk-muted);
  --s-line: var(--dk-line);
  --s-icon-bg: var(--dk-icon-bg);
  --s-icon-stroke: var(--dk-icon-stroke);
  --s-primary: var(--dk-primary);
  --s-title: var(--dk-text);
  --s-shadow: rgba(0, 0, 0, 0.14);
  --s-shadow-hover: rgba(0, 0, 0, 0.24);
}
```

### 3.6 Color Rules

- Do not use `#000000` for text or backgrounds.
- Use pure `#FFFFFF` only for limited card surfaces, not full-page backgrounds.
- Use warm paper and sage neutrals as the visual base.
- Use semantic colors sparingly. The page should read as muted and calm.
- Error/correction colors must be muted, never aggressive red.
- Use monochromatic sage/paper variations for most decorative surfaces.

## 4. Typography

### 4.1 Font Strategy

The public website can use a more editorial type system than the product app, but it must remain readable and fast.

Recommended implementation:

- English display: `Instrument Serif` or a self-hosted equivalent.
- Chinese display: `Noto Serif SC` only where the page needs an editorial headline.
- Body and UI: `DM Sans`, `Inter`, `Geist`, or system sans.
- Chinese body fallback: `PingFang SC`, `Microsoft YaHei`, `Noto Sans SC`, sans-serif.

Production note:

- For the international landing site, use `next/font` or self-hosted fonts where practical.
- For future China deployment, avoid relying on Google Fonts CDN. Prefer self-hosted `woff2` or system font fallbacks.
- Do not load large Chinese web font files unless the design truly requires them.

### 4.2 Font Stacks

```css
:root {
  --font-display-en: "Instrument Serif", Georgia, serif;
  --font-display-zh: "Noto Serif SC", "Songti SC", "SimSun", serif;
  --font-sans: "DM Sans", Inter, "PingFang SC", "Microsoft YaHei", sans-serif;
}
```

### 4.3 Typography Rules

- Hero headline may use a serif display font at weight `400`.
- Product UI labels, demo panels, navigation, buttons, tags, and feature cards should use sans-serif.
- Avoid heavy serif for dense Chinese copy.
- Body text should be compact and readable, not poetic.
- Do not use negative letter-spacing.
- Use `clamp()` for responsive display sizes.

Recommended scale:

```css
--text-xs: 12px;
--text-sm: 14px;
--text-md: 16px;
--text-lg: 18px;
--text-xl: 22px;
--text-2xl: clamp(28px, 3vw, 40px);
--text-hero: clamp(42px, 6vw, 76px);
```

Line height:

- Hero: `1.02` to `1.12`.
- Section heading: `1.15` to `1.25`.
- Body: `1.65` to `1.75`.
- UI text: `1.3` to `1.5`.

Section label:

```css
.section-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--s-primary);
}
```

## 5. Icon System

### 5.1 Style

Use thin outlined icons. The icon language should feel calm and instructional, not decorative.

Preferred source:

- Use `lucide-react` in React/Next components where possible.
- Custom inline SVG is allowed for product-specific symbols.
- Do not use emoji as icons in the landing page UI.
- Do not use icon fonts.

Default SVG settings:

```html
<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
>
</svg>
```

### 5.2 Icon Wrapper

```css
.icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--s-icon-bg);
  color: var(--s-icon-stroke);
}

.icon-wrap svg {
  width: 22px;
  height: 22px;
}
```

Rules:

- No hard-coded icon colors inside SVG paths.
- No heavy filled icons.
- Keep custom icons to 1 to 4 basic shapes when possible.

## 6. Shape, Radius, and Spacing

### 6.1 Radius Tokens

```css
:root {
  --r-xs: 8px;
  --r-sm: 12px;
  --r-md: 20px;
  --r-lg: 28px;
  --r-xl: 36px;
  --r-pill: 999px;
}
```

Usage:

- Product app UI inside demos: `8px` to `16px`.
- Landing feature cards: `20px` to `28px`.
- Hero product stage: `28px` to `36px`.
- Buttons and tags: `999px`.

### 6.2 Spacing Scale

Use an 8px-based spacing system:

```text
4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96, 120
```

Section padding:

```css
.section {
  padding: 104px 32px;
}

@media (max-width: 768px) {
  .section {
    padding: 72px 20px;
  }
}
```

Container:

```css
.container {
  width: min(1160px, calc(100vw - 40px));
  margin: 0 auto;
}
```

## 7. Component Standards

### 7.1 Buttons

Primary button:

- Background: `var(--primary)`.
- Hover: `var(--primary-hover)`.
- Text: warm white.
- Radius: `var(--r-pill)`.
- Shadow: subtle, using `--primary-glow`.
- Motion: `translateY(-1px)` on hover.

Secondary button:

- Light sections: `var(--lt-surface)` background, `var(--lt-line)` border.
- Dark sections: transparent background, `var(--dk-line)` border.
- Radius: `var(--r-pill)`.

Button CSS baseline:

```css
.btn {
  border-radius: var(--r-pill);
  padding: 12px 20px;
  font: 600 14px/1 var(--font-sans);
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}

.btn:hover {
  transform: translateY(-1px);
}
```

### 7.2 Cards

Landing cards should be layered and soft, not flat to the point of lifelessness. Use very restrained borders and shadows.

```css
.card {
  background: var(--s-surface);
  border: 1px solid var(--s-line);
  border-radius: var(--r-md);
  box-shadow: 0 1px 4px var(--s-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 34px var(--s-shadow-hover);
  border-color: color-mix(in srgb, var(--s-primary) 42%, var(--s-line));
}
```

Card usage:

- Use cards for repeated feature modules, testimonials, pricing, FAQ, and demo panels.
- Do not put the entire page inside cards.
- Avoid nested cards unless representing a product UI screenshot or a layered demo.

### 7.3 Product Demo Stage

The demo stage is the most important visual component of the landing page.

Recommended structure:

```text
.demo-stage
  .demo-frame
    .demo-progress
    .demo-tabs
    .demo-panel
      product-specific cards
```

Visual rules:

- Outer frame: warm paper or muted dark surface.
- Inner cards: white or low-opacity panels.
- Use layered cards to show AI feedback, not decorative floating shapes.
- Use real product states: correction, transcript, diff, notes, mastery.
- Never use fake generic dashboard charts as the main hero.

### 7.4 Tags and Badges

```css
.tag {
  border-radius: var(--r-pill);
  padding: 5px 10px;
  font: 600 11px/1 var(--font-sans);
  letter-spacing: 0.06em;
}

.tag-ai {
  background: rgba(139, 133, 184, 0.12);
  color: var(--ai);
}

.tag-progress {
  background: rgba(111, 154, 130, 0.12);
  color: var(--progress);
}

.tag-warning {
  background: rgba(201, 162, 93, 0.13);
  color: var(--warning);
}
```

Do not overuse badges. They should clarify product state, not decorate copy.

### 7.5 Navigation

Navigation should be simple and conversion-oriented.

Desktop nav:

- Left: `LangPrepHub` wordmark.
- Center: `Features`, `Demo`, `How it works`, `Pricing`.
- Right: language switcher, `Sign in`, primary CTA.

Mobile nav:

- Collapsed menu.
- CTA always visible if space allows.

Style:

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(24px);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--dk-line);
}
```

If the nav appears on a light section, use a light variant with `rgba(244, 239, 230, 0.86)`.

### 7.6 Language Switcher

The public website must support Chinese and English.

Rules:

- Stable SEO routes: `/zh` and `/en`.
- Do not rely only on browser-language rendering.
- Use explicit language switcher in nav and footer.
- Remember user preference with a cookie/localStorage.
- Default `/` can redirect based on `Accept-Language`.

Labels:

```text
中文
English
```

Do not use flags as the only language selector.

## 8. Motion System

### 8.1 Motion Philosophy

Motion should explain the product, not decorate the page.

Good motion:

- Writing corrections highlight progressively.
- Speaking waveform becomes transcript.
- Dictation diff aligns user input and expected text.
- AI Search note sections appear as structured output.
- Progress bar fills as the learning loop advances.

Avoid:

- Scroll-jacking.
- Particle effects.
- Full-page spinning 3D.
- Constant movement behind text.
- Long animations before users can read or click.

### 8.2 Technology Choice

Default recommendation for this project:

- Use CSS transitions for hover and small state changes.
- Use `framer-motion` or `motion` for React/Next UI reveal and demo transitions.
- Use GSAP + ScrollTrigger only if a specific scroll-driven sequence cannot be implemented cleanly with simpler tools.
- Use Lenis only if smooth scroll is needed after performance testing.

Reasoning:

- The existing product already uses React and `framer-motion`.
- The landing site should avoid unnecessary animation dependencies in its first version.
- SEO, performance, and maintainability matter more than complex animation.

### 8.3 Motion Parameters

Entry animation:

```text
opacity: 0 -> 1
translateY: 24px -> 0
duration: 0.55s to 0.7s
ease: cubic-bezier(0.22, 1, 0.36, 1)
```

Stagger:

```text
0.06s to 0.09s between related elements
```

Hover:

```text
translateY(-1px) for buttons
translateY(-3px) for cards
duration: 0.22s to 0.3s
```

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

## 9. Visual Texture and Decoration

Allowed:

- Very soft radial glows using brand colors at 4% to 8% opacity.
- Light paper-like backgrounds via solid color, not image textures.
- Thin dividers and soft borders.
- Product UI layers as visual interest.

Use sparingly:

```css
.soft-glow {
  background: radial-gradient(circle at 50% 50%, rgba(90, 140, 126, 0.08), transparent 62%);
}
```

Avoid:

- Noise textures.
- Decorative bokeh orbs.
- High-contrast grids.
- Stock photos.
- Decorative gradients that do not explain the product.

## 10. Content and Copy Rules

### 10.1 Voice

The brand voice should be clear, practical, and encouraging.

Use:

```text
Write an essay. Get structured feedback.
Practice speaking and see what to improve.
Turn corrections into review material.
```

Avoid:

```text
Revolutionize your language learning.
The world's first full-stack language exam platform.
Massive AI disruption in a trillion-dollar market.
```

### 10.2 Public Website Copy

The public website should focus on user outcomes:

- Practice more often.
- Get feedback faster.
- Know what to improve.
- Keep all records in one place.
- Prepare for exams with structure.

Do not show:

- Fundraising content.
- Market sizing.
- Founder credentials as a main section.
- Dense cost tables.
- Unverified competitive claims.

### 10.3 Product Module Naming

Preferred public names:

- AI Writing Correction
- Speaking Evaluation
- Dictation Training
- Vocabulary Workspace
- Expression Practice
- Conjugation Trainer
- AI Study Notes

Chinese:

- AI 写作批改
- 口语评估
- 听写训练
- 词汇工作台
- 表达训练
- 动词变位训练
- AI 学习笔记

## 11. Landing Page Section Standards

The first version of the website should prioritize conversion.

Recommended homepage structure:

1. Hero: product claim, CTA, and interactive product stage.
2. Product demo tabs: writing, speaking, dictation, AI notes.
3. Learning loop: practice, feedback, review, improve.
4. Built for serious learners: exam preparation and long-term learning.
5. Feature modules: concise feature cards.
6. Trust and control: saved records, model choices, privacy, language support.
7. Pricing or free trial: simple and transparent.
8. Final CTA.

The homepage should not start with a market problem chart.

## 12. Responsive Rules

Breakpoints:

```text
>= 1024px: desktop layout, 2-column hero, multi-card feature grids.
768px to 1023px: tablet layout, stacked hero with full-width demo.
<= 767px: mobile layout, single column, simplified demo interactions.
```

Mobile rules:

- Hero headline should be no larger than 44px.
- Product demo panels must not overflow horizontally.
- Tabs should scroll horizontally or become a compact segmented control.
- Avoid tiny UI screenshots that cannot be read.
- CTA should remain visible near the first viewport.

## 13. Technical Implementation Rules

### 13.1 Planned Stack

The marketing site is planned as a separate project from the current Vite app.

Recommended stack:

- Next.js App Router
- TypeScript
- Tailwind CSS or CSS Modules with CSS custom properties
- Framer Motion / Motion for lightweight interaction
- Static or mock demo data in the first version

The existing product app remains:

- React 18
- Vite
- TypeScript
- TailwindCSS
- Express API under `/api/*`

### 13.2 Deployment Context

Recommended domain structure:

```text
langprephub.com       -> marketing website
www.langprephub.com   -> redirect to langprephub.com
app.langprephub.com   -> existing learning product
```

Future China deployment:

```text
langprephub.cn or cn.langprephub.com
app.langprephub.cn or app-cn.langprephub.com
```

### 13.3 SEO and Localization

Rules:

- Use stable localized routes: `/zh` and `/en`.
- Generate page-level metadata.
- Use canonical URLs.
- Use `hreflang` alternates for Chinese and English pages.
- Do not hide all localized content behind client-side language switching.

### 13.4 API Boundaries

The marketing site should not depend on authenticated product APIs in the first version.

Allowed:

- Static demo data.
- Pre-recorded product videos.
- CTA links to `app.langprephub.com/register`.
- Email capture endpoint if needed.

Not recommended in the first version:

- Anonymous AI generation.
- Anonymous audio upload.
- Anonymous long-running SSE requests.

If future marketing demos call live AI APIs, Nginx timeout, buffering, and body-size rules must be reviewed before deployment.

## 14. QA Checklist

Before shipping any landing page code, verify:

- `<html>` has `data-mode`.
- Page has stable `/zh` and `/en` routes.
- Sections use `.s-light` or `.s-dark`.
- Component colors consume `--s-*` semantic variables.
- No pure black `#000000` appears in UI CSS.
- No high-saturation neon colors are introduced.
- Buttons use `--r-pill`.
- Feature cards use `--r-md` or `--r-lg`.
- Product demo stage is visible above the fold on desktop.
- Mobile first viewport includes headline, product signal, and CTA.
- Motion respects `prefers-reduced-motion`.
- Demo copy is user-outcome focused, not investor focused.
- CTA destination is correct for production domain planning.
- Chinese and English pages have appropriate metadata.
- Performance is checked before adding heavy animation libraries.
