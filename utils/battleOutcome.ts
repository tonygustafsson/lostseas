import { createTreasure } from "./createTreasure"
import { decreaseCrewHealth, increaseCrewMood } from "./crew"
import { addToInventory, removeFromAllInventoryItems } from "./inventory"
import { getRandomInt } from "./random"
import { getLootedMerchandise, getNumberOfRecruits } from "./shipMeeting"

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

  const crewHealthLoss = getRandomInt(1, 10)
  const newCrewHealth = decreaseCrewHealth(
    player.crewMembers.health,
    crewHealthLoss
  )
  const crewMoodIncrease = 20
  const newCrewMood = increaseCrewMood(
    player.crewMembers.mood,
    crewMoodIncrease
  )
  const crewMemberRecruits = getNumberOfRecruits(opponentCrewMembers)

  const lootedGold = Math.floor(opponentCrewMembers * getRandomInt(10, 100))
  const lootedMerchandise = getLootedMerchandise()
  const newInventory = addToInventory(player.inventory, lootedMerchandise)

  const foundTreasure = getRandomInt(1, 20) === 1 ? createTreasure() : false

  const report: AttackSuccessReport = {
    crewMoodIncrease,
    crewHealthLoss: crewHealthLoss + battleLosses.crewHealthLoss,
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
      health: newCrewHealth,
      mood: newCrewMood,
    },
    ships: player.ships,
    inventory: newInventory,
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

  const crewHealthLoss = getRandomInt(10, 30)
  const newCrewHealth = decreaseCrewHealth(
    player.crewMembers.health,
    crewHealthLoss
  )

  // Without ships everything is lost. Dividing by 0 ships would give Infinity
  // and turn every inventory item negative.
  const inventoryPercentageLoss = numberOfShips
    ? (1 / numberOfShips) * 100
    : 100
  const newInventory = removeFromAllInventoryItems(
    player.inventory,
    inventoryPercentageLoss
  )

  const sinkShip = numberOfShips > 1 ? getRandomInt(1, 3) === 1 : false
  const randomShipId = Object.keys(player.ships)[
    getRandomInt(0, numberOfShips - 1)
  ]

  const report: AttackFailureReport = {
    crewHealthLoss: crewHealthLoss + battleLosses.crewHealthLoss,
    sunkShip: sinkShip ? player.ships[randomShipId].name : false,
    inventoryPercentageLoss,
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
      health: newCrewHealth,
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
