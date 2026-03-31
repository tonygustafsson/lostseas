import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { amount }: { amount: number } = body

  if (amount < 1) {
    return NextResponse.json(
      { error: "You cannot repay less than 1 doubloon." },
      { status: 400 }
    )
  }

  const player = await getPlayer(playerId)
  const currentLoan = player.character.loan || 0

  if (currentLoan < amount) {
    return NextResponse.json(
      { error: "You cannot repay more than you owe the bank." },
      { status: 400 }
    )
  }
  const newGold = player.character.gold - amount
  const newLoan = currentLoan - amount === 0 ? null : currentLoan - amount

  const dbUpdate = {
    "character/gold": newGold,
    "character/loan": newLoan ?? 0,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      amount,
      gold: newGold,
      loan: newLoan,
    })
  } catch (error) {
    return NextResponse.json({ error, amount }, { status: 500 })
  }
}
