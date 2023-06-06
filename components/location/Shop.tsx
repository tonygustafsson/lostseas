import { useState } from "react"
import {
  GiBrandyBottle,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
} from "react-icons/gi"

import { PRICES } from "@/constants/prices"
import { useInventory } from "@/hooks/queries/useInventory"
import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { capitalize } from "@/utils/string"

import TextField from "../ui/TextField"

type ItemProps = {
  player?: Player
  item: keyof Inventory
  description: string
  icon: React.ReactElement
}

const Item = ({ player, item, description, icon }: ItemProps) => {
  const { buy, sell } = useInventory()
  const [quantity, setQuantity] = useState(1)

  const price = PRICES[item]
  const buyingDisabled =
    quantity * price.buy > (player?.character.doubloons || Infinity)
  const sellingDisabled = quantity > (player?.inventory[item] || Infinity)

  const changeQuantity = (value: string) => {
    if (value === "") {
      setQuantity(1)
    } else {
      setQuantity(parseInt(value))
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
        <h2 className="card-title">{capitalize(item)}</h2>

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

const Shop = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="flex flex-wrap gap-6">
      <Item
        item="food"
        description="You need food to travel the open seas."
        icon={<GiMeat className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="water"
        description="You need water to travel the open seas."
        icon={<GiWaterFlask className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="porcelain"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPorcelainVase className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="spices"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPowder className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="silk"
        description="A great trading asset. Not used for anything specific."
        icon={<GiRolledCloth className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="tobacco"
        description="A great trading asset and can also make your crew happy."
        icon={<GiSmokingPipe className="text-6xl text-primary" />}
        player={player}
      />

      <Item
        item="rum"
        description="A great trading asset and can also make your crew happy."
        icon={<GiBrandyBottle className="text-6xl text-primary" />}
        player={player}
      />
    </div>
  )
}

export default Shop
