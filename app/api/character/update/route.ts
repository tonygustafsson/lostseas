import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { savePlayer } from "@/firebase/db"
import { changeCharacterValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  const body = await req.json()
  await changeCharacterValidationSchema.parseAsync(body)

  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const {
    name,
    gender,
    age,
  }: {
    name: Character["name"]
    gender: Character["gender"]
    age: Character["age"]
  } = body

  const dbUpdate = {
    "character/name": name,
    "character/gender": gender,
    "character/age": age,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)
    return NextResponse.json({ success: true, updatedPlayer })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
