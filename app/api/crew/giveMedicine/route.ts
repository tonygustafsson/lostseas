import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getMedicineEffectiveness } from "@/utils/crew"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const medicine = parseInt(body.medicine)

  const player = await getPlayer(playerId)

  if (medicine < 1) {
    return NextResponse.json(
      { error: "You need to give at least 1 box of medicine" },
      { status: 500 }
    )
  }

  if ((player.inventory?.medicine || 0) < medicine) {
    return NextResponse.json({ error: "Not enough medicine" }, { status: 500 })
  }

  const newHealth = getMedicineEffectiveness(
    player.crewMembers.count,
    player.crewMembers.health,
    medicine
  )

  const playerResult: Player = {
    ...player,
    inventory: {
      ...player.inventory,
      medicine: (player.inventory?.medicine || 0) - medicine,
    },
    crewMembers: {
      ...player.crewMembers,
      health: newHealth,
    },
  }

  try {
    await savePlayer(playerId, playerResult)
  } catch (error) {
    return NextResponse.json({ error, medicine, newHealth }, { status: 500 })
  }

  return NextResponse.json({ success: true, medicine, newHealth })
}
