import { TOWNS } from "@/constants/locations"
import { getDefeatUpdate, getVictoryUpdate } from "@/utils/battleOutcome"
import { getMannedCannons } from "@/utils/crew"
import { getAdvisorWarnings } from "@/utils/getAdvisorWarnings"
import { patchDeep } from "@/utils/patchDeep"
import {
  getBattleLosses,
  resolveBattleRound,
  startBattle,
} from "@/utils/seaBattle"
import { createMeetingShip } from "@/utils/shipMeeting"
import { getDailyConsumption } from "@/utils/shop"

import type { ActionResult } from "./types"

type SeaError = { error: string; status: 400 | 409 }

/** Returns a random number from 0 (included) to 1 (excluded), like Math.random. */
type Random = () => number

const BATTLE_ACTIONS: BattleAction[] = ["fire", "evade"]

const MEETING_CHANCE = 0.33

const badRequest = (error: string): SeaError => ({ error, status: 400 })

const conflict = (error: string): SeaError => ({ error, status: 409 })

const clearedSeaState: DeepPartial<SeaState> = {
  shipMeeting: null,
  attackSuccessReport: null,
  attackFailureReport: null,
  justMetAShip: null,
}

export const startJourney = (
  player: Player,
  { town }: { town: Town },
  random: Random = Math.random
): ActionResult<{ distance: number }> | { blocked: true } => {
  if (typeof town !== "string" || !Object.hasOwn(TOWNS, town)) {
    return badRequest("Invalid destination")
  }

  if (player.character.journey) {
    return badRequest("Character is already on a journey")
  }

  if (player.character.location === "Sea") {
    return badRequest("You can only start a journey from land.")
  }

  if (town === player.character.town) {
    return badRequest("You are already at this destination.")
  }

  // The advisor explains why the player cannot leave port
  if (
    getAdvisorWarnings(player, town).some((warning) => warning.blocksTravel)
  ) {
    return { blocked: true }
  }

  const currentTown = player.character.town && TOWNS[player.character.town]

  // Without a known distance, the journey takes 3 to 8 days
  const distance =
    currentTown?.map.distanceTo[town] || Math.floor(random() * 6) + 3

  return {
    player: patchDeep<Player>(player, {
      character: {
        town: null,
        location: "Sea",
        journey: {
          ...(player.character.town && { origin: player.character.town }),
          destination: town,
          day: 1,
          totalDays: distance,
        },
      },
      locationStates: null,
    }),
    log: `Started journey to ${town}. Expected arrival in ${distance} days.`,
    data: { distance },
  }
}

