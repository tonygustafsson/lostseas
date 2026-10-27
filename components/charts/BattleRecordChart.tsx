"use client"

import { barX, defineChart } from "@tanstack/charts"
import { Chart } from "@tanstack/charts/react/core"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { tooltip } from "@tanstack/charts/tooltip"

import { getBattleRecordByNation } from "@/utils/statistics"

import { chartRenderer, enterDelay } from "./chartConfig"
import ChartLegend from "./ChartLegend"

type Props = {
  battles: Character["battles"]
  /** Entrance delay in ms, used to stagger several charts */
  delay?: number
}

const wonColor = "var(--chart-4)"
const lostColor = "var(--chart-3)"

const nationLabel = (nation: Nation | "Pirate") =>
  nation === "Pirate" ? "Pirates" : nation

const BattleRecordChart = ({ battles, delay = 0 }: Props) => {
  const rows = getBattleRecordByNation(battles)

  if (!rows.length) return null

  const y = (row: (typeof rows)[number]) => nationLabel(row.nation)

  // Same reach both ways, so zero sits in the middle. Whole battles only
  const most = Math.max(...rows.flatMap(({ won, lost }) => [won, lost]))
  const step = Math.ceil(most / 4)
  const reach = Math.ceil(most / step) * step
  const ticks = Array.from(
    { length: (reach / step) * 2 + 1 },
    (_, index) => -reach + index * step
  )

  const definition = defineChart({
    motion: enterDelay(delay),
    marks: [
      // Wins grow to the right of zero, losses to the left
      barX(rows, { y, x1: 0, x2: "won", fill: wonColor, inset: 4 }),
      barX(rows, {
        y,
        x1: 0,
        x2: (row) => -row.lost,
        fill: lostColor,
        inset: 4,
      }),
    ],
    scales: {
      x: {
        scale: scaleLinear().domain([-reach, reach]),
        grid: true,
        axis: {
          ticks: { values: ticks, format: (value) => String(Math.abs(value)) },
          tickLabels: { fontSize: 12 },
        },
      },
      y: {
        scale: () => scaleBand<string>().padding(0.2),
        axis: { tickLabels: { fontSize: 12 } },
      },
    },
    focus: "nearest-y",
    tooltip: {
      use: tooltip,
      content: ([point]) => ({
        title: point ? nationLabel(point.datum.nation) : "",
        rows: point
          ? [
              { label: "Won", value: String(point.datum.won), color: wonColor },
              {
                label: "Lost",
                value: String(point.datum.lost),
                color: lostColor,
              },
            ]
          : [],
      }),
    },
  })

  return (
    <div>
      <ChartLegend
        items={[
          { label: "Lost", color: lostColor },
          { label: "Won", color: wonColor },
        ]}
      />

      <Chart
        definition={definition}
        renderer={chartRenderer}
        height={56 + rows.length * 40}
        ariaLabel="Battles won and lost against each nation"
        className="text-muted-foreground"
      />
    </div>
  )
}

export default BattleRecordChart
