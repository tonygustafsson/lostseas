import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getGoldEffectiveness } from "@/utils/crew"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const gold = parseInt(body.gold)

  const player = await getPlayer(playerId)

  if (gold < 1) {
    return NextResponse.json(
      { error: "You need to give at least 1 doubloon" },
      { status: 500 }
    )
  }

  if ((player.character.gold || 0) < gold) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 500 })
  }

  const newMood = getGoldEffectiveness(
    player.crewMembers.count,
    player.crewMembers.mood,
    gold
  )

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: (player.character.gold || 0) - gold,
    },
    crewMembers: {
      ...player.crewMembers,
      mood: newMood,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, gold, newMood }, { status: 500 })
  }

  return NextResponse.json({ success: true, gold, newMood })
}