export const continueJourney = (
  player: Player,
  random: Random = Math.random
): ActionResult<{
  day: number
  totalDays: number
  destination: Town
  destinationReached: boolean
  shipMeetingState: ShipMeetingState | null
}> => {
  const { journey } = player.character
  const sea = player.locationStates?.sea

  if (player.character.location !== "Sea") {
    return badRequest(`You cannot journey from ${player.character.location}.`)
  }

  if (!journey?.destination) {
    return badRequest("Not a valid journey destination.")
  }

  if (journey.day > journey.totalDays) {
    return badRequest("Your journey is already finished.")
  }

  if (sea?.battle) {
    return conflict("You cannot sail on during a battle.")
  }

  // Sailing pauses at an encounter until the player attacks or ignores the ship
  if (sea?.shipMeeting) {
    return conflict("Attack or ignore the ship before sailing on.")
  }

  const destinationReached = journey.day === journey.totalDays
  const hasPendingAttackReport = !!(
    sea?.attackSuccessReport || sea?.attackFailureReport
  )

  const journeyData = {
    totalDays: journey.totalDays,
    destination: journey.destination,
  }

  // A ship met on the last day of sailing already moved journey.day to totalDays.
  // Clear the meeting/attack state first and keep the player at sea, so the
  // outcome is shown before the player arrives. The next call does the arrival.
  if (destinationReached && (hasPendingAttackReport || sea?.justMetAShip)) {
    return {
      player: patchDeep<Player>(player, {
        locationStates: { sea: clearedSeaState },
      }),
      data: {
        ...journeyData,
        day: journey.day,
        destinationReached: false,
        shipMeetingState: null,
      },
    }
  }

  const daily = getDailyConsumption(player.crewMembers.count)
  const food = Math.max((player.inventory?.food || 0) - daily.food, 0)
  const water = Math.max((player.inventory?.water || 0) - daily.water, 0)

  if (destinationReached) {
    return {
      player: patchDeep<Player>(player, {
        character: {
          town: journey.destination,
          location: "Harbor",
          day: player.character.day + 1,
          journey: null,
        },
        inventory: { food, water },
        locationStates: {
          harbor: { lastHarborReason: "arrived" },
          sea: clearedSeaState,
        },
      }),
      log: `Arrived at destination ${journey.destination}.`,
      data: {
        ...journeyData,
        day: journey.day + 1,
        destinationReached,
        shipMeetingState: null,
      },
    }
  }

  const shouldMeetAShip = !sea?.justMetAShip && random() < MEETING_CHANCE

  const shipMeetingState = shouldMeetAShip
    ? createMeetingShip(
        getMannedCannons(player.crewMembers.count, player.inventory?.cannons),
        journey.destination
      )
    : null

  // Continuing after a battle report does not advance the date
  const day = hasPendingAttackReport ? journey.day : journey.day + 1

  return {
    player: patchDeep<Player>(player, {
      character: hasPendingAttackReport
        ? {}
        : { day: player.character.day + 1, journey: { day } },
      locationStates: {
        sea: { ...clearedSeaState, shipMeeting: shipMeetingState },
      },
      // A day at sea uses supplies and mood, resuming after a battle does not
      ...(!hasPendingAttackReport && {
        inventory: { food, water },
        crewMembers: { mood: Math.max(player.crewMembers.mood - 1, 0) },
      }),
    }),
    data: { ...journeyData, day, destinationReached, shipMeetingState },
  }
}

export const attackShip = (
  player: Player
): ActionResult<{ battle: BattleState }> => {
  const sea = player.locationStates?.sea

  if (!sea?.shipMeeting) {
    return badRequest("You are not currently meeting a ship")
  }

  if (sea.battle) {
    return conflict("The battle has already started")
  }

  const battle = startBattle()

  return {
    player: patchDeep<Player>(player, {
      locationStates: { sea: { battle } },
    }),
    log: `Attacked a ship from ${sea.shipMeeting.nation}.`,
    data: { battle },
  }
}

export const ignoreShip = (player: Player): ActionResult<object> => {
  const sea = player.locationStates?.sea

  if (!sea?.shipMeeting) {
    return badRequest("You are not currently meeting a ship")
  }

  if (sea.battle) {
    return conflict("You cannot ignore a ship during a battle")
  }

  return {
    player: patchDeep<Player>(player, {
      locationStates: { sea: { shipMeeting: null, justMetAShip: true } },
    }),
    data: {},
  }
}

export const battleMove = (
  player: Player,
  { action }: { action: BattleAction }
): ActionResult<
  { outcome: BattleOutcome; round: BattleRound | undefined } & Partial<
    AttackSuccessReport | AttackFailureReport
  >
> => {
  if (!BATTLE_ACTIONS.includes(action)) {
    return badRequest("Not a valid battle action")
  }

  const shipMeeting = player.locationStates?.sea?.shipMeeting
  const battle = player.locationStates?.sea?.battle

  if (!shipMeeting || !battle) {
    return conflict("You are not currently in a battle")
  }

  const result = resolveBattleRound(battle, action, player, shipMeeting.cannons)
  const round = result.battle.rounds.at(-1)

  if (result.outcome === "ongoing") {
    return {
      player: patchDeep<Player>(player, {
        ships: result.ships,
        crewMembers: { health: result.crewHealth },
        locationStates: { sea: { battle: result.battle } },
      }),
      data: { outcome: result.outcome, round },
    }
  }

  const getUpdate =
    result.outcome === "victory" ? getVictoryUpdate : getDefeatUpdate

  const { dbUpdate, report, logMessage } = getUpdate(
    {
      ...player,
      ships: result.ships,
      crewMembers: { ...player.crewMembers, health: result.crewHealth },
    },
    shipMeeting,
    getBattleLosses(result.battle)
  )

  return {
    player: patchDeep<Player>(player, dbUpdate),
    log: logMessage,
    data: { outcome: result.outcome, round, ...report },
  }
}
