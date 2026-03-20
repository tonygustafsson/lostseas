import { NextResponse } from "next/server"

import { getRandomCharacter as getRandomCharacterUtil } from "@/utils/getRandomCharacter"

export async function GET() {
  const randomCharacter = getRandomCharacterUtil()

  return NextResponse.json(randomCharacter)
}
