import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getRandomInt } from "@/utils/random"

export type CardsResult = "won" | "lost"

export const getCardsBet = (percentage: number, gold: number) => {
  if (percentage === 100) return gold

  return Math.floor((percentage / 100) * gold)
}

const tavernCards = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { betPercentage, selectedCard } = req.body

  const character = await getCharacter(playerId)

  const bet = getCardsBet(betPercentage, character.gold || 0)

  if (character.gold < bet) {
    res.status(400).json({ error: "Not enough gold" })
    return
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

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({
      error,
      bet,
      cardsResults,
      cardsReturns,
    })
    return
  })

  res.status(200).json({
    success: true,
    bet,
    cardsResults,
    cardsReturns,
    selectedCard,
    correctCard,
    gold: goldResult,
  })
}

export default tavernCards
