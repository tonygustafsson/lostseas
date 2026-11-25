import { ArrowLeftRight, Coins } from "lucide-react"
import type { ReactNode } from "react"
import { GiCargoCrate } from "react-icons/gi"

import { cn } from "@/lib/utils"
import { addsCargo } from "@/utils/cargo"
import { formatNumber } from "@/utils/number"
import { formatSigned, getTradeGold, type TradeChange } from "@/utils/shop"

type Props = {
  gold: number
  changes: TradeChange[]
  /** Leave out for goods that don't use the hold, and the cargo tile is hidden */
  cargoAfter?: number
  cargoCapacity?: number
  className?: string
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
      className="text-gold [&_svg]:size-5 sm:[&_svg]:size-8"
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

/** Gold and cargo before and after the planned trade. */
const ShopTradeTotals = ({
  gold,
  changes,
  cargoAfter,
  cargoCapacity,
  className,
}: Props) => {
  const tradeGold = getTradeGold(changes)
  const goldAfter = gold + tradeGold
  const isShort = goldAfter < 0
  // Selling is always allowed, even when the fleet is already overloaded
  const hasCargo = cargoAfter !== undefined && cargoCapacity !== undefined
  const isOverCapacity =
    hasCargo && cargoAfter > cargoCapacity && addsCargo(changes)

  return (
    <dl className={cn("grid grid-cols-2 gap-2", className)}>
      <Tile label="Gold now" icon={<Coins />}>
        {formatNumber(gold)}
      </Tile>

      <Tile
        label={
          changes.length > 0
            ? `${changes.length} ${changes.length === 1 ? "change" : "changes"}`
            : "No changes"
        }
        icon={<ArrowLeftRight />}
        className={cn(
          tradeGold > 0 && "text-success",
          tradeGold < 0 && "text-gold"
        )}
      >
        {formatSigned(tradeGold)}
      </Tile>

      <Tile
        label={isShort ? "Short of gold" : "After trade"}
        icon={<Coins />}
        className={cn(isShort && "text-error")}
      >
        {formatNumber(goldAfter)}
      </Tile>

      {hasCargo && (
        <Tile
          label={isOverCapacity ? "Over capacity" : "Cargo after trade"}
          icon={<GiCargoCrate />}
          className={cn(isOverCapacity && "text-error")}
        >
          {formatNumber(cargoAfter)} / {formatNumber(cargoCapacity)}
        </Tile>
      )}
    </dl>
  )
}

export default ShopTradeTotals
