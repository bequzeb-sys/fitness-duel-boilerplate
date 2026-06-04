"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Tier badge variants (for badge collection) ────────────────────────────────
const tierGradientStyles: Record<string, string> = {
  "tier-standard": "from-brand-blue/10 via-brand-blue/5 to-transparent border-brand-blue/30 text-brand-blue",
  "tier-standard-locked": "from-slate-800/5 to-transparent border-slate-700/30 text-slate-500",
  "tier-rare-amber": "from-amber-500/10 via-amber-600/5 to-transparent border-amber-500/30 text-amber-400",
  "tier-rare-emerald": "from-emerald-500/10 via-emerald-600/5 to-transparent border-emerald-500/30 text-emerald-400",
  "tier-mythical": "from-purple-500/5 via-purple-600/5 to-transparent border-purple-900/40 text-purple-400",
}

// ─── Pill badge variants ─────────────────────────────────────────────────────
const pillStyles: Record<string, string> = {
  "pill-new": "bg-brand-blue text-bg-dark font-bold uppercase tracking-wider animate-pulse",
  "pill-status": "bg-surface-overlay text-slate-400 font-bold",
  "pill-xp": "bg-brand-blue/10 text-brand-blue font-mono font-bold",
  "pill-rank": "bg-hover-bg font-mono font-bold border border-slate-700/60",
  "pill-progress": "bg-bg-dark/50 font-bold",
  "pill-tier-count": "bg-brand-blue/20 text-brand-blue font-mono font-bold",
}

const pillSizeStyles: Record<string, string> = {
  xs: "text-[8px] px-1.5 py-0.5 rounded-full",
  sm: "text-[9px] px-2 py-0.5 rounded-full",
  md: "text-xs px-2.5 py-1 rounded-full",
}

const tierSizeStyles: Record<string, string> = {
  xs: "p-2 min-h-[60px]",
  sm: "p-3 min-h-[80px]",
  md: "p-4 min-h-[140px]",
  lg: "p-5 min-h-[200px]",
}

export type BadgeVariant =
  | "tier-standard"
  | "tier-standard-locked"
  | "tier-rare-amber"
  | "tier-rare-emerald"
  | "tier-mythical"
  | "pill-new"
  | "pill-status"
  | "pill-xp"
  | "pill-rank"
  | "pill-progress"
  | "pill-tier-count"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: "xs" | "sm" | "md" | "lg"
}

export function Badge({
  variant = "tier-standard",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  const isTier = variant.startsWith("tier-")
  const isPill = variant.startsWith("pill-")

  return (
    <div
      className={cn(
        "flex items-center justify-center font-medium select-none",
        isTier && [
          "bg-gradient-to-b border rounded-2xl",
          tierGradientStyles[variant] ?? tierGradientStyles["tier-standard"],
          tierSizeStyles[size],
        ],
        isPill && [
          pillStyles[variant] ?? pillStyles["pill-status"],
          pillSizeStyles[size] ?? pillSizeStyles["sm"],
        ],
        className
      )}
      {...props}
    />
  )
}

// ─── Convenience helpers ───────────────────────────────────────────────────────

export function TierBadge({
  variant = "tier-standard",
  size = "md",
  earned = true,
  className,
  ...props
}: BadgeProps & { earned?: boolean }) {
  if (!earned) variant = "tier-standard-locked"
  return <Badge variant={variant} size={size} className={className} {...props} />
}

export function PillBadge({
  variant = "pill-status",
  size = "sm",
  className,
  ...props
}: BadgeProps) {
  return <Badge variant={variant} size={size} className={className} {...props} />
}
