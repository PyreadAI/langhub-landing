# AGENTS.md

This file gives coding agents the project-specific rules for working in this
directory.

## Project Scope

- This is the standalone Next.js 14 App Router marketing landing site for
  LangPrepHub/Langhub.
- It is independent from the product app and backend. Do not import from parent
  app source directories and do not add backend/API integrations.
- The site is a frontend marketing mock. Existing demo modules must stay mock
  driven and must not call AI, TTS, audio upload, Express, or provider APIs.
- Default locale is Chinese at `/zh`; `/` redirects to `/zh`; English is at
  `/en`.

## Tech Stack

- Next.js 14, React 18, TypeScript strict mode.
- Tailwind CSS 3.4 with brand tokens in `src/app/globals.css`.
- GSAP/ScrollTrigger for the pinned practice section, loaded dynamically.
- Public environment values are `NEXT_PUBLIC_*` only.

## Common Commands

```bash
npm run dev      # Next dev server on http://localhost:4100
npm run build    # Production build
npm run start    # Production server on http://localhost:4000
npm run lint     # Next lint, if available in the installed Next version
```

If `next dev` reports a stale `./vendor-chunks/next.js` error, stop the server,
remove `.next`, and rerun `npm run dev`.

## Important Files

- `README.md`: project overview, runtime behavior, file layout, environment
  variables, and deployment notes.
- `docs/BRAND_GUIDE.md`: brand positioning, color system, motion and visual
  constraints. Follow this for UI changes.
- `docs/LANDING_PAGE_PRD.md`: product and page requirements.
- `src/data/landingCopy.ts`: all Chinese and English marketing copy.
- `src/app/globals.css`: design tokens, theme variables, and global component
  styles.
- `src/components/landing/`: landing page components.
- `src/components/landing/HeroDemo/`: mock product demo modules.
- `src/lib/assets.ts`: centralized public asset paths.
- `src/lib/routes.ts`: CTA and route helpers.

## Implementation Rules

- Preserve the standalone boundary. Do not couple this app to the product app,
  backend services, private secrets, or runtime server features.
- Keep copy changes type-safe by updating both locale structures in
  `src/data/landingCopy.ts`.
- Use existing component and styling patterns before adding new abstractions.
- Prefer semantic brand tokens and existing CSS variables over hard-coded
  colors.
- Keep components accessible: real links/buttons, labels for icon-only controls,
  keyboard support for dialogs and menus, and respectful reduced-motion behavior.
- Preserve `prefers-reduced-motion` fallbacks, especially around GSAP sections.
- Assets should live under `public/`; update `src/lib/assets.ts` when asset paths
  become shared.
- Do not introduce secrets. Browser-exposed config must use `NEXT_PUBLIC_*`.

## Design Direction

- The site should feel like a calm, focused AI language-learning workspace:
  precise, warm, credible, and exam-ready.
- Product UI should be the main visual signal. Avoid generic abstract art,
  childish mascot/gamified visuals, dense investor-style content, neon AI
  effects, high-saturation gradients, or pure black large sections.
- Stay aligned with the soft sage/warm paper/dark theme token system described
  in `docs/BRAND_GUIDE.md`.
- For app-like UI, prioritize compact, scannable controls and stable dimensions.
  Avoid nested cards and avoid decorative page-section cards.

## Testing And Verification

- For narrow code changes, run the most relevant check:
  - `npm run lint` for style/static issues when supported by the installed Next
    version.
  - `npm run build` before shipping broad routing, layout, metadata, or
    TypeScript changes.
- For visual/frontend changes, start `npm run dev` and inspect the changed routes
  at desktop and mobile widths.
- Verify both `/zh` and `/en` when changing shared layout, navigation, footer,
  CTA wiring, or copy schemas.
- If a command cannot be run because dependencies or local tooling are missing,
  report that clearly in the final response.

## Git And Workspace Hygiene

- The worktree may contain user changes. Do not revert or overwrite unrelated
  modifications.
- Keep edits scoped to the requested task.
- Do not commit unless explicitly asked.
- Avoid destructive commands such as `git reset --hard`, `git checkout --`, or
  broad `rm` operations unless the user explicitly requests them.
