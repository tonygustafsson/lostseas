import { child, get, ref, set } from "firebase/database"

import { MARKET_AVAILABLE_ITEMS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import db, { dbRef } from "@/firebase/db"

import { getRandomInt } from "./random"

type Props = {
  playerId: Player["id"]
  destination: Character["location"]
}

export const createMoveEvents = async ({ playerId, destination }: Props) => {
  if (destination === "Market") {
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

  if (destination === "Tavern") {
    const existingEvent = await get(
      child(dbRef, `${playerId}/locationStates/tavern`)
    )

    if (existingEvent.exists()) {
      return
    }

    if (Math.random() < 0.5) {
      // 50% chance of no event
      const ignoreEvent: LocationState["tavern"] = {
        visited: true,
        noOfSailors: 0,
        isHostile: false,
      }

      const eventResult = { ...existingEvent.val(), ...ignoreEvent }

      await set(
        ref(db, `${playerId}/locationStates/tavern`),
        eventResult
      ).catch((error) => {
        throw new Error(error)
      })

      return
    }

    const crewMembersRef = await get(child(dbRef, `${playerId}/crewMembers`))
    const crewMembers = crewMembersRef.val()?.count || 0

    let noOfSailors = 0

    if (crewMembers === 0) {
      noOfSailors = 1
    } else if (crewMembers <= 10) {
      noOfSailors = Math.round(crewMembers * (getRandomInt(10, 25) / 100))
    } else if (crewMembers <= 20) {
      noOfSailors = Math.round(crewMembers * (getRandomInt(8, 15) / 100))
    } else if (crewMembers > 20) {
      noOfSailors = Math.round(crewMembers * (getRandomInt(4, 10) / 100))
    }

    const isHostile = Math.random() < 0.3

    const newEvent: LocationState["tavern"] = {
      visited: true,
      noOfSailors,
      isHostile,
    }

    const eventResult = { ...existingEvent.val(), ...newEvent }

    await set(ref(db, `${playerId}/locationStates/tavern`), eventResult).catch(
      (error) => {
        throw new Error(error)
      }
    )
  }
}
