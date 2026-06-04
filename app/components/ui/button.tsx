"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export type ButtonVariant =
  | "primary"
  | "primarySmall"
  | "ghost"
  | "secondary"
  | "ghostText"
  | "destructive"
  | "whiteCta"
  | "social"
  | "icon"
  | "iconSmall"
  | "streak"
  | "pill"

export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon-md"
  | "icon-lg"

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue hover:bg-brand-blue/80 text-bg-dark font-bold shadow-brand active:scale-95 transition-all cursor-pointer",
  primarySmall:
    "bg-brand-blue hover:bg-brand-blue/80 text-bg-dark font-bold text-[10px] py-1.5 shadow-brand active:scale-95 transition-all cursor-pointer",
  ghost:
    "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-bg-dark border border-brand-blue/25 font-bold transition-all cursor-pointer",
  secondary:
    "bg-hover-bg text-slate-400 hover:text-white hover:bg-hover-active border border-border-card font-bold transition-all cursor-pointer",
  ghostText:
    "text-brand-blue hover:text-brand-blue/80 font-medium transition-colors hover:underline bg-transparent border-none cursor-pointer",
  destructive:
    "text-slate-500 hover:text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 rounded transition-colors cursor-pointer border-none bg-transparent",
  whiteCta:
    "bg-white hover:bg-slate-100 text-brand-blue font-bold shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer",
  social:
    "border transition-all cursor-pointer",
  icon:
    "bg-bg-card hover:bg-hover-active text-slate-300 hover:text-white rounded-xl border border-border-card transition-colors cursor-pointer border-none",
  iconSmall:
    "bg-bg-card hover:bg-hover-active text-slate-300 hover:text-white rounded-lg border border-border-card transition-colors cursor-pointer",
  streak:
    "rounded-full flex items-center justify-center transition-all cursor-pointer border-none bg-transparent",
  pill:
    "bg-surface-overlay text-slate-400 border border-border-card font-bold transition-all cursor-pointer",
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: "text-xs px-3 py-2 rounded-xl",
  sm: "text-xs px-4 py-2.5 rounded-xl",
  md: "text-sm px-5 py-3 rounded-xl",
  lg: "text-base px-6 py-3.5 rounded-xl",
  "icon-xs": "p-1.5 rounded-lg",
  "icon-sm": "p-2 rounded-lg",
  "icon-md": "p-2.5 rounded-xl",
  "icon-lg": "p-3 rounded-xl",
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "sm",
      loading = false,
      asChild = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const isDisabled = disabled || loading

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium select-none",
          variantStyles[variant],
          // Only apply size styles for non-icon variants (icon variants self-size via padding)
          !["icon", "iconSmall", "streak"].includes(variant) && sizeStyles[size],
          loading && "opacity-50 cursor-wait",
          isDisabled && "pointer-events-none",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"
