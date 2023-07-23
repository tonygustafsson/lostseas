import { MARKET_AVAILABLE_ITEMS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import {
  getCrewMembers,
  getLocationState,
  saveLocationState,
} from "@/firebase/db"

import { getRandomInt } from "./random"

type Props = {
  playerId: Player["id"]
  destination: Character["location"]
}

export const createMoveEvents = async ({ playerId, destination }: Props) => {
  if (destination === "Market") {
    const marketEvent = await getLocationState<LocationStates["market"]>(
      playerId,
      "market"
    )

    if (marketEvent) {
      return
    }

    const noOfItems = getRandomInt(1, 4)
    const items = {} as LocationStateMarketItems

    Array.from({ length: noOfItems }).forEach(() => {
      const item =
        MARKET_AVAILABLE_ITEMS[
          getRandomInt(0, MARKET_AVAILABLE_ITEMS.length - 1)
        ]
      const quantity = getRandomInt(1, 50)
      const price = Math.floor(
        MERCHANDISE[item].buy * (getRandomInt(50, 100) / 100)
      )

      items[item] = { quantity, price }
    })

    const eventResult: LocationStates["market"] = {
      visited: true,
      items,
    }

    await saveLocationState<LocationStates["market"]>(
      playerId,
      "market",
      eventResult
    )
  }

  if (destination === "Tavern") {
    const tavernEvent = await getLocationState<LocationStates["tavern"]>(
      playerId,
      "tavern"
    )

    if (tavernEvent) {
      return
    }

    if (Math.random() < 0.5) {
      // 50% chance of no event
      const eventResult: LocationStates["tavern"] = {
        visited: true,
        noOfSailors: 0,
        isHostile: false,
      }

      await saveLocationState<LocationStates["tavern"]>(
        playerId,
        "tavern",
        eventResult
      ).catch((error) => {
        throw new Error(error)
      })

      return
    }

    const crewMembers = await getCrewMembers(playerId)

    let noOfSailors = 0

    if (crewMembers.count === 0) {
      noOfSailors = 1
    } else if (crewMembers.count <= 10) {
      noOfSailors = Math.round(crewMembers.count * (getRandomInt(10, 25) / 100))
    } else if (crewMembers.count <= 20) {
      noOfSailors = Math.round(crewMembers.count * (getRandomInt(8, 15) / 100))
    } else if (crewMembers.count > 20) {
      noOfSailors = Math.round(crewMembers.count * (getRandomInt(4, 10) / 100))
    }

    const isHostile = Math.random() < 0.3

    const eventResult: LocationStates["tavern"] = {
      visited: true,
      noOfSailors,
      isHostile,
    }

    await saveLocationState<LocationStates["tavern"]>(
      playerId,
      "tavern",
      eventResult
    ).catch((error) => {
      throw new Error(error)
    })
  }
}
