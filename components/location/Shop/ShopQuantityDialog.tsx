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
import { formatAmountChange, formatQuantity } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

import ShopTradeChange from "./ShopTradeChange"
import ShopTradeControls from "./ShopTradeControls"

const STEPS = [-50, -10, 10, 50]

type Props = {
  item: keyof Inventory
  owned: number
  target: number
  /** The most the player can own with the gold left in this trade. */
  affordable: number
  /** How much the crew uses each day, for food and water. */
  dailyUse?: number
  onChange: (target: number) => void
}

const ShopQuantityDialog = ({
  item,
  owned,
  target,
  affordable,
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
            You own {formatQuantity(item, owned)}. Buy {MERCHANDISE[item].buy}{" "}
            gold, sell {MERCHANDISE[item].sell} gold each.
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
        </div>

        <div className="flex justify-center">
          <ShopTradeControls item={item} target={target} onChange={onChange} />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => (
            <Button
              key={step}
              type="button"
              variant="outline"
              onClick={() => onChange(Math.max(0, target + step))}
              disabled={step < 0 && target === 0}
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
            onClick={() => onChange(affordable)}
            disabled={target === affordable}
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
