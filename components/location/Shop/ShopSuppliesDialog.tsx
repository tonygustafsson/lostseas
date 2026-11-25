import { Box } from "lucide-react"
import { GiGalleon } from "react-icons/gi"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  getDaysWorthOfNecessities,
  getSuppliesNeeded,
  type TradeChange,
  type TradeTargets,
} from "@/utils/shop"

import ShopTradeTotals from "./ShopTradeTotals"

const DAYS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

type Props = {
  crewMembers: number
  /** Food the player will own after the planned trade. */
  food: number
  /** Water the player will own after the planned trade. */
  water: number
  gold: number
  changes: TradeChange[]
  cargoAfter: number
  cargoCapacity: number
  /** Whether there are barter goods left to sell in the planned trade. */
  canSellBarterGoods: boolean
  onApply: (targets: TradeTargets) => void
  onSellBarterGoods: () => void
  onReset: () => void
}

const ShopSuppliesDialog = ({
  crewMembers,
  food,
  water,
  gold,
  changes,
  cargoAfter,
  cargoCapacity,
  canSellBarterGoods,
  onApply,
  onSellBarterGoods,
  onReset,
}: Props) => {
  const daysWorth = getDaysWorthOfNecessities({ crewMembers, food, water })
  const freeCargo = cargoCapacity - cargoAfter

  const presets = DAYS.map((days) => {
    const targets = getSuppliesNeeded(crewMembers, days)
    const extra = targets.food - food + (targets.water - water)

    return {
      days,
      targets,
      isCurrent: targets.food === food && targets.water === water,
      fits: extra <= freeCargo,
    }
  })
  const someDoNotFit = presets.some(({ fits }) => !fits)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="w-full sm:w-auto"
        >
          <GiGalleon aria-hidden="true" />
          Stock up for a voyage
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Stock up for a voyage
          </DialogTitle>

          <DialogDescription>
            {crewMembers === 0
              ? "You have no crew, so you do not need food or water."
              : "Your crew eats and drinks every day at sea. Pick a number of days to buy or sell food and water until you have exactly enough for that long."}
          </DialogDescription>
        </DialogHeader>

        {crewMembers > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              You have food and water for{" "}
              <span className="font-semibold">{daysWorth} days</span>.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {presets.map(({ days, targets, isCurrent, fits }) => (
                <Button
                  key={days}
                  type="button"
                  variant={days <= daysWorth ? "secondary" : "outline"}
                  onClick={() => onApply(targets)}
                  disabled={isCurrent || !fits}
                >
                  {days} days
                </Button>
              ))}
            </div>

            {someDoNotFit && (
              <p className="text-muted-foreground text-sm">
                Not enough cargo space for the longer voyages.
              </p>
            )}
          </div>
        )}

        <Separator />

        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Sells every barter good you carry at the prices of this shop, which
            frees up cargo space and gives you gold for supplies.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={onSellBarterGoods}
            disabled={!canSellBarterGoods}
          >
            <Box aria-hidden="true" />
            Sell all barter goods
          </Button>
        </div>

        <Separator />

        <ShopTradeTotals
          gold={gold}
          changes={changes}
          cargoAfter={cargoAfter}
          cargoCapacity={cargoCapacity}
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={changes.length === 0}
          >
            Reset
          </Button>

          <DialogClose asChild>
            <Button type="button">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShopSuppliesDialog
