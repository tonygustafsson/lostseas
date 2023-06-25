import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"

const bankDeposit = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.loan) {
    res
      .status(400)
      .json({ error: "You cannot add funds until your loan is fully repaid." })
    return
  }

  if (existingCharacter.gold < amount) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    gold: existingCharacter.gold - amount,
    account: existingCharacter.account
      ? existingCharacter.account + amount
      : amount,
  }

  await set(ref(db, `${playerId}/character`), characterResult).catch(
    (error) => {
      res.status(500).json({ error, amount })
    }
  )

  res.status(200).json({
    success: true,
    amount,
    gold: characterResult.gold,
  })
}

export default bankDeposit
