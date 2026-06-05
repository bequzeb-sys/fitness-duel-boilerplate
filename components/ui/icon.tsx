"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Icon size scale ────────────────────────────────────────────────────────────
// Standard: stroke-2 (Lucide default) everywhere.
// Only override stroke-width when an icon genuinely needs heavier weight.

const sizeStyles: Record<string, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-[18px] w-[18px]",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
  "2xl": "h-7 w-7",
}

export type IconSize = keyof typeof sizeStyles

export interface IconProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>
  size?: IconSize
  strokeWidth?: number | string
  className?: string
}

export function Icon({ icon: IconComp, size = "md", strokeWidth = 2, className }: IconProps) {
  return (
    <IconComp
      className={cn(
        sizeStyles[size],
        className
      )}
      strokeWidth={strokeWidth}
    />
  )
}
