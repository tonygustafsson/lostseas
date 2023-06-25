import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import { getGoldEffectiveness } from "@/utils/crew"

const giveGold = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId: Player["id"] = req.body.playerId
  const gold = parseInt(req.body.gold)

  const existingPlayerRef = await get(child(dbRef, playerId))
  const existingPlayer = existingPlayerRef.val() as Player

  if (gold < 1) {
    res.status(500).json({ error: "You need to give at least 1 doubloon" })
    return
  }

  if ((existingPlayer.character.gold || 0) < gold) {
    res.status(500).json({ error: "Not enough gold" })
    return
  }

  const newMood = getGoldEffectiveness(
    existingPlayer.crewMembers.count,
    existingPlayer.crewMembers.mood,
    gold
  )

  const result: Player = {
    ...existingPlayer,
    character: {
      ...existingPlayer.character,
      gold: (existingPlayer.character.gold || 0) - gold,
    },
    crewMembers: {
      ...existingPlayer.crewMembers,
      mood: newMood,
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, gold, newMood })
  })

  res.status(200).json({ success: true, gold, newMood })
}

export default giveGold
