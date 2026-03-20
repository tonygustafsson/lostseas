import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getNecessitiesInfo } from "@/utils/shop"

export async function POST(req: Request) {
  const body = await req.json()
  const { days } = body

  if (!days) {
    return NextResponse.json(
      { error: "Not a valid number of days" },
      { status: 500 }
    )
  }

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  const { cost, foodNeeded, waterNeeded } = getNecessitiesInfo({
    crewMembers: player?.crewMembers.count || 0,
    currentFood: player?.inventory?.food || 0,
    currentWater: player?.inventory?.water || 0,
    days,
  })

  if (player.character.gold < cost) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 500 })
  }

  const playerResult = {
    ...player,
    inventory: {
      ...player.inventory,
      food: (player.inventory?.food || 0) + foodNeeded,
      water: (player.inventory?.water || 0) + waterNeeded,
    },
    character: {
      ...player.character,
      gold: player.character.gold - cost,
    },
  } as Player

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json(
      { error, cost, foodNeeded, waterNeeded },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, cost, foodNeeded, waterNeeded })
}
