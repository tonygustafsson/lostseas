import { isOverloaded } from "./cargo"
import {
  getJourneyLength,
  getJourneySupplies,
  getLongestJourneyLength,
  getShortestJourneyLength,
} from "./journey"
import { getNewTitle } from "./title"
import { validateShipCrewRequirements } from "./validateCrew"

export type AdvisorWarningItem = {
  tip: AdvisorWarning
  blocksTravel: boolean
}

export const getAdvisorWarnings = (
  player?: Player,
  destination?: Town
): AdvisorWarningItem[] => {
  if (!player) return []

  const ships = Object.values(player.ships || {})
  const playerHasShips = ships.length > 0
  const playerHasCrew = player.crewMembers.count > 0
  const crewIsAngry = player.crewMembers.mood <= 0
  const crewMoodIsLow =
    player.crewMembers.mood > 0 && player.crewMembers.mood < 25
  const crewIsIll = player.crewMembers.health <= 0
  const crewHealthIsLow =
    player.crewMembers.health > 0 && player.crewMembers.health < 25
  const tooMuchGold = player.character.gold > 1000
  const hasLoanBlockingDeposit =
    (player.character.loan || 0) > 0 && player.character.gold > 0
  const shipsAreDamaged = ships.some((ship) => ship.health <= 0)
  const shipsNeedRepairs =
    !shipsAreDamaged && ships.some((ship) => ship.health < 100)
  const hasNoCannons =
    playerHasCrew && player.crewMembers.count >= 4 && !player.inventory?.cannons

  const { minCrew, maxCrew } = validateShipCrewRequirements(player.ships || {})
  const crewBelowMinimum = playerHasShips && player.crewMembers.count < minCrew
  const crewAboveMaximum = playerHasShips && player.crewMembers.count > maxCrew

  // Supplies and cargo only matter when leaving port, not mid-voyage
  const isInPort = player.character.location !== "Sea"
  const cargoIsOverloaded = playerHasShips && isOverloaded(player)

  // Without a destination, supplies must at least reach the nearest town
  const journeyLength = destination
    ? getJourneyLength(player.character.town, destination)
    : getShortestJourneyLength(player.character.town)
  const { hasEnoughFood, hasEnoughWater } = getJourneySupplies(
    player,
    journeyLength
  )

  // Supplies reach some towns but not all of them
  const longestJourney = getJourneySupplies(
    player,
    getLongestJourneyLength(player.character.town)
  )
  const hasLimitedSupplies =
    !destination &&
    hasEnoughFood &&
    hasEnoughWater &&
    !(longestJourney.hasEnoughFood && longestJourney.hasEnoughWater)

  const { promotionAvailable } = getNewTitle(player.character)

  const ventureReady = Object.values(player.character.ventures || {}).some(
    (share) => share.returnDay <= player.character.day
  )

  const warnings: AdvisorWarningItem[] = []

  const warn = (tip: AdvisorWarning, blocksTravel: boolean) =>
    warnings.push({ tip, blocksTravel })

  if (tooMuchGold) warn("TOO_MUCH_GOLD", false)
  if (hasLoanBlockingDeposit) warn("LOAN_BLOCKS_DEPOSIT", false)
  if (!playerHasShips) warn("NO_SHIPS", true)
  if (shipsAreDamaged) warn("DAMAGED_SHIPS", true)
  if (shipsNeedRepairs) warn("SHIPS_NEED_REPAIRS", false)
  if (!playerHasCrew) warn("NO_CREW", false)
  if (crewBelowMinimum) warn("NOT_ENOUGH_CREW", true)
  if (crewAboveMaximum) warn("TOO_MANY_CREW", true)
  if (isInPort && cargoIsOverloaded) warn("CARGO_OVERLOADED", true)
  if (crewIsAngry) warn("ANGRY_CREW", true)
  if (crewMoodIsLow) warn("LOW_CREW_MOOD", false)
  if (crewIsIll) warn("CREW_IS_ILL", true)
  if (crewHealthIsLow) warn("LOW_CREW_HEALTH", false)
  if (isInPort && !hasEnoughFood) warn("NEED_MORE_FOOD", true)
  if (isInPort && !hasEnoughWater) warn("NEED_MORE_WATER", true)
  if (isInPort && hasLimitedSupplies) warn("LIMITED_SUPPLIES", false)
  if (hasNoCannons) warn("NO_CANNONS", false)
  if (promotionAvailable) warn("PROMOTION_AVAILABLE", false)
  if (ventureReady) warn("VENTURE_READY", false)

  return warnings.sort(
    (a, b) => Number(b.blocksTravel) - Number(a.blocksTravel)
  )
}
