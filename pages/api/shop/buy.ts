import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import db from "@/firebase/db"

const shopBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, item, quantity } = req.body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const totalPrice =
    MERCHANDISE[item as keyof typeof MERCHANDISE].buy * quantity

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.gold < totalPrice) {
    res.status(400).json({ error: "Not enough gold" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    gold: existingCharacter.gold - totalPrice,
  }

  await set(ref(db, `${playerId}/character`), characterResult).catch(
    (error) => {
      res.status(500).json({ error, item })
    }
  )

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
