import {
  GiBrandyBottle,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
} from "react-icons/gi"

type Props = {
  item: keyof Inventory
}

const MerchandiseIcon = ({ item }: Props) => {
  switch (item) {
    case "food":
      return <GiMeat className="text-6xl text-primary" />
    case "water":
      return <GiWaterFlask className="text-6xl text-primary" />
    case "porcelain":
      return <GiPorcelainVase className="text-6xl text-primary" />
    case "spices":
      return <GiPowder className="text-6xl text-primary" />
    case "silk":
      return <GiRolledCloth className="text-6xl text-primary" />
    case "tobacco":
      return <GiSmokingPipe className="text-6xl text-primary" />
    case "rum":
      return <GiBrandyBottle className="text-6xl text-primary" />
    default:
      return null
  }
}

export default MerchandiseIcon
