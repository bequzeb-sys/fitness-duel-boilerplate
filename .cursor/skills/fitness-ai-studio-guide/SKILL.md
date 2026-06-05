# FitnessDuel — AI Builder / AI Studio Guide

Use this skill to paste project context into AI Studio or AI Builder before generating code.

## Architecture

- **Next.js 16.2.7** App Router, TypeScript strict mode
- **UI path**: `@/app/components/ui/` (28 shared components)
- **State**: React Context + `useLocalStorage` hook
- **i18n**: `next-intl` v4
- **Design**: CSS variables in `app/globals.css` — dark theme, blue/cyan brand

## Design Tokens

### Colors (always use semantic classes)
```
bg-bg-dark, bg-bg-card, bg-surface-raised, bg-surface-input, bg-surface-overlay
border-border-card
text-brand-blue, text-brand-cyan
bg-hover-bg, bg-hover-active, bg-hover-deep
shadow-brand, shadow-brand-lg, shadow-brand-focus
```

### Button Variants (13)
`primary`, `primarySmall`, `ghost`, `ghostText`, `secondary`, `destructive`, `whiteCta`, `social`, `icon`, `iconSmall`, `streak`, `pill`

### Card Variants (5)
`default`, `elevated`, `interactive`, `overlay`, `input`

## Critical Anti-Patterns

1. **Never use hardcoded colors** — `bg-blue-600`, `text-slate-400` → use semantic classes
2. **Never use inline `<button>`** — use `<Button>` from `@/app/components/ui/button`
3. **Never use `@/components/ui/`** — correct path is `@/app/components/ui/`
4. **Never use magic numbers** — extract to `lib/constants.ts`
5. **Never read localStorage in useState initializer** — use the `useLocalStorage` hook's `useEffect` sync pattern

## Standard Prompt Template

```
Create a new page at `app/components/pages/NAME-page.tsx` for the FitnessDuel app.

Requirements:
- "use client" directive
- Import shared UI from @/app/components/ui/
- Import types from @/app/types
- Use motion.div + AnimatePresence for page transitions
- Use ONLY semantic CSS variable classes (bg-bg-card, border-border-card, etc.)
- Export as default function NAMEPage with typed props interface
- Include empty state handling
- Use framer-motion for transitions
```

## Checklist Before Submitting Code

- [ ] `"use client"` on all interactive components
- [ ] All imports use `@/app/components/ui/` (NOT `@/components/ui/`)
- [ ] All colors use semantic CSS variable classes
- [ ] No inline `<button>` — use `<Button>`
- [ ] No magic numbers — use constants from `lib/constants.ts`
- [ ] `forwardRef` + `displayName` on all exported components
- [ ] `npx tsc --noEmit` passes
- [ ] Component fits the dark theme design system
