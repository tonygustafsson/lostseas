import { useState } from "react"

import { PRICES } from "@/constants/prices"
import { useInventory } from "@/hooks/queries/useInventory"
import { capitalize } from "@/utils/string"

import TextField from "../../ui/TextField"

type Props = {
  player?: Player
  item: keyof Inventory
  description: string
  icon: React.ReactElement
}

// TODO: Make use of zod for validation, not sure how with buying and selling are two different actions

const ShopItem = ({ player, item, description, icon }: Props) => {
  const { buy, sell } = useInventory()
  const [quantity, setQuantity] = useState(1)

  const price = PRICES[item]
  const buyingDisabled =
    quantity * price.buy > (player?.character.doubloons || Infinity)
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
      userId: player?.id || "",
      item,
      quantity,
    })
  }

  const handleSell = () => {
    sell({
      userId: player?.id || "",
      item,
      quantity,
    })
  }

  return (
    <div className="card w-80 bg-base-100 shadow-xl pt-4">
      <figure>{icon}</figure>

      <div className="card-body pt-2">
        <div className="indicator">
          <h2 className="card-title mr-6">{capitalize(item)}</h2>

          <span className="indicator-item indicator-middle badge badge-primary">
            {player?.inventory[item] || 0}
          </span>
        </div>

        <p>{description}</p>

        <div className="flex gap-2 mt-2">
          <div className="badge badge-secondary">
            Buy: {PRICES[item].buy} dbl
          </div>
          <div className="badge badge-secondary">
            Sell: {PRICES[item].sell} dbl
          </div>
        </div>

        <div className="card-actions justify-end mt-4 gap-2">
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
      </div>
    </div>
  )
}

export default ShopItem
