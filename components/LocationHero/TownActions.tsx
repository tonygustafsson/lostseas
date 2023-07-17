import { AiOutlineShop } from "react-icons/ai"
import { BsTools } from "react-icons/bs"
import { GiBank, GiFarmer, GiTavernSign } from "react-icons/gi"

import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"

type Props = {
  location: Character["location"]
}

const getLocationData = (location: string) => {
  switch (location) {
    case "shop":
      return {
        key: location,
        title: "Shop",
        icon: <AiOutlineShop className="text-cyan-600 w-6 h-6" />,
      }
    case "tavern":
      return {
        key: location,
        title: "Tavern",
        icon: <GiTavernSign className="text-cyan-600 w-6 h-6" />,
      }
    case "bank":
      return {
        key: location,
        title: "Bank",
        icon: <GiBank className="text-cyan-600 w-6 h-6" />,
      }
    case "market":
      return {
        key: location,
        title: "Market",
        icon: <GiFarmer className="text-cyan-600 w-6 h-6" />,
      }
    case "shipyard":
      return {
        key: location,
        title: "Shipyard",
        icon: <BsTools className="text-cyan-600 w-5 h-5" />,
      }
    default:
      return {
        key: location,
        title: "Shipyard",
        icon: <BsTools className="text-cyan-600 w-5 h-5" />,
      }
  }
}

const locations = Object.keys(LOCATIONS)
  .filter((location) => !["sea", "harbor", "docks"].includes(location))
  .map(getLocationData)

const TownActions = ({ location }: Props) => {
  const { move } = useCharacter()

  const handleMove = (location: SeaLocation | TownLocation) => {
    move({ location })
  }

  return (
    <div className="bg-gray-900 rounded-b-lg p-4 flex items-center flex-col">
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
