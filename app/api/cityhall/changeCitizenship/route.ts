import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { TOWNS } from "@/constants/locations"
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

  const { titleInfo, citizenshipChangeAvailable } = getNewTitle(character)

  if (!citizenshipChangeAvailable) {
    return NextResponse.json(
      {
        error: `You are not having this option at the moment.`,
        titleInfo,
        title: character.title,
      },
      { status: 500 }
    )
  }

  const newNationality = character.town
    ? TOWNS[character.town]?.nation
    : character.nationality

  const characterResult: Character = {
    ...character,
    nationality: newNationality,
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

  return NextResponse.json({
    success: true,
    titleInfo,
    title: character.title,
    newNationality,
  })
}
