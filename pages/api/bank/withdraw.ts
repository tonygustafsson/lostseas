import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"

const bankWithdraw = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.account < amount) {
    res.status(400).json({ error: "Not enough gold in bank account" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    gold: existingCharacter.gold + amount,
    account:
      existingCharacter.account - amount === 0
        ? null
        : existingCharacter.account - amount,
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

export default bankWithdraw
