import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getShip, saveShip } from "@/firebase/db"
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

  const body = await req.json()
  const { name } = body

  try {
    await renameShipValidationSchema.parseAsync({ id, name })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  const ship = await getShip(playerId, id)

  if (!ship) {
    return NextResponse.json({ error: "Ship not found" }, { status: 404 })
  }

  const shipResult: Ship = { ...ship, name }

  try {
    await saveShip(playerId, shipResult)
  } catch (error) {
    return NextResponse.json({ error, ship, name }, { status: 500 })
  }

  return NextResponse.json({ success: true, name, ship })
}
