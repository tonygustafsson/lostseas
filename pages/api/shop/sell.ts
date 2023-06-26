import { getCookie } from "cookies-next"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"

const shopSell = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const { item, quantity } = req.body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item", item })
    return
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].sell * quantity

  const existingInventoryRef = await get(child(dbRef, `${playerId}/inventory`))
  const existingInventory = existingInventoryRef.val()

  if (existingInventory[item] < quantity) {
    res.status(400).json({ error: `Not enough ${item}.`, item })
    return
  }

  const inventoryResult = {
    ...existingInventory,
    [item]: existingInventory[item] - quantity,
  }

  await set(ref(db, `${playerId}/inventory`), inventoryResult).catch(
    (error) => {
      res.status(500).json({ error })
    }
  )

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()
  const characterResult = {
    ...existingCharacter,
    gold: existingCharacter.gold + totalPrice,
  }

  await set(ref(db, `${playerId}/character`), characterResult).catch(
    (error) => {
      res.status(500).json({ error })
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

export default shopSell
