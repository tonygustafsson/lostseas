import { NATIONS } from "@/constants/locations"
import { MERCHANDISE } from "@/constants/merchandise"

import { getMannedCannons } from "./crew"
import { getTownsNationality } from "./location"
import { getRandomInt } from "./random"

export const createMeetingShip = (mannedCannons: number, destination: Town) => {
  const destinationNation = getTownsNationality(destination)
  const nations = [...Object.keys(NATIONS), "Pirate"]
  const nation =
    Math.random() > 0.5
      ? destinationNation
      : (nations[getRandomInt(0, nations.length - 1)] as Nation | "Pirate")
  const shipTypes: ShipType[] = ["Brig", "Merchantman", "Galleon", "Frigate"]
  const shipType = shipTypes[getRandomInt(0, shipTypes.length - 1)]

  const minCannons = mannedCannons < 1 ? 1 : Math.floor(mannedCannons * 0.8)
  const maxCannons = mannedCannons < 1 ? 2 : Math.floor(mannedCannons * 1.1)
  const cannons = getRandomInt(minCannons, maxCannons) || 1
  const crewMembers = cannons * 2

  return {
    nation,
    shipType,
    crewMembers,
    cannons,
  } as ShipMeetingState
}

export const calculateAttackSuccess = (
  crewMembers: CrewMembers["count"],
  cannons: Inventory["cannons"],
  opponentCannons: number
) => {
  const mannedCannons = getMannedCannons(crewMembers, cannons)

  let chanceVariation = 0.1

  if (mannedCannons < 12) {
    chanceVariation = 0.2
  } else if (mannedCannons < 6) {
    chanceVariation = 0.4
  }

  const playerScore =
    mannedCannons + getRandomInt(0, mannedCannons * chanceVariation)
  const opponentScore =
    opponentCannons + getRandomInt(0, opponentCannons * chanceVariation)

  return playerScore >= opponentScore
}

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
