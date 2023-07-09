import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { MERCHANDISE } from "@/constants/merchandise"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getRandomInt } from "@/utils/random"

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

  const mannedCannons = Math.floor(
    player.crewMembers.count / player.inventory.cannons
  )
  const opponentCannons = player?.locationStates.sea.shipMeeting.cannons
  const opponentCrewMembers = player?.locationStates.sea.shipMeeting.crewMembers

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
  const wonBattle = playerScore >= opponentScore

  if (wonBattle) {
    const lootedGold = Math.floor(opponentCrewMembers * getRandomInt(10, 100))
    const crewMoodIncrease = 20
    const crewHealthLoss = getRandomInt(1, 10)
    const shipHealthLoss = getRandomInt(1, 10)

    let crewMemberRecruits = Math.floor(
      opponentCrewMembers * (getRandomInt(10, 40) / 100)
    )

    if (opponentCrewMembers > 11) {
      crewMemberRecruits = Math.floor(
        opponentCrewMembers * (getRandomInt(3, 10) / 100)
      )
    }
    if (opponentCrewMembers > 20) {
      crewMemberRecruits = Math.floor(
        opponentCrewMembers * (getRandomInt(2, 6) / 100)
      )
    }

    const lootedMerchandise: Partial<Record<keyof Inventory, number>> = {}

    Object.keys(MERCHANDISE).forEach((merchandise) => {
      if (getRandomInt(0, 2) === 0) {
        lootedMerchandise[merchandise as keyof Inventory] =
          merchandise === "food" || merchandise === "water"
            ? getRandomInt(1, 10)
            : getRandomInt(1, 5)
      }
    })

    const newInventory = Object.keys(MERCHANDISE).reduce((acc, merchandise) => {
      if (
        !player.inventory[merchandise as keyof Inventory] &&
        !lootedMerchandise[merchandise as keyof Inventory]
      ) {
        return acc
      }

      acc[merchandise as keyof Inventory] =
        (player.inventory[merchandise as keyof Inventory] || 0) +
        (lootedMerchandise[merchandise as keyof Inventory] || 0)

      return acc
    }, {} as Record<keyof Inventory, number>)

    const newShips = Object.entries(player.ships || {}).reduce(
      (acc, [shipId, ship]) => {
        acc[shipId] = {
          ...ship,
          health:
            ship.health - shipHealthLoss > 0 ? ship.health - shipHealthLoss : 0,
        }
        return acc
      },
      {} as Record<string, Ship>
    )

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
