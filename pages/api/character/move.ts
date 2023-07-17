import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { LOCATIONS } from "@/constants/locations"
import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { createMoveEvents } from "@/utils/createMoveEvents"
import { validateHarbor } from "@/utils/validateHarbor"

const move = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const destination = req.body.location as Character["location"]

  let destinationOverride: Character["location"] | undefined
  let locationState: LocationState | undefined

  if (!Object.values(LOCATIONS).includes(destination)) {
    res.status(400).json({ error: "Invalid location" })
    return
  }

  const player = await getPlayer(playerId)

  const currentLocation = player.character.location as
    | SeaLocation
    | TownLocation

  if (currentLocation === destination) {
    return
  }

  if (currentLocation === "Sea") {
    // Use travel function instead
    res.status(400).json({
      error: `You cannot move from ${currentLocation} to ${destination}.`,
    })
    return
  }

  if (destination === "Docks" && currentLocation !== "Harbor") {
    res.status(400).json({
      error: `You cannot move from ${currentLocation} to ${destination}.`,
    })
    return
  }

  if (destination === "Harbor") {
    // Check ships, crew status, food and water before you can leave town
    const harborValidation = validateHarbor(player)

    if (!harborValidation.success) {
      destinationOverride = "Docks"

      locationState = {
        docks: {
          leaveErrors: true,
        },
      }
    } else {
      locationState = {
        docks: {
          leaveErrors: null,
        },
      }
    }
  }

  const playerResult: Player = {
    ...player,
    character: {
      ...player.character,
      location: destinationOverride || destination,
    },
    locationStates: {
      ...player.locationStates,
      ...locationState,
    },
  }

  await savePlayer(playerId, playerResult).catch((error) => {
    res.status(500).json({ error })
  })

  await createMoveEvents({ playerId, destination })

  res.status(200).json({ success: true })
}

export default move
