import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { prices } from "@/constants/prices"
import db from "@/firebase/db"

const shopBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { userId, item } = req.body

  if (!item || !Object.keys(prices).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const price = prices[item as keyof typeof prices].buy

  const existingCharacterRef = await get(child(dbRef, `${userId}/character`))
  const existingCharacter = existingCharacterRef.val()

  if (existingCharacter.doubloons < price) {
    res.status(400).json({ error: "Not enough doubloons" })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons - price,
  }

  await set(ref(db, `${userId}/character`), characterResult).catch((error) => {
    res.status(500).json({ error })
  })

  const existingInventoryRef = await get(child(dbRef, `${userId}/inventory`))
  const existingInventory = existingInventoryRef.val()

  const inventoryResult = {
    ...existingInventory,
    [item]: existingInventory[item] ? existingInventory[item] + 1 : 1,
  }

  await set(ref(db, `${userId}/inventory`), inventoryResult).catch((error) => {
    res.status(500).json({ error })
  })

  res.status(200).json({ success: true })
}

export default shopBuy
