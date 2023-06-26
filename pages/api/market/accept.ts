import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"

const marketBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item }: { item: keyof typeof MERCHANDISE } = req.body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  if (!player?.locationStates?.market) {
    res.status(400).json({ error: "Not a valid item", item })
    return
  }

  const stateItem = player?.locationStates?.market.items?.[item]

  if (!stateItem) {
    res.status(400).json({ error: "Not a valid item", item })
    return
  }

  const totalPrice = stateItem?.price * stateItem.quantity

  if (player?.character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold", item })
    return
  }

  const result: Player = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
    },
    inventory: {
      ...player.inventory,
      [item]: player.inventory[item]
        ? (player.inventory[item] || 0) + stateItem.quantity
        : stateItem.quantity,
    },
    locationStates: {
      ...player.locationStates,
      market: {
        ...player.locationStates.market,
        items: {
          ...player.locationStates.market.items,
          [item]: null,
        },
      },
    },
  }

  await set(ref(db, playerId), result).catch((error) => {
    res.status(500).json({ error, item })
  })

  res.status(200).json({
    success: true,
    item,
    quantity: stateItem.quantity,
    totalQuantity: result.inventory[item],
    totalPrice,
  })
}

export default marketBuy
