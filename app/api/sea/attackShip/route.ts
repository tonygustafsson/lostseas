import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createTreasure } from "@/utils/createTreasure"
import { decreaseCrewHealth, increaseCrewMood } from "@/utils/crew"
import { addToInventory, removeFromAllInventoryItems } from "@/utils/inventory"
import { patchDeep } from "@/utils/patchDeep"
import { getRandomInt } from "@/utils/random"
import { reduceShipsHealth } from "@/utils/ship"
import {
  calculateAttackSuccess,
  getLootedMerchandise,
  getNumberOfRecruits,
} from "@/utils/shipMeeting"

export async function POST() {
  const cookieStore = await cookies()
  const playerId = cookieStore.get(PLAYER_ID_COOKIE_NAME)?.value

  if (!playerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const player = await getPlayer(playerId)

  if (!player)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (!player.locationStates?.sea?.shipMeeting) {
    return NextResponse.json(
      { error: "You are not currently meeting a ship" },
      { status: 500 }
    )
  }

  const opponentNation = player.locationStates.sea.shipMeeting.nation
  const opponentCannons = player.locationStates.sea.shipMeeting.cannons
  const opponentCrewMembers = player.locationStates.sea.shipMeeting.crewMembers

  const wonBattle = calculateAttackSuccess(
    player.crewMembers.count,
    player.inventory?.cannons,
    opponentCannons
  )

  if (wonBattle) {
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

    const shipHealthLoss = getRandomInt(1, 10)
    const newShips = reduceShipsHealth(player.ships, shipHealthLoss)

    const foundTreasure = getRandomInt(1, 20) === 1 ? createTreasure() : false

    const report: AttackSuccessReport = {
      crewMoodIncrease,
      crewHealthLoss,
      crewMemberRecruits,
      lootedGold,
      lootedMerchandise,
      shipHealthLoss,
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
      ships: newShips,
      inventory: newInventory,
      ...(foundTreasure && {
        treasures: {
          [foundTreasure.id]: foundTreasure,
        },
      }),
      locationStates: {
        sea: {
          shipMeeting: null,
          attackSuccessReport: report,
          justMetAShip: true,
        },
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)

    try {
      await savePlayer(newPlayer, `Won a battle against ${opponentNation}; looted ${lootedGold} gold.`)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true, ...report })
  } else {
    const numberOfShips = Object.keys(player.ships).length

    const crewHealthLoss = getRandomInt(10, 30)
    const newCrewHealth = decreaseCrewHealth(
      player.crewMembers.health,
      crewHealthLoss
    )

    const inventoryPercentageLoss = (1 / numberOfShips) * 100
    const newInventory = removeFromAllInventoryItems(
      player.inventory,
      inventoryPercentageLoss
    )

    const sinkShip = numberOfShips > 1 ? getRandomInt(1, 3) === 1 : false
    const randomShipId = Object.keys(player.ships)[
      getRandomInt(0, numberOfShips - 1)
    ]

    const shipHealthLoss = getRandomInt(10, 20)
    const newShips = reduceShipsHealth(player.ships, shipHealthLoss)

    const report: AttackFailureReport = {
      crewHealthLoss,
      sunkShip: sinkShip ? player.ships[randomShipId].name : false,
      inventoryPercentageLoss,
      shipHealthLoss,
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
        ...newShips,
        ...(sinkShip && {
          [randomShipId]: null,
        }),
      },
      inventory: newInventory,
      locationStates: {
        sea: {
          shipMeeting: null,
          attackFailureReport: report,
          justMetAShip: true,
        },
      },
    }

    const newPlayer = patchDeep<Player>(player, dbUpdate)

    try {
      await savePlayer(newPlayer, `Lost a battle against ${opponentNation}; crew health loss ${crewHealthLoss}.`)
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: false, ...report })
  }
}
