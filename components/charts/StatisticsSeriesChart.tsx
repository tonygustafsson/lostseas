"use client"

import { areaY, defineChart, lineY, stack } from "@tanstack/charts"
import { Chart } from "@tanstack/charts/react/core"
import { tooltip } from "@tanstack/charts/tooltip"

import type { StatisticsEntry } from "@/firebase/db"
import { toDateTime } from "@/utils/date"

import {
  chartRenderer,
  dayScale,
  enterDelay,
  formatDay,
  type StatisticsSeries,
  valueScale,
} from "./chartConfig"
import ChartLegend from "./ChartLegend"

type Props = {
  title: string
  series: StatisticsSeries[]
  entries: StatisticsEntry[]
  /** Stack the series into one total instead of drawing separate lines */
  stacked?: boolean
  /** Entrance delay in ms, used to stagger several charts */
  delay?: number
}

type Row = Pick<StatisticsEntry, "day" | "timestamp"> & {
  label: string
  color: string
  value: number
}

const StatisticsSeriesChart = ({
  title,
  series,
  entries,
  stacked = false,
  delay = 0,
}: Props) => {
  if (!entries.length) return null

  // One row per series per entry, so each series becomes its own line or layer
  const rows: Row[] = series.flatMap(({ metric, label, color }) =>
    entries.map(({ day, timestamp, [metric]: value }) => ({
      day,
      timestamp,
      label,
      color,
      value: value ?? 0,
    }))
  )

  // A negative layer (wealth when in debt) cannot stack honestly, so draw lines
  const canStack = stacked && rows.every(({ value }) => value >= 0)

  const mark = canStack
    ? areaY(rows, {
        x: "day",
        y: "value",
        z: "label",
        fill: (row) => row.color,
        fillOpacity: 0.8,
        layout: stack({ order: series.map(({ label }) => label) }),
      })
    : lineY(rows, {
        x: "day",
        y: "value",
        z: "label",
        stroke: (row) => row.color,
        strokeWidth: 2,
      })

  const definition = defineChart({
    motion: enterDelay(delay),
    marks: [mark],
    scales: {
      x: dayScale(entries.map((entry) => entry.day)),
      y: valueScale,
    },
    focus: "group-x",
    tooltip: {
      use: tooltip,
      content: (points) => {
        const first = points[0]?.datum

        return {
          title: first ? formatDay(first.day) : "",
          rows: [
            ...points.map(({ datum }) => ({
              label: datum.label,
              value: datum.value.toLocaleString(),
              color: datum.color,
            })),
            ...(first
              ? [
                  {
                    label: "Time",
                    value: toDateTime(new Date(first.timestamp)),
                  },
                ]
              : []),
          ],
        }
      },
    },
  })

  return (
    <div>
      <ChartLegend items={series} />

      <Chart
        definition={definition}
        renderer={chartRenderer}
        height={240}
        ariaLabel={`${title} per day`}
        className="text-muted-foreground"
      />
    </div>
  )
}

export default StatisticsSeriesChart
