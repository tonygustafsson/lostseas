import { Info } from "lucide-react"
import Image from "next/image"

import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MERCHANDISE } from "@/constants/merchandise"
import { formatAmountChange } from "@/utils/shop"
import { snakeCaseToTitleCase } from "@/utils/string"

import ShopBuyLimit, { type BuyLimit } from "./ShopBuyLimit"
import ShopQuantityDialog from "./ShopQuantityDialog"
import ShopTradeChange from "./ShopTradeChange"
import ShopTradeControls from "./ShopTradeControls"

type Props = {
  item: keyof Inventory
  owned: number
  target: number
  max: number
  limitedBy: BuyLimit
  dailyUse?: number
  onChange: (target: number) => void
}

const ShopTradeItem = ({
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
    <li className="bg-card relative overflow-hidden rounded-xl border">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 select-none md:w-1/2">
        <Image
          src={`/img/cards/shop/${item}.png`}
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-90"
        />

        <div className="via-card/70 to-card absolute inset-y-0 -right-px left-0 bg-linear-to-r from-transparent" />
      </div>

      <div className="relative flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-4">
          <span
            aria-hidden="true"
            className="border-accent/60 bg-background flex size-12 shrink-0 items-center justify-center rounded-full border"
          >
            <MerchandiseIcon item={item} size="sm" />
          </span>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-shadow-background font-serif text-xl font-semibold text-shadow-sm">
                {title}
              </h3>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon-xs"
                    variant="outline"
                    aria-label={`About ${title}`}
                    className="bg-background text-accent border-accent/60 hover:bg-muted rounded-full"
                  >
                    <Info />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>{MERCHANDISE[item].description}</PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-wrap gap-1">
              <Badge className="bg-background text-foreground">
                Buy {MERCHANDISE[item].buy}
              </Badge>

              <Badge className="bg-background text-foreground">
                Sell {MERCHANDISE[item].sell}
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-background/60 flex items-center justify-between gap-2 rounded-xl px-4 py-2 md:w-48 md:flex-col md:items-end md:gap-1 md:bg-transparent md:p-0">
          <p className="text-lg font-semibold tabular-nums">
            {formatAmountChange(item, owned, target)}
          </p>

          <ShopTradeChange
            item={item}
            owned={owned}
            target={target}
            className="text-xs"
          />

          <ShopBuyLimit item={item} max={max} limitedBy={limitedBy} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <ShopTradeControls
            item={item}
            target={target}
            max={max}
            onChange={onChange}
          />

          <ShopQuantityDialog
            item={item}
            owned={owned}
            target={target}
            max={max}
            limitedBy={limitedBy}
            dailyUse={dailyUse}
            onChange={onChange}
          />
        </div>
      </div>
    </li>
  )
}

export default ShopTradeItem
