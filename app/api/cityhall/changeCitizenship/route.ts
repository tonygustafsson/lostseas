import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getNewTitle } from "@/utils/title"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const { titleInfo, citizenshipChangeAvailable } = getNewTitle(
    player.character
  )

  if (!citizenshipChangeAvailable) {
    return NextResponse.json(
      {
        error: `You are not having this option at the moment.`,
        titleInfo,
        title: player.character.title,
      },
      { status: 500 }
    )
  }

  const newNationality = player.character.town
    ? TOWNS[player.character.town]?.nation
    : player.character.nationality

  const dbUpdate = {
    "character/nationality": newNationality,
    "character/title": titleInfo?.title,
    "character/gold": player.character.gold + titleInfo.reward,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      titleInfo,
      title: player.character.title,
      newNationality,
    })
  } catch (error) {
    return NextResponse.json(
      { error, titleInfo, title: player.character.title },
      { status: 500 }
    )
  }
}
