import { ArrowLeftRight, Coins } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/utils/number"
import { formatSigned, getTradeGold, type TradeChange } from "@/utils/shop"

type Props = {
  gold: number
  changes: TradeChange[]
  isTrading?: boolean
  onReset: () => void
  onTransfer: () => void
}

const Tile = ({
  label,
  icon,
  className,
  children,
}: {
  label: string
  icon: ReactNode
  className?: string
  children: ReactNode
}) => (
  <div className="bg-muted flex flex-col items-start gap-1 rounded-xl border px-2 py-2 sm:flex-row sm:items-center sm:gap-4 sm:px-4">
    <span
      aria-hidden="true"
      className="text-accent [&_svg]:size-5 sm:[&_svg]:size-8"
    >
      {icon}
    </span>

    <div className="min-w-0">
      <dt className="text-muted-foreground font-serif text-xs sm:text-sm">
        {label}
      </dt>

      <dd
        className={cn(
          "text-lg leading-tight font-semibold tabular-nums",
          className
        )}
      >
        {children}
      </dd>
    </div>
  </div>
)

const ShopTradeSummary = ({
  gold,
  changes,
  isTrading,
  onReset,
  onTransfer,
}: Props) => {
  const hasChanges = changes.length > 0
  const tradeGold = getTradeGold(changes)
  const goldAfter = gold + tradeGold
  const isShort = goldAfter < 0

  return (
    <section
      aria-label="Trade summary"
      className="bg-card flex flex-col gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center"
    >
      <dl className="grid flex-1 grid-cols-3 gap-2">
        <Tile label="Gold now" icon={<Coins />}>
          {formatNumber(gold)}
        </Tile>

        <Tile
          label={
            hasChanges
              ? `${changes.length} ${changes.length === 1 ? "change" : "changes"}`
              : "No changes"
          }
          icon={<ArrowLeftRight />}
          className={cn(
            tradeGold > 0 && "text-success",
            tradeGold < 0 && "text-accent"
          )}
        >
          {formatSigned(tradeGold)}
        </Tile>

        <Tile
          label={isShort ? "Short of gold" : "After trade"}
          icon={<Coins />}
          className={cn(isShort && "text-accent")}
        >
          {formatNumber(goldAfter)}
        </Tile>
      </dl>

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
          disabled={!hasChanges || isShort || isTrading}
        >
          <ArrowLeftRight aria-hidden="true" />
          Transfer
        </Button>
      </div>
    </section>
  )
}

export default ShopTradeSummary
