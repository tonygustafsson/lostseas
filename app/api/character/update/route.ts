import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { changeCharacterValidationSchema } from "@/utils/validation"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await changeCharacterValidationSchema.parseAsync(body)

    const cookieStore = await cookies()
    const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

    if (!playerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    const { name, gender, age } = body

    const character = await getCharacter(playerId)

    const characterResult = {
      ...character,
      name,
      gender,
      age,
    }

    try {
      await saveCharacter(playerId, characterResult)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
