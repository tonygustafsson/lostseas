import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { amount } = body

  if (amount < 1) {
    return NextResponse.json(
      { error: "You cannot repay less than 1 doubloon." },
      { status: 400 }
    )
  }

  const character = await getCharacter(playerId)
  const currentAccount = character.account || 0

  if (currentAccount < amount) {
    return NextResponse.json(
      { error: "Not enough gold in bank account" },
      { status: 400 }
    )
  }

  const characterResult = {
    ...character,
    gold: character.gold + amount,
    account: currentAccount - amount === 0 ? null : currentAccount - amount,
  }

  try {
    await saveCharacter(playerId, characterResult)
  } catch (error) {
    return NextResponse.json({ error, amount }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    amount,
    gold: characterResult.gold,
  })
}
