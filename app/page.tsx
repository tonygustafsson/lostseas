import { Metadata } from "next"
import { preload } from "react-dom"

import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import LocationHero from "@/components/LocationHero"
import LoginScreen from "@/components/LoginScreen"
import ShowLocation from "@/components/ShowLocation"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"
import {
  getAllSeaLocationBackgrounds,
  getAllTownLocationBackgrounds,
} from "@/utils/location"

export async function generateMetadata(): Promise<Metadata> {
  const player = await getLoggedInPlayer()

  if (!player) {
    return {
      title: {
        absolute: "Lost Seas",
      },
    }
  }

  if (player.character.location === "Sea") {
    return {
      title: "Open Seas",
    }
  }

  return {
    title: `The ${player.character.location} - ${player.character.town}`,
  }
}

export default async function Page() {
  const player = await getLoggedInPlayer()

  const allTownBackgrounds =
    player?.character.location === "Harbor"
      ? getAllTownLocationBackgrounds(player.character.town)
      : []

  const allSeaBackgrounds =
    player?.character.journey?.day === 1 ? getAllSeaLocationBackgrounds() : []

  for (const background of [...allTownBackgrounds, ...allSeaBackgrounds]) {
    preload(background, { as: "image" })
  }

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
      <ShowLocation />
    </DefaultLayout>
  )
}
