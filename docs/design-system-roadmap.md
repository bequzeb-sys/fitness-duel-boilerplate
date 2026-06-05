# Design System Audit

**Date:** May 2026
**Status:** Phase 2 Complete — all 17 consumer files migrated to shared UI components

---

## 1. Button Variants

### Variant inventory

| Variant | Classes | Where used |
|---|---|---|
| **Primary filled** | `bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,102,255,0.2)] active:scale-95` | `Header.tsx` (create challenge), `defis-page.tsx` (take challenge), `activite-page.tsx` (submit), `CreateChallengeModal.tsx` (launch duel), `CoachPage.tsx` (copy, launch, add plan), `ChatInput.tsx` (send) |
| **Primary small** | Same as primary but `text-[10px] py-1.5` | `Header.tsx` (notification mark all read), `defis-page.tsx` (create btn) |
| **Primary ghost** | `bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20` | `AccueilTab.tsx` (invite copy toggle), `CoachPage.tsx` (copy, launch plan) |
| **Secondary/surface** | `bg-hover-bg text-slate-400 hover:text-white border border-border-card` | `defis-page.tsx` (category filters), `classements-page.tsx` (discipline/period tabs), `CoachPage.tsx` (tabs), all pages with pill buttons |
| **Ghost text** | `text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline` | `AccueilTab.tsx` (view all links), `badges-page.tsx` |
| **Destructive** | `text-slate-500 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 rounded transition-colors` | `CoachPage.tsx` (delete plan) |
| **White CTA** | `bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-95` | `AccueilTab.tsx` (create challenge CTA) |
| **Social** | `bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-[#25D366]/30` (WhatsApp) etc. | `AccueilTab.tsx` (share buttons) |
| **Icon-only** | `p-2.5 sm:p-3 bg-bg-card hover:bg-hover-active text-slate-300 hover:text-white rounded-xl border border-border-card relative` | `Header.tsx` (notifications, menu trigger) |
| **Icon-only small** | `p-2 bg-bg-card hover:bg-hover-active text-slate-300 hover:text-white rounded-lg border border-border-card` | `Header.tsx` (profile dropdown trigger), `MobileDrawer.tsx` (close) |
| **Streak check** | `h-3.5 w-3.5 rounded-full flex items-center justify-center transition-all` (toggles bg-blue-600/bg-hover-bg) | `Sidebar.tsx`, `MobileDrawer.tsx` |

---

## 2. Card Variants

### Card inventory

| Pattern | Classes | Where used |
|---|---|---|
| **Standard card** | `bg-bg-card border border-border-card rounded-2xl p-5` | All page components — `defis-page.tsx`, `classements-page.tsx`, `badges-page.tsx`, `amis-page.tsx`, `activite-page.tsx`, `profil-page.tsx`, `CoachPage.tsx` |
| **Elevated/surface** | `bg-surface-raised border border-border-card rounded-xl` | Inner card sections, program cards in `CoachPage.tsx` |
| **Interactive** | `bg-bg-card border border-border-card rounded-2xl ... hover:border-blue-500/50 transition-all` | `defis-page.tsx` (challenge cards), `classements-page.tsx` (ranking rows) |
| **Overlay** | `bg-surface-overlay border border-border-card/80 rounded-2xl` | `Sidebar.tsx` (streak widget), `MobileDrawer.tsx` |
| **Input surface** | `bg-surface-input border border-border-card rounded-xl` | Input backgrounds, filter rows |

---

## 3. Avatar Patterns

### Avatar inventory

| Pattern | Size | Classes | Where |
|---|---|---|---|
| Podium rank 2/3 | 14 | `h-14 w-14 rounded-full overflow-hidden border-2 border-slate-400 shadow-xl` | `classements-page.tsx` |
| Podium rank 1 | 20 | `h-20 w-20 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl` | `classements-page.tsx` |
| User (activity feed) | 9 | `h-9 w-9 rounded-full overflow-hidden border border-border-card shrink-0` | `AccueilTab.tsx` |
| User (leaderboard) | 8 | `h-8 w-8 rounded-lg overflow-hidden border border-border-card` | `AccueilTab.tsx` |
| User (activity feed alt) | 10 | `h-10 w-10 rounded-full overflow-hidden border border-border-card shrink-0` | `activite-page.tsx` |
| Friend list | 11 | `h-11 w-11 rounded-lg overflow-hidden border border-border-card shrink-0` | `amis-page.tsx` |
| Profile page | 20 | `h-20 w-20 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-2xl shrink-0` | `profil-page.tsx` |
| Rankings table | 8 | `h-8 w-8 rounded-lg overflow-hidden border border-border-card shrink-0` | `classements-page.tsx` |

### Avatar summary
- **7 unique size+style combos** across 6 files
- All use `relative` + `fill` + `sizes` + `object-cover` + `referrerPolicy="no-referrer"`
- Two shapes: `rounded-full` (circular) and `rounded-lg` (square-ish)

---

## 4. Badge Patterns

### Badge inventory

#### Full badge card (badges-page.tsx)
Uses `bg-gradient-to-b` with tier colors + `border rounded-2xl p-5`:
| Tier | Gradient | Border | Text |
|---|---|---|---|
| Standard (earned) | `from-blue-500/10` | `border-blue-500/30` | `text-blue-400` |
| Rare (earned) | `from-amber-500/10` | `border-amber-500/30` | `text-amber-400` |
| Rare (earned, emerald) | `from-emerald-500/10` | `border-emerald-500/30` | `text-emerald-400` |
| Standard (locked) | `from-slate-800/5` | `border-slate-700/30` | `text-slate-500` |
| Mythical | `from-purple-500/5` | `border-purple-900/40` | `text-purple-400` |

