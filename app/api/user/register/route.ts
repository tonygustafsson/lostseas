import crypto from "crypto"
import { NextResponse } from "next/server"

import {
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  PLAYER_ID_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { savePlayer, saveStatistics } from "@/firebase/db"
import { createNewPlayer } from "@/utils/actions/user"
import { getRandomTown } from "@/utils/location"
import { getScore } from "@/utils/score"
import { createNewShip } from "@/utils/ship"
import { registrationValidationSchema } from "@/utils/validation"

const createPlayer = async (body: any) => {
  const { name, nationality, gender, age } = body as Character
  const { musicOn, soundEffectsOn } = body

  const playerId: Player["id"] = crypto.randomUUID()

  const newPlayer = createNewPlayer(
    { name, nationality, gender, age },
    {
      id: playerId,
      createdDate: new Date().getTime(),
      startingTown: getRandomTown(nationality),
      ship: createNewShip("Brig", 0),
    }
  )

  const updatedPlayer = await savePlayer(
    newPlayer,
    `Created new character ${name}.`
  )

  try {
    await saveStatistics(playerId, {
      day: updatedPlayer.character.day,
      gold: updatedPlayer.character.gold || 0,
      score: getScore(updatedPlayer),
      crewMembers: updatedPlayer.crewMembers.count || 0,
      ships: Object.keys(updatedPlayer.ships || {}).length,
    })
  } catch (statError) {
    // Swallow statistics errors so they don't block the main flow
    console.error("Failed to save player statistics", statError)
  }

  return { playerId, musicOn, soundEffectsOn }
}

const handleRegister = async (req: Request) => {
  const body = await req.json()

  try {
    await registrationValidationSchema.parseAsync(body)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  try {
    const { playerId, musicOn, soundEffectsOn } = await createPlayer(body)

    const res = NextResponse.json(playerId)

    res.cookies.set(PLAYER_ID_COOKIE_NAME, playerId, {
      expires: COOKIE_EXPIRE_TIME,
    })
    res.cookies.set(MUSIC_STATE_COOKIE_NAME, Boolean(musicOn).toString(), {
      expires: COOKIE_EXPIRE_TIME,
    })
    res.cookies.set(
      SOUND_EFFECTS_STATE_COOKIE_NAME,
      Boolean(soundEffectsOn).toString(),
      { expires: COOKIE_EXPIRE_TIME }
    )

    return res
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export const POST = handleRegister
export const PUT = handleRegister
