import { MARKET_AVAILABLE_ITEMS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import { savePlayer } from "@/firebase/db"

import { patchDeep } from "./patchDeep"
import { getRandomInt } from "./random"

type Props = {
  player: Player
  destination: Character["location"]
}

export const createMoveEvents = async ({ player, destination }: Props) => {
  if (destination === "Market") {
    const marketEvent = player.locationStates?.market

    if (marketEvent) {
      return player
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

    const dbUpdate: DeepPartial<Player> = {
      locationStates: {
        market: eventResult,
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)
    return await savePlayer(newPlayer)
  }

  if (destination === "Tavern") {
    const tavernEvent = player.locationStates?.tavern

    if (tavernEvent) {
      return player
    }

    if (Math.random() < 0.5) {
      // 50% chance of no event
      const dbUpdate: DeepPartial<Player> = {
        locationStates: {
          tavern: {
            visited: true,
            noOfSailors: 0,
            isHostile: false,
          },
        },
      }

      const newPlayer = patchDeep<Player>(player, dbUpdate)
      return await savePlayer(newPlayer)
    }

    let noOfSailors = 0

    if (player.crewMembers.count === 0) {
      noOfSailors = 1
    } else if (player.crewMembers.count <= 10) {
      noOfSailors = Math.round(
        player.crewMembers.count * (getRandomInt(10, 25) / 100)
      )
    } else if (player.crewMembers.count <= 20) {
      noOfSailors = Math.round(
        player.crewMembers.count * (getRandomInt(8, 15) / 100)
      )
    } else if (player.crewMembers.count > 20) {
      noOfSailors = Math.round(
        player.crewMembers.count * (getRandomInt(4, 10) / 100)
      )
    }

    const isHostile = Math.random() < 0.3

    const eventResult: LocationStates["tavern"] = {
      visited: true,
      noOfSailors,
      isHostile,
    }

    const dbUpdate: DeepPartial<Player> = {
      locationStates: {
        tavern: eventResult,
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)
    return await savePlayer(newPlayer)
  }

  return player
}
