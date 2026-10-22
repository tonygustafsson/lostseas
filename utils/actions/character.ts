import { LOCATIONS } from "@/constants/locations"
import { MARKET_AVAILABLE_ITEMS, MARKET_MAX_OFFERS } from "@/constants/market"
import { MERCHANDISE } from "@/constants/merchandise"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt } from "@/utils/random"

import type { ActionResult, RandomInt } from "./types"

const TOWN_DESTINATIONS: Character["location"][] = Object.values(
  LOCATIONS
).filter((location) => location !== "Sea")

/** A new batch of market offers, created on the first visit. */
const createMarketState = (randomInt: RandomInt): LocationStates["market"] => {
  const items = {} as LocationStateMarketItems

  // Pick each item at most once, so every rolled offer shows up
  const remainingItems = [...MARKET_AVAILABLE_ITEMS]

  Array.from({ length: randomInt(1, MARKET_MAX_OFFERS) }).forEach(() => {
    const [item] = remainingItems.splice(
      randomInt(0, remainingItems.length - 1),
      1
    )
    const quantity = randomInt(1, 50)
    const price = Math.floor(MERCHANDISE[item].buy * (randomInt(50, 100) / 100))

    items[item] = { quantity, price }
  })

  return { visited: true, items }
}

/** Sailors at the tavern, decided on the first visit. */
const createTavernState = (
  crewCount: number,
  randomInt: RandomInt
): LocationStates["tavern"] => {
  // 50% chance of no event
  if (randomInt(1, 2) === 1) {
    return { visited: true, noOfSailors: 0, isHostile: false }
  }

  // No crew works the same as a crew of one
  const crew = Math.max(crewCount, 1)
  let noOfSailors = 0

  if (crew > 20) {
    noOfSailors = Math.round(crew * (randomInt(4, 10) / 100))
  } else if (crew > 10) {
    noOfSailors = Math.round(crew * (randomInt(8, 15) / 100))
  } else {
    noOfSailors = Math.round(crew * (randomInt(10, 25) / 100))
  }

  // 30% chance the sailors are hostile
  return {
    visited: true,
    // When sailors turn up, there is always at least one
    noOfSailors: Math.max(noOfSailors, 1),
    isHostile: randomInt(1, 10) <= 3,
  }
}

export const moveToLocation = (
  player: Player,
  { location }: { location: Character["location"] },
  randomInt: RandomInt = getRandomInt
): ActionResult => {
  if (!TOWN_DESTINATIONS.includes(location)) {
    return { error: "Invalid location" }
  }

  if (player.character.location === "Sea" || player.character.journey) {
    return { error: "You cannot change locations while on a journey." }
  }

  if (player.character.location === location) {
    return { error: "You are already at this location" }
  }

  const locationStates: DeepPartial<LocationStates> = {
    harbor: { lastHarborReason: null },
  }

  if (location === "Market" && !player.locationStates?.market) {
    locationStates.market = createMarketState(randomInt)
  }

  if (location === "Tavern" && !player.locationStates?.tavern) {
    locationStates.tavern = createTavernState(
      player.crewMembers.count,
      randomInt
    )
  }

  return {
    player: patchDeep<Player>(player, {
      character: { location },
      locationStates,
    }),
    data: {},
  }
}
