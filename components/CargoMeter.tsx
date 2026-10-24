import { GiCargoCrate } from "react-icons/gi"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/utils/number"

/** Share of the hold that counts as nearly full. */
const NEARLY_FULL = 0.9

type Props = {
  load: number
  capacity: number
  label?: string
  className?: string
}

const CargoMeter = ({ load, capacity, label = "Cargo", className }: Props) => {
  const isOverloaded = load > capacity
  const isNearlyFull = !isOverloaded && load >= capacity * NEARLY_FULL
  const percentage = capacity > 0 ? Math.min(100, (load / capacity) * 100) : 100

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground flex items-center gap-2">
          <GiCargoCrate aria-hidden="true" className="text-accent size-4" />
          {label}
        </span>

        <span
          className={cn(
            "font-semibold tabular-nums",
            isOverloaded && "text-destructive",
            isNearlyFull && "text-accent"
          )}
        >
          {formatNumber(load)} / {formatNumber(capacity)}
        </span>
      </div>

      <Progress
        value={percentage}
        aria-label={`${label}: ${load} of ${capacity}`}
        variant={isOverloaded ? "default" : "gilded"}
        className={cn(isOverloaded && "*:bg-destructive")}
      />
    </div>
  )
}

export default CargoMeter
