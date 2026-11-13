import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BuildingScene from "./BuildingScene"
import HarborScene from "./HarborScene"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const LocationScene = ({ town, location }: Props) => {
  const { data: player } = useGetPlayer()

  if (location === "Sea") return null

  if (location === "Harbor") {
    return <HarborScene town={town} />
  }

  return (
    <BuildingScene
      key={`${town}-${location}`}
      town={town}
      location={location}
      weather={player?.character.weather}
    />
  )
}

export default LocationScene
