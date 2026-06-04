# Migrate Shared UI — Per-File Reference

This file maps every known page file to its expected patterns for the `migrate-shared-ui` skill.

## Import Paths (verified for this boilerplate)

```tsx
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import { Avatar } from "@/app/components/ui/avatar"
import { TierBadge, PillBadge } from "@/app/components/ui/badge"
import { Icon } from "@/app/components/ui/icon"
```

## Per-File Decision Trees

### `app/components/tabs/AccueilTab.tsx`

**What it contains:**
- Hero carousel slide buttons → `<Button variant="ghostText">` (or keep as semantic `<button>` for carousel control if special styling needed)
- Stat number spans → These are data, not UI components — do not migrate
- Activity items → Uses `<Avatar>` already, verify consistency
- Challenge cards → Uses `<Card variant="interactive" padding="none">` already, verify
- Social share buttons → Uses `<Button variant="social">` already
- Badge grid items → Uses `<TierBadge>` already

**Known hardcoded colors to fix (not via migration):**
- `bg-slate-950/50` on TierBadge child → `bg-bg-dark/50`
- `text-[#050911]` → `text-bg-dark`
- `from-[#050911]` → `from-bg-dark`
- Hardcoded `12`, `24`, `15` stats → use constants from `lib/constants.ts`

### `app/components/pages/defis-page.tsx`

**What it contains:**
- Command palette trigger button (lines 91-98): `<button className="flex bg-surface-input border border-border-card rounded-xl...">` → Replace with `<Button variant="secondary">` wrapping `<Search>` icon

**Decision for unmatched patterns:**
- If the button is a search trigger: use `variant="secondary"` with icon
- If the button is a primary action: use `variant="primary"`
- Card patterns are already migrated

### `app/components/coach/CoachPage.tsx`

**What it contains:**
- All buttons use `<Button>` — already migrated ✓
- `Bookmark` icon with `fill-blue-400/20` → use CSS variable `fill-brand-cyan/20`
- `bg-slate-900` → `bg-surface-raised`
- `bg-slate-800/40`, `border-slate-700/40` → `bg-surface-overlay`, `border-border-card`

### `app/components/sidebar/Sidebar.tsx`

**Decision tree:**
- All nav items → `<Button variant={isActive ? "primary" : "ghost"} size="sm">` or use `variant="icon"` for icon-only nav
- Active state indicator → preserve the `border-l-2 border-brand-blue` inline style if not achievable via variant

### `app/components/header/Header.tsx`

**Decision tree:**
- Profile buttons → `<Button variant="ghost">`
- Notification bell → `<Button variant="icon">`
- Mobile menu → `<Button variant="icon">`

### `app/components/modals/CreateChallengeModal.tsx`

**Decision tree:**
- Submit button → `<Button variant="primary">`
- Cancel button → `<Button variant="secondary">`
- Icon buttons → `<Button variant="icon">`

## Variant Reference

### Button Variants (13 total)
`primary`, `primarySmall`, `ghost`, `ghostText`, `secondary`, `destructive`, `whiteCta`, `social`, `icon`, `iconSmall`, `streak`, `pill`

### Card Variants (5 total)
`default`, `elevated`, `interactive`, `overlay`, `input`

### Card Padding (5 values)
`none`, `sm`, `md`, `lg`, `xl`

### Avatar Sizes (6 values)
`xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### TierBadge Variants (5 values)
`tier-standard`, `tier-standard-locked`, `tier-rare-amber`, `tier-rare-emerald`, `tier-mythical`

### PillBadge Variants (6 values)
`pill-new`, `pill-status`, `pill-xp`, `pill-rank`, `pill-progress`, `pill-tier-count`

## Hardcoded Color Mapping Table

| Hardcoded | Replace With |
|---|---|
| `bg-slate-900` | `bg-surface-raised` |
| `bg-slate-950/50` | `bg-bg-dark/50` |
| `bg-slate-800/40` | `bg-surface-overlay` |
| `border-slate-700/40` | `border-border-card` |
| `border-slate-700/60` | `border-border-card` |
| `text-slate-500` | `text-text-muted` (use semantic) |
| `text-[#050911]` | `text-bg-dark` |
| `from-[#050911]` | `from-bg-dark` |
| `via-[#050911]/75` | `via-bg-dark/75` |
| `fill-blue-400/20` | `fill-brand-cyan/20` |
| `bg-[#00ddff]` | `text-brand-cyan` (for text colors) |
| `bg-amber-400` | `text-amber-400` (in HELP_AXES data objects) |

## Icons
Use the `Icon` component wrapper for lucide-react icons:

```tsx
import { Icon } from "@/app/components/ui/icon"
import { Trophy } from "lucide-react"

// Usage
<Icon icon={Trophy} size="sm" />
```

Available sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
