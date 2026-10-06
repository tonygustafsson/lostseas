import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Props = {
  health: Ship["health"]
  className?: string
}

export default function ShipHealthBadge({ health, className }: Props) {
  const color =
    health > 75 ? "bg-green-700" : health > 30 ? "bg-amber-600" : "bg-red-600"

  return (
    <Badge className={cn("text-white", color, className)}>
      Health: {health}%
    </Badge>
  )
}
