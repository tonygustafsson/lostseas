"use client"

import { TooltipContentProps } from "recharts"

import { toDateTime } from "@/utils/date"
import { snakeCaseToTitleCase } from "@/utils/string"

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<any, any>) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const entry = payload[0].payload

  return (
    <div className="rounded-sm border border-neutral-400 bg-neutral-800 p-2">
      <div className="mb-0.5 text-xs text-neutral-400">
        {toDateTime(new Date(entry.timestamp))}
      </div>

      <div className="mb-0.5 text-xs text-white">{`Day ${label}`}</div>

      {payload.map((p, i) => (
        <div
          key={`tooltip-${p.name}-${i}`}
          className="flex content-between text-xs text-white"
        >
          <div className="font-bold">
            {snakeCaseToTitleCase(p.name?.toString() ?? "")}
          </div>
          <div className="ml-2 font-bold">{p.value}</div>
        </div>
      ))}
    </div>
  )
}

export default CustomTooltip
