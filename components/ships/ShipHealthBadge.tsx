import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Props = {
  health: Ship["health"]
  className?: string
}

export default function ShipHealthBadge({ health, className }: Props) {
  const color =
    health > 75
      ? "bg-success/10 text-success"
      : health > 30
        ? "bg-warning/10 text-warning"
        : "bg-error/10 text-error"

  return <Badge className={cn(color, className)}>Health: {health}%</Badge>
}
