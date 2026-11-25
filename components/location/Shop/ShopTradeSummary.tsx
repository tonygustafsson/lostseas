import { ArrowLeftRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { addsCargo } from "@/utils/cargo"
import { getTradeGold, type TradeChange } from "@/utils/shop"

import ShopTradeTotals from "./ShopTradeTotals"

type Props = {
  gold: number
  changes: TradeChange[]
  cargoAfter: number
  cargoCapacity: number
  isTrading?: boolean
  onReset: () => void
  onTransfer: () => void
}

const ShopTradeSummary = ({
  gold,
  changes,
  cargoAfter,
  cargoCapacity,
  isTrading,
  onReset,
  onTransfer,
}: Props) => {
  const hasChanges = changes.length > 0
  const isShort = gold + getTradeGold(changes) < 0
  // Selling is always allowed, even when the fleet is already overloaded
  const isOverCapacity = cargoAfter > cargoCapacity && addsCargo(changes)

  return (
    <section
      aria-label="Trade summary"
      className="bg-card flex flex-col gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center"
    >
      <ShopTradeTotals
        gold={gold}
        changes={changes}
        cargoAfter={cargoAfter}
        cargoCapacity={cargoCapacity}
        className="flex-1 sm:grid-cols-4"
      />

      <div className="flex gap-2 *:flex-1 lg:*:flex-none">
        <Button
          variant="outline"
          onClick={onReset}
          disabled={!hasChanges || isTrading}
        >
          Reset
        </Button>

        <Button
          onClick={onTransfer}
          disabled={!hasChanges || isShort || isOverCapacity || isTrading}
        >
          <ArrowLeftRight aria-hidden="true" />
          Transfer
        </Button>
      </div>
    </section>
  )
}

export default ShopTradeSummary
