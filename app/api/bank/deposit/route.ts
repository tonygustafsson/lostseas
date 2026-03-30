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

  if (player.character.loan) {
    return NextResponse.json(
      { error: "You cannot add funds until your loan is fully repaid." },
      { status: 400 }
    )
  }
  if (player.character.gold < amount) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const newGold = player.character.gold - amount
  const newAccount = player.character.account
    ? player.character.account + amount
    : amount

  const dbUpdate = {
    "character/gold": newGold,
    "character/account": newAccount,
  }

  try {
    await savePlayer(playerId, dbUpdate)

    return NextResponse.json({
      success: true,
      amount,
      gold: newGold,
    })
  } catch (error) {
    return NextResponse.json({ error, amount }, { status: 500 })
  }
}
