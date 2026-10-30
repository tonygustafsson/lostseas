import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"

type Props = {
  label: string
  icon: ReactNode
  children: ReactNode
}

/** Frames a chart like a StatTile, so it sits in with the cards around it */
export default function ChartCard({ label, icon, children }: Props) {
  return (
    <Card className="gap-4 p-4">
      <p className="text-muted-foreground flex items-center gap-2 text-xs tracking-wide uppercase">
        <span aria-hidden="true" className="text-accent [&_svg]:size-4">
          {icon}
        </span>
        {label}
      </p>

      {children}
    </Card>
  )
}
