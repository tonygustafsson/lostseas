import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getGoldEffectiveness } from "@/utils/crew"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json()) as { gold: string }
  const gold = parseInt(body.gold)

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: (player.character.gold || 0) - gold,
    },
    crewMembers: {
      mood: newMood,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Gave ${gold} gold to crew members.`)

    return NextResponse.json({ success: true, updatedPlayer, gold, newMood })
  } catch (error) {
    return NextResponse.json({ error, gold, newMood }, { status: 500 })
  }
}
