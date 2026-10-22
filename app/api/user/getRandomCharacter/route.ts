import { NextResponse } from "next/server"

import { getRandomCharacter as getRandomCharacterUtil } from "@/utils/getRandomCharacter"

export async function GET(request: Request) {
  const excludedCharacterId = new URL(request.url).searchParams.get(
    "excludeCharacterId"
  )
  const randomCharacter = getRandomCharacterUtil(
    excludedCharacterId ?? undefined
  )

  return NextResponse.json(randomCharacter)
}
