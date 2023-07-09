import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

const shipyardBuyFittings = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item, quantity } = req.body

  if (
    !item ||
    Object.entries(MERCHANDISE).find(([itemKey]) => itemKey === item)?.[1]
      .availableAt !== "shipyard"
  ) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  const player = await getPlayer(playerId)

  if (player.character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const itemQuantity = player.inventory?.[item as keyof Inventory]

  const playerResult = {
    ...player,
    character: {
      ...player.character,
      gold: player.character.gold - totalPrice,
    },
    inventory: {
      ...player.inventory,
      [item]: itemQuantity ? itemQuantity + quantity : quantity,
    },
  } as Player

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error, item })
    return
  })

  res.status(200).json({
    success: true,
    item,
    quantity,
    totalQuantity: itemQuantity ? itemQuantity + quantity : quantity,
    totalPrice,
  })
}

export default shipyardBuyFittings
