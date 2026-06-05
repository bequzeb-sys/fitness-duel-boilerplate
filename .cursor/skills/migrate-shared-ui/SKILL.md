# Migrate Inline UI Patterns to Shared Components

Use this skill when the user asks to migrate a page or component to shared UI — or when you see any inline `<button>`, `<div>` used as a card, inline avatar markup, or inline badge markup.

## Workflow

### Step 1 — Identify what to migrate

Scan the target file for these inline patterns:

| Pattern | Replace With |
|---|---|
| `<button className="...">` | `<Button>` |
| `<div className="...bg-bg-card border border-border-card...">` | `<Card>` |
| `<div className="...flex items-center gap-2">...fallback...</div>` | `<Avatar>` |
| Inline tier badge markup | `<TierBadge>` |
| `<span className="bg-blue-600...">` pill | `<PillBadge>` |

### Step 2 — Add imports

Always add these imports at the top of the file:

```tsx
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { TierBadge, PillBadge } from "@/app/components/ui/badge"
import { Icon } from "@/app/components/ui/icon"
```

### Step 3 — Migrate each pattern

#### Buttons

```tsx
// Before (any inline button)
<button
  onClick={handleClick}
  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
>
  Submit
</button>

// After
<Button variant="primary" onClick={handleClick}>
  Submit
</Button>
```

Button variants available: `primary`, `ghost`, `secondary`, `ghostText`, `destructive`, `whiteCta`, `social`, `icon`, `iconSmall`, `streak`, `pill`, `primarySmall`
Button sizes: `xs`, `sm`, `md`, `lg`, `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`

#### Cards

```tsx
// Before
<div className="bg-bg-card border border-border-card rounded-2xl p-5">

// After
<Card padding="lg">
```

Card variants: `default` (bg-bg-card), `elevated` (bg-surface-raised), `interactive` (hover border), `overlay`, `input`
Card padding: `none`, `sm`, `md`, `lg`, `xl`

#### Avatars

```tsx
// Before
<div className="flex items-center gap-2">
  <img src={src} className="h-8 w-8 rounded-full object-cover" />
  <span className="text-xs text-slate-300">{name}</span>
</div>

// After
<div className="flex items-center gap-2">
  <Avatar src={src} alt={name} size="sm" fallback={name.slice(0, 2)} />
  <span className="text-xs text-slate-300">{name}</span>
</div>
```

Avatar sizes: `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px), `2xl` (72px)
Avatar shapes: `circle` (default), `square`

#### Tier Badges

```tsx
// Before
<div className="bg-gradient-to-b from-blue-500/10 via-blue-600/5 to-transparent border border-blue-500/30 text-blue-400 p-3 rounded-2xl">

// After
<TierBadge variant="tier-standard" size="md">
```

Tier variants: `tier-standard`, `tier-standard-locked`, `tier-rare-amber`, `tier-rare-emerald`, `tier-mythical`
Sizes: `sm` (80px), `md` (140px), `lg` (200px)

#### Pill Badges

```tsx
// Before
<span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">

// After
<PillBadge variant="pill-new" size="sm">
```

Pill variants: `pill-new` (blue pulse), `pill-status` (muted), `pill-xp` (blue mono), `pill-rank`, `pill-progress`, `pill-tier-count`

### Step 4 — Verify

After migrating, run:
```bash
npx tsc --noEmit
```
Ensure no import errors and no type errors.

## Anti-patterns to avoid

- Do NOT import from `@/components/ui/` — this project uses `@/app/components/ui/`
- Do NOT mix inline button styles with shared Button variants — choose the closest variant
- Do NOT use `className` overrides for standard padding — use `padding="none"` on Card instead
- Do NOT create new badge components — use `TierBadge` or `PillBadge`
- Do NOT hardcode colors in migrated code — use semantic CSS variables already in the components
