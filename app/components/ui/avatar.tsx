"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type AvatarShape = "circle" | "square"

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-8 w-8",
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-12 w-12",
  "2xl": "h-14 w-14",
}

const shapeStyles: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-lg",
}

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize
  shape?: AvatarShape
  fallback?: string
  borderColor?: string
  borderWidth?: string
  shadow?: string
  className?: string
  referrerPolicy?: React.ComponentProps<typeof Image>["referrerPolicy"]
}

export function Avatar({
  src,
  alt = "",
  size = "md",
  shape = "circle",
  fallback,
  borderColor = "border-border-card",
  borderWidth = "",
  shadow = "",
  className,
  referrerPolicy = "no-referrer",
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)
  const showFallback = !src || imgError

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden flex items-center justify-center",
        sizeStyles[size],
        shapeStyles[shape],
        borderColor,
        borderWidth,
        shadow,
        className
      )}
    >
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={size === "xs" || size === "sm" ? "32px" : size === "md" ? "36px" : size === "lg" ? "44px" : "64px"}
          className="object-cover"
          referrerPolicy={referrerPolicy}
          onError={() => setImgError(true)}
        />
      ) : fallback ? (
        <span className="text-xs font-bold text-slate-400 font-display select-none">
          {fallback.slice(0, 2).toUpperCase()}
        </span>
      ) : null}
    </div>
  )
}
