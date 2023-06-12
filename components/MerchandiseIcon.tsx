import {
  GiBrandyBottle,
  GiMeat,
  GiPorcelainVase,
  GiPowder,
  GiRolledCloth,
  GiSmokingPipe,
  GiWaterFlask,
  GiWineBottle,
} from "react-icons/gi"

type Props = {
  item: string
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
  className?: string
}

const MerchandiseIcon = ({ item, size = "6xl", className }: Props) => {
  switch (item) {
    case "food":
      return <GiMeat className={`text-${size} text-primary ${className}`} />
    case "water":
      return (
        <GiWaterFlask className={`text-${size} text-primary ${className}`} />
      )
    case "porcelain":
      return (
        <GiPorcelainVase className={`text-${size} text-primary ${className}`} />
      )
    case "spices":
      return <GiPowder className={`text-${size} text-primary ${className}`} />
    case "silk":
      return (
        <GiRolledCloth className={`text-${size} text-primary ${className}`} />
      )
    case "tobacco":
      return (
        <GiSmokingPipe className={`text-${size} text-primary ${className}`} />
      )
    case "rum":
      return (
        <GiBrandyBottle className={`text-${size} text-primary ${className}`} />
      )
    case "dinner":
      return <GiMeat className={`text-${size} text-primary ${className}`} />
    case "wine":
      return (
        <GiWineBottle className={`text-${size} text-primary ${className}`} />
      )
    default:
      return null
  }
}

export default MerchandiseIcon
