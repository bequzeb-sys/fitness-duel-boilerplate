"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CardVariant = "default" | "elevated" | "interactive" | "overlay" | "input"

const variantStyles: Record<CardVariant, string> = {
  default: "bg-bg-card border border-border-card rounded-2xl",
  elevated: "bg-surface-raised border border-border-card rounded-xl",
  interactive:
    "bg-bg-card border border-border-card rounded-2xl hover:border-brand-blue/30 transition-all cursor-pointer",
  overlay: "bg-surface-overlay border border-border-card/80 rounded-2xl",
  input: "bg-surface-input border border-border-card rounded-xl",
}

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-3 sm:p-3.5",
  md: "p-4 sm:p-4.5",
  lg: "p-4 sm:p-5",
  xl: "p-5 sm:p-6",
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: keyof typeof paddingStyles
}

export function Card({
  variant = "default",
  padding = "lg",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-display font-bold text-base sm:text-sm text-slate-200 uppercase tracking-[0.14em] sm:tracking-wider", className)}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex-1", className)}
      {...props}
    />
  )
}
