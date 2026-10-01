import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"
import { getNecessitiesInfo } from "@/utils/shop"

export async function POST(req: Request) {
  const body = await req.json()
  const { days }: { days: number } = body

  if (!isPositiveSafeInteger(days)) {
    return NextResponse.json(
      { error: "Days must be a positive whole number" },
      { status: 400 }
    )
  }

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (player.character.location !== "Shop")
    return NextResponse.json(
      { error: "You must be at Shop to do this." },
      { status: 400 }
    )

  const { cost, foodNeeded, waterNeeded } = getNecessitiesInfo({
    crewMembers: player?.crewMembers.count || 0,
    currentFood: player?.inventory?.food || 0,
    currentWater: player?.inventory?.water || 0,
    days,
  })

  if (player.character.gold < cost) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 500 })
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold - cost,
    },
    inventory: {
      food: (player.inventory?.food || 0) + foodNeeded,
      water: (player.inventory?.water || 0) + waterNeeded,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(
      newPlayer,
      `Bought necessities for ${cost} gold. Enough food and water for ${days} days.`
    )

    return NextResponse.json({
      success: true,
      updatedPlayer,
      cost,
      foodNeeded,
      waterNeeded,
    })
  } catch (error) {
    return NextResponse.json(
      { error, cost, foodNeeded, waterNeeded },
      { status: 500 }
    )
  }
}
