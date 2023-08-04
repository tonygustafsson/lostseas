import {
  GiCeremonialMask,
  GiCursedStar,
  GiCurvyKnife,
  GiCutDiamond,
  GiFinch,
  GiMagicAxe,
  GiMagicLamp,
  GiMagicPotion,
  GiSkeletonKey,
} from "react-icons/gi"

type Props = {
  item: TreasureName
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
      return "w-7 h-7"
    case "lg":
      return "w-11 h-11"
    case "xl":
      return "w-16 h-16"
    default:
      return "w-8 h-8"
  }
}

const TreasureIcon = ({ item, size = "md", className = "" }: Props) => {
  const sizeClass = getSizeClass(size)
  const iconClass = `${sizeClass} text-primary ${className}`

  switch (item) {
    case "Inca mask":
      return <GiCeremonialMask className={iconClass} />
    case "Large diamond":
      return <GiCutDiamond className={iconClass} />
    case "Legendary dagger":
      return <GiCurvyKnife className={iconClass} />
    case "Cursed star":
      return <GiCursedStar className={iconClass} />
    case "Magical axe":
      return <GiMagicAxe className={iconClass} />
    case "Magical lamp":
      return <GiMagicLamp className={iconClass} />
    case "Potion of life":
      return <GiMagicPotion className={iconClass} />
    case "Key of souls":
      return <GiSkeletonKey className={iconClass} />
    case "Golden hen":
      return <GiFinch className={iconClass} />
    default:
      return null
  }
}

export default TreasureIcon
