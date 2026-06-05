# FitnessDuel — AI Studio / AI Builder Context Guide

Paste the contents of this file into AI Studio (claude.ai/build or Google AI Studio) as project context before generating code for this project.

---

## Project Architecture

- **Framework**: Next.js 16.2.7 with App Router (`app/` directory)
- **Language**: TypeScript 5.9.3, strict mode
- **UI**: React 19.2.7 + Tailwind CSS v4 (CSS variables design system)
- **i18n**: `next-intl` v4 with `localePrefix: 'as-needed'`
- **State**: React Context (4 contexts) + `useLocalStorage` hook for persistence
- **Dark mode**: `next-themes`
- **Components**: 28 shared UI primitives in `app/components/ui/`
- **Icons**: `lucide-react` via shared `Icon` wrapper at `app/components/ui/icon.tsx`

## Component Import Paths (IMPORTANT)

```tsx
// All UI components use this path prefix:
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { TierBadge, PillBadge } from "@/app/components/ui/badge"
import { Icon } from "@/app/components/ui/icon"

// Context providers:
import { useUser } from "@/contexts/UserContext"
import { useChallenges } from "@/contexts/ChallengeContext"
import { useFriends } from "@/contexts/FriendsContext"
import { useChat } from "@/contexts/ChatContext"

// Hooks:
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { useUserProfile } from "@/app/hooks/useUserProfile"

// Constants:
import { XP_PER_LEVEL, XP_CHALLENGE_COMPLETED } from "@/lib/constants"
```

## Design System (CSS Variables)

### Color Tokens (use these in Tailwind classes)

```
Brand:
  --color-brand-blue: #0066ff   → bg-brand-blue / text-brand-blue
  --color-brand-cyan: #00ddff   → bg-brand-cyan / text-brand-cyan

Backgrounds (dark):
  --color-bg-dark: #050911      → bg-bg-dark
  --color-bg-card: #0d1520     → bg-bg-card
  --color-surface-raised: #090f19 → bg-surface-raised
  --color-surface-input: #070b12 → bg-surface-input
  --color-surface-overlay: #0b121e → bg-surface-overlay

Borders:
  --color-border-card: #1b2533  → border-border-card

Hover states:
  --color-hover-bg: #142031     → bg-hover-bg
  --color-hover-active: #15202f → bg-hover-active
  --color-hover-deep: #1a2b42   → bg-hover-deep
```

### Shadow Tokens

```
  --shadow-brand: 0 0 15px rgba(0,102,255,0.35) → shadow-brand
  --shadow-brand-lg: 0 0 20px rgba(0,102,255,0.5) → shadow-brand-lg
  --shadow-brand-focus: 0 0 12px rgba(0,102,255,0.15) → shadow-brand-focus
  --shadow-cyan: 0 0 15px rgba(0,221,255,0.15) → shadow-cyan
  --shadow-success: 0 0 12px rgba(52,211,153,0.15) → shadow-success
  --shadow-error: 0 0 12px rgba(244,63,94,0.15) → shadow-error
  --shadow-card: 0 10px 30px rgba(0,0,0,0.5) → shadow-card
  --shadow-modal: 0 15px 40px rgba(0,0,0,0.6) → shadow-modal
```

### Semantic Tailwind Classes (preferred over raw CSS vars)

Always prefer these semantic class names over raw color classes:

```
Backgrounds: bg-bg-dark, bg-bg-card, bg-surface-raised, bg-surface-input, bg-surface-overlay
Borders: border-border-card
Hover: bg-hover-bg, bg-hover-active, bg-hover-deep
Brand: text-brand-blue, text-brand-cyan, bg-brand-blue
Text: text-text-primary, text-text-secondary, text-text-muted
```

## Component API Reference

### Button
```tsx
<Button variant="primary" size="sm" loading={false}>
  Submit
</Button>
```
Variants: `primary`, `primarySmall`, `ghost`, `ghostText`, `secondary`, `destructive`, `whiteCta`, `social`, `icon`, `iconSmall`, `streak`, `pill`
Sizes: `xs`, `sm`, `md`, `lg`, `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`

