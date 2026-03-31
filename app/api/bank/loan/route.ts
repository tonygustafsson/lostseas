import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { LOAN_LIMIT } from "@/constants/bank"
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

  if ((player.character.loan || 0) + amount > LOAN_LIMIT) {
    return NextResponse.json(
      { error: `You cannot loan more than a total of ${LOAN_LIMIT} gold.` },
      { status: 400 }
    )
  }
  const dbUpdate = {
    "character/gold": player.character.gold + amount,
    "character/loan": player.character.loan
      ? player.character.loan + amount
      : amount,
  }

  try {
    const updatedPlayer = await savePlayer(playerId, dbUpdate)

    return NextResponse.json({
      success: true,
      updatedPlayer,
      amount,
      gold: player.character.gold + amount,
      loan: player.character.loan ? player.character.loan + amount : amount,
    })
  } catch (error) {
    return NextResponse.json({ error, amount }, { status: 500 })
  }
}
