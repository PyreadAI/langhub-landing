# Langhub Marketing Landing (V1)

A standalone Next.js 14 (App Router) marketing site for **Langhub**, the French AI
learning platform. This app lives next to — but is **fully independent from** — the
existing React/Vite product app at the repository root. It does not call the Express
backend, does not invoke any AI/TTS providers, and ships purely as a frontend mock.

## Stack

- Next.js 14 · App Router · TypeScript (strict)
- TailwindCSS 3.4 + a custom token system in `src/app/globals.css`
- GSAP + ScrollTrigger (loaded dynamically) for the pinned workflow section
- Locale routing: `/` redirects to `/zh` (default), `/en` is available
- Theme: soft sage light (default) + dark via `<html data-mode="soft|dark">` and `localStorage`

## Quick Start

```bash
cd landing
npm install
cp .env.example .env.local       # edit values if needed
npm run dev                      # http://localhost:4100
```

Other scripts:

```bash
npm run lint
npm run build
npm run start                    # serve a production build (port 4000)
```

The dev server runs on **port 4100** (production `next start` runs on port 4000)
so neither collides with the existing product app's dev/preview ports.

> **If `next dev` ever throws** `Cannot find module './vendor-chunks/next.js'`
> after switching ports or upgrading: stop the dev server (Ctrl+C), delete the
> `.next/` build cache (`rm -rf landing/.next`), then run `npm run dev` again.
> This is a known stale-bundle issue, not a code bug.

## Environment

All public values live in `.env.local` and are exposed via `NEXT_PUBLIC_*` —
the landing never reads private secrets.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_LOGIN_URL` | `https://app.langprephub.com/login` | "Log in" CTA destination |
| `NEXT_PUBLIC_APP_REGISTER_URL` | `https://app.langprephub.com/register` | "Try free" / "Start practicing free" CTAs |
| `NEXT_PUBLIC_MARKETING_SITE_URL` | `https://www.langprephub.com` | Canonical site URL for SEO/OG |
| `NEXT_PUBLIC_ASSET_BASE_URL` | _(empty)_ | Optional CDN root for `/public` assets |
| `NEXT_PUBLIC_REGION` | `global` | Region label (analytics only) |

## File layout

```
landing/
├── public/
│   ├── placeholder/
│   │   ├── writing-poster.svg     ← hero video poster (light)
│   │   └── speaking-poster.svg    ← hero video poster (dark)
│   └── videos/                    ← (optional) drop hero.mp4 / hero.webm here
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← html shell + theme bootstrap
│   │   ├── page.tsx               ← redirects "/" → "/zh"
│   │   ├── globals.css            ← brand tokens + components
│   │   ├── zh/page.tsx            ← Chinese landing (default locale)
│   │   └── en/page.tsx            ← English landing
│   ├── components/
│   │   ├── icons/MarketingIcons.tsx
│   │   └── landing/
│   │       ├── SiteHeader.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── HeroSection.tsx
│   │       ├── HeroDemo/          ← 8-module mock product showcase
│   │       ├── PinnedPracticeSection.tsx
│   │       ├── PlaceholderSections.tsx  (Product / Resources / Pricing / Contact)
│   │       ├── VideoModal.tsx
│   │       └── SiteFooter.tsx
│   ├── data/
│   │   ├── landingCopy.ts         ← all ZH + EN copy (incl. pricing footnotes)
│   │   └── demo/                  ← per-module mock data for the hero demo
│   └── lib/                       ← cn / locale / routes / analytics / reducedMotion / assets
└── package.json
```

## Sections

1. **SiteHeader** — Linear-style clean header that morphs into a "dynamic island"
   pill on scroll. Includes locale switcher (zh ↔ en) and a sun/moon `ThemeToggle`.
2. **HeroSection** — Eyebrow + serif headline + 3 CTAs ("Start free", "Pricing",
   "Watch 90s demo"). Below the fold sits **HeroDemoShell**, a faux Langhub
   product window cycling through 8 modules every ~5s (Dashboard, Writing,
   Speaking, Dictation, Conjugation, Vocabulary, AI Tutor, Expressions). All
   data is mock; no network calls happen.
