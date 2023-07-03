import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next/types"

import { PLAYER_ID_COOKIE_NAME } from "@/constants/system"
import { getCharacter, saveCharacter } from "@/firebase/db"

const continueJourney = async (req: NextApiRequest, res: NextApiResponse) => {
  const playerId = getCookie(PLAYER_ID_COOKIE_NAME, { req, res })?.toString()

  if (!playerId) {
    res.status(400).json({ error: "Unauthorized" })
    return
  }

  const character = await getCharacter(playerId)

  if (character.location !== "Sea") {
    res.status(500).json({
      error: `You cannot journey from ${character.location}.`,
    })
    return
  }

  if (!character.journey?.destination) {
    res.status(500).json({
      error: "Not a valid journey destination.",
    })
    return
  }

  if (character.journey?.day > character.journey?.totalDays) {
    res.status(500).json({
      error: "Your journey is already finished.",
    })
    return
  }

  const destinationReached =
    character.journey.day + 1 === character.journey.totalDays

  if (destinationReached) {
    // Finish journey
    const characterResult: Nullable<Character> = {
      ...character,
      town: character.journey.destination,
      location: "Harbor",
      day: character.day + 1,
      journey: null,
    }

    await saveCharacter(playerId, characterResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  } else {
    // Continue Journey
    const characterResult: Character = {
      ...character,
      day: character.day + 1,
      journey: {
        ...character.journey,
        day: character.journey.day + 1,
      },
    }

    await saveCharacter(playerId, characterResult).catch((error) => {
      res.status(500).json({ error })
      return
    })
  }

  res.status(200).json({
    success: true,
    day: character.journey.day + 1,
    totalDays: character.journey.totalDays,
    destination: character.journey.destination,
    destinationReached,
  })
}

export default continueJourney
