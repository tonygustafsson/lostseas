import { NATIONS } from "@/constants/locations"
import { MERCHANDISE } from "@/constants/merchandise"

import { getMannedCannons } from "./crew"
import { getTownsNationality } from "./location"
import { getRandomInt } from "./random"

const DESTINATION_NATION_CHANCE = 0.8

const pickNation = (nations: (Nation | "Pirate")[]) =>
  nations[getRandomInt(0, nations.length - 1)]

// Near the destination, most ships come from its nation. Elsewhere any nation is as likely.
export const createMeetingShip = (
  mannedCannons: number,
  destination: Town,
  isLastDay = false
) => {
  const destinationNation = getTownsNationality(destination)
  const nations = [...Object.keys(NATIONS), "Pirate"] as (Nation | "Pirate")[]
  const otherNations = nations.filter((nation) => nation !== destinationNation)

  const getNation = () => {
    if (!isLastDay) return pickNation(nations)

    return Math.random() < DESTINATION_NATION_CHANCE
      ? destinationNation
      : pickNation(otherNations)
  }

  const nation = getNation()
  const shipTypes: ShipType[] = ["Brig", "Merchantman", "Galleon", "Frigate"]
  const shipType = shipTypes[getRandomInt(0, shipTypes.length - 1)]

  const minCannons = mannedCannons < 1 ? 1 : Math.round(mannedCannons * 0.8)
  const maxCannons = mannedCannons < 1 ? 2 : Math.round(mannedCannons * 1.1)
  const cannons = getRandomInt(minCannons, maxCannons) || 1
  const crewMembers = cannons * 2

  return {
    nation,
    shipType,
    crewMembers,
    cannons,
  } as ShipMeetingState
}

// Tuned so a player who always fires wins about 75% of battles on average
export const BASE_HIT_CHANCE = 0.61
export const MAX_HIT_CHANCE = 0.95

export const getHitChance = (mannedCannons: number, opponentCannons: number) =>
  mannedCannons <= 0
    ? 0
    : Math.min(
        MAX_HIT_CHANCE,
        (BASE_HIT_CHANCE * mannedCannons) / Math.max(1, opponentCannons)
      )

export const calculateAttackSuccess = (
  crewMembers: CrewMembers["count"],
  cannons: Inventory["cannons"],
  opponentCannons: number
) =>
  getRandomInt(1, 100) <=
  getHitChance(getMannedCannons(crewMembers, cannons), opponentCannons) * 100

export const getNumberOfRecruits = (opponentCrewMembers: number) => {
  if (opponentCrewMembers <= 10) {
    return Math.floor(opponentCrewMembers * (getRandomInt(10, 40) / 100))
  }

  if (opponentCrewMembers > 11) {
    return Math.floor(opponentCrewMembers * (getRandomInt(3, 10) / 100))
  }

  return Math.floor(opponentCrewMembers * (getRandomInt(2, 6) / 100))
}

export const getLootedMerchandise = () => {
  const lootedMerchandise: Partial<Record<keyof Inventory, number>> = {}

  Object.keys(MERCHANDISE).forEach((merchandise) => {
    if (getRandomInt(0, 2) === 0) {
      lootedMerchandise[merchandise as keyof Inventory] =
        merchandise === "food" || merchandise === "water"
          ? getRandomInt(1, 10)
          : getRandomInt(1, 5)
    }
  })

  return lootedMerchandise
}

const UNSTEALABLE_ITEMS: (keyof Inventory)[] = ["cannons", "repairKits"]

// After a defeat the enemy takes everything of 1-3 goods you carry. Cannons
// and repair kits stay aboard, and goods you have none of cannot be taken.
export const getStolenMerchandise = (inventory: Inventory | undefined) => {
  const carried = (Object.keys(inventory || {}) as (keyof Inventory)[]).filter(
    (item) => !UNSTEALABLE_ITEMS.includes(item) && (inventory?.[item] || 0) > 0
  )
  const stolenMerchandise: Partial<Record<keyof Inventory, number>> = {}
  const numberOfGoods = Math.min(getRandomInt(1, 3), carried.length)

  for (let i = 0; i < numberOfGoods; i++) {
    const [item] = carried.splice(getRandomInt(0, carried.length - 1), 1)
    stolenMerchandise[item] = inventory?.[item]
  }

  return stolenMerchandise
}
