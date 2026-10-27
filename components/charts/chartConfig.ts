import type { ChartMotionContext } from "@tanstack/charts/motion"
import { motion } from "@tanstack/charts/motion"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import type { StatisticsEntry } from "@/firebase/db"

export type StatisticsMetric = Exclude<
  keyof StatisticsEntry,
  "timestamp" | "day"
>

export type StatisticsSeries = {
  metric: StatisticsMetric
  label: string
  color: string
}

export const chartRenderer = motion({
  initial: "always",
  transition: { type: "spring", stiffness: 170, damping: 18, mass: 1 },
})

export const formatDay = (day: number) => `Day ${day}`

export const dayScale = (days: number[]) => ({
  scale: scaleLinear,
  axis: {
    ticks: { values: days, format: formatDay },
    tickLabels: { fontSize: 12 },
  },
})

export const valueScale = {
  scale: scaleLinear,
  nice: true,
  axis: { tickLabels: { fontSize: 12 } },
}

/** Delays only the entrance, so several charts can rise one after another */
export const enterDelay = (delay: number) => (context: ChartMotionContext) =>
  context.phase === "enter" ? { delay } : undefined

export const metricsOf = (series: StatisticsSeries[]) =>
  series.map(({ metric }) => metric)
