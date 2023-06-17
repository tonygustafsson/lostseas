import {
  GiBrandyBottle,
  GiCargoShip,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiShoonerSailboat,
  GiSmallFishingSailboat,
  GiSmokingPipe,
  GiWaterFlask,
  GiWineBottle,
} from "react-icons/gi"
import { TbSailboat } from "react-icons/tb"

type Props = {
  item: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

const getSizeClass = (size: string) => {
  switch (size) {
    case "xs":
      return "w-5 h-5"
    case "sm":
      return "w-7 h-7"
    case "md":
      return "w-9 h-9"
    case "lg":
      return "w-11 h-11"
    case "xl":
      return "w-16 h-16"
    default:
      return "w-8 h-8"
  }
}

const MerchandiseIcon = ({ item, size = "md", className = "" }: Props) => {
  const sizeClass = getSizeClass(size)
  const iconClass = `${sizeClass} text-primary ${className}`

  switch (item) {
    case "food":
      return <GiMeat className={iconClass} />
    case "water":
      return <GiWaterFlask className={iconClass} />
    case "porcelain":
      return <GiPorcelainVase className={iconClass} />
    case "spices":
      return <GiPowder className={iconClass} />
    case "silk":
      return <GiRolledCloth className={iconClass} />
    case "tobacco":
      return <GiSmokingPipe className={iconClass} />
    case "rum":
      return <GiBrandyBottle className={iconClass} />
    case "dinner":
      return <GiMeat className={iconClass} />
    case "wine":
      return <GiWineBottle className={iconClass} />
    case "Brig":
      return <TbSailboat className={iconClass} />
    case "Merchantman":
      return <GiCargoShip className={iconClass} />
    case "Galleon":
      return <GiShoonerSailboat className={iconClass} />
    case "Frigate":
      return <GiSmallFishingSailboat className={iconClass} />
    default:
      return null
  }
}

export default MerchandiseIcon
