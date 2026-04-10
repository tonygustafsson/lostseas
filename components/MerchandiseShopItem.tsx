import { useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { Badge } from "@/components/ui/badge"
import { ButtonGroup } from "@/components/ui/button-group"
import { MERCHANDISE } from "@/constants/merchandise"
import { cn } from "@/lib/utils"
import { capitalize } from "@/utils/string"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  player?: Player
  item: keyof Inventory
  type: "Buy" | "Sell"
  onBuy: (props: { item: keyof Inventory; quantity: number }) => void
  onSell: (props: { item: keyof Inventory; quantity: number }) => void
}

const MerchandiseShopItem = ({ player, item, type, onBuy, onSell }: Props) => {
  const [quantity, setQuantity] = useState(1)

  const merchandise = MERCHANDISE[item]
  const buyingDisabled =
    quantity * merchandise.buy > (player?.character.gold || 0)
  const sellingDisabled = quantity > (player?.inventory?.[item] || 0)

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setQuantity(1)
    } else {
      setQuantity(parseInt(e.target.value))
    }
  }

  const increase = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleBuy = () => {
    onBuy({
      item,
      quantity,
    })
  }

  const handleSell = () => {
    onSell({
      item,
      quantity,
    })
  }

  const handleSellAll = () => {
    onSell({
      item,
      quantity: player?.inventory?.[item] || 0,
    })
  }

  if (type === "Sell" && !player?.inventory?.[item]) {
    return null
  }

  return (
    <MerchandiseCard
      title={capitalize(item)}
      indicator={player?.inventory?.[item]?.toString() || "0"}
      icon={<MerchandiseIcon item={item} />}
      disabled={type === "Buy" ? buyingDisabled : sellingDisabled}
      body={
        <>
          <p>{MERCHANDISE[item].description}</p>

          <div className="mt-4 flex gap-2">
            {type === "Buy" && (
              <Badge variant="secondary">
                Price: {MERCHANDISE[item].buy} gold
              </Badge>
            )}

            {type === "Sell" && (
              <Badge variant="secondary">
                Worth: {MERCHANDISE[item].sell} gold
              </Badge>
            )}
          </div>
        </>
      }
      actions={
        <>
          <ButtonGroup className="w-fit">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={decrease}
            >
              -
            </Button>

            <Input
              value={quantity.toString()}
              onChange={changeQuantity}
              type="number"
              className={cn(
                "border-border bg-input/30 h-8 w-12 [appearance:textfield] rounded-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                quantity < 10 && "w-10",
                quantity < 100 && "w-12",
                quantity < 1000 && "w-14"
              )}
            />

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={increase}
            >
              +
            </Button>
          </ButtonGroup>

          {type === "Buy" && (
            <Button
              type="button"
              size="sm"
              onClick={handleBuy}
              disabled={buyingDisabled}
            >
              Buy
            </Button>
          )}

          {type === "Sell" && (
            <ButtonGroup className="w-fit">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleSellAll}
              >
                All
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={handleSell}
                disabled={sellingDisabled}
              >
                Sell
              </Button>
            </ButtonGroup>
          )}
        </>
      }
    />
  )
}

export default MerchandiseShopItem
