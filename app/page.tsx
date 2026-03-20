import { Metadata } from "next"
import { preload } from "react-dom"

import HomeClient from "@/components/HomeClient"
import {
  getAllSeaLocationBackgrounds,
  getAllTownLocationBackgrounds,
} from "@/utils/location"
import { getLoggedInPlayer } from "@/utils/next/getLoggedInServerSidePropsApp"

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

  return <HomeClient />
}
