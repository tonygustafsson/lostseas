"use client"

import { areaY, defineChart, lineY } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { Chart } from "@tanstack/charts/react/core"
import { tooltip } from "@tanstack/charts/tooltip"

import type { StatisticsEntry } from "@/firebase/db"
import { toDateTime } from "@/utils/date"

import {
  chartRenderer,
  dayScale,
  enterDelay,
  formatDay,
  type StatisticsMetric,
  valueScale,
} from "./chartConfig"

type Props = {
  metric: StatisticsMetric
  label: string
  entries: StatisticsEntry[]
  /** Entrance delay in ms, used to stagger several charts */
  delay?: number
}

const color = "var(--gold)"
const colorDark = "var(--gold-dark)"

const StatisticsAreaChart = ({ metric, label, entries, delay = 0 }: Props) => {
  if (!entries.length) return null

  const gradientId = `grad-${metric}`
  const y = (entry: StatisticsEntry) => entry[metric] ?? 0

  const definition = defineChart({
    motion: enterDelay(delay),
    marks: [
      decorative(
        areaY(entries, {
          x: "day",
          y,
          fill: `url(#${gradientId})`,
          fillOpacity: 1,
        })
      ),
      lineY(entries, { x: "day", y, stroke: color, strokeWidth: 2 }),
    ],
    scales: {
      x: dayScale(entries.map((entry) => entry.day)),
      y: valueScale,
    },
    gradients: [
      {
        id: gradientId,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        stops: [
          { offset: 0, color, opacity: 0.8 },
          { offset: 1, color: colorDark, opacity: 0.5 },
        ],
      },
    ],
    focus: "nearest-x",
    tooltip: {
      use: tooltip,
      content: ([point]) => ({
        title: point ? formatDay(point.datum.day) : "",
        rows: point
          ? [
              { label, value: point.yValue.toLocaleString(), color },
              {
                label: "Time",
                value: toDateTime(new Date(point.datum.timestamp)),
              },
            ]
          : [],
      }),
    },
  })

  return (
    <Chart
      definition={definition}
      renderer={chartRenderer}
      height={240}
      ariaLabel={`${label} per day`}
      className="text-muted-foreground"
    />
  )
}

export default StatisticsAreaChart
