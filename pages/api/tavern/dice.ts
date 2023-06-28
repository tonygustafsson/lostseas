import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"
import { getBet, getDiceReturns, getRandomDiceResults } from "@/utils/dice"

const tavernDice = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { betPercentage } = req.body

  const character = await getCharacter(playerId)

  const bet = getBet(betPercentage, character.gold || 0)

  if (character.gold < bet) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const diceResults = getRandomDiceResults()
  const diceReturns = getDiceReturns(diceResults, bet)

  const goldResult = character.gold + diceReturns

  const characterResult: Character = {
    ...character,
    gold: goldResult,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error, bet, diceResults, diceReturns })
    return
  })

  res.status(200).json({
    success: true,
    bet,
    diceResults,
    diceReturns,
    gold: goldResult,
  })
}

export default tavernDice
