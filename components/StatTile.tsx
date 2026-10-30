import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: ReactNode
  icon: ReactNode
  unit?: string
  className?: string
}

export default function StatTile({
  label,
  value,
  icon,
  unit,
  className,
}: Props) {
  return (
    <Card className={cn("relative min-w-0 gap-1 p-4", className)}>
      <span
        aria-hidden="true"
        className="text-accent pointer-events-none absolute -right-2 -bottom-2 -rotate-12 opacity-25 [&_svg]:size-16"
      >
        {icon}
      </span>

      <p className="text-muted-foreground relative flex items-center gap-2 text-xs tracking-wide uppercase">
        <span aria-hidden="true" className="text-accent [&_svg]:size-4">
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </p>

      <p className="relative">
        <span className="font-serif text-xl font-semibold">{value}</span>

        {unit && (
          <span className="text-muted-foreground ml-1 text-sm">{unit}</span>
        )}
      </p>
    </Card>
  )
}
