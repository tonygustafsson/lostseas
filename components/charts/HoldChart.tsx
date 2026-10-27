"use client"

import { defineChart } from "@tanstack/charts"
import { pie, polar, radialArc } from "@tanstack/charts/polar"
import { Chart } from "@tanstack/charts/react/core"
import { tooltip } from "@tanstack/charts/tooltip"

import { MERCHANDISE } from "@/constants/merchandise"
import { getCargo, getHoldContents } from "@/utils/cargo"
import { snakeCaseToTitleCase } from "@/utils/string"

import { chartRenderer } from "./chartConfig"
import ChartLegend from "./ChartLegend"

type Props = Pick<Player, "ships" | "inventory">

const freeColor = "var(--muted)"

const HoldChart = ({ ships, inventory }: Props) => {
  const { load, capacity, free } = getCargo({ ships, inventory })

  if (!capacity) return null

  // Free space is a slice too, so the donut shows how full the hold is
  const rows = [
    ...getHoldContents(inventory).map(({ item, amount }) => ({
      key: item,
      label: snakeCaseToTitleCase(item),
      unit: MERCHANDISE[item].unit,
      color: `var(--cargo-${item})`,
      amount,
    })),
    ...(free
      ? [
          {
            key: "free",
            label: "Free space",
            unit: "slots",
            color: freeColor,
            amount: free,
          },
        ]
      : []),
  ]

  const definition = defineChart({
    marks: [
      polar({
        inset: 4,
        marks: [
          radialArc(pie(rows, { value: "amount", gapAngle: 0.03 }), {
            innerRadius: ({ radius }) => radius * 0.62,
            cornerRadius: 3,
            fill: (slice) => slice.color,
            key: "key",
          }),
        ],
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      content: ([point]) => ({
        title: point?.datum.label ?? "",
        rows: point
          ? [
              {
                label: "Amount",
                value: `${point.datum.amount} ${point.datum.unit}`,
                color: point.datum.color,
              },
              {
                label: "Share of hold",
                value: `${Math.round((point.datum.amount / capacity) * 100)}%`,
              },
            ]
          : [],
      }),
    },
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-64">
        <Chart
          definition={definition}
          renderer={chartRenderer}
          height={240}
          ariaLabel="Goods in the hold"
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl">
            {load}/{capacity}
          </span>
          <span className="text-muted-foreground text-xs">in the hold</span>
        </div>
      </div>

      <ChartLegend items={rows} />
    </div>
  )
}

export default HoldChart
