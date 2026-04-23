import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { changeCharacterValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  const body = await req.json()
  await changeCharacterValidationSchema.parseAsync(body)

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const {
    name,
    gender,
    age,
  }: {
    name: Character["name"]
    gender: Character["gender"]
    age: Character["age"]
  } = body

  const dbUpdate: DeepPartial<Player> = {
    character: {
      name,
      gender,
      age,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(newPlayer, `Updated character info.`)
    return NextResponse.json({ success: true, updatedPlayer })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
