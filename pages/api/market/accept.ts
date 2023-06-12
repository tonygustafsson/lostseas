import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import db from "@/firebase/db"

const marketBuy = async (req: NextApiRequest, res: NextApiResponse) => {
  const dbRef = ref(db)
  const { playerId, item } = req.body

  if (!item || !Object.keys(MERCHANDISE).includes(item || "")) {
    res.status(400).json({ error: "Not a valid item" })
    return
  }

  const existingCharacterRef = await get(child(dbRef, `${playerId}/character`))
  const existingCharacter = existingCharacterRef.val()

  const existingLocationStatesRef = await get(
    child(dbRef, `${playerId}/locationStates`)
  )
  const existingLocationStates = existingLocationStatesRef.val()
  const state = existingLocationStates as LocationState

  if (!state.market) {
    res.status(400).json({ error: "Not a valid item", item })
    return
  }

  const stateItem = state.market.items?.[item as keyof typeof MERCHANDISE]

  if (!stateItem) {
    res.status(400).json({ error: "Not a valid item", item })
    return
  }

  const totalPrice = stateItem?.price * stateItem.quantity

  if (existingCharacter.doubloons < totalPrice) {
    res.status(400).json({ error: "Not enough doubloons", item })
    return
  }

  const characterResult = {
    ...existingCharacter,
    doubloons: existingCharacter.doubloons - totalPrice,
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
      ? existingInventory[item] + stateItem.quantity
      : stateItem.quantity,
  }

  await set(ref(db, `${playerId}/inventory`), inventoryResult).catch(
    (error) => {
      res.status(500).json({ error, item })
    }
  )

  res.status(200).json({
    success: true,
    item,
    totalQuantity: inventoryResult[item],
    totalPrice,
  })
}

export default marketBuy
