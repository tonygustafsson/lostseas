import { useState } from "react"

import MerchandiseCard from "@/components/MerchandiseCard"
import MerchandiseIcon from "@/components/MerchandiseIcon"
import { MERCHANDISE } from "@/constants/merchandise"
import { useShop } from "@/hooks/queries/useShop"
import { capitalize } from "@/utils/string"

import TextField from "../../ui/TextField"

type Props = {
  player?: Player
  item: keyof Inventory
}

// TODO: Make use of zod for validation, not sure how with buying and selling are two different actions

const ShopItem = ({ player, item }: Props) => {
  const { buy, sell } = useShop()
  const [quantity, setQuantity] = useState(1)

  const merchandise = MERCHANDISE[item]
  const buyingDisabled =
    quantity * merchandise.buy > (player?.character.doubloons || Infinity)
  const sellingDisabled = quantity > (player?.inventory[item] || 0)

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
    buy({
      playerId: player?.id || "",
      item,
      quantity,
    })
  }

  const handleSell = () => {
    sell({
      playerId: player?.id || "",
      item,
      quantity,
    })
  }

  return (
    <MerchandiseCard
      title={capitalize(item)}
      indicator={player?.inventory[item]?.toString() || "0"}
      icon={<MerchandiseIcon item={item} />}
      body={
        <>
          <p>{MERCHANDISE[item].description}</p>

          <div className="flex gap-2 mt-2">
            <div className="badge badge-secondary">
              Buy: {MERCHANDISE[item].buy} dbl
            </div>
            <div className="badge badge-secondary">
              Sell: {MERCHANDISE[item].sell} dbl
            </div>
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

          <div className="flex gap-3">
            <button
              className="btn btn-sm"
              onClick={handleSell}
              disabled={sellingDisabled}
            >
              Sell
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleBuy}
              disabled={buyingDisabled}
            >
              Buy
            </button>
          </div>
        </>
      }
    />
  )
}

export default ShopItem
