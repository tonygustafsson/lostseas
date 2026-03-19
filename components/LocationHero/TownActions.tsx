import { AiOutlineShop } from "react-icons/ai"
import { BsBank2, BsTools } from "react-icons/bs"
import { GiBank, GiFarmer, GiTavernSign } from "react-icons/gi"

import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"

type Props = {
  location: Character["location"]
}

const getLocationData = (location: TownLocation) => {
  switch (location) {
    case "Shop":
      return {
        key: location,
        title: "Shop",
        icon: <AiOutlineShop className="h-6 w-6 text-cyan-600" />,
        order: 1,
      }
    case "Tavern":
      return {
        key: location,
        title: "Tavern",
        icon: <GiTavernSign className="h-6 w-6 text-cyan-600" />,
        order: 2,
      }
    case "Bank":
      return {
        key: location,
        title: "Bank",
        icon: <GiBank className="h-6 w-6 text-cyan-600" />,
        order: 3,
      }
    case "City hall":
      return {
        key: location,
        title: "City hall",
        icon: <BsBank2 className="h-5 w-5 text-cyan-600" />,
        order: 4,
      }
    case "Market":
      return {
        key: location,
        title: "Market",
        icon: <GiFarmer className="h-6 w-6 text-cyan-600" />,
        order: 5,
      }
    case "Shipyard":
      return {
        key: location,
        title: "Shipyard",
        icon: <BsTools className="h-5 w-5 text-cyan-600" />,
        order: 6,
      }
    default:
      return {
        key: location,
        title: "Unknown",
        icon: null,
        order: 7,
      }
  }
}

const locations = (
  Object.values(LOCATIONS).filter(
    (location) => !["Sea", "Harbor"].includes(location)
  ) as TownLocation[]
)
  .map(getLocationData)
  .sort((a, b) => a.order - b.order)

const TownActions = ({ location }: Props) => {
  const { move } = useCharacter()

  const handleMove = (location: SeaLocation | TownLocation) => {
    move({ location })
  }

  return (
    <div className="flex flex-col items-center rounded-b-lg bg-gray-900 p-4 pb-8">
      <span className="font-serif text-xl">Change location</span>

      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:join lg:gap-0">
        {locations.map(({ key, title, icon }) => (
          <button
            key={`change-location-${key}`}
            className="btn join-item text-base"
            onClick={() => handleMove(title as TownLocation)}
            disabled={location === key}
          >
            {icon}
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TownActions
