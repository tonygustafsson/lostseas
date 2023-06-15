import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { TAVERN_ITEMS } from "@/constants/tavern"
import db from "@/firebase/db"

const tavernBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, item } = req.body

  if (!item || !Object.keys(TAVERN_ITEMS).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const tavernItem = item as keyof typeof TAVERN_ITEMS
  const totalPrice = TAVERN_ITEMS[tavernItem].price * player.crewMembers.count

  if (player.character.doubloons < totalPrice) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const healthIncrease = TAVERN_ITEMS[tavernItem].healthIncrease
  const moodIncrease = TAVERN_ITEMS[tavernItem].moodIncrease
  const newMood =
    player.crewMembers.mood + moodIncrease > 40
      ? 40
      : player.crewMembers.mood + moodIncrease
  const newHealth =
    player.crewMembers.health + healthIncrease > 100
      ? 100
      : player.crewMembers.health + healthIncrease

  const result = {
    ...player,
    character: {
      ...player.character,
      doubloons: player.character.doubloons - totalPrice,
    },
    crewMembers: {
      ...player.crewMembers,
      mood: newMood,
      health: newHealth,
    },
  } as Player

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, item })
  })

  res.status(200).json({
    success: true,
    item,
    newMood,
    newHealth,
    totalPrice,
  })
}

export default tavernBuy
