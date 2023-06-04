import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { prices } from "@/constants/prices"
import db from "@/firebase/db"

const shopBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, item, quantity } = req.body

  if (!item || !Object.keys(prices).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const totalPrice = prices[item as keyof typeof prices].buy * quantity

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.doubloons < totalPrice) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons - totalPrice,
  }

  await set(ref(db, `${userId}/character`), characterResult).catch((error) => {
    res.status(500).json({ error })
  })

  const existingInventoryRef = await get(child(dbRef, `${userId}/inventory`))
  const existingInventory = existingInventoryRef.val()

  const inventoryResult = {
    ...existingInventory,
    [item]: existingInventory[item]
      ? existingInventory[item] + quantity
      : quantity,
  }

  await set(ref(db, `${userId}/inventory`), inventoryResult).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default shopBuy