#### Mini badge (AccueilTab.tsx)
`bg-gradient-to-b ${color} border rounded-xl p-2.5 min-h-[110px]` — 4 badges:
- Amber (Guerrier), Cyan (Persévérant), Blue (Régulier), Purple (Gagnant)

#### Pill badges
Used for status, labels, and tags:
| Style | Classes | Used in |
|---|---|---|
| Tier pill | `bg-blue-500/20 text-blue-400 font-mono font-bold rounded-full` | `CoachPage.tsx` (saved plan count) |
| New badge | `bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90 animate-pulse` | `Sidebar.tsx`, `MobileDrawer.tsx` (nav "NOUVEAU") |
| Status pill | `bg-surface-overlay text-slate-400 px-2 py-0.5 rounded-full text-[9px] font-bold` | `amis-page.tsx` |
| Rank pill | `bg-hover-bg px-2.5 py-0.5 rounded-full border border-slate-700/60 text-xs font-mono font-bold` | `classements-page.tsx` |
| Progress pill | `bg-slate-950/50 px-1.5 py-0.5 rounded-full text-[8px] font-bold` | `AccueilTab.tsx` (badge sub) |
| XP badge | `bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-blue-400` | `Sidebar.tsx`, `MobileDrawer.tsx` |

---

## 5. Icon Sizes

### Icon size audit

| Size token | Used as | Files |
|---|---|---|
| `h-3 w-3` | Coach delete/trash, streak dot, sidebar external link | `Sidebar.tsx`, `MobileDrawer.tsx`, `CoachPage.tsx` |
| `h-3.5 w-3.5` | Coach copy/trash buttons, streak check | `CoachPage.tsx`, `Sidebar.tsx` |
| `h-4 w-4` | Most icons — nav, actions, headers | All files |
| `h-4.5 w-4.5` | Header menu trigger | `Header.tsx` |
| `h-5 w-5` | Sidebar nav icons, Swords logo | `Sidebar.tsx`, `MobileDrawer.tsx`, `Header.tsx` |
| `h-[18px] w-[18px]` | Sidebar nav (old), Badge icon in AccueilTab | `Sidebar.tsx`, `AccueilTab.tsx` |
| `h-[18px] w-[18px]` | Coach chat avatar initial box | `CoachPage.tsx` |
| `h-20 w-20` | Coach avatar | `CoachPage.tsx` |

### Stroke-width overrides

| Location | Override | Reason |
|---|---|---|
| `Header.tsx` | `stroke-[2.5]` | Plus icon — heavier weight |
| `Sidebar.tsx`, `MobileDrawer.tsx` | `stroke-[3]` | Check icon in streak tracker |
| `AccueilTab.tsx` | `stroke-[3.5]` | Copy check icon |

**Recommendation:** Standardize on `stroke-2` (Lucide default) everywhere. Only use heavier strokes where visually necessary (e.g., the `+` icon in a filled button).

---

## 6. Files — Migration Status

All 17 files migrated to shared UI components. `tsc --noEmit` and `npm run lint` pass with zero errors.

| File | Buttons | Cards | Avatars | Badges | Icon sizes |
|---|---|---|---|---|---|
| `Header.tsx` | ✅ | ✅ | | | ✅ |
| `Sidebar.tsx` | ✅ | ✅ | | ✅ | ✅ |
| `MobileDrawer.tsx` | ✅ | ✅ | | ✅ | ✅ |
| `AccueilTab.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `defis-page.tsx` | ✅ | ✅ | | ✅ | ✅ |
| `activite-page.tsx` | ✅ | ✅ | ✅ | | ✅ |
| `amis-page.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `classements-page.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `badges-page.tsx` | | ✅ | ✅ | ✅ | ✅ |
| `profil-page.tsx` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `CoachPage.tsx` | ✅ | ✅ | | ✅ | ✅ |
| `ChatBubble.tsx` | ✅ | | | | ✅ |
| `ChatInput.tsx` | ✅ | ✅ | | | ✅ |
| `CoachSuggestions.tsx` | ✅ | | | | ✅ |
| `CoachIntro.tsx` | | ✅ | | | ✅ |
| `CreateChallengeModal.tsx` | ✅ | ✅ | | ✅ | ✅ |
| `SavePlanModal.tsx` | ✅ | ✅ | | | ✅ |
| **Total** | **16** | **17** | **8** | **10** | **17** |

---

## 7. Component API Designs

### Button (`app/components/ui/button.tsx`)

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline" | "social-whatsapp" | "social-instagram" | "social-facebook"
  size?: "xs" | "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg"
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean   // via @radix-ui/react-slot
}
```

### Card (`app/components/ui/card.tsx`)

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "overlay"
  padding?: "none" | "sm" | "md" | "lg"
}
```

### Avatar (`app/components/ui/avatar.tsx`)

```tsx
interface AvatarProps {
  src?: string
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  shape?: "circle" | "square"
  fallback?: string   // 1-2 char initials for missing src
  className?: string
}
```

### Badge (`app/components/ui/badge.tsx`)

```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "tier-standard" | "tier-rare" | "tier-mythical" | "pill" | "pill-new" | "pill-status" | "pill-xp" | "pill-rank"
  size?: "xs" | "sm" | "md"
}
```
