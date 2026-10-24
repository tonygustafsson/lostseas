import { SlidersHorizontal } from "lucide-react"

import MerchandiseIcon from "@/components/MerchandiseIcon"
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
import { MERCHANDISE } from "@/constants/merchandise"
import { formatGold } from "@/utils/number"
import { formatAmountChange, formatQuantity } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

import ShopBuyLimit, { type BuyLimit } from "./ShopBuyLimit"
import ShopTradeChange from "./ShopTradeChange"
import ShopTradeControls from "./ShopTradeControls"

const STEPS = [-50, -10, 10, 50]

type Props = {
  item: keyof Inventory
  owned: number
  target: number
  /** The most the player can own with the gold and cargo space left. */
  max: number
  /** What stops the player from owning more than max. */
  limitedBy: BuyLimit
  /** How much the crew uses each day, for food and water. */
  dailyUse?: number
  onChange: (target: number) => void
}

const ShopQuantityDialog = ({
  item,
  owned,
  target,
  max,
  limitedBy,
  dailyUse,
  onChange,
}: Props) => {
  const title = snakeCaseToTitleCase(item)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" size="sm">
          <SlidersHorizontal aria-hidden="true" />
          Adjust
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-2xl">
            <MerchandiseIcon item={item} size="sm" className="text-gold" />
            {title}
          </DialogTitle>

          <DialogDescription>
            You own {formatQuantity(item, owned)}. Buy{" "}
            {formatGold(MERCHANDISE[item].buy)}, sell{" "}
            {formatGold(MERCHANDISE[item].sell)} each.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted flex flex-col items-center gap-1 rounded-xl border p-4">
          <p className="text-2xl font-semibold tabular-nums">
            {formatAmountChange(item, owned, target)}
          </p>

          <ShopTradeChange
            item={item}
            owned={owned}
            target={target}
            className="text-sm"
          />

          {!!dailyUse && (
            <p className="text-muted-foreground text-sm">
              Lasts {Math.floor(target / dailyUse)} days at sea
            </p>
          )}

          <ShopBuyLimit
            item={item}
            max={max}
            limitedBy={limitedBy}
            className="text-sm"
          />
        </div>

        <div className="flex justify-center">
          <ShopTradeControls
            item={item}
            target={target}
            max={max}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => (
            <Button
              key={step}
              type="button"
              variant="outline"
              onClick={() =>
                onChange(
                  step > 0
                    ? Math.min(target + step, max)
                    : Math.max(0, target + step)
                )
              }
              disabled={
                (step < 0 && target === 0) || (step > 0 && target >= max)
              }
            >
              {step > 0 ? `+${step}` : `−${-step}`}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onChange(0)}
            disabled={target === 0}
          >
            Sell all
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onChange(max)}
            disabled={target === max}
          >
            Buy max
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onChange(owned)}
            disabled={target === owned}
          >
            Reset
          </Button>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShopQuantityDialog
