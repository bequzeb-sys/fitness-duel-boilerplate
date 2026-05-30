# Shared UI Component Reference

Full API documentation and per-file inline pattern mappings for the FitnessDuel design system.

---

## Button — `app/components/ui/button.tsx`

### Props

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
  className?: string
}

type ButtonVariant =
  | "primary"           // filled blue — main CTAs
  | "primarySmall"      // same as primary but text-[10px] py-1.5
  | "ghost"             // blue outline, filled on hover
  | "secondary"         // hover-bg surface, hover active
  | "ghostText"         // text link style, no background
  | "destructive"       // rose tint on hover
  | "whiteCta"          // white bg, blue text — hero CTA
  | "social"            // social share buttons (WhatsApp, etc.)
  | "icon"              // bg-bg-card, p-2.5 rounded-xl
  | "iconSmall"         // bg-bg-card, p-2 rounded-lg
  | "streak"            // rounded-full, transparent, streak tracker
  | "pill"              // bg-surface-overlay, pill shape

type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg"
```

### Pattern Mappings (Button)

| Inline pattern | Replace with |
|---|---|
| `<button className="bg-blue-600 hover:bg-blue-500 ... rounded-xl shadow-[...]">` | `<Button variant="primary">` |
| Same pattern + `text-[10px] py-1.5` | `<Button variant="primarySmall">` |
| `bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20` | `<Button variant="ghost">` |
| `bg-hover-bg text-slate-400 hover:text-white border border-border-card` | `<Button variant="secondary">` |
| `text-blue-400 hover:text-blue-300 font-medium hover:underline` | `<Button variant="ghostText">` |
| `text-slate-500 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10` | `<Button variant="destructive">` |
| `bg-white hover:bg-slate-100 text-blue-700 font-bold ... hover:scale-[1.02]` | `<Button variant="whiteCta">` |
| Icon-only button with `p-2.5 rounded-xl` | `<Button variant="icon" size="icon-md">` |
| Icon-only button with `p-2 rounded-lg` | `<Button variant="iconSmall" size="icon-sm">` |
| Streak check dot: `h-3.5 w-3.5 rounded-full` | `<Button variant="streak" size="icon-sm">` |
| `bg-surface-overlay text-slate-400 border border-border-card rounded-full` | `<Button variant="pill" size="sm">` |
| `bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30` | `<Button variant="social" className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30">` |

---

## Card — `app/components/ui/card.tsx`

### Props

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "overlay" | "input"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}
```

Also exports: `CardHeader`, `CardTitle`, `CardContent`.

### Pattern Mappings (Card)

| Inline pattern | Replace with |
|---|---|
| `className="bg-bg-card border border-border-card rounded-2xl p-5"` | `<Card>` (default) |
| `className="bg-surface-raised border border-border-card rounded-xl"` | `<Card variant="elevated">` |
| `className="bg-bg-card border border-border-card rounded-2xl ... hover:border-blue-500/50 transition-all cursor-pointer"` | `<Card variant="interactive">` |
| `className="bg-surface-overlay border border-border-card/80 rounded-2xl"` | `<Card variant="overlay">` |
| `className="bg-surface-input border border-border-card rounded-xl"` | `<Card variant="input">` |

**Note**: When the original `p-5` is replaced by `Card`, it gets `padding="lg"` (default). For other padding values, use `padding="sm"`, `padding="md"`, or `padding="xl"`.

---

## Avatar — `app/components/ui/avatar.tsx`

### Props

```tsx
interface AvatarProps {
  src?: string
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  shape?: "circle" | "square"
  fallback?: string          // 1-2 char initials for missing image
  borderColor?: string       // e.g. "border-border-card" (default)
  borderWidth?: string       // e.g. "border-2"
  shadow?: string
  className?: string
  referrerPolicy?: ...       // default: "no-referrer"
}
```

### Pattern Mappings (Avatar)

| Inline pattern | Replace with |
|---|---|
| `h-8 w-8 rounded-lg overflow-hidden border border-border-card` | `<Avatar size="xs" shape="square">` |
| `h-9 w-9 rounded-full overflow-hidden border border-border-card` | `<Avatar size="sm">` |
| `h-10 w-10 rounded-full overflow-hidden border border-border-card` | `<Avatar size="md">` |
| `h-11 w-11 rounded-lg overflow-hidden border border-border-card` | `<Avatar size="lg" shape="square">` |
| `h-12 w-12 rounded-full overflow-hidden border border-border-card` | `<Avatar size="xl">` |
| `h-14 w-14 rounded-full overflow-hidden border-2 border-slate-400 shadow-xl` | `<Avatar size="2xl" borderColor="border-slate-400" borderWidth="border-2" shadow="shadow-xl">` |
| `h-20 w-20 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-2xl` | `<Avatar size="2xl" shape="square" borderColor="border-blue-500" borderWidth="border-2" shadow="shadow-2xl">` |

**Note**: Always set `fallback` prop to show initials when no image is available (e.g., `fallback="JD"` for John Doe). Do not wrap in an extra `<div>`.

---

## Badge — `app/components/ui/badge.tsx`

### Props

```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: "xs" | "sm" | "md" | "lg"
}

