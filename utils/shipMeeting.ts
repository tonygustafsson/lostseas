import { NATIONS } from "@/constants/locations"

import { getRandomInt } from "./random"

export const createMeetingShip = (mannedCannons: number) => {
  const nations = [...NATIONS, "Pirate"]
  const nation = nations[getRandomInt(0, nations.length - 1)]
  const shipTypes: ShipType[] = ["Brig", "Merchantman", "Galleon", "Frigate"]
  const shipType = shipTypes[getRandomInt(0, shipTypes.length - 1)]
  const minCannons = mannedCannons * 0.8
  const maxCannons = mannedCannons * 1.1
  const cannons = getRandomInt(minCannons, maxCannons)
  const crewMembers = mannedCannons * 2

  return {
    nation,
    shipType,
    crewMembers,
    cannons,
  }
}
