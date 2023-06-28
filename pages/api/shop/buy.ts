import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef, getCharacter, saveCharacter } from "@/firebase/db"

const shopBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item, quantity } = req.body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  const character = await getCharacter(playerId)

  if (character.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const characterResult = {
    ...character,
    gold: character.gold - totalPrice,
  }

  await saveCharacter(playerId, characterResult).catch((error) => {
    res.status(500).json({ error, item })
    return
  })

  const existingInventoryRef = await get(child(dbRef, `${playerId}/inventory`))
  const existingInventory = existingInventoryRef.val()

  const inventoryResult = {
    ...existingInventory,
    [item]: existingInventory[item]
      ? existingInventory[item] + quantity
      : quantity,
  }

  await set(ref(db, `${playerId}/inventory`), inventoryResult).catch(
    (error) => {
      res.status(500).json({ error, item })
    }
  )

  res.status(200).json({
    success: true,
    item,
    quantity,
    totalQuantity: inventoryResult[item],
    totalPrice,
  })
}

export default shopBuy
