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
        icon: <AiOutlineShop className="text-cyan-600 w-6 h-6" />,
        order: 1,
      }
    case "Tavern":
      return {
        key: location,
        title: "Tavern",
        icon: <GiTavernSign className="text-cyan-600 w-6 h-6" />,
        order: 2,
      }
    case "Bank":
      return {
        key: location,
        title: "Bank",
        icon: <GiBank className="text-cyan-600 w-6 h-6" />,
        order: 3,
      }
    case "City hall":
      return {
        key: location,
        title: "City hall",
        icon: <BsBank2 className="text-cyan-600 w-5 h-5" />,
        order: 4,
      }
    case "Market":
      return {
        key: location,
        title: "Market",
        icon: <GiFarmer className="text-cyan-600 w-6 h-6" />,
        order: 5,
      }
    case "Shipyard":
      return {
        key: location,
        title: "Shipyard",
        icon: <BsTools className="text-cyan-600 w-5 h-5" />,
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
    <div className="bg-gray-900 rounded-b-lg p-4 pb-8 flex items-center flex-col">
      <span className="text-xl font-serif">Change location</span>

      <div className="flex flex-wrap mt-4 justify-center gap-2 lg:gap-0 lg:join">
        {locations.map(({ key, title, icon }) => (
          <button
            key={`change-location-${key}`}
            className="btn text-base join-item"
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
