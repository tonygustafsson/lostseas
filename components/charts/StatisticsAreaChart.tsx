"use client"

import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { StatisticsEntry } from "@/firebase/db"
import { snakeCaseToTitleCase } from "@/utils/string"

import CustomTooltip from "./CustomTooltip"

type Props = {
  metric: keyof StatisticsEntry
  data: Pick<StatisticsEntry, "day" | "timestamp" | keyof StatisticsEntry>[]
}

const StatisticsAreaChart = ({ metric, data }: Props) => {
  const colors = [`var(--chart-1)`]

  console.log({ data, metric })

  if (!data.length) return null

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[0]} stopOpacity={0.6} />
              <stop offset="95%" stopColor={colors[0]} stopOpacity={0.08} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.04} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) =>
              typeof tick === "number" ? `Day ${tick}` : String(tick)
            }
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          <Area
            name={snakeCaseToTitleCase(metric)}
            type="monotone"
            dataKey={metric}
            isAnimationActive={false}
            stroke={colors[0]}
            fill={`url(#grad-${metric})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatisticsAreaChart
