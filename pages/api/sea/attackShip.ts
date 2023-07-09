import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { decreaseCrewHealth, increaseCrewMood } from "@/utils/crew"
import { addToInventory, removeFromAllInventoryItems } from "@/utils/inventory"
import { getRandomInt } from "@/utils/random"
import { reduceShipsHealth } from "@/utils/ship"
import {
  calculateAttackSuccess,
  getLootedMerchandise,
  getNumberOfRecruits,
} from "@/utils/shipMeeting"

const seaAttackShip = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  if (!player.locationStates?.sea?.shipMeeting) {
    res.status(500).json({
      error: "You are not currently meeting a ship",
    })
    return
  }

  const opponentCannons = player?.locationStates.sea.shipMeeting.cannons
  const opponentCrewMembers = player?.locationStates.sea.shipMeeting.crewMembers

  const wonBattle = calculateAttackSuccess(
    player.crewMembers.count,
    player.inventory.cannons,
    opponentCannons
  )

  if (wonBattle) {
    const newCrewHealth = decreaseCrewHealth(
      player.crewMembers.health,
      getRandomInt(1, 10)
    )
    const newCrewMood = increaseCrewMood(player.crewMembers.mood, 20)
    const crewMemberRecruits = getNumberOfRecruits(opponentCrewMembers)

    const lootedGold = Math.floor(opponentCrewMembers * getRandomInt(10, 100))
    const lootedMerchandise = getLootedMerchandise()
    const newInventory = addToInventory(player.inventory, lootedMerchandise)

    const shipHealthLoss = getRandomInt(1, 10)
    const newShips = reduceShipsHealth(player.ships, shipHealthLoss)

    const playerResults: Player = {
      ...player,
      character: {
        ...player.character,
        gold: player.character.gold + lootedGold,
      },
      crewMembers: {
        ...player.crewMembers,
        count: player.crewMembers.count + crewMemberRecruits,
        health: newCrewHealth,
        mood: newCrewMood,
      },
      ships: newShips,
      inventory: newInventory,
      locationStates: {
        ...player.locationStates,
        sea: {
          ...player.locationStates.sea,
          shipMeeting: null,
        },
      },
    }

    await savePlayer(playerId, playerResults).catch((error) => {
      res.status(500).json({ error })
      return
    })

    res.status(200).json({
      success: true,
      player,
      playerResults,
    })
  } else {
    // Lost battle
    const numberOfShips = Object.keys(player.ships).length

    const newCrewHealth = decreaseCrewHealth(
      player.crewMembers.health,
      getRandomInt(10, 30)
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

    const playerResults: Player = {
      ...player,
      character: {
        ...player.character,
        gold: 0,
      },
      crewMembers: {
        ...player.crewMembers,
        health: newCrewHealth,
      },
      ships: {
        ...player.ships,
        ...(sinkShip && {
          [randomShipId]: null!,
        }),
      },
      inventory: newInventory,
      locationStates: {
        ...player.locationStates,
        sea: {
          ...player.locationStates.sea,
          shipMeeting: null,
        },
      },
    }

    await savePlayer(playerId, playerResults).catch((error) => {
      res.status(500).json({ error })
      return
    })

    res.status(200).json({
      success: false,
      player,
      playerResults,
    })
  }
}

export default seaAttackShip
