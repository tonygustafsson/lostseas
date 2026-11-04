"use client"

import { Progress as ProgressPrimitive } from "radix-ui"
import * as React from "react"

import { barColors, type BarVariant } from "@/components/ui/bar"
import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: BarVariant
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        "bg-muted relative flex h-3 w-full items-center overflow-x-hidden rounded-4xl",
        barColors[variant],
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="striped-bar size-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
