import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatGoldChange, formatQuantity, getItemChange } from "@/utils/shop"

type Props = {
  item: keyof Inventory
  owned: number
  target: number
  className?: string
}

/** The planned change for one item, like "Sell 10 crates | +110 gold". */
const ShopTradeChange = ({ item, owned, target, className }: Props) => {
  const { action, amount, gold } = getItemChange(item, owned, target)

  if (!action) {
    return <p className={cn("text-muted-foreground", className)}>No change</p>
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-semibold whitespace-nowrap",
        gold > 0 ? "text-success" : "text-accent",
        className
      )}
    >
      <span>
        {action} {formatQuantity(item, amount)}
      </span>

      <Separator orientation="vertical" />

      <span>{formatGoldChange(gold)}</span>
    </div>
  )
}

export default ShopTradeChange