3. **PinnedPracticeSection** — Apple-style pinned ScrollTrigger reveal of the
   4-step "Write → Grade → Capture → Spaced review" loop. With
   `prefers-reduced-motion: reduce` the section degrades to a stacked grid.
4. **ProductSection / ResourcesSection** — placeholder previews of upcoming pages.
5. **PricingSection** — three plans (¥0 Free / ¥58 Pro / ¥298 Team) with
   asterisk footnotes (`*¹ *² *³`) explained at the bottom of the section
   and echoed in the footer "Footnotes" block.
6. **ContactSection** — single CTA block linking to a `mailto:` address.
7. **VideoModal** — accessible `role="dialog"` modal with focus trap + ESC,
   `<video>` with `<source>` fallbacks and a graceful "video unavailable"
   message if the mp4/webm aren't found.
8. **SiteFooter** — three column footer (Product / Resources / Company),
   footnote echo, legal links, copyright row.

## Replacing placeholder assets

Drop real assets into `landing/public/` keeping the same filenames — no code
changes required. Paths are centralized in `src/lib/assets.ts`.

| Slot | Path | Notes |
| --- | --- | --- |
| Hero video poster (light) | `public/placeholder/writing-poster.svg` | A 16:9 SVG ships by default. Replace with `.svg`/`.png`/`.jpg` (≥ 1280×720). |
| Hero video poster (dark) | `public/placeholder/speaking-poster.svg` | Same constraints. |
| Hero demo video (mp4) | `public/videos/hero.mp4` | Optional; create the `videos/` folder. ≤ 10 MB recommended. |
| Hero demo video (webm) | `public/videos/hero.webm` | Optional fallback for mp4. |
| Open Graph image | `public/og.png` | 1200×630 recommended. |
| Favicon | `public/favicon.ico` | Standard 32×32 ICO. |

If both `hero.mp4` / `hero.webm` are missing the modal will show the localized
"video unavailable" message — the site keeps building either way.

## Theming

Two modes are supported: `soft` (warm paper / sage neutrals, default) and `dark`.
Choice is persisted to `localStorage["langhub.mode"]` and applied **before**
hydration via an inline script in `app/layout.tsx`, so there's no flash. Each
section opts into a context with a class:

- `.s-light` — always light tokens
- `.s-dark` — always dark tokens (used for the footer)
- `.s-auto` — follows the global `data-mode`

Components only consume the semantic `--s-*` variables, so adding a new section
just means picking the right class.

## Internationalization

Copy lives in a single file: `src/data/landingCopy.ts`. Both locales share the
same structure (`LandingCopy`); add new keys there and they will be type-checked
in every section. The locale switcher in `SiteHeader` simply links between
`/zh` and `/en`.

## Accessibility & motion

- All icons are `aria-hidden` unless given a `title`.
- The header uses real `<a>`s for navigation and a labeled menu button on mobile.
- The `VideoModal` is keyboard-trappable (ESC closes, focus returns to the trigger).
- The pinned section disables GSAP entirely under `prefers-reduced-motion: reduce`
  and renders a static stacked grid.
- All entrance animations declare `@media (prefers-reduced-motion: reduce)`
  short-circuits in `globals.css`.

## What this site does NOT do

- It never imports from `../src` (the product app) — components are duplicated
  on purpose to keep the marketing site stack-independent.
- It never calls the Express backend at `localhost:3000`, the OpenAI/Poe APIs,
  ElevenLabs, or any audio upload route.
- It never reads or writes browser audio/microphone permissions.

## Deployment notes

- Deploy independently (e.g. Vercel, Cloudflare Pages, Docker `next start`).
- Set `NEXT_PUBLIC_APP_LOGIN_URL` and `NEXT_PUBLIC_APP_REGISTER_URL` to the
  real product domain at build time.
- The site is fully static-friendly; nothing in the App Router uses dynamic
  server features at runtime.
