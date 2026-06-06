---
name: fitness-frontend-workflow
description: >-
  Preserve FitnessDuel frontend consistency when rebuilding pages, adding UI functionality,
  creating cards/components, or refactoring feature surfaces. Use when working on React/Next.js
  frontend files, page sections, shared UI adoption, responsive polish, or deciding whether code
  belongs in `components/ui` versus feature folders.
---

# Fitness Frontend Workflow

Use this skill for page rebuilds, UI refactors, new cards/components, responsive polish, and feature-surface updates that must stay aligned with the FitnessDuel design system.

## Required reads before editing

1. Read `.cursorrules`.
2. Read the target file completely.
3. Read the relevant shared primitives before creating or replacing UI:
   - `components/ui/button.tsx`
   - `components/ui/card.tsx`
   - `components/ui/avatar.tsx`
   - `components/ui/badge.tsx`
   - `components/ui/icon.tsx`
   - `components/ui/typography.tsx`
   - form primitives if forms are involved
4. If the task is replacing inline UI with shared primitives, also read:
   - `.cursor/skills/migrate-shared-ui/SKILL.md`
   - `.cursor/skills/migrate-shared-ui/reference.md`

## Core decisions

### Choose the right location
- Put reusable primitives or repeated UI patterns in `components/ui`.
- Put feature-specific composition in `components/pages`, `components/coach`, `components/modals`, `components/sidebar`, `components/header`, or `components/tabs`.
- Put routes, layouts, hooks, and app-level libraries in `app/` only when they belong to the Next.js app structure.

### Reuse before creating
Before building custom JSX or Tailwind classes, check whether the UI is already covered by:
- `Button`
- `Card`
- `Avatar`
- `Badge`, `PillBadge`, `TierBadge`
- `Icon`
- `Input`, `Textarea`, `Select`, `Switch`
- `Heading`, `Body`, `Label`, `Caption`
- compound shared components such as `StatCard`, `FriendRow`, `ActivityItem`, `FeatureCard`, `EmptyState`, `CtaBanner`

If an existing primitive is close, reuse it first. Only extend the primitive if the pattern is repeatable and the current API is too narrow.

### Keep logic and presentation separate
- Keep shared state in the page container or in hooks following repo conventions.
- Keep presentational components focused on rendering and event surfaces.
- Avoid mixing large stateful workflows into low-level UI primitives.

## Frontend implementation workflow

For each frontend task:

1. Read the full target file and understand the current behavior.
2. Identify repeated UI patterns, layout blocks, and interaction points.
3. Decide whether each part is:
   - a shared primitive concern
   - a feature-level component concern
   - an app/page state concern
4. Replace or compose using shared UI primitives before introducing custom styling.
5. Use semantic tokens and existing variants instead of hardcoded colors or one-off styling.
6. Move visible strings to translations rather than hardcoding UI text.
7. Preserve responsiveness, interaction states, and accessibility.
8. Keep imports aligned with repo aliases and folder conventions.

## Specific rules

### Text and translations
- Do not hardcode user-visible strings in components.
- Add new strings to `app/[locale]/locales/fr.json` under the correct namespace.
- Use `useTranslations()` for client components.

### Styling
- Prefer semantic classes such as `bg-bg-*`, `text-text-*`, `border-border*`, `bg-brand`, `text-brand`.
- Do not introduce `bg-[#...]`, `text-slate-*`, `text-white`, `bg-blue-*`, or similar hardcoded visual tokens unless the repo already defines a deliberate exception.
- Prefer existing shared variants over large custom `className` overrides.

### Components
- If the pattern is reusable across screens, promote it to a shared component.
- If it is unique to one feature surface, keep it local to that feature folder.
- Do not duplicate an existing shared component pattern with slightly different markup.

### Accessibility and UX
- Preserve visible focus states.
- Keep icon-only controls labeled.
- Avoid regressions in hover, disabled, loading, empty, and mobile states.

## Verification checklist

Before finishing frontend work:

- Shared UI primitives were reused where appropriate.
- No visible strings were hardcoded.
- Semantic tokens were used instead of hardcoded visual styles.
- Reusable patterns were not buried in feature files.
- Feature-specific composition was not pushed into `components/ui` without reuse justification.
- Responsiveness and interaction states still make sense.
- `npx tsc --noEmit` passes.
- `npm run lint` passes.
- The affected surface renders correctly in dev.

## Escalation rules

- If a requested UI does not fit an existing primitive and the pattern is likely reusable, extend the shared primitive instead of creating a one-off duplicate.
- If the task is mostly inline button/card/avatar/badge replacement, switch to the `migrate-shared-ui` workflow.
- If uncertain whether something belongs in shared UI or a feature folder, choose the feature folder first unless reuse is clearly likely.
