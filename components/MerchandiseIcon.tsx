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

  switch (item) {
    case "food":
      return <GiMeat className={`${sizeClass} text-primary ${className}`} />
    case "water":
      return (
        <GiWaterFlask className={`${sizeClass} text-primary ${className}`} />
      )
    case "porcelain":
      return (
        <GiPorcelainVase className={`${sizeClass} text-primary ${className}`} />
      )
    case "spices":
      return <GiPowder className={`${sizeClass} text-primary ${className}`} />
    case "silk":
      return (
        <GiRolledCloth className={`${sizeClass} text-primary ${className}`} />
      )
    case "tobacco":
      return (
        <GiSmokingPipe className={`${sizeClass} text-primary ${className}`} />
      )
    case "rum":
      return (
        <GiBrandyBottle className={`${sizeClass} text-primary ${className}`} />
      )
    case "dinner":
      return <GiMeat className={`${sizeClass} text-primary ${className}`} />
    case "wine":
      return (
        <GiWineBottle className={`${sizeClass} text-primary ${className}`} />
      )
    default:
      return null
  }
}

export default MerchandiseIcon
