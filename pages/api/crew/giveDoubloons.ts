import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import db from "@/firebase/db"
import { getDoubloonsEffectiveness } from "@/utils/crew"

const giveDoubloons = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const playerId: Player["id"] = req.body.playerId
  const doubloons = parseInt(req.body.doubloons)

  const existingPlayerRef = await get(child(dbRef, playerId))
  const existingPlayer = existingPlayerRef.val() as Player

  if (doubloons < 1) {
    res.status(500).json({ error: "You need to give at least 1 doubloon" })
    return
  }

  if ((existingPlayer.character.doubloons || 0) < doubloons) {
    res.status(500).json({ error: "Not enough doubloons" })
    return
  }

  const newMood = getDoubloonsEffectiveness(
    existingPlayer.crewMembers.count,
    existingPlayer.crewMembers.mood,
    doubloons
  )

  const result: Player = {
    ...existingPlayer,
    character: {
      ...existingPlayer.character,
      doubloons: (existingPlayer.character.doubloons || 0) - doubloons,
    },
    crewMembers: {
      ...existingPlayer.crewMembers,
      mood: newMood,
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, doubloons, newMood })
  })

  res.status(200).json({ success: true, doubloons, newMood })
}

export default giveDoubloons
