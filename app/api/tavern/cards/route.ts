import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getRandomInt } from "@/utils/random"
import { getCardsBet } from "@/utils/tavern"

export type CardsResult = "won" | "lost"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
  }

  const body = await req.json()
  const { betPercentage, selectedCard } = body

  const character = await getCharacter(playerId)

  const bet = getCardsBet(betPercentage, character.gold || 0)

  if (character.gold < bet) {
    return NextResponse.json({ error: "Not enough gold" }, { status: 400 })
  }

  const correctCard = getRandomInt(0, 4)
  const cardsResults: CardsResult =
    selectedCard === correctCard ? "won" : "lost"
  const cardsReturns = cardsResults === "won" ? bet * 5 : -bet

  const goldResult = character.gold + cardsReturns

  const characterResult: Character = {
    ...character,
    gold: goldResult,
  }

  try {
    await saveCharacter(playerId, characterResult)
  } catch (error) {
    return NextResponse.json(
      { error, bet, cardsResults, cardsReturns },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    bet,
    cardsResults,
    cardsReturns,
    selectedCard,
    correctCard,
    gold: goldResult,
  })
}
