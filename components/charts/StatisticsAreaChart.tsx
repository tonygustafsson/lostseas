"use client"

import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { StatisticsEntry } from "@/firebase/db"
import { snakeCaseToTitleCase } from "@/utils/string"

import CustomTooltip from "./CustomTooltip"

export type ChartDataPoint = Pick<
  StatisticsEntry,
  "day" | "timestamp" | keyof StatisticsEntry
>

type Props = {
  metric: keyof StatisticsEntry
  data: ChartDataPoint[]
}

const StatisticsAreaChart = ({ metric, data }: Props) => {
  if (!data.length) return null

  const color = "var(--chart-1)"

  return (
    <div className="h-60 w-full [&_.recharts-legend-item]:mr-0!">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 12, left: -32, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.6} />
              <stop offset="95%" stopColor={color} stopOpacity={0.08} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) =>
              typeof tick === "number" ? `Day ${tick}` : String(tick)
            }
          />
          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip content={(props) => <CustomTooltip {...props} />} />

          <Legend verticalAlign="top" height={36} className="mr-0" />

          <Area
            name={snakeCaseToTitleCase(metric)}
            type="linear"
            dataKey={metric}
            isAnimationActive={false}
            stroke={color}
            fill={`url(#grad-${metric})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatisticsAreaChart
