import BuildingScene from "./BuildingScene"
import HarborScene from "./HarborScene"

type Props = {
  town: Character["town"]
  location: Character["location"]
}

const LocationScene = ({ town, location }: Props) => {
  if (location === "Sea") return null

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
