import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const bankWithdraw = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { amount } = req.body

  if (amount < 1) {
    res.status(400).json({ error: "You cannot repay less than 1 doubloon." })
    return
  }

  const character = await getCharacter(playerId)
  const currentAccount = character.account || 0

  if (currentAccount < amount) {
    res.status(400).json({ error: "Not enough gold in bank account" })
    return
  }

  const characterResult = {
    ...character,
    gold: character.gold + amount,
    account: currentAccount - amount === 0 ? null : currentAccount - amount,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error, amount })
    return
  })

  res.status(200).json({
    success: true,
    amount,
    gold: characterResult.gold,
  })
}

export default bankWithdraw
