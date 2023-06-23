import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import { getBet, getDiceReturns, getRandomDiceResults } from "@/utils/dice"

const tavernDice = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, betPercentage } = req.body

  const characterRef = await get(child(dbRef, `${playerId}/character`))
  const character = characterRef.val() as Character

  const bet = getBet(betPercentage, character.doubloons || 0)

  if (character.doubloons < bet) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const diceResults = getRandomDiceResults()
  const diceReturns = getDiceReturns(diceResults, bet)

  console.log({ bet, diceResults, diceReturns })
  const doubloonsResult = character.doubloons + diceReturns

  const result: Character = {
    ...character,
    doubloons: doubloonsResult,
  }

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error, bet, diceResults, diceReturns })
  })

  res.status(200).json({
    success: true,
    bet,
    diceResults,
    diceReturns,
    doubloons: doubloonsResult,
  })
}

export default tavernDice
