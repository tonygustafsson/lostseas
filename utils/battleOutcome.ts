import { createTreasure } from "./createTreasure"
import { increaseCrewMood } from "./crew"
import { getRandomInt } from "./random"
import {
  getLootedMerchandise,
  getNumberOfRecruits,
  getStolenMerchandise,
} from "./shipMeeting"

type BattleLosses = { shipHealthLoss: number; crewHealthLoss: number }

// Ship and crew damage from the battle rounds is expected to already be
// applied to `player`. `battleLosses` is only added to the report.
export const getVictoryUpdate = (
  player: Player,
  shipMeeting: ShipMeetingState,
  battleLosses: BattleLosses
) => {
  const opponentNation = shipMeeting.nation
  const opponentCrewMembers = shipMeeting.crewMembers

  const crewMoodIncrease = 20
  const newCrewMood = increaseCrewMood(
    player.crewMembers.mood,
    crewMoodIncrease
  )
  const crewMemberRecruits = getNumberOfRecruits(opponentCrewMembers)

  const lootedGold = Math.floor(opponentCrewMembers * getRandomInt(10, 100))
  // The player picks what to take of the loot, so it is only offered here
  const lootedMerchandise = getLootedMerchandise()
  const hasLoot = Object.values(lootedMerchandise).some(
    (amount) => (amount ?? 0) > 0
  )

  const foundTreasure = getRandomInt(1, 20) === 1 ? createTreasure() : false

  const report: AttackSuccessReport = {
    crewMoodIncrease,
    crewHealthLoss: battleLosses.crewHealthLoss,
    crewMemberRecruits,
    lootedGold,
    lootedMerchandise,
    shipHealthLoss: battleLosses.shipHealthLoss,
    foundTreasure,
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: player.character.gold + lootedGold,
      battles: {
        [opponentNation]: {
          won: (player.character.battles?.[opponentNation]?.won || 0) + 1,
        },
      } as Character["battles"],
    },
    crewMembers: {
      count: player.crewMembers.count + crewMemberRecruits,
      health: player.crewMembers.health,
      mood: newCrewMood,
    },
    ships: player.ships,
    ...(foundTreasure && {
      treasures: {
        [foundTreasure.id]: foundTreasure,
      },
    }),
    locationStates: {
      sea: {
        shipMeeting: null,
        battle: null,
        attackSuccessReport: report,
        lootOffer: hasLoot ? lootedMerchandise : null,
        justMetAShip: true,
      },
    },
  }

  return {
    dbUpdate,
    report,
    logMessage: `Won a battle against ${opponentNation}; looted ${lootedGold} gold.`,
  }
}

export const getDefeatUpdate = (
  player: Player,
  shipMeeting: ShipMeetingState,
  battleLosses: BattleLosses
) => {
  const opponentNation = shipMeeting.nation
  const numberOfShips = Object.keys(player.ships).length

  // A defeat adds no crew damage beyond the battle rounds

  const lostMerchandise = getStolenMerchandise(player.inventory)
  const newInventory = {
    ...player.inventory,
    ...Object.fromEntries(
      Object.keys(lostMerchandise).map((item) => [item, 0])
    ),
  }

  const sinkShip = numberOfShips > 1 ? getRandomInt(1, 3) === 1 : false
  const randomShipId = Object.keys(player.ships)[
    getRandomInt(0, numberOfShips - 1)
  ]

  const report: AttackFailureReport = {
    crewHealthLoss: battleLosses.crewHealthLoss,
    sunkShip: sinkShip ? player.ships[randomShipId].name : false,
    lostMerchandise,
    shipHealthLoss: battleLosses.shipHealthLoss,
  }

  const dbUpdate: DeepPartial<Player> = {
    character: {
      gold: 0,
      battles: {
        [opponentNation]: {
          lost: (player.character.battles?.[opponentNation]?.lost || 0) + 1,
        },
      } as Character["battles"],
    },
    crewMembers: {
      health: player.crewMembers.health,
    },
    ships: {
      ...player.ships,
      ...(sinkShip && {
        [randomShipId]: null,
      }),
    },
    inventory: newInventory,
    locationStates: {
      sea: {
        shipMeeting: null,
        battle: null,
        attackFailureReport: report,
        justMetAShip: true,
      },
    },
  }

  return {
    dbUpdate,
    report,
    logMessage: `Lost a battle against ${opponentNation}; crew health loss ${report.crewHealthLoss}.`,
  }
}
