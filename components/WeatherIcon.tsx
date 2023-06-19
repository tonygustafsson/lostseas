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

  const week = player?.character.week || 0

  if (week % 5 === 2) {
    return <IoRainyOutline className={className} />
  }

  if (week % 4 === 0 || week % 3 === 0) {
    return <IoPartlySunnyOutline className={className} />
  }

  if (week % 3 === 1) {
    return <IoCloudyOutline className={className} />
  }

  return <IoSunnyOutline className={className} />
}

export default WeatherIcon
