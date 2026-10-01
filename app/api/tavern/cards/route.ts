import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { CARDS_PERCENTAGE_VALUES } from "@/constants/tavern"
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

  if (
    !CARDS_PERCENTAGE_VALUES.includes(betPercentage) ||
    !Number.isInteger(selectedCard) ||
    selectedCard < 0 ||
    selectedCard >= 5
  ) {
    return NextResponse.json({ error: "Invalid card bet" }, { status: 400 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (player.character.location !== "Tavern")
    return NextResponse.json(
      { error: "You must be at Tavern to do this." },
      { status: 400 }
    )

  const bet = getCardsBet(betPercentage, player.character.gold || 0)

  if (!Number.isSafeInteger(bet) || bet < 1) {
    return NextResponse.json(
      { error: "Bet must be at least 1 gold" },
      { status: 400 }
    )
  }

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
