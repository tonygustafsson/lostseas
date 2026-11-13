import { CloudFog } from "lucide-react"
import {
  IoCloudyOutline,
  IoPartlySunnyOutline,
  IoRainyOutline,
  IoSunnyOutline,
} from "react-icons/io5"

type Props = {
  weather: WeatherType
  className?: string
}

const ICONS = {
  rainy: IoRainyOutline,
  foggy: CloudFog,
  partlySunny: IoPartlySunnyOutline,
  cloudy: IoCloudyOutline,
  sunny: IoSunnyOutline,
}

const WeatherIcon = ({ weather, className }: Props) => {
  const Icon = ICONS[weather]

  if (!Icon) {
    return null
  }

  return <Icon className={className} />
}

export default WeatherIcon
