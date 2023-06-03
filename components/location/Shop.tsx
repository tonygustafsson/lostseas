import {
  GiBrandyBottle,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
} from "react-icons/gi"

type ItemProps = {
  title: string
  description: string
  icon: React.ReactElement
}

const Item = ({ title, description, icon }: ItemProps) => (
  <div className="card w-72 bg-base-100 shadow-xl pt-4">
    <figure>{icon}</figure>

    <div className="card-body pt-2">
      <h2 className="card-title">{title}</h2>

      <p>{description}</p>

      <div className="card-actions justify-end mt-2">
        <button className="btn btn-sm">Sell</button>
        <button className="btn btn-primary btn-sm">Buy</button>
      </div>
    </div>
  </div>
)

const Shop = () => (
  <div className="flex flex-wrap gap-6">
    <Item
      title="Food"
      description="You need food to travel the open seas."
      icon={<GiMeat className="text-6xl text-primary" />}
    />

    <Item
      title="Water"
      description="You need water to travel the open seas."
      icon={<GiWaterFlask className="text-6xl text-primary" />}
    />

    <Item
      title="Porcelain"
      description="A great trading asset. Not used for anything specific."
      icon={<GiPorcelainVase className="text-6xl text-primary" />}
    />

    <Item
      title="Spices"
      description="A great trading asset. Not used for anything specific."
      icon={<GiPowder className="text-6xl text-primary" />}
    />

    <Item
      title="Silk"
      description="A great trading asset. Not used for anything specific."
      icon={<GiRolledCloth className="text-6xl text-primary" />}
    />

    <Item
      title="Tobacco"
      description="A great trading asset and can also make your crew happy."
      icon={<GiSmokingPipe className="text-6xl text-primary" />}
    />

    <Item
      title="Rum"
      description="A great trading asset and can also make your crew happy."
      icon={<GiBrandyBottle className="text-6xl text-primary" />}
    />
  </div>
)

export default Shop
