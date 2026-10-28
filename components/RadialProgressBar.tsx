"use client"

import { defineChart } from "@tanstack/charts"
import { polar, radialArc } from "@tanstack/charts/polar"
import { Chart } from "@tanstack/charts/react/core"
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion"
import { useEffect, useState } from "react"

import { chartRenderer } from "@/components/charts/chartConfig"
import { cn } from "@/lib/utils"

type Props = {
  percentage: number
  autoStrokeColor?: boolean
  showLabel?: boolean
  startPercentage?: number
  className?: string
}

const FULL_TURN = Math.PI * 2
const ANIMATION_TIME = 1

const getStrokeColor = (percentage: number) => {
  if (percentage > 65) {
    return "var(--success)"
  }

  if (percentage > 40) {
    return "var(--warning)"
  }

  return "var(--error)"
}

const RadialProgressBar = ({
  percentage,
  showLabel = true,
  autoStrokeColor = true,
  startPercentage,
  className,
}: Props) => {
  const progress = useMotionValue(startPercentage ?? 0)
  const [shownPercentage, setShownPercentage] = useState(progress.get())

  useMotionValueEvent(progress, "change", setShownPercentage)

  // The chart morphs arcs as raw path strings, which breaks when an arc
  // crosses half a turn, so the sweep is animated here instead
  useEffect(() => {
    const controls = animate(progress, percentage, {
      duration: ANIMATION_TIME,
    })

    return () => controls.stop()
  }, [progress, percentage])

  const strokeColor = autoStrokeColor
    ? getStrokeColor(percentage)
    : "currentColor"

  // The track is drawn first so the progress arc sits on top of it
  const arcs = [
    {
      key: "track",
      endAngle: FULL_TURN,
      color: "var(--muted-foreground)",
    },
    {
      key: "progress",
      endAngle: (shownPercentage / 100) * FULL_TURN,
      color: strokeColor,
    },
  ]

  const definition = defineChart({
    marks: [
      polar({
        marks: [
          radialArc(arcs, {
            startAngle: () => 0,
            endAngle: "endAngle",
            innerRadius: ({ radius }) => radius * 0.76,
            cornerRadius: ({ radius }) => radius * 0.12,
            fill: (arc) => arc.color,
            key: "key",
            motion: false,
          }),
        ],
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
  })

  return (
    <div className={cn("relative", className)}>
      <Chart
        definition={definition}
        renderer={chartRenderer}
        aspectRatio={1}
        ariaLabel={`${Math.round(percentage)}%`}
      />

      {showLabel && (
        <span className="text-foreground absolute inset-0 flex items-center justify-center text-xs">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

export default RadialProgressBar
