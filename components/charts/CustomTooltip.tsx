"use client"

import { toDateTime } from "@/utils/date"
import { snakeCaseToTitleCase } from "@/utils/string"

type Props = {
  active?: boolean
  payload?: any
  label?: any
}

const CustomTooltip = ({ active, payload, label }: Props) => {
  if (!active || !payload || !payload.length) return null

  const entry = payload[0].payload

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        border: "none",
        boxShadow: "none",
        padding: 8,
      }}
    >
      <div style={{ color: "#aaa", fontSize: 12, marginBottom: 2 }}>
        {toDateTime(new Date(entry.timestamp))}
      </div>

      <div style={{ color: "#fff", fontSize: 12, marginBottom: 2 }}>
        {`Day ${label}`}
      </div>

      {payload.map((p: any, i: number) => (
        <div
          key={i}
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {snakeCaseToTitleCase(String(p.name))}
          </div>
          <div style={{ marginLeft: 8, fontWeight: "bold" }}>{p.value}</div>
        </div>
      ))}
    </div>
  )
}

export default CustomTooltip
