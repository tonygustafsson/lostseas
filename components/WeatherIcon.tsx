import {
  PiCloudFogLight,
  PiCloudLight,
  PiCloudRainLight,
  PiCloudSunLight,
  PiSunLight,
} from "react-icons/pi"

type Props = {
  weather: WeatherType
  className?: string
}

const ICONS = {
  rainy: PiCloudRainLight,
  foggy: PiCloudFogLight,
  partlySunny: PiCloudSunLight,
  cloudy: PiCloudLight,
  sunny: PiSunLight,
}

const WeatherIcon = ({ weather, className }: Props) => {
  const Icon = ICONS[weather]

  if (!Icon) {
    return null
  }

  return <Icon className={className} />
}

export default WeatherIcon
