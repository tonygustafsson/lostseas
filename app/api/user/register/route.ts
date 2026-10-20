import crypto from "crypto"
import { NextResponse } from "next/server"

import { STARTING_SHIP_TYPE } from "@/constants/player"
import {
  COOKIE_EXPIRE_TIME,
  MUSIC_STATE_COOKIE_NAME,
  SOUND_EFFECTS_STATE_COOKIE_NAME,
} from "@/constants/system"
import { createNewPlayer } from "@/utils/actions/user"
import { savePlayerWithStatistics } from "@/utils/db/savePlayerWithStatistics"
import { getRandomTown } from "@/utils/location"
import { setPlayerCookie } from "@/utils/setPlayerCookie"
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
      ship: createNewShip(STARTING_SHIP_TYPE, 0),
    }
  )

  await savePlayerWithStatistics(newPlayer, `Created new character ${name}.`)

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

    const res = setPlayerCookie(NextResponse.json(playerId), playerId)

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
