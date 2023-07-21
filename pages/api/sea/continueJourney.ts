import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getPlayer, savePlayer } from "@/firebase/db"
import { getMannedCannons } from "@/utils/crew"
import { createMeetingShip } from "@/utils/shipMeeting"

const seaContinueJourney = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
    player.character.journey.day === player.character.journey.totalDays

  const shipMeeting = !destinationReached ? Math.random() < 0.33 : false
  const mannedCannons = getMannedCannons(
    player.crewMembers.count,
    player.inventory?.cannons
  )
  const previouslyHadAShipMeeting =
    player.locationStates?.sea?.attackSuccessReport ||
    player.locationStates?.sea?.attackFailureReport
  const shipMeetingState =
    shipMeeting && !previouslyHadAShipMeeting
      ? createMeetingShip(mannedCannons)
      : null

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
      } as Omit<Character, "journey">,
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
        ...(!previouslyHadAShipMeeting && {
          day: player.character.day + 1,
          journey: {
            ...player.character.journey,
            day: player.character.journey.day + 1,
          },
        }),
      },
      locationStates: {
        ...player.locationStates,
        sea: {
          ...player.locationStates?.sea,
          attackSuccessReport: null!,
          attackFailureReport: null!,
          shipMeeting: shipMeetingState,
        },
      },
      crewMembers: {
        ...player.crewMembers,
        mood: player.crewMembers.mood - 1,
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
    shipMeetingState,
  })
}

export default seaContinueJourney
