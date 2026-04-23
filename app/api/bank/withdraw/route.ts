import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const currentAccount = player.character.account || 0

  if (currentAccount < amount) {
    return NextResponse.json(
      { error: "Not enough gold in bank account" },
      { status: 400 }
    )
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold + amount,
      account: currentAccount - amount,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(
      newPlayer,
      `Withdrew ${amount} gold from the bank. Current account balance: ${currentAccount - amount} gold.`
    )

    return NextResponse.json({
      success: true,
      updatedPlayer,
      amount,
      gold: player.character.gold + amount,
    })
  } catch (error) {
    return NextResponse.json({ error, amount }, { status: 500 })
  }
}
