import { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AttackReportItemProps = {
  title: string
  change: string
  icon: ReactNode
  variant: "success" | "error"
  children: ReactNode
  className?: string
}

const AttackReportItem = ({
  title,
  change,
  icon,
  variant,
  children,
  className,
}: AttackReportItemProps) => (
  <li className={className}>
    <Card
      className={cn(
        "h-full gap-1 rounded-md border p-2 ring-0",
        variant === "success"
          ? "border-success/40 bg-success/10"
          : "border-destructive/40 bg-destructive/10"
      )}
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-accent shrink-0 *:size-5">
          {icon}
        </span>

        <h3 className="min-w-0 font-serif text-base font-bold wrap-break-word capitalize">
          {title}
        </h3>
      </div>

      <p
        className={cn(
          "text-lg font-bold tabular-nums",
          variant === "success" ? "text-success" : "text-destructive"
        )}
      >
        {change}
      </p>

      <div className="text-muted-foreground text-xs">{children}</div>
    </Card>
  </li>
)

export default AttackReportItem
