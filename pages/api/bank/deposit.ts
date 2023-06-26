import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const bankDeposit = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (character.loan) {
    res
      .status(400)
      .json({ error: "You cannot add funds until your loan is fully repaid." })
    return
  }

  if (character.gold < amount) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const characterResult = {
    ...character,
    gold: character.gold - amount,
    account: character.account ? character.account + amount : amount,
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

export default bankDeposit
