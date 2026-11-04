"use client"

import { Slider as SliderPrimitive } from "radix-ui"
import * as React from "react"

import { barColors, type BarVariant } from "@/components/ui/bar"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  variant?: BarVariant
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50",
        barColors[variant],
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="bg-muted relative h-2 w-full grow overflow-hidden rounded-4xl"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="striped-bar absolute h-full"
        />
      </SliderPrimitive.Track>

      {_values.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="bg-parchment block size-4 shrink-0 rounded-full border border-(--bar) shadow-sm ring-(--bar)/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
