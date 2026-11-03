import {
  IoCloudyOutline,
  IoPartlySunnyOutline,
  IoRainyOutline,
  IoSunnyOutline,
} from "react-icons/io5"

import { useGetPlayer } from "@/hooks/queries/usePlayer"
import { getWeatherType } from "@/utils/weather"

type Props = {
  className?: string
}

const ICONS = {
  rainy: IoRainyOutline,
  partlySunny: IoPartlySunnyOutline,
  cloudy: IoCloudyOutline,
  sunny: IoSunnyOutline,
}

const WeatherIcon = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  const Icon = ICONS[getWeatherType(player?.character.day || 0)]

  return <Icon className={className} />
}

export default WeatherIcon
