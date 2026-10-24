import { Coins } from "lucide-react"
import { GiCargoCrate } from "react-icons/gi"

import { cn } from "@/lib/utils"
import { formatQuantity } from "@/utils/shop"

export type BuyLimit = "gold" | "cargo"

type Props = {
  item: keyof Inventory
  /** The most the player can own after this trade. */
  max: number
  limitedBy: BuyLimit
  className?: string
}

/** How much of an item the player can own, and whether gold or space stops them. */
const ShopBuyLimit = ({ item, max, limitedBy, className }: Props) => (
  <p
    className={cn(
      "text-muted-foreground flex items-center gap-1 text-xs",
      className
    )}
  >
    {limitedBy === "gold" ? (
      <Coins aria-hidden="true" className="text-accent size-3" />
    ) : (
      <GiCargoCrate aria-hidden="true" className="text-accent size-3" />
    )}
    Up to {formatQuantity(item, max)}, limited by{" "}
    {limitedBy === "gold" ? "gold" : "cargo space"}
  </p>
)

export default ShopBuyLimit
