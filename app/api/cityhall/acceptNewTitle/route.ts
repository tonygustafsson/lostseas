import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

  const { isHomeNation, titleInfo, promotionAvailable } = getNewTitle(
    player.character
  )

  if (!isHomeNation) {
    return NextResponse.json(
      { error: "Not your home nation." },
      { status: 500 }
    )
  }

  if (!promotionAvailable) {
    return NextResponse.json(
      {
        error: `You already have the title ${titleInfo?.title}.`,
        titleInfo,
        title: player.character.title,
      },
      { status: 500 }
    )
  }

  const dbUpdate = {
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
    })
  } catch (error) {
    return NextResponse.json(
      { error, titleInfo, title: player.character.title },
      { status: 500 }
    )
  }
}
