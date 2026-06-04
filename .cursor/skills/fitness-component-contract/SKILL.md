# FitnessDuel Component Contract

Use this skill when the user asks to create a new component, build a UI element, or add a shared component to the design system.

## When This Skill Activates

- "Create a new component"
- "Build a button/card/avatar"
- "Add a [ui element]"
- "Create a shared component"
- Any request involving `app/components/ui/`

## Design Token Quick Reference

### Colors (use semantic classes)
```
bg-bg-dark, bg-bg-card, bg-surface-raised, bg-surface-input, bg-surface-overlay
border-border-card
text-brand-blue, text-brand-cyan
bg-hover-bg, bg-hover-active, bg-hover-deep
shadow-brand, shadow-brand-lg, shadow-brand-focus
```

### Icons — always wrap lucide-react with `Icon` component
```tsx
import { Trophy } from "lucide-react"
import { Icon } from "@/app/components/ui/icon"

<Icon icon={Trophy} size="sm" />
```

## Component File Location Rules

| Component Type | Location |
|---|---|
| Shared UI primitive (Button, Card, Avatar, Badge) | `app/components/ui/` |
| Feature page section | `app/components/pages/` |
| Coach chat components | `app/components/coach/` |
| Sidebar / Header | `app/components/sidebar/`, `app/components/header/` |
| Domain-specific component | `app/components/domains/[domain]/` |
| Context provider | `contexts/` |
| Custom hook | `app/hooks/` |

## Standard Component Template

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ComponentVariant = "default" | "highlighted"

const variantStyles: Record<ComponentVariant, string> = {
  default: "bg-bg-card border border-border-card rounded-2xl",
  highlighted: "bg-surface-raised border border-brand-blue/30 rounded-2xl",
}

const sizeStyles: Record<string, string> = {
  sm: "text-xs px-3 py-2",
  md: "text-sm px-4 py-3",
  lg: "text-base px-5 py-4",
}

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ComponentVariant
  size?: "sm" | "md" | "lg"
}

export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = "default", size = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"
```

## Button Variants (13 total — use existing component, do not re-create)
`primary`, `primarySmall`, `ghost`, `ghostText`, `secondary`, `destructive`, `whiteCta`, `social`, `icon`, `iconSmall`, `streak`, `pill`

## Card Variants (5 total — use existing component)
`default`, `elevated`, `interactive`, `overlay`, `input`

## Avatar Sizes (6 total — use existing component)
`xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px), `2xl` (72px)

## Badge Variants (TierBadge + PillBadge)
Tier: `tier-standard`, `tier-standard-locked`, `tier-rare-amber`, `tier-rare-emerald`, `tier-mythical`
Pill: `pill-new`, `pill-status`, `pill-xp`, `pill-rank`, `pill-progress`, `pill-tier-count`

## Naming Conventions

- File: `kebab-case.tsx` → `my-component.tsx`
- Component: PascalCase → `MyComponent`
- Variant type: `ComponentVariant = "default" | "highlighted"`
- Variant record: `variantStyles: Record<ComponentVariant, string>`
- Props interface: `ComponentProps extends React.HTMLAttributes<HTMLDivElement>`
- DisplayName: `Component.displayName = "Component"`

## Always Do

- `"use client"` on interactive components
- `forwardRef` + `displayName`
- `cn()` utility for className merging
- Use semantic CSS variables (bg-bg-card, not bg-slate-900)
- Import `cn` from `@/lib/utils`

## Never Do

- Do NOT create new Button, Card, Avatar, or Badge components — they already exist
- Do NOT use `@/components/ui/` path — use `@/app/components/ui/`
- Do NOT hardcode colors
- Do NOT use string literals for displayName — always use the component reference
