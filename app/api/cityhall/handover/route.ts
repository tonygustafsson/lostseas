import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TREASURES } from "@/constants/treasures"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { id }: { id: Treasure["id"] } = body

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const currentTown = player.character.town
  const treasures = Object.values(player.treasures || {}).filter(
    (treasure) => treasure.rewarder === currentTown
  )
  const matchingTreasure = treasures.find((treasure) => treasure.id === id)
  const treasureInfo = TREASURES.find(
    (treasure) => treasure.name === matchingTreasure?.name
  )

  if (!matchingTreasure) {
    return NextResponse.json(
      { error: "You don't have this treasure" },
      { status: 500 }
    )
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold + (treasureInfo?.value || 0),
    },
    treasures: {
      [id]: null,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Handed over town duties.`)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      treasure: matchingTreasure,
      treasureInfo,
    })
  } catch (error) {
    return NextResponse.json(
      { error, treasure: matchingTreasure, treasureInfo },
      { status: 500 }
    )
  }
}
