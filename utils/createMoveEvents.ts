import { child, get, ref, set } from "firebase/database"

import { MARKET_AVAILABLE_ITEMS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import db from "@/firebase/db"

import { getRandomInt } from "./random"

type Props = {
  playerId: Player["id"]
  destination: Character["location"]
}

export const createMoveEvents = async ({ playerId, destination }: Props) => {
  if (destination === "Market") {
    const dbRef = ref(db)

    const existingEvent = await get(
      child(dbRef, `${playerId}/locationStates/market`)
    )

    if (existingEvent.exists()) {
      return
    }

    const noOfItems = getRandomInt(1, 4)
    const items = {} as LocationStateMarketItems

    Array.from({ length: noOfItems }).forEach(() => {
      const item =
        MARKET_AVAILABLE_ITEMS[getRandomInt(0, MARKET_AVAILABLE_ITEMS.length)]
      const quantity = getRandomInt(1, 50)
      const price = Math.floor(
        MERCHANDISE[item].buy * (getRandomInt(50, 100) / 100)
      )

      items[item] = { quantity, price }
    })

    const newEvent: LocationState["market"] = {
      visited: true,
      items,
    }

    const eventResult = { ...existingEvent.val(), ...newEvent }

    await set(ref(db, `${playerId}/locationStates/market`), eventResult).catch(
      (error) => {
        throw new Error(error)
      }
    )
  }
}
