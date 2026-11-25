import { AlertTriangleIcon, ArrowLeftRight } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { addsCargo } from "@/utils/cargo"
import { formatNumber } from "@/utils/number"
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
  const goldAfter = gold + getTradeGold(changes)
  const isShort = goldAfter < 0
  // Selling is always allowed, even when the fleet is already overloaded
  const isOverCapacity = cargoAfter > cargoCapacity && addsCargo(changes)

  const problems = [
    isShort && {
      title: "Not enough gold",
      text: `You are ${formatNumber(-goldAfter)} gold short. Buy less or sell something to make the trade.`,
    },
    isOverCapacity && {
      title: "Not enough cargo space",
      text: `You need room for ${formatNumber(cargoAfter - cargoCapacity)} more in your hold. Buy less or sell something to make the trade.`,
    },
  ].filter((problem) => !!problem)

  return (
    <section
      aria-label="Trade summary"
      className="bg-card flex flex-col gap-4 rounded-2xl border p-4"
    >
      <ShopTradeTotals
        gold={gold}
        changes={changes}
        cargoAfter={cargoAfter}
        cargoCapacity={cargoCapacity}
        className="sm:grid-cols-4"
      />

      {problems.map(({ title, text }) => (
        <Alert key={title} variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{text}</AlertDescription>
        </Alert>
      ))}

      <div className="flex gap-2 *:flex-1 sm:*:flex-none">
        <Button
          variant={problems.length > 0 ? "error" : "default"}
          onClick={onTransfer}
          disabled={!hasChanges || problems.length > 0 || isTrading}
        >
          <ArrowLeftRight aria-hidden="true" />
          Transfer
        </Button>

        <Button
          variant="outline"
          onClick={onReset}
          disabled={!hasChanges || isTrading}
        >
          Reset
        </Button>
      </div>
    </section>
  )
}

export default ShopTradeSummary
