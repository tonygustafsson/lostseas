import {
  IoCloudyOutline,
  IoPartlySunnyOutline,
  IoRainyOutline,
  IoSunnyOutline,
} from "react-icons/io5"

import { useGetPlayer } from "@/hooks/queries/usePlayer"

type Props = {
  className?: string
}

const WeatherIcon = ({ className }: Props) => {
  const { data: player } = useGetPlayer()

  const day = player?.character.day || 0

  if (day % 5 === 2) {
    return <IoRainyOutline className={className} />
  }

  if (day % 4 === 0 || day % 3 === 0) {
    return <IoPartlySunnyOutline className={className} />
  }

  if (day % 3 === 1) {
    return <IoCloudyOutline className={className} />
  }

  return <IoSunnyOutline className={className} />
}

export default WeatherIcon
