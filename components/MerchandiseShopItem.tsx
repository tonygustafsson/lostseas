import { useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { capitalize } from "@/utils/string"

import TextField from "./ui/TextField"

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
    quantity * merchandise.buy > (player?.character.gold || Infinity)
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

          <div className="flex gap-2 mt-2">
            {type === "Buy" && (
              <div className="badge badge-secondary">
                Price: {MERCHANDISE[item].buy} gold
              </div>
            )}

            {type === "Sell" && (
              <div className="badge badge-secondary">
                Worth: {MERCHANDISE[item].sell} gold
              </div>
            )}
          </div>
        </>
      }
      actions={
        <>
          <div className="join">
            <button
              onClick={decrease}
              className="btn btn-sm btn-primary join-item"
            >
              -
            </button>

            <TextField
              value={quantity.toString()}
              onChange={changeQuantity}
              type="number"
              name={""}
              size="sm"
              fullWidth={false}
              className={`join-item ${quantity < 10 && "w-9"} ${
                quantity < 100 && "w-11"
              } ${quantity < 1000 && "w-14"} hide-number-arrows`}
            />

            <button
              onClick={increase}
              className="btn btn-sm btn-primary join-item"
            >
              +
            </button>
          </div>

          {type === "Buy" && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleBuy}
              disabled={buyingDisabled}
            >
              Buy
            </button>
          )}

          {type === "Sell" && (
            <div className="flex gap-1">
              <button className="btn btn-sm" onClick={handleSellAll}>
                All
              </button>

              <button
                className="btn btn-sm"
                onClick={handleSell}
                disabled={sellingDisabled}
              >
                Sell
              </button>
            </div>
          )}
        </>
      }
    />
  )
}

export default MerchandiseShopItem
