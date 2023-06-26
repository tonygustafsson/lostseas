import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"
import { getBet, getDiceReturns, getRandomDiceResults } from "@/utils/dice"

const tavernDice = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { betPercentage } = req.body

  const characterRef = await get(child(dbRef, `${playerId}/character`))
  const character = characterRef.val() as Character

  const bet = getBet(betPercentage, character.gold || 0)

  if (character.gold < bet) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const diceResults = getRandomDiceResults()
  const diceReturns = getDiceReturns(diceResults, bet)

  console.log({ bet, diceResults, diceReturns })
  const goldResult = character.gold + diceReturns

  const result: Character = {
    ...character,
    gold: goldResult,
  }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error, bet, diceResults, diceReturns })
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
