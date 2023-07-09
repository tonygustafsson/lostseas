import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { addToInventory } from "@/utils/inventory"
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
    const crewMoodIncrease = 20
    const crewHealthLoss = getRandomInt(1, 10)
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
        health:
          player.crewMembers.health - crewHealthLoss > 0
            ? player.crewMembers.health - crewHealthLoss
            : 0,
        mood:
          player.crewMembers.mood + crewMoodIncrease <= 100
            ? player.crewMembers.mood + crewMoodIncrease
            : 100,
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

    res.status(200).json({
      success: true,
    })
  }
}

export default seaAttackShip