### Card
```tsx
<Card variant="default" padding="lg">
  Content
</Card>
```
Variants: `default`, `elevated`, `interactive`, `overlay`, `input`
Padding: `none`, `sm`, `md`, `lg`, `xl`

### Avatar
```tsx
<Avatar src={url} alt={name} size="sm" fallback={name.slice(0,2)} shape="circle" />
```
Sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px), `2xl` (72px)
Shapes: `circle` (default), `square`

### TierBadge
```tsx
<TierBadge variant="tier-standard" size="md">
  Badge content
</TierBadge>
```
Variants: `tier-standard`, `tier-standard-locked`, `tier-rare-amber`, `tier-rare-emerald`, `tier-mythical`
Sizes: `sm` (80px min-h), `md` (140px), `lg` (200px)

### PillBadge
```tsx
<PillBadge variant="pill-xp" size="xs">+50 XP</PillBadge>
```
Variants: `pill-new`, `pill-status`, `pill-xp`, `pill-rank`, `pill-progress`, `pill-tier-count`
Sizes: `xs`, `sm`, `md`

### Icon Wrapper
```tsx
import { Trophy } from "lucide-react"
import { Icon } from "@/app/components/ui/icon"

<Icon icon={Trophy} size="sm" />
```
Sizes: `xs` (12px), `sm` (14px), `md` (16px), `lg` (18px), `xl` (20px), `2xl` (24px)

## Component Contract (for creating new components)

Follow this template for every new component:

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type MyComponentVariant = "default" | "highlighted"

const variantStyles: Record<MyComponentVariant, string> = {
  default: "bg-bg-card border border-border-card rounded-2xl",
  highlighted: "bg-surface-raised border border-brand-blue/30 rounded-2xl",
}

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MyComponentVariant
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"
```

## Constants to Use

```typescript
// Always use constants instead of magic numbers
import { XP_PER_LEVEL, XP_CHALLENGE_COMPLETED, XP_FRIEND_ADDED,
         CHALLENGE_MAX_PARTICIPANTS, DEFAULT_CHALLENGE_TIME } from "@/lib/constants"
```

## Anti-Patterns (never do these)

1. **Never use hardcoded colors** — `bg-blue-600`, `text-slate-400`, `border-slate-700/40` → use semantic CSS variables
2. **Never use inline `<button>`** — always use `<Button variant="...">`
3. **Never hardcode magic numbers** — extract to `lib/constants.ts`
4. **Never use `@/components/ui/`** — the correct path is `@/app/components/ui/`
5. **Never read localStorage in useState initializer** — use `useEffect` sync pattern (see `useLocalStorage.ts`)
6. **Never use `useState` inside handlers** — state updates belong in effects or event handlers, never pass `setState` into a `useEffect` dependency array
7. **Never create one-off badge components** — use `TierBadge` or `PillBadge`
8. **Never use `displayName` as string literals** — always use the component reference: `MyComponent.displayName = "MyComponent"`

## Prompt Template for Generating New Pages

Use this template when the user asks to create a new page:

```
Create a new page at `app/components/pages/NAME-page.tsx` for the FitnessDuel app.

Requirements:
- "use client" directive
- Import shared UI from @/app/components/ui/
- Import types from @/app/types
- Use Tabs-style page structure with motion.div + AnimatePresence
- Use ONLY semantic CSS variable classes (bg-bg-card, border-border-card, etc.)
- Export as default function NAMEPage with typed props interface
- Include empty state handling
- Use framer-motion for page transitions
```

## Checklist Before Submitting Generated Code

- [ ] `"use client"` on all interactive components
- [ ] All imports use `@/app/components/ui/` prefix (NOT `@/components/ui/`)
- [ ] All colors use semantic CSS variable classes
- [ ] No inline `<button>` — use `<Button>`
- [ ] No magic numbers — use constants from `lib/constants.ts`
- [ ] `forwardRef` + `displayName` on all exported components
- [ ] `npx tsc --noEmit` passes
- [ ] Component fits the existing design system (card-based, dark theme)
