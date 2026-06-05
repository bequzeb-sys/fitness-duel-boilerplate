"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type AvatarShape = "circle" | "square"

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-8 w-8",
  sm: "h-10 w-10 sm:h-9 sm:w-9",
  md: "h-11 w-11 sm:h-10 sm:w-10",
  lg: "h-12 w-12 sm:h-11 sm:w-11",
  xl: "h-14 w-14 sm:h-12 sm:w-12",
  "2xl": "h-16 w-16 sm:h-14 sm:w-14",
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
          sizes={
            size === "xs"
              ? "32px"
              : size === "sm"
                ? "40px"
                : size === "md"
                  ? "44px"
                  : size === "lg"
                    ? "48px"
                    : size === "xl"
                      ? "56px"
                      : "64px"
          }
          className="object-cover"
          referrerPolicy={referrerPolicy}
          onError={() => setImgError(true)}
        />
      ) : fallback ? (
        <span className="text-sm sm:text-xs font-bold text-slate-300 font-display select-none">
          {fallback.slice(0, 2).toUpperCase()}
        </span>
      ) : null}
    </div>
  )
}
