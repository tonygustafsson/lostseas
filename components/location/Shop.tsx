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

import { prices } from "@/constants/prices"
import { useInventory } from "@/hooks/queries/useInventory"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

import TextField from "../ui/TextField"

type ItemProps = {
  userId?: Player["id"]
  title: string
  description: string
  icon: React.ReactElement
}

const Item = ({ userId, title, description, icon }: ItemProps) => {
  const { buy, sell } = useInventory()

  const [quantity, setQuantity] = useState(1)

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
      userId: userId || "",
      item: title.toLowerCase() as keyof Inventory,
      quantity,
    })
  }

  const handleSell = () => {
    sell({
      userId: userId || "",
      item: title.toLowerCase() as keyof Inventory,
      quantity,
    })
  }

  return (
    <div className="card w-80 bg-base-100 shadow-xl pt-4">
      <figure>{icon}</figure>

      <div className="card-body pt-2">
        <h2 className="card-title">{title}</h2>

        <p>{description}</p>

        <div className="flex gap-2 mt-2">
          <div className="badge badge-secondary">
            Buy: {prices[title.toLowerCase() as keyof Inventory].buy} dbl
          </div>
          <div className="badge badge-secondary">
            Sell: {prices[title.toLowerCase() as keyof Inventory].sell} dbl
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

          <button className="btn btn-sm" onClick={handleSell}>
            Sell
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleBuy}>
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
        title="Food"
        description="You need food to travel the open seas."
        icon={<GiMeat className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Water"
        description="You need water to travel the open seas."
        icon={<GiWaterFlask className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Porcelain"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPorcelainVase className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Spices"
        description="A great trading asset. Not used for anything specific."
        icon={<GiPowder className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Silk"
        description="A great trading asset. Not used for anything specific."
        icon={<GiRolledCloth className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Tobacco"
        description="A great trading asset and can also make your crew happy."
        icon={<GiSmokingPipe className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />

      <Item
        title="Rum"
        description="A great trading asset and can also make your crew happy."
        icon={<GiBrandyBottle className="text-6xl text-primary" />}
        userId={player?.id || ""}
      />
    </div>
  )
}

export default Shop
