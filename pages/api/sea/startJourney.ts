import { getCookie } from "cookies-next"
import { randomInt } from "crypto"
import { NextApiRequest, NextApiResponse } from "next/types"

import { TOWNS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { validateJourney } from "@/utils/validateJourney"

const seaStartJourney = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const town: Town = req.body.town
  const player = await getPlayer(playerId)

  if (player.character.journey) {
    res.status(500).json({ error: "Character is already on a journey" })
    return
  }

  if (player.character.location === "Sea") {
    res.status(500).json({ error: "You can only start a journey from land." })
    return
  }

  const currentTownInfo = player.character.town && TOWNS[player.character.town]

  const distance = currentTownInfo?.map.distanceTo[town]
    ? currentTownInfo.map.distanceTo[town]
    : randomInt(3, 9)

  const journeyValidation = validateJourney(player, distance)

  if (!journeyValidation.success) {
    // Cannot leave town just yet
    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        location: "Harbor",
      },
      locationStates: {
        ...player.locationStates,
        harbor: {
          journeyValidation,
          intendedDistance: distance,
        },
      },
    }

    await savePlayer(playerId, playerResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  } else {
    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        town: null!,
        location: "Sea",
        journey: {
          destination: town,
          day: 1,
          totalDays: distance,
        },
      },
      locationStates: null!,
    }

    await savePlayer(playerId, playerResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  }

  res.status(200).json({ success: journeyValidation.success })
}

export default seaStartJourney
