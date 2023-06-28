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
    const locationState = await getLocationState<LocationState["market"]>(
      playerId,
      "market"
    )

    if (locationState) {
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

    await saveLocationState<LocationState["market"]>(
      playerId,
      "market",
      newEvent
    )
  }

  if (destination === "Tavern") {
    const locationState = await getLocationState<LocationState["tavern"]>(
      playerId,
      "tavern"
    )

    if (locationState) {
      return
    }

    if (Math.random() < 0.5) {
      // 50% chance of no event
      const ignoreEvent: LocationState["tavern"] = {
        visited: true,
        noOfSailors: 0,
        isHostile: false,
      }

      await saveLocationState<LocationState["tavern"]>(
        playerId,
        "tavern",
        ignoreEvent
      )

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

    const newEvent: LocationState["tavern"] = {
      visited: true,
      noOfSailors,
      isHostile,
    }

    await saveLocationState<LocationState["tavern"]>(
      playerId,
      "tavern",
      newEvent
    )
  }
}
