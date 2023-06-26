import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { TAVERN_ITEMS } from "@/constants/tavern"
import db, { dbRef } from "@/firebase/db"

const tavernBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item } = req.body

  if (!item || !Object.keys(TAVERN_ITEMS).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const tavernItem = item as keyof typeof TAVERN_ITEMS
  const totalPrice = TAVERN_ITEMS[tavernItem].price * player.crewMembers.count

  if (player.character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold" })
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
      gold: player.character.gold - totalPrice,
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
