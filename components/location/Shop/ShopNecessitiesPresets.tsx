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
  /** Cargo space left after the planned trade. */
  freeCargo: number
  onApply: (targets: TradeTargets) => void
}

const ShopNecessitiesPresets = ({
  crewMembers,
  food,
  water,
  freeCargo,
  onApply,
}: Props) => {
  const daysWorth = getDaysWorthOfNecessities({ crewMembers, food, water })

  const presets = DAYS.map((days) => {
    const targets = getNecessitiesTargets({ crewMembers, food, water }, days)
    const extra = (targets.food ?? 0) - food + (targets.water ?? 0) - water

    return { days, targets, fits: extra <= freeCargo }
  })
  const someDoNotFit = presets.some(
    ({ days, fits }) => days > daysWorth && !fits
  )

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
        {presets.map(({ days, targets, fits }) => (
          <Button
            key={days}
            size="sm"
            variant="outline"
            onClick={() => onApply(targets)}
            disabled={days <= daysWorth || !fits}
          >
            {days} days
          </Button>
        ))}
      </div>

      {someDoNotFit && (
        <p className="text-muted-foreground text-sm">
          Not enough cargo space for longer voyages.
        </p>
      )}
    </div>
  )
}

export default ShopNecessitiesPresets
