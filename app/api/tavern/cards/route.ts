import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt } from "@/utils/random"
import { getCardsBet } from "@/utils/tavern"

export type CardsResult = "won" | "lost"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const {
    betPercentage,
    selectedCard,
  }: { betPercentage: number; selectedCard: number } = body

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const bet = getCardsBet(betPercentage, player.character.gold || 0)

  if (player.character.gold < bet) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const correctCard = getRandomInt(0, 4)
  const cardsResults: CardsResult =
    selectedCard === correctCard ? "won" : "lost"
  const cardsReturns = cardsResults === "won" ? bet * 5 : -bet

  const goldResult = player.character.gold + cardsReturns

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: goldResult,
    },
  }

  const newPlayer = patchDeep<Player>(player, dbUpdate)

  try {
    const updatedPlayer = await savePlayer(
      newPlayer,
      `Played cards: bet ${bet}, result ${cardsResults}. Gold change: ${cardsReturns}. New gold total: ${goldResult}.`
    )

    return NextResponse.json({
      success: true,
      updatedPlayer,
      bet,
      cardsResults,
      cardsReturns,
      selectedCard,
      correctCard,
      gold: goldResult,
    })
  } catch (error) {
    return NextResponse.json(
      { error, bet, cardsResults, cardsReturns },
      { status: 500 }
    )
  }
}
