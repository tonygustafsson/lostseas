import { AiOutlineShop } from "react-icons/ai"
import { BsBank2, BsTools } from "react-icons/bs"
import { GiBank, GiFarmer, GiTavernSign } from "react-icons/gi"

import { ButtonGroup } from "@/components/ui/button-group"
import { LOCATIONS } from "@/constants/locations"
import { useCharacter } from "@/hooks/queries/useCharacter"

import { Button } from "../ui/button"

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
    <div className="flex flex-col items-center px-4 py-5 sm:px-6 sm:py-6">
      <span className="font-serif text-xl text-stone-100">Change location</span>

      <ButtonGroup className="mt-4 grid grid-cols-2 flex-wrap justify-center overflow-hidden rounded-2xl sm:grid-cols-3 xl:flex">
        {locations.map(({ key, title, icon }, index) => (
          <Button
            key={`change-location-${key}`}
            variant={location === key ? "secondary" : "outline"}
            size="lg"
            className="gap-2 px-6 font-serif text-lg"
            onClick={() => handleMove(title as TownLocation)}
            disabled={location === key}
            style={
              // Hack for disabling border radius on the first and last buttons in the group to create a more connected look when there are multiple rows.
              index === 0 || index === locations.length - 1
                ? ({ ["--radius"]: "0px" } as React.CSSProperties)
                : undefined
            }
          >
            {icon}
            {title}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default TownActions
