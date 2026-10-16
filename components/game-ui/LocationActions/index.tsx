import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Market from "@/components/location/Market"
import Sea from "@/components/location/Sea"
import Shipyard from "@/components/location/Shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"

type Props = {
  location: Character["location"]
}

const LocationActions = ({ location }: Props) => (
  <div className="mt-8">
    {location === "Shop" && <Shop />}
    {location === "Bank" && <Bank />}
    {location === "Market" && <Market />}
    {location === "Tavern" && <Tavern />}
    {location === "City hall" && <Cityhall />}
    {location === "Shipyard" && <Shipyard />}
    {location === "Sea" && <Sea />}
  </div>
)

export default LocationActions