// Convenience components:
function TierBadge({ variant, size, earned, ... })  // auto-switches to locked variant
function PillBadge({ variant, size, ... })            // defaults to pill-status
```

### Pattern Mappings (Badge)

| Inline pattern | Replace with |
|---|---|
| Full badge card: `bg-gradient-to-b from-blue-500/10 ... border-blue-500/30 text-blue-400 rounded-2xl p-5` | `<TierBadge variant="tier-standard" size="lg">` |
| Full badge card: `from-amber-500/10 ... border-amber-500/30 text-amber-400` | `<TierBadge variant="tier-rare-amber">` |
| Full badge card: `from-emerald-500/10 ... border-emerald-500/30 text-emerald-400` | `<TierBadge variant="tier-rare-emerald">` |
| Full badge card: `from-purple-500/5 ... border-purple-900/40 text-purple-400` | `<TierBadge variant="tier-mythical">` |
| Full badge card (locked): `from-slate-800/5 ... border-slate-700/30 text-slate-500` | `<TierBadge variant="tier-standard" earned={false}>` |
| `bg-blue-600 text-white ... animate-pulse` | `<PillBadge variant="pill-new" size="sm">` |
| `bg-surface-overlay text-slate-400 ... rounded-full` | `<PillBadge variant="pill-status" size="sm">` |
| `bg-blue-500/10 text-blue-400 font-mono font-bold` | `<PillBadge variant="pill-xp" size="sm">` |
| `bg-hover-bg ... font-mono font-bold border border-slate-700/60` | `<PillBadge variant="pill-rank" size="sm">` |
| `bg-slate-950/50 ... rounded-full text-[8px]` | `<PillBadge variant="pill-progress" size="xs">` |
| `bg-blue-500/20 text-blue-400 font-mono font-bold` | `<PillBadge variant="pill-tier-count" size="sm">` |

---

## Icon — `app/components/ui/icon.tsx`

### Props

```tsx
interface IconProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  strokeWidth?: number | string   // default: 2
  className?: string
}
```

### Icon Size Map

| Size | Tailwind equivalent |
|---|---|
| `xs` | `h-3 w-3` |
| `sm` | `h-3.5 w-3.5` |
| `md` | `h-4 w-4` |
| `lg` | `h-[18px] w-[18px]` |
| `xl` | `h-5 w-5` |
| `2xl` | `h-6 w-6` |

**Stroke-width**: use default `stroke-2` everywhere. Only override with `strokeWidth={2.5}` or `strokeWidth={3}` when an icon genuinely needs it.

---

## Per-File Pattern Inventory

### `app/components/header/Header.tsx`
- **Buttons**: create challenge (primary), notification bell (icon-md), menu trigger (iconSmall), mark all read (primarySmall)
- **Cards**: notification dropdown (interactive or overlay)
- **Icons**: Bell, Plus (stroke-[2.5]), Menu, Swords logo

### `app/components/sidebar/Sidebar.tsx`
- **Buttons**: streak check (streak variant, h-3.5 w-3.5)
- **Cards**: streak widget (overlay card)
- **Badges**: NOUVEAU nav badge (pill-new), XP badge (pill-xp)
- **Icons**: Check (stroke-[3]), Trophy, Swords logo, nav icons (h-5 w-5)

### `app/components/sidebar/MobileDrawer.tsx`
- Same as Sidebar + close button (iconSmall)
- Check icons: stroke-[3]

### `app/components/pages/defis-page.tsx`
- **Buttons**: create challenge (primary), take challenge (primary), category filters (secondary)
- **Cards**: challenge cards (interactive with custom content)
- **Badges**: category pill (pill)
- **Icons**: Swords, plus, chevrons

### `app/components/pages/activite-page.tsx`
- **Buttons**: submit activity (primary)
- **Cards**: activity feed cards (default, sometimes interactive)
- **Avatars**: user avatars in feed (size sm or md, circle)
- **Icons**: activity type icons (h-4 w-4)

### `app/components/pages/amis-page.tsx`
- **Buttons**: add friend (ghost), send challenge (primary), send message (ghost)
- **Cards**: friend cards (interactive)
- **Avatars**: friend avatar (size lg, square)
- **Badges**: online status (pill-status)

### `app/components/pages/classements-page.tsx`
- **Buttons**: period tabs (secondary), discipline tabs (secondary), expand row (secondary/small)
- **Cards**: ranking rows (interactive cards)
- **Avatars**: podium rank 1 (h-20 w-20, border-4 amber-500), ranks 2/3 (h-14 w-14, border-2 slate-400), table avatars (h-8 w-8 square)
- **Badges**: rank number pill (pill-rank)
- **Icons**: Trophy, chevrons, medal icons

### `app/components/pages/badges-page.tsx`
- **Cards**: summary block (default card with ring progress)
- **Avatars**: ring progress avatar (h-14 w-14 gradient ring)
- **Badges**: all 5 full tier badges (tier-standard, tier-rare-amber, tier-rare-emerald, tier-mythical, tier-standard locked)
- **Icons**: Award, Lock (h-4 w-4)

### `app/components/pages/profil-page.tsx`
- **Cards**: stats grid (elevated), profile header card
- **Avatars**: profile picture (h-20 w-20, rounded-2xl, border-2 blue-500, shadow-2xl)
- **Badges**: level pill (pill-tier-count), streak pill (pill-xp)
- **Icons**: Settings, activity icons

### `app/components/coach/CoachPage.tsx`
- **Buttons**: copy (ghost), launch plan (primary), add plan (secondary), delete (destructive), saved count (pill)
- **Cards**: program cards (elevated), coach header (default)
- **Badges**: saved plan count (pill-tier-count)
- **Avatars**: coach avatar initials box (h-10 w-10 gradient)
- **Icons**: Copy, Trash2, Play, Plus, activity type icons

### `app/components/coach/ChatBubble.tsx`
- **Buttons**: copy message (iconSmall)
- **Icons**: Copy (h-3.5 w-3.5)

### `app/components/coach/ChatInput.tsx`
- **Buttons**: send message (primary icon button)
- **Cards**: chat input wrapper (overlay card or default)
- **Icons**: SendArrow (h-4 w-4)

### `app/components/coach/CoachSuggestions.tsx`
- **Icons**: activity type icons (h-4 w-4), arrow

### `app/components/coach/CoachIntro.tsx`
- **Avatars**: coach initial box (h-20 w-20 gradient)

### `app/components/modals/CreateChallengeModal.tsx`
- **Buttons**: submit (primary), cancel (secondary)
- **Cards**: modal container (default)
- **Badges**: friend selector pill (pill)

### `app/components/modals/SavePlanModal.tsx`
- **Buttons**: save (primary), cancel (secondary)
- **Cards**: modal body (default)
- **Icons**: Save, X

### `app/components/tabs/AccueilTab.tsx`
- **Buttons**: hero carousel tabs (secondary), create challenge CTA (whiteCta), invite copy (ghost toggle), share WhatsApp (social), invite copy check (streak)
- **Cards**: streak widget (overlay), stats card (default), activity card (interactive), rankings card (interactive), friend list (interactive)
- **Avatars**: activity feed user (size sm, circle), friend avatar (size xs, square), ranking avatar (size xs, square)
- **Badges**: mini badge grid (4 badges: amber, cyan, blue, purple tiers), progress sub-label (pill-progress)
- **Icons**: Copy (stroke-[3.5] when checked), Trophy, Swords, Activity, Award, Users, home nav
