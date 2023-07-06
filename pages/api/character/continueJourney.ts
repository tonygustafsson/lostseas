import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"

const continueJourney = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const player = await getPlayer(playerId)

  if (player.character.location !== "Sea") {
    res.status(500).json({
      error: `You cannot journey from ${player.character.location}.`,
    })
    return
  }

  if (!player.character.journey?.destination) {
    res.status(500).json({
      error: "Not a valid journey destination.",
    })
    return
  }

  if (player.character.journey?.day > player.character.journey?.totalDays) {
    res.status(500).json({
      error: "Your journey is already finished.",
    })
    return
  }

  const destinationReached =
    player.character.journey.day + 1 === player.character.journey.totalDays

  const shipMeeting = Math.random() > 0.25
  /*   const mannedCannons = Math.floor()
  const shipMeetingState = shipMeeting
    ? createMeetingShip(player.ship.cannons)
    : null */

  if (destinationReached) {
    // Finish journey
    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        town: player.character.journey.destination,
        location: "Harbor",
        day: player.character.day + 1,
        journey: null,
      },
    }

    await savePlayer(playerId, playerResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  } else {
    // Continue Journey
    const playerResult: Player = {
      ...player,
      character: {
        ...player.character,
        day: player.character.day + 1,
        journey: {
          ...player.character.journey,
          day: player.character.journey.day + 1,
        },
      },
    }

    await savePlayer(playerId, playerResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  }

  res.status(200).json({
    success: true,
    day: player.character.journey.day + 1,
    totalDays: player.character.journey.totalDays,
    destination: player.character.journey.destination,
    destinationReached,
  })
}

export default continueJourney
