import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { getNewTitle } from "@/utils/title"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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

  const dbUpdate: DeepPartial<Player> = {
    character: {
      nationality: newNationality,
      title: titleInfo?.title,
      gold: player.character.gold + titleInfo.reward,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Changed citizenship to ${newNationality}.`)

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
