"use client"

import { areaY, defineChart, lineY } from "@tanstack/charts"
import { decorative } from "@tanstack/charts/mark/decorative"
import { Chart } from "@tanstack/charts/react"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { tooltip } from "@tanstack/charts/tooltip"

import type { StatisticsEntry } from "@/firebase/db"
import { toDateTime } from "@/utils/date"
import { snakeCaseToTitleCase } from "@/utils/string"

export type ChartDataPoint = Pick<
  StatisticsEntry,
  "day" | "timestamp" | keyof StatisticsEntry
>

type Props = {
  metric: keyof StatisticsEntry
  data: ChartDataPoint[]
}

const color = "var(--gold)"
const colorDark = "var(--gold-dark)"

const StatisticsAreaChart = ({ metric, data }: Props) => {
  if (!data.length) return null

  const label = snakeCaseToTitleCase(metric)
  const gradientId = `grad-${metric}`
  const y = (entry: ChartDataPoint) => Number(entry[metric])

  const definition = defineChart({
    marks: [
      decorative(
        areaY(data, {
          x: "day",
          y,
          fill: `url(#${gradientId})`,
          fillOpacity: 1,
        })
      ),
      lineY(data, { x: "day", y, stroke: color, strokeWidth: 2 }),
    ],
    scales: {
      x: {
        scale: scaleLinear,
        axis: {
          ticks: {
            values: data.map((entry) => entry.day),
            format: (day) => `Day ${day}`,
          },
          tickLabels: { fontSize: 12 },
        },
      },
      y: {
        scale: scaleLinear,
        nice: true,
        axis: { tickLabels: { fontSize: 12 } },
      },
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
        title: `Day ${point?.datum.day}`,
        rows: point
          ? [
              {
                label,
                value: point.yValue.toLocaleString(),
                color,
              },
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
    <div>
      <div className="mb-2 flex items-center justify-center gap-2 text-sm">
        <span className="bg-gold size-3 rounded-sm" />
        {label}
      </div>

      <Chart
        definition={definition}
        height={240}
        ariaLabel={`${label} per day`}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default StatisticsAreaChart
