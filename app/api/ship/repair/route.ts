import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { REPAIR_KIT_HEALTH } from "@/constants/ship"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { isPositiveSafeInteger } from "@/utils/number"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { id, quantity } = (body ?? {}) as { id?: unknown; quantity?: unknown }

  if (typeof id !== "string" || !id || !isPositiveSafeInteger(quantity)) {
    return NextResponse.json(
      { error: "Choose a ship and a positive whole number of repair kits" },
      { status: 400 }
    )
  }

  const player = await getPlayer(playerId)

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const ship = Object.hasOwn(player.ships || {}, id)
    ? player.ships[id]
    : undefined
  const repairKits = player.inventory?.repairKits ?? 0

  if (!ship) {
    return NextResponse.json({ error: "Ship not found" }, { status: 400 })
  }

  if (
    ship.health >= 100 ||
    quantity > Math.ceil((100 - ship.health) / REPAIR_KIT_HEALTH)
  ) {
    return NextResponse.json(
      { error: "This ship does not need that many repair kits" },
      { status: 400 }
    )
  }

  if (quantity > repairKits) {
    return NextResponse.json(
      { error: "Not enough repair kits" },
      { status: 400 }
    )
  }

  const newPlayer = patchDeep(player, {
    ships: {
      [id]: {
        health: Math.min(100, ship.health + quantity * REPAIR_KIT_HEALTH),
      },
    },
    inventory: { repairKits: repairKits - quantity },
  })

  try {
    const updatedPlayer = await savePlayer(
      newPlayer,
      `Used ${quantity} repair kits on ship ${id}.`
    )

    return NextResponse.json({ success: true, updatedPlayer, quantity })
  } catch {
    return NextResponse.json(
      { error: "Could not repair your ship" },
      { status: 500 }
    )
  }
}
