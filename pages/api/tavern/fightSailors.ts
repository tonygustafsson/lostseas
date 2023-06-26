import { getCookie } from "cookies-next"
import { randomInt } from "crypto"
import { child, get, ref, set } from "firebase/database"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import db, { dbRef } from "@/firebase/db"

const tavernFightSailors = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const playerRef = await get(child(dbRef, playerId))
  const player = playerRef.val() as Player

  const numberOfSailors = player?.locationStates?.tavern?.noOfSailors || 0

  if (!numberOfSailors) {
    res.status(500).json({ error: "No sailors to fight" })
    return
  }

  const won = Math.random() > 0.3

  if (won) {
    const loot = Math.round(randomInt(10, 100))
    const healthLoss = Math.round(randomInt(1, 10))

    const result = {
      ...player,
      character: {
        ...player.character,
        gold: player.character.gold + loot,
      },
      crewMembers: {
        ...player.crewMembers,
        health:
          player.crewMembers.health - healthLoss > 0
            ? player.crewMembers.health - healthLoss
            : 0,
      },
      locationStates: {
        ...player.locationStates,
        tavern: {
          ...player.locationStates?.tavern,
          noOfSailors: 0,
        },
      },
    } as Player

    await set(ref(db, playerId), result).catch((error) => {
      res.status(500).json({ error, numberOfSailors, loot, healthLoss })
    })

    res.status(200).json({
      success: true,
      numberOfSailors,
      healthLoss,
      loot,
    })
  } else {
    // Lost fight
    const healthLoss = Math.round(randomInt(10, 30))

    const result = {
      ...player,
      crewMembers: {
        ...player.crewMembers,
        health:
          player.crewMembers.health - healthLoss > 0
            ? player.crewMembers.health - healthLoss
            : 0,
      },
      locationStates: {
        ...player.locationStates,
        tavern: {
          ...player.locationStates?.tavern,
          noOfSailors: 0,
        },
      },
    } as Player

    await set(ref(db, playerId), result).catch((error) => {
      res.status(500).json({ error, numberOfSailors, healthLoss })
    })

    res.status(200).json({
      success: false,
      numberOfSailors,
      healthLoss,
    })
  }
}

export default tavernFightSailors
