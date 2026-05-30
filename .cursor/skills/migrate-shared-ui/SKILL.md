---
name: migrate-shared-ui
description: >
  Migrate FitnessDuel pages from inline Tailwind button/card/avatar/badge patterns to shared UI components.
  Use when asked to migrate a page or component to shared UI, replace inline buttons with <Button>,
  inline cards with <Card>, inline avatars with <Avatar>, or inline badges with <Badge>.
---

# Migrate Shared UI Components

This skill migrates FitnessDuel consumer files to use the shared design system components.
It is safe to apply incrementally: one component type at a time, one file at a time.

## Before You Start

1. Read `app/components/ui/button.tsx` — know the exact variant and size options available.
2. Read `app/components/ui/card.tsx`, `app/components/ui/avatar.tsx`, `app/components/ui/badge.tsx`.
3. Read `.cursor/skills/migrate-shared-ui/reference.md` for the full API reference and pattern mappings.
4. Read the file you are about to migrate in full.

## Migration Order

Always migrate in this order — simplest components first:

1. `Button` — most instances, highest payoff
2. `Avatar` — 7 unique patterns, mostly mechanical replacement
3. `Badge` / `PillBadge` / `TierBadge` — straightforward variant swaps
4. `Card` — structural replacement, watch for nested children
5. `Icon` — only if explicitly asked; icon migration is low-priority

## Per-File Workflow

For each file you migrate:

```
1. Read the file completely
2. Identify all inline button/card/avatar/badge instances
3. Map each instance to the closest matching shared component variant
4. Make the replacement — one component type at a time
5. Add the component import: import { Button } from "@/app/components/ui/button"
6. Run: npx tsc --noEmit
7. Run: npm run lint
8. Fix any errors before proceeding
```

## Decision Tree for Unmatched Patterns

If an inline pattern does not map exactly to a shared component variant:

**Button**: If no variant matches, prefer `variant="primary"` (the default). Use `className` to add one small extra class only if necessary. If many extra classes are needed, the variant likely needs to be expanded in `button.tsx` first.

**Card**: If a card has custom padding or layout inside, use `padding="none"` and apply the padding manually to the children. Never fight the component.

**Avatar**: Use the closest size. If border or shadow is different, pass `borderColor` or `shadow` props. Do not add extra wrapper divs.

**Badge**: If a badge has unique text content (e.g., a number), use `PillBadge` with the closest visual style and pass the content as children.

## Import Pattern

Always use the `@/` alias:

```tsx
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { Badge, TierBadge, PillBadge } from "@/app/components/ui/badge"
import { Icon } from "@/app/components/ui/icon"
```

## Files to Migrate (in priority order)

1. `app/components/header/Header.tsx`
2. `app/components/sidebar/Sidebar.tsx`
3. `app/components/sidebar/MobileDrawer.tsx`
4. `app/components/pages/defis-page.tsx`
5. `app/components/pages/activite-page.tsx`
6. `app/components/pages/amis-page.tsx`
7. `app/components/pages/classements-page.tsx`
8. `app/components/pages/badges-page.tsx`
9. `app/components/pages/profil-page.tsx`
10. `app/components/coach/CoachPage.tsx`
11. `app/components/coach/ChatBubble.tsx`
12. `app/components/coach/ChatInput.tsx`
13. `app/components/coach/CoachSuggestions.tsx`
14. `app/components/coach/CoachIntro.tsx`
15. `app/components/modals/CreateChallengeModal.tsx`
16. `app/components/modals/SavePlanModal.tsx`
17. `app/components/tabs/AccueilTab.tsx`

See [reference.md](reference.md) for exact pattern mappings per file.

## Verification Checklist

After each file:
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run lint` — zero warnings
- [ ] Dev server renders the page correctly (no visual regressions)

After all files migrated:
- [ ] All checklist items above
- [ ] Update `docs/design-system-roadmap.md` — mark migrated files as done
