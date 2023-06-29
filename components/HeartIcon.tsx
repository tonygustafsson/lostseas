import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

const HEALTH_FULL_MIN = 90
const HEALTH_THREE_QUARTERS_MIN = 65
const HEALTH_HALF_MIN = 40

type Props = {
  health: number
  size?: number
}

const getClipPathStyle = (health: number) => {
  if (health >= HEALTH_FULL_MIN) {
    return {}
  } else if (health >= HEALTH_THREE_QUARTERS_MIN) {
    return {
      clipPath:
        "polygon(50% 0, 50% 50%, 100% 50%, 100% 100%, 80% 100%, 20% 100%, 0 100%, 0 0)",
    }
  } else if (health >= HEALTH_HALF_MIN) {
    return {
      clipPath:
        "polygon(50% 0, 50% 50%, 50% 50%, 50% 100%, 50% 100%, 20% 100%, 0 100%, 0 0)",
    }
  } else {
    return {
      clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
    }
  }
}

const getColorClass = (health: number) => {
  if (health >= HEALTH_THREE_QUARTERS_MIN) {
    return "text-green-700"
  } else if (health >= HEALTH_HALF_MIN) {
    return "text-yellow-500"
  } else {
    return "text-red-500"
  }
}

const HeartIcon = ({ health, size = 8 }: Props) => {
  const clipPathStyle = getClipPathStyle(health)
  const colorClass = getColorClass(health)

  return (
    <div className={`relative h-${size} w-${size}`}>
      <AiOutlineHeart
        className={`h-${size} w-${size} absolute top-0 left-0 ${colorClass}`}
      />
      <AiFillHeart
        className={`h-${size} w-${size} absolute top-0 left-0 ${colorClass}`}
        style={{
          ...clipPathStyle,
        }}
      />
    </div>
  )
}

export default HeartIcon
