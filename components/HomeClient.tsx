"use client"

import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import AttackReport from "@/components/location/AttackReport"
import Bank from "@/components/location/Bank"
import Cityhall from "@/components/location/Cityhall"
import Harbor from "@/components/location/Harbor"
import Market from "@/components/location/Market"
import Shipyard from "@/components/location/Shipyard"
import Shop from "@/components/location/Shop"
import Tavern from "@/components/location/Tavern"
import LocationHero from "@/components/LocationHero"
import LoginScreen from "@/components/LoginScreen"
import { useGetPlayer } from "@/hooks/queries/usePlayer"

const HomeClient = () => {
  const { data: player } = useGetPlayer()

  if (!player) {
    return (
      <FullscreenLayout>
        <LoginScreen />
      </FullscreenLayout>
    )
  }

  return (
    <DefaultLayout>
      <LocationHero />

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
            player.locationStates?.sea?.attackFailureReport) && (
            <AttackReport />
          )}
      </div>
    </DefaultLayout>
  )
}

export default HomeClient
