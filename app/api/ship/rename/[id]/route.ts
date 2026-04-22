import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { renameShipValidationSchema } from "@/utils/validation"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function POST(req: Request, { params }: RouteContext) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: "Ship not found" }, { status: 404 })
  }

  const body = (await req.json()) as { name: string }
  const { name } = body

  try {
    await renameShipValidationSchema.parseAsync({ id, name })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const existingShip = player.ships?.[id]

  if (!existingShip) {
    return NextResponse.json({ error: "Ship not found" }, { status: 404 })
  }

  const dbUpdate: DeepPartial<Player> = {
    ships: {
      [id]: {
        name,
      },
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      name,
      ship: existingShip,
    })
  } catch (error) {
    return NextResponse.json(
      { error, ship: existingShip, name },
      { status: 500 }
    )
  }
}
