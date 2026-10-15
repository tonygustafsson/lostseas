import { useGetPlayer } from "@/hooks/queries/usePlayer"

import BuildingScene from "./BuildingScene"
import HarborScene from "./HarborScene"

const LocationScene = () => {
  const { data: player } = useGetPlayer()

  if (!player || player.character.location === "Sea") return null

  const { town, location } = player.character

  if (location === "Harbor") {
    return <HarborScene town={town} />
  }

  return (
    <BuildingScene
      key={`${town}-${location}`}
      town={town}
      location={location}
    />
  )
}

export default LocationScene
