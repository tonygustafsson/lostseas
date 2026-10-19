import { Button } from "@/components/ui/button"
import {
  getDaysWorthOfNecessities,
  getNecessitiesTargets,
  type TradeTargets,
} from "@/utils/shop"

const DAYS = [5, 10, 25, 50]

type Props = {
  crewMembers: number
  /** Food the player will own after the planned trade. */
  food: number
  /** Water the player will own after the planned trade. */
  water: number
  onApply: (targets: TradeTargets) => void
}

const ShopNecessitiesPresets = ({
  crewMembers,
  food,
  water,
  onApply,
}: Props) => {
  const daysWorth = getDaysWorthOfNecessities({ crewMembers, food, water })

  if (crewMembers === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        You have no crew, so you do not need food or water.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <p className="text-muted-foreground text-sm">
        Food and water for {daysWorth} days. Top up to:
      </p>

      <div className="flex flex-wrap gap-2">
        {DAYS.map((days) => (
          <Button
            key={days}
            size="sm"
            variant="outline"
            onClick={() =>
              onApply(getNecessitiesTargets({ crewMembers, food, water }, days))
            }
            disabled={days <= daysWorth}
          >
            {days} days
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ShopNecessitiesPresets
