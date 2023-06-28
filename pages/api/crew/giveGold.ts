import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getGoldEffectiveness } from "@/utils/crew"

const giveGold = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const gold = parseInt(req.body.gold)

  const player = await getPlayer(playerId)

  if (gold < 1) {
    res.status(500).json({ error: "You need to give at least 1 doubloon" })
    return
  }

  if ((player.character.gold || 0) < gold) {
    res.status(500).json({ error: "Not enough gold" })
    return
  }

  const newMood = getGoldEffectiveness(
    player.crewMembers.count,
    player.crewMembers.mood,
    gold
  )

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      gold: (player.character.gold || 0) - gold,
    },
    crewMembers: {
      ...player.crewMembers,
      mood: newMood,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, gold, newMood })
  })

  res.status(200).json({ success: true, gold, newMood })
}

export default giveGold
