import { randomInt } from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

// TODO: Move to util, duplicate in Dice.tsx
const getBet = (percentage: number, doubloons: number) => {
  if (percentage === 100) return doubloons

  return Math.floor((percentage / 100) * doubloons)
}

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

  const chance = randomInt(1, 40)
  let doubloonsResult = character.doubloons - bet

  if (chance <= 7) {
    // Won
    doubloonsResult = character.doubloons + Math.floor(bet * randomInt(2, 5))
  }
  if (chance === 40) {
    // Jackpot
    doubloonsResult = character.doubloons + Math.floor(bet * 20)
  }

  const result: Character = {
    ...character,
    doubloons: doubloonsResult,
  }

  console.log({ result })

  await set(ref(db, `${playerId}/character`), result).catch((error) => {
    res.status(500).json({ error, bet })
  })

  res.status(200).json({
    success: true,
    bet,
    doubloons: doubloonsResult,
  })
}

export default tavernDice
