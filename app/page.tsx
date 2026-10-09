import { Metadata } from "next"
import { preload } from "react-dom"

import GameUI from "@/components/game-ui"
import DefaultLayout from "@/components/layouts/default"
import FullscreenLayout from "@/components/layouts/fullscreen"
import LoginScreen from "@/components/LoginScreen"
import { getLoggedInPlayer } from "@/utils/app/getLoggedInPlayer"
import { getAllTownLocationBackgrounds } from "@/utils/location"

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

  for (const background of allTownBackgrounds) {
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
      <GameUI />
    </DefaultLayout>
  )
}
