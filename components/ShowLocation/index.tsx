"use client"

import AttackReport from "@/components/location/AttackReport"
import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Harbor from "@/components/location/Harbor"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/Shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const ShowLocation = () => {
  const { data: player } = useGetPlayer()

  return (
    <div className="mt-8">
      {player?.character.location === "Shop" && <Shop />}
      {player?.character.location === "Bank" && <Bank />}
      {player?.character.location === "Market" && <Market />}
      {player?.character.location === "Tavern" && <Tavern />}
      {player?.character.location === "City hall" && <Cityhall />}
      {player?.character.location === "Shipyard" && <Shipyard />}
      {player?.character.location === "Harbor" && <Harbor />}

      {player?.character.location === "Sea" &&
        (player.locationStates?.sea?.attackSuccessReport ||
          player.locationStates?.sea?.attackFailureReport) && <AttackReport />}
    </div>
  )
}

export default ShowLocation
