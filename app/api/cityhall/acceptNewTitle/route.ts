import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getNewTitle } from "@/utils/title"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const character = await getCharacter(playerId)

  const { isHomeNation, titleInfo, promotionAvailable } = getNewTitle(character)

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
        title: character.title,
      },
      { status: 500 }
    )
  }

  const characterResult: Character = {
    ...character,
    title: titleInfo?.title,
    gold: character.gold + titleInfo.reward,
  }

  try {
    await saveCharacter(playerId, characterResult)
  } catch (error) {
    return NextResponse.json(
      { error, titleInfo, title: character.title },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, titleInfo, title: character.title })
}
